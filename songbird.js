const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider("https://songbird-api.flare.network/ext/C/rpc");

let wallet = new ethers.Wallet(process.env.privkey);
wallet = wallet.connect(provider);

const token_contract_address = "0x61b64c643fCCd6ff34Fc58C8ddff4579A89E2723";

const erc20_abi = [{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];

let astral_token = new ethers.Contract(token_contract_address, erc20_abi, wallet);

let wrapped_songbird_token = new ethers.Contract("0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED", erc20_abi, wallet);

//get songbird coin balance
async function get_bal(address) {
  return ethers.utils.formatEther(await provider.getBalance(address));
}

//check if they hold enough wrapped songbird or songbird to use the faucet
async function enough_balance(address, holding_requirement) {
	let wrapped_bal = await wrapped_songbird_token.balanceOf(address);
	wrapped_bal = ethers.utils.formatUnits(wrapped_bal.toString(), 18);
  return Number(wrapped_bal) >= holding_requirement || Number(await get_bal(address)) >= holding_requirement;
}

async function faucet_dry() {
	//slightly inaccurate but ethersjs parse units was just not working for me..
	let bal = await astral_token.balanceOf(wallet.address);
	bal = ethers.utils.formatUnits(bal.toString(), 18);
  return Number(bal) < 6000;
}

async function send_token(address, amount) {
  amount = ethers.utils.parseUnits(amount, 18);
  try {
    return await astral_token.transfer(address, amount);
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = {
  get_bal: get_bal,
	enough_balance: enough_balance,
  faucet_dry: faucet_dry,
  send_token: send_token,
  is_valid: ethers.utils.isAddress
}
