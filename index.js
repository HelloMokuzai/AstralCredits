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
const blacklist = fs.readFileSync("blacklist.txt", "utf-8").split("\n").map((item) => item.trim().toLowerCase());
console.log("blacklist length", blacklist.length);

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

//1678190400 is Tues 07MAR2023 12:00:00
const FAUCET_OPEN_DATE = 1678190400;

app.listen(10000, '0.0.0.0', () => {
  console.log(`App running on port 10000`);
});
