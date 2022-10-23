import { uploadFileToIPFS } from '../lib';

const Sandbox = () => {
  const handleClick = () => {
    fetch('http://localhost/3001/upload-output-to-ipfs');
  };

  return (
    <>
      <button onClick={() => uploadFileToIPFS('Just testing')}>Press me</button>
      <button onClick={handleClick}>Test backend</button>
    </>
  );
};

export default Sandbox;
