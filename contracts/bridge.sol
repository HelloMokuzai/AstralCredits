pragma solidity 0.8.19;
 
contract AstralPlane {
  struct Claim {
    address claimer;
    uint256 claim_amount;
    //could store signature, and other info but this is probably enough
  }
 
  //we could just map it to a bool but I think it would be nice to have some info
  mapping(string => Claim) public claims;
  address public immutable signer_address;
  address public token_address;
  address public immutable pauserAddress;

  bool private _mintPause = false;
 
  event Claimed(
    address claimer,
    uint256 claim_amount,
    string tx_hash
  );

  event Paused();
  event UnPaused();
 
  constructor(address _signer_address, address _pauserAddress) {
    signer_address = _signer_address;
    pauserAddress = _pauserAddress;
  }

  function isPaused() external view returns (bool) {
    return _mintPause;
  }

  //MUST call and set before bridge is usable
  function set_token_address(address _token_address) external {
    //so it can only be set once
    require(token_address == address(0));
    token_address = _token_address;
  }

  function mintPause() external {
    require(pauserAddress == msg.sender, "Need to be mint pauser address");
    _mintPause = true;
    emit Paused();
  }

  function mintUnpause() external {
    require(pauserAddress == msg.sender, "Need to be mint pauser address");
    _mintPause = false;
    emit UnPaused();
  }
 
  //the signer MUST make sure the tx_hash is always lowercase
  function verify_signature(address claimer, string memory tx_hash, uint256 amount, uint8 _v, bytes32 _r, bytes32 _s) internal view returns (bool) {
    bytes32 hash = keccak256(abi.encodePacked(claimer, " is approved for tx ", tx_hash, " for amount ", amount)); //mixed address, string, uint256
    //change r and s into bytes
    return ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)), _v, _r, _s) == signer_address;
  }
 
  //CEI or something
  function claim(address claimer, string calldata tx_hash, uint256 amount, uint8 _v, bytes32 _r, bytes32 _s) external returns (bool) {
    require(!_mintPause, "Minting is currently paused");
    require(msg.sender == token_address, "Must claim from bridge by calling the token contract");
    require(amount > 0, "Amount claimed needs to be greater than zero");
    require(claims[tx_hash].claim_amount == 0, "That tx hash has already been claimed"); //means uninitalised
    require(verify_signature(claimer, tx_hash, amount, _v, _r, _s), "Signature could not be verified");
    claims[tx_hash] = Claim(claimer, amount);
    emit Claimed(claimer, amount, tx_hash);
    return true;
  }
}

