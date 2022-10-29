import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';

import AppRoutes from './Routes';

import styles from './App.module.scss';
import MetamaskButton from './components/MetamaskPanel';

function App() {
  const [isMetamaskConnected, setIsMetamaskConnected] = useState(false);
  return (
    <div className={styles['app-container']}>
      <Header />

      <MetamaskButton
        isMetamaskConnected={isMetamaskConnected}
        setIsMetamaskConnected={setIsMetamaskConnected}
      />

      <Navbar />

      <div className={styles['app-content']}>
        <AppRoutes isMetamaskConnected={isMetamaskConnected} />
      </div>
    </div>
  );
}

export default App;
