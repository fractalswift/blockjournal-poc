import { useState } from 'react';
import { uploadOutput } from '../lib';
import { generateHashFromString, generateFakeOutputPath } from '../utils';

import styles from './container.module.scss';

interface NewOutput {
  textContent: string;
  isPublished: boolean;
}

const NewOutputForm = () => {
  const [output, setOutput] = useState<NewOutput>({
    textContent: '',
    isPublished: false
  });

  const handleChangeText = (e: any) => {
    const { name, value } = e.target;
    setOutput({ ...output, [name]: value });
  };

  const handleChangeIsPublshed = (e: any) => {
    const { name, value } = e.target;

    setOutput({ ...output, [name]: !output.isPublished });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('uploading output:', output);

    const outputPath = generateFakeOutputPath();
    const outputHash = generateHashFromString(output.textContent);

    await uploadOutput(outputPath, outputHash, output.isPublished);
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
            onChange={handleChangeIsPublshed}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
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
