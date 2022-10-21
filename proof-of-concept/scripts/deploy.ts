import { ethers } from 'hardhat';

async function main() {
  const Journal = await ethers.getContractFactory('Journal');
  const journal = await Journal.deploy();

  await journal.deployed();

  console.log(`Journal contract deployed at ${journal.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
