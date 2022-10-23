import { useState } from 'react';
import Navbar from './components/Navbar';
import {
  getTotalUploadedOutputsCount,
  uploadOutput,
  getOutputDetailsByFileNumber,
  connectToMetamask
} from './lib';
import AppRoutes from './Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>BlockJournal POC</p>
        <button onClick={connectToMetamask}>Connect to metamask</button>

        <Navbar />
      </header>

      <AppRoutes />
    </div>
  );
}

export default App;
