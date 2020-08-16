const Token = artifacts.require('./Token.sol')

contract("Token sale contract Testing", function(){

	before("Token initializing", async function(){
		this.token = await Token.deployed();
	})

	it("Check total token suply", async function(){
		const result = await this.token.totalSuply()
		assert.equal(result.toNumber(), 1000000)
	})
})