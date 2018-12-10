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
    await transerInstance.setToken(instance.address)
    
    await instance.approve(transerInstance.address, new BigNumber(100).times(fxt).toNumber(), {
      from: accounts[0]
    })
    let allowance = await instance.allowance(accounts[0], transerInstance.address);
    console.log('allowance is %o', parseInt(allowance.remaining._hex)/10e5);

    //----------------------transfer-------------------------
    await instance.transfer(accounts[1], new BigNumber(100).times(fxt).toNumber(), {
      from: accounts[0]
    })

    await instance.transfer(transerInstance.address, new BigNumber(100).times(fxt).toNumber(), {
      from: accounts[0]
    })

    await transerInstance.transfer(accounts[1], new BigNumber(50).times(fxt).toNumber(), {
      from: transerInstance.address
    })
    // await transerInstance.transferFrom(accounts[0], accounts[1], new BigNumber(50).times(fxt).toNumber(), {
    //   from: accounts[2]
    // })
    await transerInstance.transfer(accounts[0], new BigNumber(50).times(fxt).toNumber())

    // await instance.transfer(accounts[0], new BigNumber(50).times(fxt).toNumber(), {
    //   from: accounts[1]
    // })
    // -------------- balance -----------------------
    let balance = await instance.balanceOf(accounts[0], {from: accounts[0]});
    balance = parseInt(balance.balance._hex)/10e5;
    console.log('accounts[0] balance is %d', balance);

    let balance1 = await instance.balanceOf(accounts[1], {from: transerInstance.address});
    balance1 = parseInt(balance1.balance._hex)/10e5;
    console.log('accounts[1] balance is %d', balance1);

    let contractBalance = await instance.balanceOf(transerInstance.address, {from: transerInstance.address});
    contractBalance = parseInt(contractBalance.balance._hex)/10e5;
    console.log('contractBalance is %d', contractBalance);
  })

});
