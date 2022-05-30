const HARDHAT = require("hardhat");

async function main() {


  // We get the contract to deploy
  const loginContract = await HARDHAT.ethers.getContractFactory("Account");
  const mainContract = await loginContract.deploy();

  // await mainContract.deployed();

  console.log("mainContract deployed to:", mainContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
