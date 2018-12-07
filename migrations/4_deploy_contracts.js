var NenMoToken = artifacts.require("./NenMoToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NenMoToken);
};
