'use strict'
var CandyBox = artifacts.require('./CandyBox.sol')

module.exports = function (deployer) {
  deployer.deploy(CandyBox)
}
