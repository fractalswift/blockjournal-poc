import { connectToMetamask, isMetamaskInstalledOnBrowser } from '../lib';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

import styles from './MetamaskPanel.module.scss';

const MetamaskButton = ({
  isMetamaskConnected,
  setIsMetamaskConnected
}: any) => {
  const [isMetamaskInstalled, setIsMetamaskInstalled] = useState(false);
  // const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  const [connectionDetails, setConnectionDetails] = useState<any>({});

  useEffect(() => {
    if (!isMetamaskInstalledOnBrowser()) {
      return setIsMetamaskInstalled(false);
    }
    setIsMetamaskInstalled(true);
  }, []);

  useEffect(() => {
    const connectAndSetDetails = async () => {
      const connectionDetails = await connectToMetamask();
      return setConnectionDetails(connectionDetails);
    };

    console.log('Connecting to metamask...');
    if (connectionDetails && connectionDetails.address) {
      console.log('Metamask is connected');
      return setIsMetamaskConnected(true);
    }

    setIsMetamaskConnected(false);

    connectAndSetDetails();
  }, [connectionDetails]);

  if (!isMetamaskInstalled) {
    return (
      <div className={styles['container']}>
        <Button variant="contained" disabled>
          Metamask not installed
        </Button>
        <p>
          Please install <a href="https://metamask.io/">metamask </a>to use this
          app
        </p>
      </div>
    );
  }

  if (!isMetamaskConnected) {
    return (
      <div className={styles['container']}>
        <Button variant="contained" color="error">
          Awaiting metamask connection...
        </Button>
      </div>
    );
  }

  // if metamask is installed and connected
  return (
    <div className={styles['container']}>
      <Button variant="contained" color="primary">
        Connected
      </Button>
      <p>Your address: {connectionDetails.address}</p>
    </div>
  );
};

export default MetamaskButton;
