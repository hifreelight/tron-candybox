var wait = require('./helpers/wait')
var chalk = require('chalk')
var FxtToken = artifacts.require("./FxtToken.sol");
var TokenTransfer = artifacts.require("./TokenTransfer.sol");
const TronWeb = require('tronweb');
var BigNumber = require('bignumber.js');

contract('FxtToken', function (accounts) {

  before(function() {
    if(accounts.length < 3) {
      // Set your own accounts if you are not using Tron Quickstart

    }
  })

  it("should verify that there are at least three available accounts", async function () {
    if (accounts.length < 3) {
      console.log(chalk.blue('\nYOUR ATTENTION, PLEASE.]\nTo test MetaCoin you should use Tron Quickstart (https://github.com/tronprotocol/docker-tron-quickstart) as your private network.\nAlternatively, you must set your own accounts in the "before" statement in "test/metacoin.js".\n'))
    }
    assert.isTrue(accounts.length >= 3)
  })

  // it("should verify that the contract has been deployed by accounts[0]", async function () {
  //   const instance = await FxtToken.deployed();
  //   let balance = await instance.balanceOf(accounts[0], {from: accounts[0]});
  //   balance = parseInt(balance.balance._hex)/10e5;
  //   console.log(balance);
  //   assert.equal(balance, 1000000, "1000000 wasn't in the first account");
  // });
  
  it("should send coins from account 0 to contract", async function(){
    const fxt = 1000000;
    const instance = await FxtToken.deployed();
    console.log(instance.address);
    const transerInstance = await TokenTransfer.deployed(instance.address);
    
    await instance.transfer(accounts[1], new BigNumber(100).times(fxt).toNumber(), {
      from: accounts[0]
    })

    await instance.transfer(transerInstance.address, new BigNumber(100).times(fxt).toNumber(), {
      from: accounts[0]
    })

    await transerInstance.tokenTransfer(accounts[0], new BigNumber(50).times(fxt).toNumber(), {
      from: accounts[0]
    })

    // await instance.transfer(accounts[0], new BigNumber(50).times(fxt).toNumber(), {
    //   from: transerInstance.address
    // })

    await instance.transfer(accounts[0], new BigNumber(50).times(fxt).toNumber(), {
      from: accounts[1]
    })

    let balance = await instance.balanceOf(accounts[0], {from: accounts[0]});
    balance = parseInt(balance.balance._hex)/10e5;
    console.log(balance);

    let balance1 = await instance.balanceOf(accounts[1], {from: transerInstance.address});
    balance1 = parseInt(balance1.balance._hex)/10e5;
    console.log(balance1);

    let contractBalance = await instance.balanceOf(transerInstance.address, {from: transerInstance.address});
    contractBalance = parseInt(contractBalance.balance._hex)/10e5;
    console.log(contractBalance);
  })

});
