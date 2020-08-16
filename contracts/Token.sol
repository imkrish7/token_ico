pragma solidity ^0.5.0;

contract Token{
	uint256 public totalSuply;
	mapping(address => uint256) public balanceOf;
	string public name = "my_first_token"; // add name
	string public symbol = "Mine"; // add Symbol
	string public standard = "my_first_token v1.0"; // add standard
	constructor(uint256 _initialSuply) public {
		totalSuply = _initialSuply;
		balanceOf[msg.sender] = _initialSuply; // allocate initialSuply
	}

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	// Transfer function
	function transfer(address _to, uint256 _value) public returns(bool success){
		require(balanceOf[msg.sender] >= _value );
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}
}