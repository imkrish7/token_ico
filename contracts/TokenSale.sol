pragma solidity ^0.5.0;

import './Token.sol';

contract TokenSale{

	address payable admin;
	uint256 public tokenPrice;
	uint256 public tokensSold;
	Token public tokenContract;
	
	constructor(Token _tokenContract, uint256 _tokenPrice) public{
		admin = msg.sender;
		tokenContract  = _tokenContract;
		tokenPrice = _tokenPrice;
	}

	event Sell(address _buyer, uint256 _amount);

	function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

	function buyTokens(uint256 _numberOfTokens) public payable {
		require(msg.value == multiply(_numberOfTokens , tokenPrice));
		require(tokenContract.balanceOf(address(admin)) >= _numberOfTokens);
		require(tokenContract.transfer(msg.sender, _numberOfTokens));
		tokensSold += _numberOfTokens;
		emit Sell(msg.sender, _numberOfTokens);
	}

	// End sell of token

	function endSale()public{
		require(msg.sender == admin);
		require(tokenContract.transfer(admin, tokenContract.balanceOf(address(this))));
		selfdestruct(address(admin));
	}
}