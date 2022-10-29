import { useState } from 'react';
import { uploadOutput, uploadFileToIPFS } from '../lib';
import { generateHashFromString } from '../utils';
import { NewOutputMetadata } from '../types';

import styles from './container.module.scss';

const NewOutputForm = () => {
  const [output, setOutput] = useState<NewOutputMetadata>({
    textContent: '',
    isPublished: false,
    outputHash: '',
    reviewers: []
  });

  const [reviewers, setReviewers] = useState<any>([]);

  const handleChangeText = (e: any) => {
    const { name, value } = e.target;
    const outputHash = generateHashFromString(value);
    setOutput({ ...output, [name]: value, outputHash });
  };

  const handleChangeIsPublished = (e: any) => {
    const { name, value } = e.target;

    setOutput({ ...output, [name]: !output.isPublished });
  };

  const handleSelectReviewer = (e: any) => {
    const { name, checked } = e.target;

    console.log(name, checked);

    if (checked) {
      return setReviewers([...reviewers, name]);
    }

    return setReviewers(reviewers.filter((reviewer: any) => reviewer !== name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('uploading output:', output);

    const { isPublished, textContent, outputHash, reviewers } = output;

    await uploadOutput({ isPublished, textContent, outputHash, reviewers });
  };

  return (
    <div>
      <h2>New Output</h2>
      <form onSubmit={handleSubmit} className={styles['new-output-form']}>
        <div className={styles['new-output-row']}>
          <label htmlFor="textContent">Output text content</label>
          <textarea
            name="textContent"
            onChange={handleChangeText}
            className={styles['new-output-text-content']}
          />
        </div>

        <div className={styles['new-output-row']}>
          <label htmlFor="isPublished">Published?</label>
          <input
            type="checkbox"
            name="isPublished"
            onChange={handleChangeIsPublished}
          />
        </div>

        <h3>Select reviewers</h3>

        <div className={styles['new-output-row']}>
          <label htmlFor="0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f">
            0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f
          </label>
          <input
            type="checkbox"
            name="0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f"
            onChange={handleSelectReviewer}
          />
        </div>

        <div className={styles['new-output-row']}>
          <label htmlFor="0xa0Ee7A142d267C1f36714E4a8F75612F20a79720">
            0xa0Ee7A142d267C1f36714E4a8F75612F20a79720
          </label>
          <input
            type="checkbox"
            name="0xa0Ee7A142d267C1f36714E4a8F75612F20a79720"
            onChange={handleSelectReviewer}
          />
        </div>
        <div className={styles['new-output-row']}>
          <label htmlFor="0xBcd4042DE499D14e55001CcbB24a551F3b954096">
            0xBcd4042DE499D14e55001CcbB24a551F3b954096
          </label>
          <input
            type="checkbox"
            name="0xBcd4042DE499D14e55001CcbB24a551F3b954096"
            onChange={handleSelectReviewer}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => uploadFileToIPFS('my text')}>
        Upload file to IPFS
      </button>
    </div>
  );
};

const CreateNewOutput = () => {
  return (
    <div>
      <h1>Create New Output</h1>
      {/* <button onClick={uploadOutput}>Upload sample abstract</button> */}
      <NewOutputForm />
    </div>
  );
};

export default CreateNewOutput;
