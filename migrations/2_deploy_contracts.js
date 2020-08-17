const Token = artifacts.require("./Token.sol");
const TokenSale = artifacts.require("./TokenSale.sol");

module.exports = async function(deployer) {
  await deployer.deploy(Token, 1000000);
  // var tokenPrice = 1000000000000000000;
  await deployer.deploy(TokenSale, Token.address, '1000000000000000000');
};
