require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("./tasks/block.task");
require("./tasks/accounts.task");

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const LOCAL_HARDHAT_NODE_URL = process.env.LOCAL_HARDHAT_NODE_URL;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [WALLET_PRIVATE_KEY],
      chainId: 5,
    },
    localhost: {
      url: LOCAL_HARDHAT_NODE_URL,
      // no need for accounts. hardhat generates 19 for us to use
      // accounts: [],
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: "0.8.12",
      },
      {
        version: "0.8.17",
      },
    ],
    overrides: {
      "contracts/SimpleStorage.sol": {
        version: "0.8.12",
      },
    },
  },
};
