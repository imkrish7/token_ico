// @ts-nocheck
// @ts-ignore
const TokenSale = artifacts.require('./TokenSale.sol');
const Token = artifacts.require('./Token.sol');

// @ts-ignore
contract("Token sales test", async (accounts)=>{
	const _tokenPrice = 1000000000000000000 // wei
	const tokenAvailbale = 7500000;
	// @ts-ignore
	before(async () =>{
		// @ts-ignore
		this.token = await Token.deployed();
		// @ts-ignore
		this.tokenSale = await TokenSale.deployed();
	})

	// @ts-ignore
	it("Heart bit test", async () =>{
		const address = await this.tokenSale.address;
		// @ts-ignore
		assert.notEqual(address, '0x0')
	})

	// @ts-ignore
	it("Token Contract", async () =>{
		const address = await this.tokenSale.tokenContract();
		// @ts-ignore
		assert.notEqual(address, '0x0')
	})

	// @ts-ignore
	it("Token Price", async () =>{
		const price = await this.tokenSale.tokenPrice();
		// @ts-ignore
		assert.equal(price, _tokenPrice)
	})

	// @ts-ignore
	it("Token buying", async ()=>{
		let numberOftokens = 10;
		// @ts-ignore
		let _value = numberOftokens * _tokenPrice;
		const tokens = await this.token.transfer(this.tokenSale.address, tokenAvailbale, { from : accounts[0]})
		// @ts-ignore
		const tokenBuying = await this.tokenSale.buyTokens(numberOftokens, { from: accounts[1],value: _value});
		
		const amount = await this.tokenSale.tokensSold();
		// @ts-ignore
		assert.equal(amount.toNumber(), numberOftokens);
		
	})

	// @ts-ignore
	it("Token buying fail", async ()=>{
		let numberOftokens = 10;
		// @ts-ignore
		let _value = numberOftokens * _tokenPrice;
		try {
			// @ts-ignore
			const tokenBuying = await this.tokenSale.buyTokens(numberOftokens, { from: accounts[1],value: 1});
			const amount = await this.tokenSale.tokensSold();
		} catch (error) {
			// @ts-ignore
			assert(error.message.indexOf('revert')>=0);	
		}		
	})

	// @ts-ignore
	it("Token buying fail more than available", async ()=>{
		let numberOftokens = 800000;
		// @ts-ignore
		let _value = numberOftokens * _tokenPrice;
		try {
			// @ts-ignore
			const tokenBuying = await this.tokenSale.buyTokens(numberOftokens, { from: accounts[1],value: 1});
			const amount = await this.tokenSale.tokensSold();
		} catch (error) {
			// @ts-ignore
			assert(error.message.indexOf('revert')>=0);	
		}		
	})

	it("End token sale", async ()=>{
		const endSale = await this.tokenSale.endSale({ from: accounts[0]})
	})

	it("End token sale fail", async ()=>{
		try{
		const endSale = await this.tokenSale.endSale({ from: accounts[1]})
		}catch(error){
			assert(error.message.indexOf('rever')>=0)
		}
	})

	it("End token sale", async ()=>{
		const endSale = await this.tokenSale.tokenPrice();
		print(endSale)
		assert.equal(endSale.toNumber(), 0);
	})
})