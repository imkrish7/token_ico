/* global describe,it */
/* eslint-env mocha */
'use strict'
// @ts-ignore
const Token = artifacts.require('./Token.sol')

// @ts-ignore
contract("Token sale contract Testing", function(accounts){

	// @ts-ignore
	before("Token initializing", async function(){
		this.token = await Token.deployed();
	})

	// @ts-ignore
	it("Check total token suply", async function(){
		const result = await this.token.totalSuply()
		// @ts-ignore
		assert.equal(result.toNumber(), 1000000)
	})

	// @ts-ignore
	it("Check  balance of", async function(){
		const result = await this.token.balanceOf(accounts[0])
		// @ts-ignore
		assert.equal(result.toNumber(), 1000000)
	})

	// @ts-ignore
	it("Check  name of token", async function(){
		const result = await this.token.name()
		// @ts-ignore
		assert.equal(result, "my_first_token")
	})
	// @ts-ignore
	it("Check  symbol of token", async function(){
		const result = await this.token.symbol()
		// @ts-ignore
		assert.equal(result, "Mine")
	})
	// @ts-ignore
	it("Check  symbol of token", async function(){
		const result = await this.token.standard()
		// @ts-ignore
		assert.equal(result, "my_first_token v1.0")
	})

	// @ts-ignore
	it("Transfer token ownership fail", async function(){
		try{
		// @ts-ignore
		const result = await this.token.transfer.call(accounts[1], 999999999999)
		// assert.fail(result, err)
		}catch(error){
			// @ts-ignore
			assert(error.message.indexOf('revert')>=0)
			
		}
	})

	// @ts-ignore
	it("Transfer token ownership return value", async function(){
		const result = await this.token.transfer.call(accounts[1], 9999,  { from: accounts[0]})
		// @ts-ignore
		assert.equal(result, true)
		
	})

	// @ts-ignore
	it("Transfer token ownership", async function(){
		const balance = await this.token.balanceOf(accounts[0])
		const result = await this.token.transfer(accounts[1],9999, { from: accounts[0]})
		const balanceafter = await this.token.balanceOf(accounts[0])	
		// @ts-ignore
		assert.equal(result.logs.length, 1)
		// @ts-ignore
		assert.equal(result.logs[0].event, "Transfer")
		// @ts-ignore
		assert.equal(result.logs[0].args._value, 9999)
		// @ts-ignore
		assert.equal(balanceafter.toNumber(), (balance.toNumber() - 9999))
	})

	// @ts-ignore
	it("Approves tokens for delegated dummy transfer", async function(){
		const result = await this.token.approve.call(accounts[1],100)
		// @ts-ignore
		assert.equal(result, true)
	})

	// @ts-ignore
	it("Approves tokens for delegated transfer", async function(){
		const result = await this.token.approve(accounts[1],100)
		const allowance = await this.token.allowance(accounts[0], accounts[1])
		// @ts-ignore
		assert.equal(result.logs.length, 1)
		// @ts-ignore
		assert.equal(result.logs[0].event, "Approval")
		// @ts-ignore
		assert.equal(result.logs[0].args._value, 100)
		// @ts-ignore
		assert.equal(result.logs[0].args._owner, accounts[0])
		// @ts-ignore
		assert.equal(result.logs[0].args._spender,accounts[1])
		// @ts-ignore
		assert.equal(allowance.toNumber(), 100)
	})

	// @ts-ignore
	it("Approves tokens can not approve  transfer larger than amount", async function(){
		try{
		const fromAccount = accounts[2]
		const toAccount = accounts[3]
		const spendingAccount = accounts[4]
		// @ts-ignore
		const result = await this.token.transfer.call(fromAccount, 100, { from: accounts[0]})
		// @ts-ignore
		const approve = await this.token.approve.call(spendingAccount, 10, { from: fromAccount})
		// @ts-ignore
		const transferFrom = await this.token.transferFrom.call(fromAccount, toAccount, 9999, { from: spendingAccount })
		}catch(error){
			// @ts-ignore
			assert(error.message.indexOf('revert')>=0)
		}
	})

	// @ts-ignore
	it("Approves tokens can not approve  transfer when allwance less than amount", async function(){
		try{
		const fromAccount = accounts[2]
		const toAccount = accounts[3]
		const spendingAccount = accounts[4]
		// @ts-ignore
		const result = await this.token.transfer.call(fromAccount, 100, { from: accounts[0]})
		// @ts-ignore
		const approve = await this.token.approve.call(spendingAccount, 10, { from: fromAccount})
		// @ts-ignore
		const transferFrom = await this.token.transferFrom.call(fromAccount, toAccount, 20, { from: spendingAccount })
		}catch(error){
			// @ts-ignore
			assert(error.message.indexOf('revert')>=0)
		}
	})

	// it("Approves tokens  transfer from", async function(){
	// 	const fromAccount = accounts[2]
	// 	const toAccount = accounts[3]
	// 	const spendingAccount = accounts[4]
	// 	const result = await this.token.transfer.call(fromAccount, 100, { from: accounts[0]})
	// 	const approve = await this.token.approve(spendingAccount, 10, { from: fromAccount})
	// 	const transferFrom = await this.token.transferFrom.call(fromAccount, toAccount, 10 , { from: spendingAccount })
	// 	console.log(transferFrom)
	// 	assert(transferFrom, true);
	// })

	// @ts-ignore
	it("Approves tokens  transfer from", async function(){
		const fromAccount = accounts[2]
		const toAccount = accounts[3]
		const spendingAccount = accounts[4]
		// @ts-ignore
		const result = await this.token.transfer(fromAccount, 100, { from: accounts[0]})
		// @ts-ignore
		const approve = await this.token.approve(spendingAccount, 10, { from: fromAccount})
		const transferFrom = await this.token.transferFrom(fromAccount, toAccount, 10 , { from: spendingAccount })
		const balanceOfFrom = await this.token.balanceOf(fromAccount);
		const balanceOfTo = await this.token.balanceOf(toAccount);
		// @ts-ignore
		assert.equal(transferFrom.logs.length, 1)
		// @ts-ignore
		assert.equal(transferFrom.logs[0].event, "Transfer")
		// @ts-ignore
		assert.equal(transferFrom.logs[0].args._value, 10)
		// @ts-ignore
		assert.equal(transferFrom.logs[0].args._from, fromAccount)
		// @ts-ignore
		assert.equal(transferFrom.logs[0].args._to,toAccount)
		// @ts-ignore
		assert.equal(balanceOfFrom.toNumber(), 90)
		// @ts-ignore
		assert.equal(balanceOfTo.toNumber(), 10)
	})
})