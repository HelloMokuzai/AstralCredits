const { ethers } = require("ethers");
const moment = require('moment');

const provider = new ethers.providers.JsonRpcProvider('https://songbird-api.flare.network/ext/C/rpc');
const signer = provider.getSigner();

let wallet = new ethers.Wallet(process.env.privkey);
wallet = wallet.connect(provider);

const xac_contract_addr = "0x61b64c643fCCd6ff34Fc58C8ddff4579A89E2723";
const xac_abi = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];
let xac = new ethers.Contract(xac_contract_addr, xac_abi, wallet);

let faucet_balance = ethers
.utils.parseUnits("800000000", 18);
let total_supply = ethers.utils.parseUnits("800000000", 18);
let initial_amount = ethers.utils.parseUnits("5000", 18);
let month_counter = 1;
let max_use_per_month = 100;
let sent_date = new Map();

async function send_xac(addr, amount) {
xac.transfer(addr, amount).then((transferResult) => {
console.log(transferResult);
});
}

async function check_bal_xac(addr) {
let raw = await xac.balanceOf(addr);
return ethers.utils.formatUnits(raw, 18);
}

async function faucet_dry(faucet_addr) {
faucet_balance = await check_bal_xac(faucet_addr);
if (faucet_balance < ethers.utils.parseUnits("100", 18)) {
return true;
}
return false;
}

async function send_xac_halving(addr, use_count) {
if (month_counter % 6 === 0) {
initial_amount = initial_amount / 2;
if (initial_amount < ethers.utils.parseUnits("100", 18)) {
initial_amount = ethers.utils.parseUnits("100", 18);
}
}

if(use_count < max_use_per_month) {
// Check if the address has already received tokens today
let current_date = moment().format('YYYY-MM-DD');
if (!sent_date.has(addr) || sent_date.get(addr) !== current_date) {
faucet_balance -= initial_amount;
await send_xac(addr, initial_amount);
sent_date.set(addr, current_date);
} else {
console.log("You have already received tokens from the faucet today. Please try again tomorrow.");
}
} else {
console.log("We have reached the maximum number of uses for the faucet this month. Please try again next month.");
}
month_counter++;
}

module.exports = {
send_xac_halving: send_xac_halving,
check_bal_xac: check_bal_xac,
faucet_dry: faucet_dry
}
