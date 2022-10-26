import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';

import AppRoutes from './Routes';

import styles from './App.module.scss';
import MetamaskButton from './components/MetamaskButton';

function App() {
  return (
    <div className={styles['app-container']}>
      <Header />

      <MetamaskButton />

      <Navbar />

      <AppRoutes />
    </div>
  );
}

export default App;
