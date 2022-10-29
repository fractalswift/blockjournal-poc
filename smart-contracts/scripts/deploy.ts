import { ethers } from 'hardhat';
import fs from 'fs';
import { Journal } from '../typechain-types';

const MY_DEV_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';

async function seedOutputs(journal: Journal) {
  // create an output from owner address and add my address as a reviewer
  await journal.uploadOutput(
    'fake-path-to-not-published-output',
    'sdjakfx102-293',
    false,
    [MY_DEV_ADDRESS]
  );

  await journal.uploadOutput(
    'fake-path-to-published-output',
    'sdjakfx102-294',
    true,
    [MY_DEV_ADDRESS]
  );
}

async function confirmOutputsWereSeeded(journal: Journal) {
  const output = await journal.getOutputByFileNumber(1);
  console.log('output', output);

  const outputIds = await journal.getOutputIdsByReviewerAddress(MY_DEV_ADDRESS);
  console.log({ outputIds });
}

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
    '../frontend/src/contract-address.ts',
    `export const JOURNAL_CONTRACT_ADDRESS = "${address}"`
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

  await seedOutputs(journal);
  console.log('seeded outputs');

  await confirmOutputsWereSeeded(journal);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
