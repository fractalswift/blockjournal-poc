import { useEffect, useState } from 'react';

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
    console.log('Attempting to fetch accounts');
    fetchAccounts().then((accounts) => {
      console.log('Accounts:', accounts);
      setAccounts(accounts);
    });

    if (!accounts.length) {
      console.log('No accounts found - requesting access');
      requestAccounts().then((accounts) => setAccounts(accounts));
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>BlockJournal POC</p>
        <button onClick={() => console.log(accounts)}>See Accounts</button>
      </header>
    </div>
  );
}

export default App;
