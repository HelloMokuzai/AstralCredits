const TILES_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "max_width",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "max_height",
        "type": "uint32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_painter",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "uint32[2]",
        "name": "_coords",
        "type": "uint32[2]"
      },
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "_color",
        "type": "uint32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_paid_amount",
        "type": "uint256"
      }
    ],
    "name": "ChangePixel",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "x",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "y",
        "type": "uint32"
      }
    ],
    "name": "clearPixel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "height",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pause",
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
    "name": "paused",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "name": "pixels",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "color",
        "type": "uint32"
      },
      {
        "internalType": "address",
        "name": "painter",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "paid_amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "uint32",
        "name": "x",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "y",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "color",
        "type": "uint32"
      }
    ],
    "name": "setPixel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unpause",
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
    "name": "width",
    "outputs": [
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

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

const web3_read = new Web3();

//https://songbird-api.flare.network/ext/C/rpc
//https://sgb.ftso.com.au/ext/bc/C/rpc
const RPC_URL = "https://sgb.ftso.com.au/ext/bc/C/rpc";
const TOKEN_CONTRACT_ADDRESS = "0x61b64c643fCCd6ff34Fc58C8ddff4579A89E2723";
const TILES_CONTRACT_ADDRESS = "0x93CA88Ee506096816414078664641C07aF731026";
const OWNER = "0x36BD98927FC87E29b446f26623560C0C18062562";
const TOKEN_DECIMALS = 18;
const TOKEN_NAME = "XAC";
const BLOCK_EXPLORER = "https://songbird-explorer.flare.network/";
const CHAIN_INFO = {
  chainId: "0x13",
  rpcUrls: ["https://songbird-api.flare.network/ext/C/rpc"],
  chainName: "Songbird",
  nativeCurrency: {
    name: "Songbird",
    symbol: "SGB",
    decimals: 18
  },
  blockExplorerUrls: ["https://songbird-explorer.flare.network/"]
};

web3_read.eth.setProvider(RPC_URL);
let tiles_contract_read = new web3_read.eth.Contract(TILES_ABI, TILES_CONTRACT_ADDRESS);

let tiles_contract;
let token_contract;

let GRID_WIDTH;
let GRID_HEIGHT;

let connected = false;
let connected_account;
let web3_user;

async function refresh_paused() {
  let paused = await tiles_contract_read.methods.paused().call();
  if (paused) {
    document.getElementById("pause").disabled = true;
    document.getElementById("unpause").disabled = false;
    document.getElementById("buy-btn").disabled = true;
    document.getElementById("paused-notice").classList.remove("hide");
  } else {
    document.getElementById("pause").disabled = false;
    document.getElementById("unpause").disabled = true;
    if (connected) {
      document.getElementById("buy-btn").disabled = false;
    }
    document.getElementById("paused-notice").classList.add("hide");
  }
}

function add_network() {
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [CHAIN_INFO]
  });
}

function connect_actions() {
  //ask them to switch network pretty please
  window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: CHAIN_INFO.chainId }], // chainId must be in hexadecimal numbers
  });
  //setup
  document.getElementById("connected-address").href = BLOCK_EXPLORER+"address/"+connected_account;
  document.getElementById("connected-address").innerText = connected_account.slice(0, 10)+"..."+connected_account.slice(-8);
  document.getElementById("connected-address").classList.add("linky-link");
  web3_user = new Web3(window.ethereum);
  tiles_contract = new web3_user.eth.Contract(TILES_ABI, TILES_CONTRACT_ADDRESS, {
    from: connected_account
  });
  if (OWNER.toLowerCase() === connected_account.toLowerCase()) {
    document.getElementById("admin-btn").classList.remove("hide");
  }
  token_contract = new web3_user.eth.Contract(ERC20_ABI, TOKEN_CONTRACT_ADDRESS, {
    from: connected_account
  });
  document.getElementById("connect-btn").innerText = "Connected";
  document.getElementById("connect-btn").disabled = true;
  document.getElementById("buy-btn").disabled = false;
  document.getElementById("buy-btn").classList.remove("disabled");
  document.getElementById("buy-btn").innerText = "Buy Pixel";
  document.getElementById("approve-btn").disabled = false;
  document.getElementById("approve-btn").classList.remove("disabled");
  document.getElementById("approve-btn").innerText = "Approve Spending";
  document.getElementById("add-network").disabled = false;
  connected = true;
}

