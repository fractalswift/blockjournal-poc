import {
  connectToMetamask,
  getConnectedMetamaskAccounts,
  isMetamaskInstalledOnBrowser
} from '../lib';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';

// TODO check if connected to metamask. if so display a green unclickable button

const MetamaskButton = () => {
  const [isMetmaskInstalled, setIsMetmaskInstalled] = useState(false);

  useEffect(() => {
    if (!isMetamaskInstalledOnBrowser()) {
      return setIsMetmaskInstalled(false);
    }
    setIsMetmaskInstalled(true);
  }, []);

  if (!isMetmaskInstalled) {
    return (
      <>
        <Button variant="contained" disabled>
          Metamask not installed
        </Button>
        <p>
          Please install <a href="https://metamask.io/">metamask </a>to use this
          app
        </p>
      </>
    );
  }

  return (
    <Button onClick={connectToMetamask} color="primary" variant="contained">
      Connect to metamask
    </Button>
  );
};

export default MetamaskButton;
