import { useEffect, useState } from 'react';

import Journal from './abis/Journal.json';

function App() {
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    if (typeof window === 'undefined') return;
    return window.ethereum
      ?.request({ method: 'eth_accounts' })
      .catch((err: any) => console.log(err));
  };

  const requestAccounts = async () => {
    if (typeof window === 'undefined') return;
    return window.ethereum
      ?.request({ method: 'eth_requestAccounts' })
      .catch((err: any) => console.log(err));
  };

  useEffect(() => {
    // TODO error handling for no metamask
    console.log('Attempting to fetch accounts');
    fetchAccounts().then((accounts) => {
      if (!accounts) {
        console.log('No accounts found - requesting access');
        requestAccounts().then((accounts) => setAccounts(accounts));
      }
      console.log('Accounts:', accounts);

      setAccounts(accounts);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>BlockJournal POC</p>
        <button onClick={() => console.log(Journal)}>See something</button>
      </header>
    </div>
  );
}

export default App;
