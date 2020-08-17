pragma solidity ^0.5.0;

contract Token{
	uint256 public totalSuply;
	mapping(address => uint256) public balanceOf;
	mapping(address => mapping(address => uint256)) public allowance; // add Allowance
	string public name = "my_first_token"; 				// add name
	string public symbol = "Mine"; 						// add Symbol
	string public standard = "my_first_token v1.0"; 	// add standard
	
	constructor(uint256 _initialSuply) public {
		totalSuply = _initialSuply;
		balanceOf[msg.sender] = _initialSuply; 			// allocate initialSuply
	}

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Approval(address indexed _owner, address indexed _spender, uint256 _value);
	// Transfer function
	function transfer(address _to, uint256 _value) public returns(bool success){
		require(balanceOf[msg.sender] >= _value );
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;
		emit Transfer(msg.sender, _to, _value);
		return true;
	}
	// Delegated Transfers 
	// Approve to sender spend token
	function approve(address _spender, uint256 _value) public returns(bool success){
		
		allowance[msg.sender][_spender] = _value; // Allowance and Approval event
		emit Approval(msg.sender, _spender, _value);
		return true;
	}

	// Transfer from
	function transferFrom(address _from, address _to, uint256 _value) public returns(bool success) {
		require(_value <= balanceOf[_from]);
		require(_value <= allowance[_from][msg.sender]);
		balanceOf[_from] -= _value;
		balanceOf[_to] += _value;
		allowance[_from][msg.sender] = _value;
		emit Transfer(_from, _to, _value);
		return true;
	}
}