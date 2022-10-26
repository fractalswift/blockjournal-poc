import { ethers } from 'ethers';

import Journal from './abis/Journal.json';

// Note: you get this when you run hardhat deploy on local node
import { JOURNAL_CONTRACT_ADDRESS } from './contract-address';

const ABI = Journal.abi;

export async function uploadOutput(
  outputPath: string,
  outputHash: string,
  isPublished: boolean
) {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable, get reference to the contract
    // await this.requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //signer needed for transaction that changes state
    const signer = provider.getSigner();
    // console.log({ signer });
    const contract = new ethers.Contract(JOURNAL_CONTRACT_ADDRESS, ABI, signer);
    // //preform transaction
    const transaction = await contract.uploadOutput(
      outputPath,
      outputHash,
      isPublished
    );
    await transaction.wait();
    // this.fetchGreeting();
  }
}

function convertOutputDetailsArrayToObject(outputDetailsArray: any[]) {
  return {
    outputIdNumber: outputDetailsArray[0],
    outputPath: outputDetailsArray[1],
    outputHash: outputDetailsArray[2],
    isPublished: outputDetailsArray[3],
    uploaderAddress: outputDetailsArray[4]
  };
}

// TODO - instead of a simple count, should we be using something else?
export async function getOutputDetailsByFileNumber(fileNumber: number) {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable get reference to the contract
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      JOURNAL_CONTRACT_ADDRESS,
      ABI,
      provider
    );

    //try to get the greeting in the contract
    try {
      const output = await contract.getOutputByFileNumber(fileNumber);
      console.log({ output });

      return convertOutputDetailsArrayToObject(output);
    } catch (e) {
      console.log('Err: ', e);
    }
  }
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

    //try to get the greeting in the contract
    try {
      const fileCountHex = await contract.outputCount();

      const fileCount = parseInt(fileCountHex);

      console.log({ fileCount });

      return fileCount;
    } catch (e) {
      console.log('Err: ', e);
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

  console.log({ address, balance, formattedBalance, accounts });
}

export async function uploadFileToIPFS(output: string) {
  console.log('Place holder function for uploading file to IPFS');
}

export function getConnectedMetamaskAccounts() {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable get reference to the contract
    return window.ethereum._state.account;
  }
}

export function isMetamaskInstalledOnBrowser() {
  return typeof window.ethereum !== 'undefined';
}
