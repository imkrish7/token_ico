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


})