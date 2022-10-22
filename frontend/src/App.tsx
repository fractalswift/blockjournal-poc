import { useState } from 'react';
import {
  getTotalUploadedOutputsCount,
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

        <button onClick={uploadOutput}>Upload sample abstract</button>
        <button onClick={handleClickReadOutput}>Read sample abstract</button>
      </header>

      <div>
        {outputDetails && (
          <div>
            <h3>Output details</h3>
            <p>Output ID number: {outputDetails.outputIdNumber.toString()}</p>

            <p>Output path: {outputDetails.outputPath}</p>
            <p>Output hash: {outputDetails.outputHash}</p>
            <p>
              Publication status:
              {outputDetails.isPublished ? 'Published' : 'Draft'}
            </p>

            <p>Output uploader address: {outputDetails.uploaderAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
