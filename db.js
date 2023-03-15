const mongo = require('./mongo.js');

let ready = false;

let db = mongo.getDb();
let claims;
db.then((db) => {
	console.log("Connected to DB");
  claims = db.collection("claims"); 
  ready = true;
});

//march 2023
const START_YEAR = 2023;
const START_MONTH = 2;

//6000 initially
const START_PAYOUT = 6000;

//return number of months since start of distribution
//starts at month 0
function get_month() {
  let date = new Date();
  let years = date.getFullYear()-START_YEAR;
  let months = date.getMonth()-START_MONTH;
  return years*12+months;
}

//get amount to payout, for current month
function get_amount() {
  let month = get_month();
  let halvings = Math.floor(month/6);
  let payout = START_PAYOUT;
  //payout halves every six months
  for (let i=0; i < halvings; i++) {
    payout = payout/2;
  }
  return payout;
}

/*claim schema
{
  address: string,
  amount: number,
  month: number,
  claims_this_month: number,
	claims: number
}
*/

async function get_claims_this_month() {
	if (!claims) return 11111;
	let current_month = get_month();
	let claims_array = await claims.find({"month": current_month});
	claims_array = await claims_array.toArray();
	let claims_num = 0;
	for (let i=0; i < claims_array.length; i++) {
		claims_num += claims_array[i].claims_this_month;
	}
  return claims_num;
}

async function find_claim(address) {
  return await claims.findOne({"address": address});
}

//insert or replace
async function add_claim(address, amount) {
  let claim_exists = await find_claim(address);
  if (claim_exists) {
		let current_month = get_month();
		if (claim_exists.month !== current_month) {
			claim_exists.claims_this_month = 0;
		}
		claim_exists.claims_this_month += 1;
    claim_exists.claims += 1;
    claim_exists.amount = amount;
    claim_exists.month = current_month;
		claim_exists.last_claim = Date.now();
    await claims.replaceOne({ address: address }, claim_exists);
  } else {
    await claims.insertOne({
      address: address,
      amount: amount,
			last_claim: Date.now(),
      month: get_month(),
			claims_this_month: 1,
      claims: 1
    });
  }
}

module.exports = {
  get_month: get_month,
  get_amount: get_amount,
  get_claims_this_month: get_claims_this_month,
  find_claim: find_claim,
  add_claim: add_claim
}
