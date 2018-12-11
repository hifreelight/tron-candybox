var wait = require('./helpers/wait');
var chalk = require('chalk');
var FxtToken = artifacts.require("./FxtToken.sol");
var CandyBox = artifacts.require("./CandyBox.sol");
var TokenTransfer = artifacts.require("./TokenTransfer.sol");
const TronWeb = require('tronweb');
var BigNumber = require('bignumber.js');
const fxt = 1000000;

let token;
let instance;
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
        token = await FxtToken.deployed();
        instance = await CandyBox.deployed();
        await instance.addCandy(
            token.address, 
            '00000000000000000000000000000001', 
            new BigNumber(1000).times(fxt).toNumber(), 
            new BigNumber(1).times(fxt).toNumber(),
            'https://zizaiv2.oss-cn-beijing.aliyuncs.com/bettown/teamlogo/nba/WashingtonWizards.png',
            'https://zizaiv2.oss-cn-beijing.aliyuncs.com/bettown/teamlogo/nba/WashingtonWizards.png',
            'title-hello',
            'introduction',
            'https://www.bet.town',
            10            
        )
        let candy = await instance.getCandy(1);
        let detail = await instance.getCandyDetail(1);
        console.log('candy is %o', candy);
        console.log('detail is %o', detail);
        assert.equal(candy[0], token.address, 'candy address is error');

    })
    it("transfer token to contract", async function(){
        await token.transfer(instance.address, new BigNumber(100).times(fxt).toNumber(), {
            from: accounts[0]
          })
    })
    it("find maxNumbers", async function(){
        const maxNubers = await instance.maxNumbers();
        console.log('maxNubers is %o', maxNubers);
        // assert.equal(maxNubers, 2, 'maxNubers should 2');
    })
    it("find left receive number", async function(){
        const myNumbers = await instance.myNumbers(accounts[0]);
        console.log('myNumbers is %o', myNumbers);
        // assert.equal(maxNubers, 2, 'maxNubers should 2');
    })
    it("lastReceiveTime", async function(){
        const lastReceiveTime = await instance.myLastTime(accounts[0]);
        console.log('lastReceiveTime is %o', lastReceiveTime);
    })
    it("receive", async function(){
        try{
            const result = await instance.receive(1);
            console.log(result);
        }catch(err){
            console.error(err);
        }
    })

    it("find left receive number", async function(){
        const myNumbers = await instance.myNumbers(accounts[0]);
        console.log('myNumbers is %o', myNumbers);
    })
    it("candy detail", async function(){
        let candy = await instance.getCandy(1);
        let detail = await instance.getCandyDetail(1);
        console.log('candy is %o', candy);
        console.log('detail is %o', detail);
    })
    it("contrac balance", async function(){
        let contractBalance = await token.balanceOf(instance.address, {from: instance.address});
        contractBalance = parseInt(contractBalance.balance._hex)/10e5;
        console.log('contractBalance is %d', contractBalance);
    })
});