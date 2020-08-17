/* global describe,it */
/* eslint-env mocha */
'use strict'
const Token = artifacts.require('./Token.sol')

contract("Token sale contract Testing", function(accounts){

	before("Token initializing", async function(){
		this.token = await Token.deployed();
	})

	it("Check total token suply", async function(){
		const result = await this.token.totalSuply()
		assert.equal(result.toNumber(), 1000000)
	})

	it("Check  balance of", async function(){
		const result = await this.token.balanceOf(accounts[0])
		assert.equal(result.toNumber(), 1000000)
	})

	it("Check  name of token", async function(){
		const result = await this.token.name()
		assert.equal(result, "my_first_token")
	})
	it("Check  symbol of token", async function(){
		const result = await this.token.symbol()
		assert.equal(result, "Mine")
	})
	it("Check  symbol of token", async function(){
		const result = await this.token.standard()
		assert.equal(result, "my_first_token v1.0")
	})

	it("Transfer token ownership fail", async function(){
		try{
		const result = await this.token.transfer.call(accounts[1], 999999999999)
		// assert.fail(result, err)
		}catch(error){
			assert(error.message.indexOf('revert')>=0)
			
		}
	})

	it("Transfer token ownership return value", async function(){
		const result = await this.token.transfer.call(accounts[1], 9999,  { from: accounts[0]})
		assert.equal(result, true)
		
	})

	it("Transfer token ownership", async function(){
		const balance = await this.token.balanceOf(accounts[0])
		const result = await this.token.transfer(accounts[1],9999, { from: accounts[0]})
		const balanceafter = await this.token.balanceOf(accounts[0])	
		assert.equal(result.logs.length, 1)
		assert.equal(result.logs[0].event, "Transfer")
		assert.equal(result.logs[0].args._value, 9999)
		assert.equal(balanceafter.toNumber(), (balance.toNumber() - 9999))
	})

	it("Approves tokens for delegated dummy transfer", async function(){
		const result = await this.token.approve.call(accounts[1],100)
		assert.equal(result, true)
	})

	it("Approves tokens for delegated transfer", async function(){
		const result = await this.token.approve(accounts[1],100)
		const allowance = await this.token.allowance(accounts[0], accounts[1])
		assert.equal(result.logs.length, 1)
		assert.equal(result.logs[0].event, "Approval")
		assert.equal(result.logs[0].args._value, 100)
		assert.equal(result.logs[0].args._owner, accounts[0])
		assert.equal(result.logs[0].args._spender,accounts[1])
		assert.equal(allowance.toNumber(), 100)
	})

	it("Approves tokens can not approve  transfer larger than amount", async function(){
		try{
		const fromAccount = accounts[2]
		const toAccount = accounts[3]
		const spendingAccount = accounts[4]
		const result = await this.token.transfer.call(fromAccount, 100, { from: accounts[0]})
		const approve = await this.token.approve.call(spendingAccount, 10, { from: fromAccount})
		const transferFrom = await this.token.transferFrom.call(fromAccount, toAccount, 9999, { from: spendingAccount })
		}catch(error){
			assert(error.message.indexOf('revert')>=0)
		}
	})

	it("Approves tokens can not approve  transfer larger than amount", async function(){
		try{
		const fromAccount = accounts[2]
		const toAccount = accounts[3]
		const spendingAccount = accounts[4]
		const result = await this.token.transfer.call(fromAccount, 100, { from: accounts[0]})
		const approve = await this.token.approve.call(spendingAccount, 10, { from: fromAccount})
		const transferFrom = await this.token.transferFrom.call(fromAccount, toAccount, 20, { from: spendingAccount })
		}catch(error){
			assert(error.message.indexOf('revert')>=0)
		}
	})

	it("Approves tokens  transfer from", async function(){

		const fromAccount = accounts[2]
		const toAccount = accounts[3]
		const spendingAccount = accounts[4]
		const result = await this.token.transfer.call(fromAccount, 100, { from: accounts[0]})
		const approve = await this.token.approve.call(spendingAccount, 10, { from: fromAccount})
		const transferFrom = await this.token.transferFrom.call(fromAccount, toAccount, 10 , { from: spendingAccount })
		console.log(transferFrom)
		assert(transferFrom, true);
	})

	it("Approves tokens  transfer from", async function(){

		const fromAccount = accounts[2]
		const toAccount = accounts[3]
		const spendingAccount = accounts[4]
		const result = await this.token.transfer(fromAccount, 100, { from: accounts[0]})
		const approve = await this.token.approve(spendingAccount, 10, { from: fromAccount})
		const transferFrom = await this.token.transferFrom(fromAccount, toAccount, 10 , { from: spendingAccount })
		const balanceOfFrom = await this.token.balanceOf(fromAccount);
		const balanceOfTo = await this.token.balanceOf(toAccount);
		assert.equal(transferFrom.logs.length, 1)
		assert.equal(transferFrom.logs[0].event, "Transfer")
		assert.equal(transferFrom.logs[0].args._value, 10)
		assert.equal(transferFrom.logs[0].args._from, fromAccount)
		assert.equal(transferFrom.logs[0].args._to,toAccount)
		assert.equal(balanceOfFrom.toNumber(), 90)
		assert.equal(balanceOfTo.toNumber(), 10)
	})
})