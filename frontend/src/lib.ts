import { ethers } from 'ethers';
import Journal from './abis/Journal.json';

// Note: you get this when you run hardhat deploy on local node
const JOURNAL_CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const ABI = Journal.abi;

export async function incrementFileCountForTesting() {
  if (typeof window.ethereum !== 'undefined') {
    //ethereum is usable, get reference to the contract
    // await this.requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //signer needed for transaction that changes state
    const signer = provider.getSigner();
    // console.log({ signer });
    const contract = new ethers.Contract(JOURNAL_CONTRACT_ADDRESS, ABI, signer);
    // //preform transaction
    const transaction = await contract.incrementFileCountForTesting();
    await transaction.wait();
    // this.fetchGreeting();
  }
}

export async function uploadOutput() {
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
      'fakeFilePath',
      1,
      'Abstract',
      'Using Blockchain to store data',
      'sdjakdfhsdfx102-293-dsd'
    );
    await transaction.wait();
    // this.fetchGreeting();
  }
}

function convertOutputDetailsArrayToObject(outputDetailsArray: any[]) {
  return {
    filePath: outputDetailsArray[0],
    fileCount: outputDetailsArray[1],
    abstract: outputDetailsArray[2],
    title: outputDetailsArray[3],
    hash: outputDetailsArray[4]
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
      const fileCountHex = await contract.fileCount();

      const fileCount = parseInt(fileCountHex);

      console.log({ fileCount });
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
