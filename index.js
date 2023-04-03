const express = require('express');
const cookieParser = require('cookie-parser');
const nunjucks = require('nunjucks');
const axios = require('axios');
const fs = require('fs');
const { fetch } = require('cross-fetch');

const db = require('./db.js');
const songbird = require('./songbird.js');

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//cache for 2 days
app.use(express.static('static', { maxAge: 2*24*60*60*1000 }));

nunjucks.configure('templates', { autoescape: true });

//23 1/2 hours
const CLAIM_FREQ = 23.5*60*60*1000;
//2000 = $20 ish
const HOLDING_REQUIREMENT = 2000;
const MAX_CLAIMS_PER_MONTH = 11111;

//make sure all lowercase addresses
const blacklist = fs.readFileSync("blacklist.txt", "utf-8").split("\n").map((item) => item.toLowerCase());

const CAPTCHA_BASE_URL = "https://captcha.astralcredits.repl.co";

async function get_text_captcha() {
  let resp = await axios.get(CAPTCHA_BASE_URL+"/captcha");
  resp = resp.data;
  return {
    challenge_url: CAPTCHA_BASE_URL+"/challenge/"+resp.image+"?nonce="+resp.nonce,
    challenge_code: resp.code,
    challenge_nonce: resp.nonce
  };
}

async function verify_text_captcha(req_body) {
  const params = new URLSearchParams({ code: req_body.code, nonce: req_body.nonce, guess: req_body.answer });
  let resp = await axios.post(CAPTCHA_BASE_URL+"/captcha", params );
  return resp.data.success;
}

app.get('/', async function(_req, res) {
  return res.send(nunjucks.render('index.html', {
    uses_left: MAX_CLAIMS_PER_MONTH-await db.get_claims_this_month(),
    text_captcha: await get_text_captcha()
  }));
});

//1678190400 is tues march 2023
const FAUCET_OPEN_DATE = 1678190400;

app.post('/', async function(req, res) {
  let error = false;
  if (Math.floor(Date.now()/1000) < FAUCET_OPEN_DATE) {
    error = "Faucet not open yet!";
  }
  let address = req.body['address'];
  if (!address && !error) {
    error = "Address is empty";
  } else if (address) {
    address = address.trim().toLowerCase();
  }
  if (blacklist.includes(address) && !error) {
    error = "Address banned from using faucet, contact us if you think this is a mistake.";
  }
  //make sure request came from site
  if (req.get('host').toLowerCase() !== "astralcredits.xyz" && req.get('host').toLowerCase() !== "www.astralcredits.xyz" && !error) {
    error = "Request did not come from site, normal users should not see this error message. Please report this.";
  }
  //check if address is valid
  let address_valid;
  try {
    address_valid = songbird.is_valid(address);
  } catch (e) {
    //error will fire if what is put in is a string that it thinks might be an ENS address
    address_valid = false;
  }
  if (!address_valid && !error) {
    error = "Address not valid";
  }
  //check faucet dry
  let faucet_dry = await songbird.faucet_dry();
  if (faucet_dry && !error) {
    error = "Faucet is dry";
  }
  //check captcha
  let token = req.body['h-captcha-response'];
  let params = new URLSearchParams();
  params.append('response', token);
  params.append('secret', process.env.hcaptcha_secret);
  let captcha_resp = await axios.post('https://hcaptcha.com/siteverify', params);
  captcha_resp = captcha_resp.data;
  if (!captcha_resp.success && !error) {
    error = "Failed captcha";
  }
  let text_captcha_success = await verify_text_captcha(req.body);
  if (!text_captcha_success && !error) {
    error = "Failed text captcha";
  }
  //check if too many uses this month
  let claims_month = await db.get_claims_this_month();
  if (claims_month >= MAX_CLAIMS_PER_MONTH && !error) {
    error = "Already reached this month's claim limit";
  }
  //see if they hold the requirement for at least 2000 songbird held
  if (!error) {
    let enough_balance = await songbird.enough_balance(address, HOLDING_REQUIREMENT);
    if (!enough_balance.success) {
      error = "Need to hold at least "+String(HOLDING_REQUIREMENT)+" Songbird or Wrapped Songbird to use faucet (this is an anti-botting measure, sorry!)";
    }
    let token_tx_resp = await fetch("https://songbird-explorer.flare.network/api?module=account&action=tokentx&address="+address);
    token_tx_resp = await token_tx_resp.json();
    if (!error) {
      let aged_enough = await songbird.aged_enough(address, HOLDING_REQUIREMENT, token_tx_resp, enough_balance.wrapped_sgb_bal);
      if (!aged_enough) {
        error = "Need to have held at least "+String(HOLDING_REQUIREMENT)+" Songbird or Wrapped Songbird for at least 24 hours (43200 blocks) before claiming. Try again in 24 hours (this is an anti-botting measure, sorry!)";
      }
    }
    //if error is truthy here, that means the error is either not enough sgb/wsgb error not sgb/wsgb not aged enough error
    if (error) {
      //check to see if they hold the aged nft, if so then they are exempt
      let holds_aged_nft = await songbird.holds_aged_nfts(address, token_tx_resp);
      if (holds_aged_nft) {
        //they are exempt
        error = false;
      }
    }
  }
  //check cookies
  if (req.cookies['astral_last_claim'] && !error) {
    if (Number(req.cookies['astral_last_claim'])+CLAIM_FREQ > Date.now()) {
      error = "Last claim too soon. Return 24 Hours after your last successful claim.";
    }
  }
  //check db
  let db_result = await db.find_claim(address);
  if (db_result && !error) {
    if (Number(db_result.last_claim)+CLAIM_FREQ > Date.now()) {
      error = "Last claim too soon. Return 24 Hours after your last successful claim.";
    }
  }
  //if success, try to send
  let amount = String(db.get_amount());
  let tx;
  if (!error) {
    let send_result = await songbird.send_token(address, amount);
    if (!send_result) {
      error = "Failed to send, try again in a few minutes?";
    } else {
      tx = send_result.hash;
    }
  }
  //if error
  if (error) {
    return res.send(nunjucks.render('index.html', {
      uses_left: MAX_CLAIMS_PER_MONTH-await db.get_claims_this_month(),
      text_captcha: await get_text_captcha(),
      error: error
    }));
  }
  res.cookie('astral_last_claim', String(Date.now()));
  await db.add_claim(address, amount);
  return res.send(nunjucks.render('index.html', {
    uses_left: MAX_CLAIMS_PER_MONTH-await db.get_claims_this_month(),
    text_captcha: await get_text_captcha(),
    amount: amount,
    tx: tx
  }));
});

app.listen(10000, '0.0.0.0', () => {
  console.log(`App running on port 10000`);
});