//check if already connected
if (window.ethereum) {
  window.ethereum.request({method: 'eth_accounts'}).then((accounts) => {
    if (accounts.length > 0) {
      connected_account = accounts[0];
      connect_actions();
    }
  });
}

async function connect() {
  if (window.ethereum) {
    //error thrown if user rejects request, and connect stopped
    let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
    connected_account = accounts[0];
    connect_actions();
  }
}

function color_to_u32(color) {
  return (new Uint32Array((new Uint8Array(color)).buffer))[0];
}

function u32_to_color(u32) {
  return Array.from(new Uint8Array((new Uint32Array([u32])).buffer));
}

function get_buy_price() {
  let buy_price = Number(document.getElementById("buy-price").value);
  if (isNaN(buy_price)) return false;
  if (buy_price < 1) {
    alert("Buy price must be at least 1 XAC");
    return false;
  }
  if (Math.floor(buy_price) !== buy_price) {
    //handle decimals
    let decimals = String(buy_price).split(".")[1].length;
    buy_price = BigInt(buy_price*(10**decimals))*(BigInt(10)**BigInt(TOKEN_DECIMALS-decimals));
  } else {
    buy_price = BigInt(buy_price)*(BigInt(10)**BigInt(TOKEN_DECIMALS));
  }
  return buy_price;
}

async function approve(amount) {
  if (!connected) return;
  let buy_price = get_buy_price();
  if (!buy_price) return;
  try {
    await token_contract.methods.approve(TILES_CONTRACT_ADDRESS, buy_price).send({
      gasPrice: null,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null
    });
  } catch (e) {
    //User probably rejected it, or "not mined" message. But we don't care.
    console.error(e);
  }
}

function color_button(color) {
  document.getElementById("new-color").value = color;
  update_color();
}

function parse_new_color() {
  let new_color = document.getElementById("new-color").value.trim();
  if (new_color.startsWith("#") && (new_color.length === 7 || new_color.length === 9)) {
    //hex
    new_color = new_color.replace("#", "").toUpperCase();
    let hexs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let converted_color = [];
    let two_hex = "";
    for (let i=0; i < new_color.length; i++) {
      //no invalid chars
      if (!hexs.includes(new_color[i])) return false;
      two_hex += new_color[i];
      if (two_hex.length === 2) {
        //convert to number
        let num = 0;
        num += hexs.indexOf(two_hex[0])*16;
        num += hexs.indexOf(two_hex[1]);
        converted_color.push(num);
        two_hex = "";
      }
    }
    if (converted_color.length === 3) {
      converted_color[3] = 255;
    }
    //placeholder
    return converted_color;
  } else {
    //rgba
    new_color = new_color.replace("(", "").replace(")", "").split(",").map((item) => parseInt(item));
    if (new_color.length === 3) {
      //if no alpha channel, default to fully opaque
      new_color.push(255);
    }
    if (new_color.length !== 4) return false;
    for (let c=0; c < new_color.length; c++) {
      if (isNaN(new_color[c]) || new_color[c] > 255) return false;
    }
  }
  return new_color;
}

async function buy(x, y, prev_price) {
  //shouldnt happen
  if (!x || !y) return;
  if (!connected) return;
  //make sure there is buy price
  let buy_price = get_buy_price();
  if (!buy_price) return;
  //parse color
  let new_color = parse_new_color();
  if (!new_color) {
    alert("No color selected!");
    return;
  };
  //make sure buy price is greater than old buy price, otherwise transaction will fail
  if (prev_price >= buy_price) {
    alert("Your buy price is lower than the required price to overwrite the pixel colour!");
    return;
  }
  try {
    await tiles_contract.methods.setPixel(buy_price, x, y, color_to_u32(new_color)).send({
      gasPrice: null,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null
    });
  } catch (e) {
    //User probably rejected it, or "not mined" message. But we don't care.
    console.error(e);
  }
}

//pause can be to stop attack to clear canvas, preserve the canvas or just... pause
async function pause() {
  await tiles_contract.methods.pause().send();
}

async function unpause() {
  await tiles_contract.methods.unpause().send();
}

