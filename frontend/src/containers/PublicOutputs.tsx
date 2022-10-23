import { useState } from 'react';
import {
  getOutputDetailsByFileNumber,
  getTotalUploadedOutputsCount
} from '../lib';

const PublicOutputs = () => {
  const [outputDetails, setOutputDetails] = useState<any>(null);

  const handleClickReadOutput = async () => {
    const outputDetails = await getOutputDetailsByFileNumber(1);
    console.log({ outputDetails });
    setOutputDetails(outputDetails);
  };
  return (
    <div>
      <h1>Public Outputs</h1>
      <button onClick={getTotalUploadedOutputsCount}>Get journal count</button>
      <button onClick={handleClickReadOutput}>Read sample abstract</button>
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
  );
};

export default PublicOutputs;
