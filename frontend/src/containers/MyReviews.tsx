import { useEffect, useState } from 'react';
import OutputCard from '../components/OutputCard';
import {
  getOutputDetailsByFileNumber,
  getReviewRequestIdsByUserAddress
} from '../lib';

const MyReviews = () => {
  const [outputIds, setOutputIds] = useState<any[]>([]);
  const [outputs, setOutputs] = useState<any[]>([]);

  useEffect(() => {
    const getOutputIds = async () => {
      const ids = await getReviewRequestIdsByUserAddress();
      console.log({ ids });
      setOutputIds(ids);
    };

    getOutputIds();
  }, []);

  useEffect(() => {
    const getReviews = async () => {
      for (let id of outputIds) {
        const output = await getOutputDetailsByFileNumber(id.toString());
        console.log('fetching for outputId', id.toString());
        let currentOutputs = outputs;
        currentOutputs.push(output);
        console.log({ currentOutputs });
        setOutputs(currentOutputs);
      }
    };
    getReviews();
  }, [outputIds]);

  if (outputs.length) {
    console.log({ outputIds });
    console.log('There are this many outputs in state:', outputs.length);
    return (
      <>
        {outputs.map((output: any) => {
          console.log(output);
          return <OutputCard outputDetails={output} key={output.outputHash} />;
        })}
      </>
    );
  }

  return (
    <div>
      <h1>My Reviews</h1>
      You have not been invited to review any outputs.
    </div>
  );
};

export default MyReviews;
