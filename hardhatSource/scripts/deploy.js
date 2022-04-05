const hre = require("hardhat");

async function ContractDeploy(){
  const TrustWallet = await hre.ethers.getContractFactory("TrustWallet");
  const trustwallet = await TrustWallet.deploy();

  await trustwallet.deployed();

  console.log("Trust Wallet Deployed to:", trustwallet.address);

}

ContractDeploy().then(() => process.exit(0)).catch((error) => {
  console.log(error);
  process.exit(1);
})
