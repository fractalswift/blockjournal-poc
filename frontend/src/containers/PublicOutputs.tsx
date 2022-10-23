import { useCallback, useEffect, useState } from 'react';
import {
  getOutputDetailsByFileNumber,
  getTotalUploadedOutputsCount
} from '../lib';

const PublicOutputs = () => {
  const [totalOutputCount, setTotalOutputCount] = useState<number | undefined>(
    0
  );
  const [outputNumber, setOutputNumber] = useState(0);
  const [outputDetails, setOutputDetails] = useState<any>(null);

  const handleClickReadOutput = async () => {
    const outputDetails = await getOutputDetailsByFileNumber(outputNumber);
    setOutputDetails(outputDetails);
  };

  useEffect(() => {
    const updateOutputCount = async () => {
      const totalOutputCount = await getTotalUploadedOutputsCount();
      setTotalOutputCount(totalOutputCount);
    };
    updateOutputCount();
  }, []);

  return (
    <div>
      <h1>Public Outputs</h1>
      <h2>Total outputs published: {totalOutputCount}</h2>

      <button onClick={handleClickReadOutput}>Get output by ID number</button>
      <input
        type="text"
        value={outputNumber}
        onChange={(e) => setOutputNumber(Number(e.target.value))}
      />
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
