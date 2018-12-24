'use strict'
var FxtToken = artifacts.require('./FxtToken.sol')

module.exports = function (deployer) {
  deployer.deploy(FxtToken)
}
