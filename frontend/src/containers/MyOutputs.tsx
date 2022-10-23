import { uploadOutput } from '../lib';

const MyOutputs = () => {
  return (
    <div>
      <h1>My Outputs</h1>
      <button onClick={uploadOutput}>Upload sample abstract</button>
    </div>
  );
};

export default MyOutputs;
