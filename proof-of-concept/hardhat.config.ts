import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

interface HardhatUserConfigWithAbiExporter extends HardhatUserConfig {
  abiExporter?: any;
}

const config: HardhatUserConfigWithAbiExporter = {
  defaultNetwork: 'hardhat',
  paths: {
    artifacts: './src/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  },

  solidity: '0.8.17',

  abiExporter: [
    {
      path: './abi/pretty',
      pretty: true
    },
    {
      path: './abi/ugly',
      pretty: false
    }
  ]
};

export default config;
