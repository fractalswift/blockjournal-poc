import { ethers } from 'ethers';

import Journal from './abis/Journal.json';

// Note: you get this when you run hardhat deploy on local node
import { JOURNAL_CONTRACT_ADDRESS } from './contract-address';

const ABI = Journal.abi;

const MY_DEV_ADDRESS = '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199';
const MY_DEV_ADDRESS_2 = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';

export async function uploadOutput(
  outputPath: string,
  outputHash: string,
  isPublished: boolean,
  reviewers: string[]
) {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable, get reference to the contract
    // await this.requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //signer needed for transaction that changes state
    const signer = provider.getSigner();
    const contract = new ethers.Contract(JOURNAL_CONTRACT_ADDRESS, ABI, signer);

    console.log('uploading: ', outputPath, outputHash, isPublished, reviewers);

    // //preform transaction
    const transaction = await contract.uploadOutput(
      outputPath,
      outputHash,
      isPublished,
      reviewers
    );
    await transaction.wait();
  }
}

function convertOutputDetailsArrayToObject(outputDetailsArray: any[]) {
  return {
    outputIdNumber: outputDetailsArray[0],
    outputPath: outputDetailsArray[1],
    outputHash: outputDetailsArray[2],
    isPublished: outputDetailsArray[3],
    uploaderAddress: outputDetailsArray[4],
    reviewers: outputDetailsArray[5]
  };
}

export async function getOutputDetailsByFileNumber(fileNumber: number) {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      JOURNAL_CONTRACT_ADDRESS,
      ABI,
      provider
    );

    try {
      const output = await contract.getOutputByFileNumber(fileNumber);

      return convertOutputDetailsArrayToObject(output);
    } catch (e) {
      throw new Error(
        `Error getting output details for file number ${fileNumber}`
      );
    }
  }
}

export async function getOutputIdsByUploaderAddress() {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      JOURNAL_CONTRACT_ADDRESS,
      ABI,
      provider
    );

    const signer = provider.getSigner();

    const userAddress = await signer.getAddress();

    try {
      const outputIds = await contract.getOutputIdsByUploaderAddress(
        userAddress
      );

      return outputIds;
    } catch (e) {
      throw new Error(`Error getting output ids for user ${userAddress}`);
    }
  }
}

export async function getReviewRequestIdsByUserAddress() {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      JOURNAL_CONTRACT_ADDRESS,
      ABI,
      provider
    );

    const signer = provider.getSigner();

    const userAddress = await signer.getAddress();

    try {
      const outputIds = await contract.getOutputIdsByReviewerAddress(
        userAddress
      );

      return outputIds;
    } catch (e) {
      throw new Error(`Error getting output ids for user ${userAddress}`);
    }
  }
}

export async function getMultipleOutputsById(
  outputIds: string[]
): Promise<any[]> {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      JOURNAL_CONTRACT_ADDRESS,
      ABI,
      provider
    );

    let outputs = [];

    try {
      for (let i of outputIds) {
        const output = await contract.getOutputByFileNumber(i);
        outputs.push(convertOutputDetailsArrayToObject(output));
      }
    } catch (e: any) {
      throw new Error(`Error getting outputs: ${e.message}`);
    }

    return outputs;
  }

  throw new Error('No ethereum');
}

export async function getTotalUploadedOutputsCount() {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      JOURNAL_CONTRACT_ADDRESS,
      ABI,
      provider
    );

    try {
      const fileCountHex = await contract.outputCount();

      const fileCount = parseInt(fileCountHex);

      console.log({ fileCount });

      return fileCount;
    } catch (e) {
      console.log('Err: ', e);
      throw new Error(`Error getting total uploaded outputs count`);
    }
  }
}

export async function connectToMetamask() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();

  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);
  const formattedBalance = ethers.utils.formatEther(balance);

  return { address, balance, formattedBalance, accounts };
}

export async function uploadFileToIPFS(output: string) {
  console.log('Place holder function for uploading file to IPFS');
}

export function isMetamaskInstalledOnBrowser() {
  console.log('Checking if Metamask is installed on browser');
  return typeof window.ethereum !== 'undefined';
}

export async function getMetamaskAccounts() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);

  return accounts;
}
