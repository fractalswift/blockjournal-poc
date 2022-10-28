import { useEffect, useState } from 'react';
import {
  getOutputDetailsByFileNumber,
  getTotalUploadedOutputsCount
} from '../lib';

import OutputCard from '../components/OutputCard';

import styles from './container.module.scss';

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const PublicOutputs = () => {
  const [totalOutputCount, setTotalOutputCount] = useState<number | undefined>(
    0
  );
  const [outputNumber, setOutputNumber] = useState<number | undefined>();
  const [outputDetails, setOutputDetails] = useState<any>(null);

  const handleChange = (e: any) => {
    e.preventDefault();
    setOutputNumber(Number(e.target.value));
  };

  const handleClickReadOutput = async (e: any) => {
    e.preventDefault();
    if (outputNumber) {
      const outputDetails = await getOutputDetailsByFileNumber(outputNumber);
      setOutputDetails(outputDetails);
    }
  };

  useEffect(() => {
    const updateOutputCount = async () => {
      const totalOutputCount = await getTotalUploadedOutputsCount();
      setTotalOutputCount(totalOutputCount);
    };
    updateOutputCount();
  }, []);

  return (
    <div className={styles['container']}>
      <h1>Public Outputs</h1>
      <h2>Total outputs published: {totalOutputCount}</h2>
      <div>
        <button onClick={handleClickReadOutput} disabled={!outputNumber}>
          Get output by ID number
        </button>
        <input type="text" onChange={handleChange} />
      </div>
      {outputDetails && outputDetails.uploaderAddress === ZERO_ADDRESS && (
        <div> No output found with this id</div>
      )}
      {outputDetails && outputDetails.uploaderAddress !== ZERO_ADDRESS && (
        <OutputCard outputDetails={outputDetails} />
      )}
    </div>
  );
};

export default PublicOutputs;
