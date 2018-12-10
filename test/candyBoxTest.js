var wait = require('./helpers/wait');
var chalk = require('chalk');
var FxtToken = artifacts.require("./FxtToken.sol");
var CandyBox = artifacts.require("./CandyBox.sol");
var TokenTransfer = artifacts.require("./TokenTransfer.sol");
const TronWeb = require('tronweb');
var BigNumber = require('bignumber.js');

contract('CandyBox', function (accounts) {

    before(function () {
        if (accounts.length < 3) {
            // Set your own accounts if you are not using Tron Quickstart

        }
    })
    it("should verify that there are at least three available accounts", async function () {
        if (accounts.length < 3) {
            console.log(chalk.blue('\nYOUR ATTENTION, PLEASE.]\nTo test MetaCoin you should use Tron Quickstart (https://github.com/tronprotocol/docker-tron-quickstart) as your private network.\nAlternatively, you must set your own accounts in the "before" statement in "test/metacoin.js".\n'))
        }
        assert.isTrue(accounts.length >= 3)
    })

    it("should and one candy", async function(){
        const token = await FxtToken.deployed();

        // const instance = await CandyBox.deployed();
        // await instance.addCandy(
        //     token.address, 
        //     '00000000000000000000000000000001', 
        //     new BigNumber(1000).times(fxt).toNumber(), 
        //     new BigNumber(1).times(fxt).toNumber(),
        //     'https://zizaiv2.oss-cn-beijing.aliyuncs.com/bettown/teamlogo/nba/WashingtonWizards.png',
        //     'https://zizaiv2.oss-cn-beijing.aliyuncs.com/bettown/teamlogo/nba/WashingtonWizards.png',
        //     'title-hello',
        //     'introduction',
        //     'https://www.bet.town',
        //     true,
        //     10            
        // )
        // let candy = await instance.getCandy(1);
        // console.log(candy);
        // assert.equal(candy.address, token.address, 'candy address is error');

    })
});