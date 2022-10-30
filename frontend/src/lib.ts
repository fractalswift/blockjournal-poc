import axios, { AxiosResponse } from 'axios';
import { ethers } from 'ethers';

import Journal from './abis/Journal.json';

// Note: you get this when you run hardhat deploy on local node
import { JOURNAL_CONTRACT_ADDRESS } from './contract-address';
import { NewOutputMetadata } from './types';

const ABI = Journal.abi;

const getEthereumStuff = () => {
  if (typeof window.ethereum !== 'undefined') {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(JOURNAL_CONTRACT_ADDRESS, ABI, signer);

    return { provider, signer, contract };
  }
  throw new Error('No ethereum provider found');
};

async function uploadMetadataToContract({
  isPublished,
  outputHash,
  reviewers,
  outputPath
}: NewOutputMetadata) {
  console.log(
    'uploading meta data: ',
    outputHash,
    isPublished,
    reviewers,
    outputPath
  );

  const { contract } = getEthereumStuff();

  // //preform transaction
  const transaction = await contract.uploadOutput(
    outputPath,
    outputHash,
    isPublished,
    reviewers
  );
  await transaction.wait();
}

export async function uploadOutput({
  outputHash,
  isPublished,
  reviewers,
  textContent
}: NewOutputMetadata) {
  const response = await uploadFileToIPFS(textContent);
  const outputPath = response.data.path;

  await uploadMetadataToContract({
    outputPath,
    outputHash,
    isPublished,
    reviewers
  });
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
  const { contract } = getEthereumStuff();

  try {
    const output = await contract.getOutputByFileNumber(fileNumber);

    return convertOutputDetailsArrayToObject(output);
  } catch (e) {
    throw new Error(
      `Error getting output details for file number ${fileNumber}`
    );
  }
}

export async function getOutputIdsByUploaderAddress() {
  const { contract, signer } = getEthereumStuff();

  const userAddress = await signer.getAddress();

  try {
    const outputIds = await contract.getOutputIdsByUploaderAddress(userAddress);

    return outputIds;
  } catch (e) {
    throw new Error(`Error getting output ids for user ${userAddress}`);
  }
}

export async function getReviewRequestIdsByUserAddress() {
  const { contract, signer } = getEthereumStuff();

  const userAddress = await signer.getAddress();

  try {
    const outputIds = await contract.getOutputIdsByReviewerAddress(userAddress);

    return outputIds;
  } catch (e) {
    throw new Error(`Error getting output ids for user ${userAddress}`);
  }
}

export async function getMultipleOutputsById(
  outputIds: string[]
): Promise<any[]> {
  const { contract } = getEthereumStuff();

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

export async function getTotalUploadedOutputsCount() {
  const { contract } = getEthereumStuff();

  try {
    const fileCountHex = await contract.outputCount();

    const fileCount = parseInt(fileCountHex);

    return fileCount;
  } catch (e) {
    console.log('Err: ', e);
    throw new Error(`Error getting total uploaded outputs count`);
  }
}

export async function connectToMetamask() {
  const { provider, signer } = getEthereumStuff();

  const accounts = await provider.send('eth_requestAccounts', []);

  const address = await signer.getAddress();
  const balance = await provider.getBalance(address);
  const formattedBalance = ethers.utils.formatEther(balance);

  return { address, balance, formattedBalance, accounts };
}

export async function uploadFileToIPFS(output: any) {
  console.log('Uploading file to IPFS...', { output });

  let response: AxiosResponse;

  try {
    response = await axios.post('http://localhost:3001/upload-output-to-ipfs', {
      output
    });
  } catch (error: any) {
    throw new Error(`Error uploading file to IPFS: ${error.message}`);
  }

  return response;
}

export function isMetamaskInstalledOnBrowser() {
  console.log('Checking if Metamask is installed on browser');
  return typeof window.ethereum !== 'undefined';
}

export async function getOutputFromIPFS(outputPath: string) {
  console.log('Getting output from IPFS...', { outputPath });

  let response: AxiosResponse;

  try {
    response = await axios.get(
      `http://localhost:3001/download-from-ipfs?path=${outputPath}`,
      {}
    );
  } catch (error: any) {
    console.log(
      `Error getting output from IPFS: ${error.message}, replacing with default string`
    );

    return { output: 'No output found on IPFS' };
  }

  if (response?.data?.output) {
    return response.data.output;
  }
  console.log('Response received but did not have expected attributes');
  return { output: 'No output found on IPFS' };
}
