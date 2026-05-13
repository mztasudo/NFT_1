require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

module.exports = {
  defaultNetwork: "localhost",
  networks: {
    hardhat: {
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
   arc: {
  url: process.env.ARC_RPC_URL,
  accounts: [process.env.DEPLOYER_KEY],
  chainId: 5042002,
  gas: 3000000,
  gasPrice: 20000000000,
  timeout: 120000
}
  },
  solidity: {
    version: '0.8.24',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    artifacts: "./abis"
  },
  mocha: {
    timeout: 40000
  }
}