async function clear_pixel() {
  //parse coords
  let coords = document.getElementById("clear-coords").value;
  coords = coords.replace("(", "").replace(")", "").split(",").map((item) => parseInt(item));
  if (coords.length !== 2) return;
  await tiles_contract.methods.clearPixel(coords[0], coords[1]).send();
}

async function get_pixels() {
  return await new Promise((resolve, reject) => {
    let batch = new web3_read.eth.BatchRequest();
    let pixels = [];
    for (let y=0; y < GRID_HEIGHT; y++) {
      for (let x=0; x < GRID_WIDTH; x++) {
        batch.add(tiles_contract_read.methods.pixels(y, x).call.request((error, pixel) => {
          if (error) console.error(error);
          pixels.push(pixel);
          if (pixels.length === GRID_HEIGHT*GRID_WIDTH) {
            resolve(pixels);
          }
        }));
      }
    }
    batch.execute();
  });
}

class PixelsGrid {
  constructor(canvas, pixels, width, height) {
    this.canvas = canvas;
    this.pixels = pixels;
    this.width = width;
    this.height = height;
    this.scaleFactor = 1;
    this.translateFactor = [0, 0];
    this.pixelSize = 20;
    this.borders = true;
    this.selected = false;
    this.canvas.addEvent("click", [this], false);
    this.canvas.addEvent("wheel", [this], false);
    this.canvas.components.push(this);
  }
  draw_pixel(x, y, clear=false, selected=false) {
    //yes ik its the same as this.pixelSize/this.scaleFactor.
    //but i like writing it this way better - prussia
    let pixelSize = this.pixelSize*(1/this.scaleFactor);
    let true_x = x*this.pixelSize-this.translateFactor[0];
    true_x *= 1/this.scaleFactor;
    let true_y = y*this.pixelSize-this.translateFactor[1];
    true_y *= 1/this.scaleFactor;
    //don't draw if off the screen
    if (true_x < -pixelSize-5) {
      return;
    } else if (true_y < -pixelSize-5) {
      return;
    } else if (true_x > this.canvas.size[0]+5) {
      return;
    } else if (true_y > this.canvas.size[1]+5) {
      return;
    }
    if (clear) {
      this.canvas.context.clearRect(true_x, true_y, pixelSize, pixelSize);
    }
    let path = new Path2D();
    path.rect(true_x, true_y, pixelSize, pixelSize);
    let color = u32_to_color(this.pixels[y*this.width+x].color);
    color[3] = Math.round(color[3]*100/255)/100;
    this.canvas.context.fillStyle = "rgba("+color.join(", ")+")";
    this.canvas.context.fill(path);
    if (selected) {
      this.canvas.context.fillStyle = "rgba(255, 255, 0, 0.8)";
      this.canvas.context.fill(path);
    }
    if (this.borders) {
      this.canvas.context.strokeStyle = "black";
      this.canvas.context.lineWidth = 0.4;
      this.canvas.context.stroke(path);
    }
  }
  update() {
    //draw pixels at scale
    for (let i=0; i < this.pixels.length; i++) {
      let pixel = this.pixels[i];
      //console.log(pixel)
      let x = i%this.width;
      let y = Math.floor(i/this.width);
      if (this.selected[0] === x && this.selected[1] === y) {
        this.draw_pixel(x, y, false, true);
      } else {
        this.draw_pixel(x, y, false, false);
      }
    }
  }
  click(e) {
    //see which box the click is in
    let pixelSize = this.pixelSize*(1/this.scaleFactor);
    let x = Math.floor((e.offsetX+this.translateFactor[0]/this.scaleFactor)/pixelSize);
    let y = Math.floor((e.offsetY+this.translateFactor[1]/this.scaleFactor)/pixelSize);
    if (x >= this.width) return;
    if (y >= this.height) return;
    if (x === this.selected[0] && y === this.selected[1]) return;
    let old_selected = this.selected;
    if (old_selected) {
      this.draw_pixel(old_selected[0], old_selected[1], true, false);
    }
    this.selected = [x, y];
    this.draw_pixel(x, y, true, true);
    document.dispatchEvent(new CustomEvent("pixelclick", {
      detail: {
        pixel: this.pixels[y*this.width+x],
        coords: this.selected
      }
    }));
  }
  wheel(e) {
    const scroll_change = 0.025;
    if (e.deltaY > 0) {
      this.scaleFactor += scroll_change;
    } else {
      this.scaleFactor -= scroll_change;
    }
    if (this.scaleFactor < 0.25) {
      this.scaleFactor = 0.25;
    } else if (this.scaleFactor > 2.5) {
      this.scaleFactor = 2.5;
    } else if (e.deltaY < 0) {
      this.translateFactor[0] += e.offsetX*(this.scaleFactor+scroll_change)-e.offsetX*(this.scaleFactor);
      this.translateFactor[1] += e.offsetY*(this.scaleFactor+scroll_change)-e.offsetY*(this.scaleFactor);
    } else if (e.deltaY > 0) {
      this.translateFactor[0] -= e.offsetX*(this.scaleFactor)-e.offsetX*(this.scaleFactor-scroll_change);
      this.translateFactor[1] -= e.offsetY*(this.scaleFactor)-e.offsetY*(this.scaleFactor-scroll_change);
    }
    if (this.translateFactor[0] < 0) {
      this.translateFactor[0] = 0;
    }
    if (this.translateFactor[1] < 0) {
      this.translateFactor[1] = 0;
    }
    this.canvas.clear();
    this.update();
  }
  mousemove(e) {
    //e.offsetX, e.offsetY
  }
}

