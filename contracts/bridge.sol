pragma solidity 0.8.19;
 
interface IERC20 {
  function transfer(address recipient, uint256 amount) external returns (bool);
}
 
contract AstralPlane {
  struct Claim {
    address claimer;
    uint256 claim_amount;
    //could store signature, and other info but this is probably enough
  }
 
  //we could just map it to a bool but I think it would be nice to have some info
  mapping(string => Claim) public claims;
  address public immutable signer_address;
  address public immutable token_address;
 
  event Claimed(
    address claimer,
    uint256 claim_amount,
    string tx_hash
  );
 
  constructor(address _signer_address, address _token_address) {
    signer_address = _signer_address;
    token_address = _token_address;
  }
 
  //the signer MUST make sure the tx_hash is always lowercase
  function verify_signature(string memory tx_hash, uint256 amount, uint8 _v, bytes32 _r, bytes32 _s) internal view returns (bool) {
    bytes32 hash = keccak256(abi.encodePacked(msg.sender, " is approved for tx ", tx_hash, " for amount ", amount)); //mixed address, string, uint256
    //change r and s into bytes
    return ecrecover(keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)), _v, _r, _s) == signer_address;
  }
 
  //CEI or something
  function claim(string calldata tx_hash, uint256 amount, uint8 _v, bytes32 _r, bytes32 _s) external {
    require(amount > 0, "Amount claimed needs to be greater than zero");
    require(claims[tx_hash].claim_amount == 0, "That tx hash has already been claimed"); //means uninitalised
    require(verify_signature(tx_hash, amount, _v, _r, _s), "Signature could not be verified");
    claims[tx_hash] = Claim(msg.sender, amount);
    IERC20 token = IERC20(token_address);
    token.transfer(msg.sender, amount);
    emit Claimed(msg.sender, amount, tx_hash);
  }
}

