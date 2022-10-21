import { ethers } from 'ethers';

import {
  getTotalUploadedOutputsCount,
  incrementFileCountForTesting,
  uploadOutput,
  getOutputDetailsByFileNumber,
  connectToMetamask
} from './lib';

function App() {
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
