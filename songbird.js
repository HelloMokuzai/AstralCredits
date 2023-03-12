const { ethers } = require('ethers');
const { fetch } = require('cross-fetch');

const provider = new ethers.providers.JsonRpcProvider("https://songbird-api.flare.network/ext/C/rpc");

let wallet = new ethers.Wallet(process.env.privkey);
wallet = wallet.connect(provider);

const token_contract_address = "0x61b64c643fCCd6ff34Fc58C8ddff4579A89E2723";

const erc20_abi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "who",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

let astral_token = new ethers.Contract(token_contract_address, erc20_abi, wallet);

let wrapped_songbird_token = new ethers.Contract("0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED", erc20_abi, wallet);

const nft_contract_address = "0x288F45e46aD434808c65880dCc2F21938b7Da23d";

const erc1155_abi = [
  {
		"inputs": [
			{
				"internalType": "address[]",
				"name": "accounts",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "ids",
				"type": "uint256[]"
			}
		],
		"name": "balanceOfBatch",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let astral_nft = new ethers.Contract(nft_contract_address, erc1155_abi, wallet);

//get songbird coin balance
async function get_bal(address) {
  return ethers.utils.formatEther(await provider.getBalance(address));
}

//check if they hold enough wrapped songbird or songbird to use the faucet
async function enough_balance(address, holding_requirement) {
  let wrapped_bal = await wrapped_songbird_token.balanceOf(address);
  wrapped_bal = Number(ethers.utils.formatUnits(wrapped_bal.toString(), 18));
  let reg_bal = Number(await get_bal(address));
  return {
    success: wrapped_bal >= holding_requirement || reg_bal >= holding_requirement,
    wrapped_sgb_bal: wrapped_bal,
    sgb_bal: reg_bal
  };
}

//how many blocks sgb/nft has to be held for. 43200 is 24 hours, since block time is 2 seconds so 43200 blocks is around 24 hours - 1800 blocks is around 1 Hour
const HOLDING_BLOCK_TIME = 43200;

async function aged_enough(address, holding_requirement, wrapped_songbird_resp, wrapped_sgb_bal) {
  let holding_enough = false;
  //get current block
  let current_block = await provider.getBlockNumber();
  let songbird_resp = await fetch("https://songbird-explorer.flare.network/api?module=account&action=eth_get_balance&address="+address+"&block="+String(current_block-HOLDING_BLOCK_TIME));
  songbird_resp = await songbird_resp.json();
  if (!songbird_resp.error) {
    let songbird_snapshot = Number(ethers.utils.formatEther(songbird_resp.result));
    if (songbird_snapshot >= holding_requirement) {
      holding_enough = true;
    }
  }
  if (wrapped_songbird_resp.result) {
    wrapped_songbird_resp = wrapped_songbird_resp.result;
    //timestamp attribute can also be used but whatever
    //get token transfers within the hour and see if the (balance)-(total received)=(balance 24 hours ago) is above the holding req or not
    wrapped_songbird_resp = wrapped_songbird_resp.filter(function(item) {
      return item.tokenName === "Wrapped Songbird" && item.blockNumber >= current_block-HOLDING_BLOCK_TIME;
    });
    let wrapped_songbird_snapshot = 0;
    for (let i=0; i < wrapped_songbird_resp.length; i++) {
      if (wrapped_songbird_resp[i].to.toLowerCase() === address.toLowerCase()) {
        wrapped_songbird_snapshot += Number(ethers.utils.formatUnits(wrapped_songbird_resp[i].value, 18));
      } else {
        wrapped_songbird_snapshot -= Number(ethers.utils.formatUnits(wrapped_songbird_resp[i].value, 18));
      }
    }
    if ((wrapped_sgb_bal-wrapped_songbird_snapshot) >= holding_requirement) {
      holding_enough = true;
    }
  }
  if (holding_enough) {
    return true;
  } else {
    return false;
  }
}

//checks if user has the right nfts, and has held them for at least 
async function holds_aged_nfts(address, nft_resp) {
  //genesis token id: 1
  //hologram token id: 5
  let nft_balances = await astral_nft.balanceOfBatch([address, address], [1, 5]);
  let genesis_num = Number(nft_balances[0]);
  let hologram_num = Number(nft_balances[1]);
  if (genesis_num === 0 && hologram_num === 0) return false;
  if (nft_resp.result) {
    nft_resp = nft_resp.result;
    //timestamp attribute can also be used but whatever
    //get token transfers within the hour and see if the (balance)-(total received)=(balance 24 hours ago) is above the holding req or not
    nft_resp = nft_resp.filter(function(item) {
      return item.contractAddress.toLowerCase() === token_contract_address.toLowerCase() && (item.tokenID == "1" || item.tokenID == "2") && item.blockNumber >= current_block-HOLDING_BLOCK_TIME;
    });
    //net received genesis and hologram nfts during the period
    let genesis_snapshot = 0;
    let hologram_snapshot = 0;
    for (let i=0; i < nft_resp.length; i++) {
      if (nft_resp[i].to.toLowerCase() === address.toLowerCase()) {
        if (nft_resp[i].tokenID == "1") {
          genesis_snapshot += 1;
        } else if (nft_resp[i].tokenID == "5") {
          hologram_snapshot += 1;
        }
        wrapped_songbird_snapshot += Number(ethers.utils.formatUnits(nft_resp[i].value, 18));
      } else {
        if (nft_resp[i].tokenID == "1") {
          genesis_snapshot -= 1;
        } else if (nft_resp[i].tokenID == "5") {
          hologram_snapshot -= 1;
        }
      }
    }
    if ((genesis_num-genesis_snapshot) >= 1 || (hologram_num-hologram_snapshot) >= 1) {
      return true;
    } else {
      return false;
    }
  }
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
    return await astral_token.transfer(address, amount, {
      gasPrice: ethers.utils.parseUnits('55', 'gwei')
    });
  } catch (e) {
    console.log(e);
    return false;
  }
}

module.exports = {
  get_bal: get_bal,
  enough_balance: enough_balance,
  aged_enough: aged_enough,
  holds_aged_nfts: holds_aged_nfts,
  faucet_dry: faucet_dry,
  send_token: send_token,
  is_valid: ethers.utils.isAddress
}
