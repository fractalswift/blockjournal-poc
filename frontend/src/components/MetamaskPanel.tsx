import { connectToMetamask, isMetamaskInstalledOnBrowser } from '../lib';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

import styles from './MetamaskPanel.module.scss';

// TODO check if connected to metamask. if so display a green unclickable button

const MetamaskButton = () => {
  const [isMetmaskInstalled, setIsMetmaskInstalled] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const handleClickConnect = async () => {
    const userDetails = await connectToMetamask();
    if (userDetails) {
      setConnectedAccounts(userDetails.accounts);
      return setIsConnected(true);
    }

    return setIsConnected(false);
  };

  useEffect(() => {
    if (!isMetamaskInstalledOnBrowser()) {
      return setIsMetmaskInstalled(false);
    }
    setIsMetmaskInstalled(true);
  }, []);

  useEffect(() => {
    const getConnectedMetamaskAccounts = async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      return setConnectedAccounts(accounts);
    };

    if (isMetmaskInstalled) {
      getConnectedMetamaskAccounts();
    }
  }, []);

  useEffect(() => {
    if (connectedAccounts.length > 0) {
      return setIsConnected(true);
    }

    return setIsConnected(false);
  }, [connectedAccounts]);

  if (!isMetmaskInstalled) {
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

  if (!isConnected) {
    return (
      <div className={styles['container']}>
        <Button variant="contained" onClick={handleClickConnect}>
          Connect to Metamask
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
      <p>Your address: {connectedAccounts[0]}</p>
    </div>
  );
};

export default MetamaskButton;
