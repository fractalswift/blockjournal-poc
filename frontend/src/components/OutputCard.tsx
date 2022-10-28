import styles from './OutputCard.module.scss';

const OutputCard = ({ outputDetails }: any) => {
  return (
    <div className={styles['container']}>
      <h3>Output details</h3>
      <p>Output ID number: {outputDetails.outputIdNumber.toString()}</p>

      <p>Output path: {outputDetails.outputPath}</p>
      <p>Output hash: {outputDetails.outputHash}</p>
      <p>
        Publication status: {outputDetails.isPublished ? 'Published' : 'Draft'}
      </p>

      <p>Output uploader address: {outputDetails.uploaderAddress}</p>
    </div>
  );
};

export default OutputCard;
