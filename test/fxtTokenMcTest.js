'use strict';

process.env.NODE_ENV = 'shasta';
const network = 'shasta';
const debug = require('debug')('candybox');
const config = require('../tronbox');
const TronWeb = require('tronweb');
var BigNumber = require('bignumber.js');

const fullNode = config.networks[network].fullHost;
const solidityNode = config.networks[network].fullHost;
const eventServer = config.networks[network].fullHost;
const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    config.networks[network].privateKey
);
const candybox = require('../build/contracts/CandyBox');
const fxtToken = require('../build/contracts/FxtToken');
const contract = tronWeb.contract(fxtToken.abi, fxtToken.networks['*'].address);
const fxt = 1000000;

describe('A suite for FxtToken', function() {
  this.timeout(1000 * 60);

  it('test transfer token to contract', async function() {
    await contract.transfer(
      candybox.networks['*'].address,
      new BigNumber(100).times(fxt).toNumber(),
      )
      .send({
        shouldPollResponse: true,
        callValue: 0,
      })
      .then(response => {
        console.log('add candy response is %o', response);
      });
  });
  it('test contract balance', async function() {
    let contractBalance = await contract.balanceOf(candybox.networks['*'].address).call();
    contractBalance = parseInt(contractBalance.balance._hex) / 10e5;
    console.log('contractBalance is %d', contractBalance);
  });
}
);
