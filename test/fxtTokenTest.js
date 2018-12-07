'use strict';

let assert = require('assert');
let expect = require('expect');
process.env.DEBUG = 'rand:*';
process.env.NODE_ENV = 'test';
let debug = require('debug')('rand:test');
let moment = require('moment');
const TronWeb = require('tronweb');

const fullNode = 'https://api.shasta.trongrid.io';
const solidityNode = 'https://api.shasta.trongrid.io';
const eventServer = 'https://api.shasta.trongrid.io/';
let privateKey = '24a1a7e24a956138b0abf0a47cee816bd7180762f2c7df7167925c8c12e8dc98';
privateKey = '7b8b5c3b35c06b41279fa33b685383c4ecc5bedbb77533c20d47c0d3315ad3a6';

const tronWeb = new TronWeb(
    fullNode,
    solidityNode,
    eventServer,
    privateKey
);
let userAddress = 'TXAsg1x5Y6mnyx5Z3vsCRNRchMvKwJMUbs';
// userAddress = '41E88F7FA07CAAFA03217383C575752D575D967933';
// userAddress = 'THmwFbYo1eR8So1grmVjAQcTaeXSaUmNjP';
let contractAddress = 'TAkNDLcPm2LiExrn3uzWFTbXcLWqkR8tpi';
// contractAddress = 'TMyMU5e8pSGZeyaGiEtjpMngT6gHevESsY';

describe('A suite for tron', function() {
  it('test get', function() {
    tronWeb.trx.getBalance(userAddress)
      .then(userBalance => {
        console.log(userBalance);
      });
  });
  /**
   * TCWcdEL57pYNmfgBjnqnrUqbGbmhr6u6pd
   * 411BE0DDCD2AEADE53FFD737DEBFA3CE97AD5BD706
   * https://www.tronscan.org/#/tools/tron-convert-tool
   */
  it('test getContract', async function() {
    tronWeb.trx.getContract(contractAddress)
      .then(contract => {
        console.group('Contract from node');
        console.log('- Contract Address: ', contractAddress);
        console.log('- Origin Address:', contract.origin_address);
        // console.log('- Bytecode:', contract.bytecode);
        // console.log('- ABI:\n' + JSON.stringify(contract.abi, null, 2), '\n');
        console.groupEnd();            
        return contract;
      })
      .then(contract => {
        
        return contract;
      })
      .then(contract => {
        let abi = contract.abi.entrys;
        // console.log('abi is %j', abi);
        // abi = [{ 'constant': false, 'inputs': [{ 'name': 'key', 'type': 'uint256' }, { 'name': 'value', 'type': 'uint256' }], 'name': 'set', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'key', 'type': 'uint256' }], 'name': 'get', 'outputs': [{ 'name': 'value', 'type': 'uint256' }], 'payable': false, 'stateMutability': 'view', 'type': 'function' }];
        abi = [{"outputs":[{"type":"string"}],"constant":true,"name":"name","stateMutability":"View","type":"Function"},{"outputs":[{"type":"uint8"}],"constant":true,"name":"decimals","stateMutability":"View","type":"Function"},{"name":"acceptOwnership","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"owner","stateMutability":"View","type":"Function"},{"outputs":[{"type":"string"}],"constant":true,"name":"symbol","stateMutability":"View","type":"Function"},{"outputs":[{"type":"address"}],"constant":true,"name":"newOwner","stateMutability":"View","type":"Function"},{"inputs":[{"name":"_newOwner","type":"address"}],"name":"transferOwnership","stateMutability":"Nonpayable","type":"Function"},{"stateMutability":"Nonpayable","type":"Constructor"},{"payable":true,"stateMutability":"Payable","type":"Fallback"},{"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"}],"name":"OwnershipTransferred","type":"Event"},{"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"Transfer","type":"Event"},{"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"Approval","type":"Event"},{"outputs":[{"type":"uint256"}],"constant":true,"name":"totalSupply","stateMutability":"View","type":"Function"},{"outputs":[{"name":"balance","type":"uint256"}],"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","stateMutability":"View","type":"Function"},{"outputs":[{"name":"success","type":"bool"}],"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"name":"success","type":"bool"}],"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"name":"success","type":"bool"}],"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"name":"remaining","type":"uint256"}],"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","stateMutability":"View","type":"Function"},{"outputs":[{"name":"success","type":"bool"}],"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","stateMutability":"Nonpayable","type":"Function"},{"outputs":[{"name":"success","type":"bool"}],"inputs":[{"name":"tokenAddress","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferAnyERC20Token","stateMutability":"Nonpayable","type":"Function"}];
        const token = tronWeb.contract(abi, contractAddress);
        token.balanceOf(userAddress)
            .call()            
            .then(balance => {
                tronWeb.setPrivateKey(privateKey);
                console.log('contract balance is %o', parseInt(balance.balance._hex)/10e17);
                token.transfer('TXAsg1x5Y6mnyx5Z3vsCRNRchMvKwJMUbs', 100)
                    .send({
                        shouldPollResponse: true,
                        callValue: 0,
                    })
                    .then(response => {
                        console.log(response);
                        token.balanceOf(userAddress)
                            .call()
                            .then(b => {
                                console.log('contract balance is %o', parseInt(b.balance._hex)/10e17);
                            })
                    })
                    .catch(err => console.error(err));
            });
      })
      .catch(err => console.error(err));
  });

  it('test trigger', function() {
    tronWeb.transactionBuilder.triggerSmartContract(
      '411BE0DDCD2AEADE53FFD737DEBFA3CE97AD5BD706',
      'get(uint256)',
      1,
      [
          { type: 'uint256', value: 1 },
      ],
      (err, transaction) => {
        if (err)
          return console.error(err);

        console.group('Unsigned trigger smart contract transaction');
        console.log('- Contract Address: 413c8143e98b3e2fe1b1a8fb82b34557505a752390');
        console.log('- Transaction:\n' + JSON.stringify(transaction, null, 2), '\n');
        console.groupEnd();
      });
  });

  it('test listen', function() {
    startEventListener;
  });
});