let canvas;
let pixel_grid;

let all_linked;

async function update_pixels() {
  console.log("Updating pixels (calling tiles smart contract)");
  pixel_grid.pixels = await get_pixels();
  canvas.update();
  refresh_paused();
  //also update allowance
  token_contract.methods.allowance(connected_account, TILES_CONTRACT_ADDRESS).call().then((remaining_allowance) => {
    console.log(remaining_allowance)
    document.getElementById("remaining-allowance").value = String(Math.floor(remaining_allowance*10**-TOKEN_DECIMALS))+" "+TOKEN_NAME;
  });
}

async function draw_pixel_grid() {
  let query_params = new URLSearchParams(location.search);
  if (query_params.get("auto_dimensions") === "1") {
    //some hardcoded value to reduce loading time a bit (save on two requests)
    GRID_WIDTH = 100;
    GRID_HEIGHT = 100;
  } else {
    GRID_WIDTH = Number(await tiles_contract_read.methods.width().call());
    GRID_HEIGHT = Number(await tiles_contract_read.methods.height().call());
  }
  try {
    all_linked = await (await fetch('/linked_websites.json')).json();
  } catch (e) {
    console.log(e);
    all_linked = {};
  }
  let pixels = await get_pixels();
  document.getElementById("loading-container").style.display = "none";
  document.getElementById("main-grid").style.display = "grid";
  canvas = new Canvas("pixels-canvas");
  pixel_grid = new PixelsGrid(canvas, pixels, GRID_WIDTH, GRID_HEIGHT);
  //check x_pos and y_pos to move canvas to that area
  let x_pos = Number(query_params.get("x_pos"));
  let y_pos = Number(query_params.get("y_pos"));
  pixel_grid.translateFactor = [x_pos*pixel_grid.pixelSize-Math.floor(canvas.size[0]/2)-pixel_grid.pixelSize/2, y_pos*pixel_grid.pixelSize-Math.floor(canvas.size[1]/2)-pixel_grid.pixelSize/2];
  if (pixel_grid.translateFactor[0] < 0) {
    pixel_grid.translateFactor[0] = 0;
  }
  if (pixel_grid.translateFactor[1] < 0) {
    pixel_grid.translateFactor[1] = 0;
  }
  //update canvas
  canvas.update();
  //check paused
  refresh_paused();
  //update allowance
  token_contract.methods.allowance(connected_account, TILES_CONTRACT_ADDRESS).call().then((remaining_allowance) => {
    console.log(remaining_allowance)
    document.getElementById("remaining-allowance").value = String(Math.floor(remaining_allowance*10**-TOKEN_DECIMALS))+" "+TOKEN_NAME;
  });
  //update pixels every minute or so
  setInterval(update_pixels, 60*1000);
  //drag to move
  let current_drag;

  //mousedown must start in canvas
  canvas.canvas.addEventListener("mousedown", (e) => {
    current_touch = {
      original_coords: [e.clientX, e.clientY],
      original_translate: pixel_grid.translateFactor,
    };
  });
  
  document.addEventListener("mousemove", (e) => {
    if (current_touch) {
      pixel_grid.translateFactor = [
        current_touch.original_translate[0]+(current_touch.original_coords[0]-e.clientX),
        current_touch.original_translate[1]+(current_touch.original_coords[1]-e.clientY)
      ];
      trans_bounds();
      canvas.update();
    }
  });

  document.addEventListener("mouseup", (e) => {
    current_touch = undefined;
  });

  //touch drag to move
  let current_touch;

  //touch must start in canvas
  canvas.canvas.addEventListener("touchstart", function(e) {
    current_touch = {
      original_touch: [e.touches[0].clientX, e.touches[0].clientY],
      original_translate: pixel_grid.translateFactor,
    }
  });

  document.addEventListener("touchmove", function(e) {
    if (current_touch) {
      pixel_grid.translateFactor = [
        current_touch.original_translate[0]+(current_touch.original_touch[0]-e.touches[0].clientX),
        current_touch.original_translate[1]+(current_touch.original_touch[1]-e.touches[0].clientY)
      ];
      trans_bounds();
      canvas.update();
    }
  });

  document.addEventListener("touchend", function(e) {
    current_touch = undefined;
  });
}

