import { useEffect, useState } from 'react';

import { LinearProgress } from '@mui/material';

import styles from './OutputCard.module.scss';

import { getOutputFromIPFS } from '../lib';

const OutputCard = ({ outputDetails }: any) => {
  const [outputText, setOutputText] = useState<any>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    const fetchOutput = async () => {
      setIsFetching(true);
      const outputText = await getOutputFromIPFS(outputDetails.outputPath);
      setOutputText(outputText);
      setIsFetching(false);
    };
    fetchOutput();
  }, [outputDetails]);
  return (
    <div className={styles['container']}>
      <h3>Output metadata</h3>
      <p>Output ID number: {outputDetails.outputIdNumber.toString()}</p>

      <p>Output path: {outputDetails.outputPath}</p>
      <p>Output hash: {outputDetails.outputHash}</p>
      <p>
        Publication status: {outputDetails.isPublished ? 'Published' : 'Draft'}
      </p>

      <p>Output uploader address: {outputDetails.uploaderAddress}</p>

      <p>Output reviewers:</p>

      <div className={styles['reviewers-list']}>
        {outputDetails.reviewers.map((address: string) => {
          return <span key={address}>{address}</span>;
        })}
      </div>

      <div>
        <h3>Output text</h3>
        {isFetching ? (
          <LinearProgress />
        ) : (
          <div className={styles['output-text']}>{outputText}</div>
        )}
      </div>
    </div>
  );
};

export default OutputCard;
