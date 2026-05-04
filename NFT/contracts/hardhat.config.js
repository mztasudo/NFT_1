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
   sepolia: {
  url: process.env.ENDPOINT_URL,
  accounts: [process.env.DEPLOYER_KEY]
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