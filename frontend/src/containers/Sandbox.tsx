import { uploadFileToIPFS } from '../lib';

const Sandbox = () => {
  return (
    <>
      <button onClick={() => uploadFileToIPFS('Just testing')}>Press me</button>
    </>
  );
};

export default Sandbox;
