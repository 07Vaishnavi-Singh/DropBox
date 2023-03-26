const {ethers}  = require("hardhat");

async function main() {
 
  const firstContract = await ethers.getContractFactory("DropBox")
  const deployedFirstContract = await firstContract.deploy(
  );
  await deployedFirstContract.deployed();

  console.log(" Drop Box contract address :", deployedFirstContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });