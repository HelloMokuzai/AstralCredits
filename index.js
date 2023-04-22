const express = require('express');
const nunjucks = require('nunjucks');

const db = require('./db.js');

const app = express();

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

app.get('/', async function(_req, res) {
  return res.send(nunjucks.render('index.html', {
    uses_left: MAX_CLAIMS_PER_MONTH-await db.get_claims_this_month()
  }));
});

//1678190400 is Tues 07MAR2023 12:00:00
const FAUCET_OPEN_DATE = 1678190400;

app.listen(10000, '0.0.0.0', () => {
  console.log(`App running on port 10000`);
});
