import { useState } from 'react';
import {
  getTotalUploadedOutputsCount,
  incrementFileCountForTesting,
  uploadOutput,
  getOutputDetailsByFileNumber,
  connectToMetamask
} from './lib';

function App() {
  const [outputDetails, setOutputDetails] = useState<any>(null);

  const handleClickReadOutput = async () => {
    const outputDetails = await getOutputDetailsByFileNumber(1);
    console.log({ outputDetails });
    setOutputDetails(outputDetails);
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
        <button onClick={handleClickReadOutput}>Read sample abstract</button>
      </header>

      <div>
        {outputDetails && (
          <div>
            <p>Output details</p>
            <p>File hash: {outputDetails.hash}</p>
            <p>File type: {outputDetails.title}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
