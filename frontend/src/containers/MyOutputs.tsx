import { useState, useEffect } from 'react';
import OutputCard from '../components/OutputCard';
import { getOutputIdsByUploaderAddress, getMultipleOutputsById } from '../lib';

import styles from './container.module.scss';

const MyOutputs = () => {
  const [outputIds, setOutputIds] = useState<any[]>([]);
  const [outputs, setOutputs] = useState<any[]>([]);

  useEffect(() => {
    const getOutputIds = async () => {
      const ids = await getOutputIdsByUploaderAddress();
      console.log({ ids });
      setOutputIds(ids);
    };

    getOutputIds();
  }, []);

  useEffect(() => {
    const getMyOutputs = async () => {
      console.log('fetching for this many ids:', outputIds.length);
      const outputs = await getMultipleOutputsById(outputIds);

      setOutputs(outputs);
    };

    getMyOutputs();
  }, [outputIds]);

  if (outputs.length) {
    return (
      <div className={styles['outputs-list']}>
        {outputs.map((output: any) => {
          console.log(output);
          return <OutputCard outputDetails={output} key={output.outputHash} />;
        })}
      </div>
    );
  }

  return (
    <div>
      <h1>My Outputs</h1>
      You have not uploaded any outputs yet.
    </div>
  );
};

export default MyOutputs;
