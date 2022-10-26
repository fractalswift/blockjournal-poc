import { connectToMetamask } from '../lib';

import styles from './MetamaskButton.module.scss';
const MetamaskButton = () => {
  return (
    <button className={styles['connect-button']} onClick={connectToMetamask}>
      Connect to metamask
    </button>
  );
};

export default MetamaskButton;
