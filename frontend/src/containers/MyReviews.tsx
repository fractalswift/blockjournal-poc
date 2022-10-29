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
        const output = await getOutputDetailsByFileNumber(id);
        setOutputs([output]);
      }
    };
    getReviews();
  }, [outputIds]);

  if (outputs.length) {
    console.log({ outputs });
    return (
      <>
        {outputs.map((output: any) => {
          console.log(output);
          return (
            <OutputCard outputDetails={output} key={output.outputIdNumber} />
          );
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
