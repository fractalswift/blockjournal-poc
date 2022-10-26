import { ethers } from 'hardhat';
import fs from 'fs';

function copyAbiToFrontend() {
  fs.copyFile(
    './src/artifacts/contracts/Journal.sol/Journal.json',
    '../frontend/src/abis/Journal.json',
    (err) => {
      if (err) throw err;
      console.log('abi copied successfully and placed in frontend/src/abis');
    }
  );
}

function writeDeployedContractAddresToFrontend(address: string) {
  fs.writeFileSync(
    '../frontend/src/.env',
    `JOURNAL_CONTRACT_ADDRESS=${address}`
  );
}

async function main() {
  const Journal = await ethers.getContractFactory('Journal');
  const journal = await Journal.deploy();

  await journal.deployed();

  console.log(
    `Contract deployed at ${journal.address}, copying to frontend/src/.env`
  );

  // put the contract address in .env for frontend to use
  writeDeployedContractAddresToFrontend(journal.address);

  copyAbiToFrontend();

  console.log('copied abi to frontend/src/abis/Journal.json');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
