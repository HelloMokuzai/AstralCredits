const ERC20_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseAllowance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const BRIDGE_ABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_signer_address",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_token_address",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "claimer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "claim_amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tx_hash",
				"type": "string"
			}
		],
		"name": "Claimed",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "tx_hash",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_v",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "_r",
				"type": "bytes32"
			},
			{
				"internalType": "bytes32",
				"name": "_s",
				"type": "bytes32"
			}
		],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "claims",
		"outputs": [
			{
				"internalType": "address",
				"name": "claimer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "claim_amount",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "signer_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token_address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const TOKEN_CONTRACT_ADDRESS = "0x61b64c643fCCd6ff34Fc58C8ddff4579A89E2723";
const BRIDGE_CONTRACT_ADDRESS = "0xC54e780C4281273b88b9D3789Eb349eF62d571DA";

const BURN_ADDRESS = "0x" + "a".repeat(40);

let web3_user;
let connected_account;

let token_contract;

document.getElementById("connect").onclick = async () => {
  if (window.ethereum) {
    //error thrown if user rejects request, and connect stopped
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    connected_account = accounts[0];
    //ask them to switch network to songbird pretty please
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x13" }],
    });
    web3_user = new Web3(window.ethereum);
    token_contract = new web3_user.eth.Contract(ERC20_ABI, TOKEN_CONTRACT_ADDRESS, {
      from: connected_account,
    });
    document.getElementById("burn-web3").disabled = false;
    document.getElementById("burn-manually").disabled = false;
  }
};

document.getElementById("burn-address").innerText = BURN_ADDRESS;

document.getElementById("burn-web3").onclick = async () => {
  const receipt = await token_contract.methods.transfer(BURN_ADDRESS, await token_contract.methods.balanceOf(connected_account).call()).send({ from: connected_account }); //the 1 is just a placeholder
  document.getElementById("tx-hash").value = receipt.transactionHash;
  document.getElementById("tx-hash").disabled = true;
  document.getElementById("submit").disabled = false;
};

document.getElementById("burn-manually").onclick = () => {
  document.getElementById("tx-hash").disabled = false;
  document.getElementById("submit").disabled = false;
};

document.getElementById("submit").onclick = async () => {
  const tx_hash = document.getElementById("tx-hash").value;
  const result = await (await fetch("https://astral-credits-bot.fly.dev/bridge/sign?tx_hash=" + tx_hash)).json();
  if (result.error) alert("Is that the correct tx hash?");
  window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: "0xe" }],
  });
  web3_user = new Web3(window.ethereum);
  const bridge_contract = new web3_user.eth.Contract(BRIDGE_ABI, BRIDGE_CONTRACT_ADDRESS, {
    from: connected_account,
  });
  const receipt = await bridge_contract.methods.claim(tx_hash, BigInt(result.amount), result.v, result.r, result.s).send({ from: connected_account });
  document.getElementById("result").innerText = "TX Hash";
  document.getElementById("result").href = `https://flare-explorer.flare.network/tx/${receipt.transactionHash}`;
};

