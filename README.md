# blockjournal-poc

To start:

- cd smart-contracts
- npx hardhat clean
- npx hardhat compile
- copy the abi into frontend/abis/Journal.sol
- (still in smart-contracts) npx hardhat node
- npx hardhat run scripts/deploy.ts --network localhost

- cd ../frontend
- npm start

- copy one of the hardhat addresses from the hardhat node terminal and import it into metamask
- switch metamask to local host

- tada
