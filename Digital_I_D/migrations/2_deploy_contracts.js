const InheritanceContract = artifacts.require("InheritanceContract.sol");

module.exports = function(deployer) {
  deployer.deploy(InheritanceContract);
}
