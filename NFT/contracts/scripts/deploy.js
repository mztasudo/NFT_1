const { ethers } = require('hardhat')
const fs = require('fs')

async function main() {
  const base_uri = 'https://ipfs.io/ipfs/QmTWbe9wDns7aqZQNCuWh5PqybGbBF91kngC5Zf8qmCoyg/'

  const Contract = await ethers.getContractFactory('Mike')
  const contract = await Contract.deploy('Mike NFT', 'Mike', base_uri)

  await contract.waitForDeployment()

  const contractAddress = await contract.getAddress()

  const address = JSON.stringify({ address: contractAddress }, null, 4)

  fs.writeFile('../client/src/abis/contractAddress.json', address, 'utf8', (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Deployed contract address:', contractAddress)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})