draw_pixel_grid();

let sections = ["pixel-info", "admin", "about", "settings"]

function change_section(new_section) {
  for (let i=0; i < sections.length; i++) {
    document.getElementById(sections[i]+"-container").classList.add("hide");
    document.getElementById(sections[i]+"-btn").classList.remove("section-change-selected");
  }
  document.getElementById(new_section+"-container").classList.remove("hide");
  document.getElementById(new_section+"-btn").classList.add("section-change-selected");
  if (new_section === "settings") {
    token_contract.methods.allowance(connected_account, TILES_CONTRACT_ADDRESS).call().then((remaining_allowance) => {
      console.log(remaining_allowance)
      document.getElementById("remaining-allowance").value = String(Math.floor(remaining_allowance*10**-TOKEN_DECIMALS))+" "+TOKEN_NAME;
    });
  }
  //
}

function coords_link_copy() {
  navigator.clipboard.writeText("https://"+location.host+"/?x_pos="+String(pixel_grid.selected[0])+"&y_pos="+String(pixel_grid.selected[1]));
}

document.addEventListener("pixelclick", (e) => {
  let pixel = e.detail.pixel;
  let coords = e.detail.coords;
  document.getElementById("none-selected").classList.add("hide");
  document.getElementById("pixel-info").classList.remove("hide");
  document.getElementById("painter").innerText = pixel.painter;
  if (pixel.painter === "0x0000000000000000000000000000000000000000") {
    document.getElementById("painter").innerText = "No one... yet.";
  } else {
    document.getElementById("painter").innerText = pixel.painter;
  }
  let linked = all_linked.find(function(item) {
    return item.address === pixel.painter.toLowerCase();
  });
  document.getElementById("linked-url").removeAttribute("href");
  document.getElementById("linked-url").innerText = "None";
  if (linked) {
    document.getElementById("linked-url").href = linked.url;
    document.getElementById("linked-url").innerText = linked.url;
  }
  //format the coords
  document.getElementById("coords").innerText = "("+coords.join(", ")+")";
  //format the paid amount
  document.getElementById("bought-price").innerText = String(pixel.paid_amount*(10**-TOKEN_DECIMALS))+" $"+TOKEN_NAME;
  //format the color
  document.getElementById("current-color").innerText = "("+u32_to_color(pixel.color).join(", ")+")";
  document.getElementById("buy-btn").onclick = function() {
    buy(coords[0], coords[1], BigInt(pixel.paid_amount));
  };
});

let accelerate = 0;

