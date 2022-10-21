import { ethers } from 'ethers';

import {
  getTotalUploadedOutputsCount,
  incrementFileCountForTesting,
  uploadOutput,
  getOutputDetailsByFileNumber
} from './lib';

function App() {
  const connectToMetamask = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    const address = await signer.getAddress();
    const balance = await provider.getBalance(address);
    const formattedBalance = ethers.utils.formatEther(balance);

    console.log({ address, balance, formattedBalance, accounts });
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>BlockJournal POC</p>
        <button onClick={connectToMetamask}>Connect to metamask</button>
        <button onClick={getTotalUploadedOutputsCount}>
          Get journal count
        </button>
        <button onClick={incrementFileCountForTesting}>
          Increment journal count
        </button>
        <button onClick={uploadOutput}>Upload sample abstract</button>
        <button onClick={() => getOutputDetailsByFileNumber(1)}>
          Read sample abstract
        </button>
      </header>
    </div>
  );
}

export default App;
