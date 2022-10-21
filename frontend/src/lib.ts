import { ethers } from 'ethers';

export async function getABI() {
  const data = await fetch('./abis/Journal.json');
  const { abi } = await data.json();
  return abi;
}

export async function fetchData(contractAddress: string) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = await getABI();

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const res = await contract.greeting();
  return res;
}