function trans_bounds() {
  if (pixel_grid.translateFactor[0] < -20) {
    pixel_grid.translateFactor[0] = -20;
  }
  if (pixel_grid.translateFactor[1] < -20) {
    pixel_grid.translateFactor[1] = -20;
  }
  //doesn't seem to work for whatever reason
  let pixelSize = pixel_grid.pixelSize*(1/pixel_grid.scaleFactor);
  let max_x_trans = pixel_grid.width*pixelSize-10;
  if (pixel_grid.scaleFactor > 2) {
    max_x_trans += 900;
  } else if (pixel_grid.scaleFactor > 1.75) {
    max_x_trans += 800;
  } else if (pixel_grid.scaleFactor > 1.5) {
    max_x_trans += 600;
  } else if (pixel_grid.scaleFactor > 1.25) {
    max_x_trans += 500;
  } else if (pixel_grid.scaleFactor > 1) {
    max_x_trans += 420;
  }
  if (pixel_grid.translateFactor[0] > max_x_trans) {
    pixel_grid.translateFactor[0] = max_x_trans;
  }
  let max_y_trans = pixel_grid.height*pixelSize-10;
  if (pixel_grid.scaleFactor > 2) {
    max_y_trans += 900;
  } else if (pixel_grid.scaleFactor > 1.75) {
    max_y_trans += 800;
  } else if (pixel_grid.scaleFactor > 1.5) {
    max_y_trans += 600;
  } else if (pixel_grid.scaleFactor > 1.25) {
    max_y_trans += 500;
  } else if (pixel_grid.scaleFactor > 1) {
    max_y_trans += 420;
  }
  if (pixel_grid.translateFactor[1] > max_y_trans) {
    pixel_grid.translateFactor[1] = max_y_trans;
  }
}

function update_color() {
  let new_color = parse_new_color();
  if (new_color) {
    new_color[3] = new_color[3]/255;
    console.log("rgba("+new_color.join(",")+")")
    document.getElementById("color-preview").style.backgroundColor = "rgba("+new_color.join(",")+")";
  }
}

document.getElementById("new-color").addEventListener("change", update_color);

//key events
let allow_arrow_move = false;

let pressed_keys = [];

document.addEventListener("keydown", (e) => {
  function key_proccess(key) {
    if (key === "arrowup" || key === "w") {
      pixel_grid.translateFactor[1] -= 2+accelerate;
      //
    } else if (key === "arrowleft" || key === "a") {
      pixel_grid.translateFactor[0] -= 2+accelerate;
      //
    } else if (key === "arrowdown" || key === "s") {
      pixel_grid.translateFactor[1] += 2+accelerate;
      //
    } else if (key === "arrowright" || key === "d") {
      pixel_grid.translateFactor[0] += 2+accelerate;
      //
    }
  }
  if (!pixel_grid) return;
  if (e.repeat) {
    accelerate += 1;
    if (accelerate > 18) {
      accelerate = 18;
    }
  } else {
    accelerate = 0;
  }
  let listen_keys;
  if (allow_arrow_move) {
    listen_keys = ["arrowup", "arrowleft", "arrowdown", "arrowright", "w", "a", "s", "d"];
  } else {
    listen_keys = ["w", "a", "s", "d"];
  }
  let key = e.key.toLowerCase();
  if (listen_keys.includes(key)) {
    if (!pressed_keys.includes(key)) {
      pressed_keys.push(key);
    }
    console.log(pressed_keys)
    for (let i=0; i < pressed_keys.length; i++) {
      key_proccess(pressed_keys[i]);
    }
    trans_bounds();
    canvas.update();
  }
});

document.addEventListener("keyup", (e) => {
  pressed_keys = pressed_keys.filter(function(item) {
    return item !== e.key.toLowerCase();
  });
});

document.getElementById("toggle-arrow").addEventListener("change", function(_e) {
  if (!pixel_grid) return;
  if (document.getElementById("toggle-arrow").checked) {
    allow_arrow_move = true;
  } else {
    allow_arrow_move = false;
  }
  canvas.update();
});

document.getElementById("toggle-borders").addEventListener("change", function(_e) {
  if (!pixel_grid) return;
  if (document.getElementById("toggle-borders").checked) {
    pixel_grid.borders = true;
  } else {
    pixel_grid.borders = false;
  }
  canvas.update();
});

document.getElementById("top-logo")?.addEventListener("click", function (_e) {
  //set plonk animation
  document.getElementById("top-logo").animate([
    {
      "transform": "translate(0, 0)"
    },
    {
      "transform": "translate(-1px, -1px)"
    },
    {
      "transform": "translate(0, 0)"
    }
  ], {
    duration: 140
  });
});

window.addEventListener("resize", function(_e) {
  if (canvas) {
    canvas.size = [canvas.canvas.parentElement.offsetWidth, canvas.canvas.parentElement.offsetHeight];
    canvas.canvas.width = canvas.size[0];
    canvas.canvas.height = canvas.size[1];
    canvas.update();
  }
});
