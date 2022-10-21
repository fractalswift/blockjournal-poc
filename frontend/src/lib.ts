import { ethers } from 'ethers';
import Journal from './abis/Journal.json';

// Note: you get this when you run hardhat deploy on local node
const JOURNAL_CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

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
