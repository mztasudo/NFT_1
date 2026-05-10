import abi from './abis/contracts/Mike.sol/Mike.json'
import address from './abis/contractAddress.json'
import { getGlobalState, setGlobalState } from './store'
import { ethers } from 'ethers'

const ethereum = typeof window !== 'undefined' ? window.ethereum : null

const contractAddress = address.address
const contractAbi = abi.abi

const opensea_uri = `https://testnets.opensea.io/assets/sepolia/${contractAddress}/`

const reportError = (error) => {
  console.error(error)
  throw new Error(error?.message || 'Something went wrong')
}

const getEthereumContract = async () => {
  if (!ethereum) throw new Error('MetaMask not detected')

  const provider = new ethers.BrowserProvider(ethereum)
  const signer = await provider.getSigner()

  return new ethers.Contract(contractAddress, contractAbi, signer)
}

// ✅ FIXED NAME
const isWalletConnected = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const accounts = await ethereum.request({ method: 'eth_accounts' })

    ethereum.on('chainChanged', () => window.location.reload())

    ethereum.on('accountsChanged', async (accounts) => {
      setGlobalState('connectedAccount', accounts[0])
      await isWalletConnected()
    })

    if (accounts.length) {
      setGlobalState('connectedAccount', accounts[0])
    } else {
      alert('Please connect wallet.')
    }
  } catch (error) {
    reportError(error)
  }
}

const connectWallet = async () => {
  try {
    if (!ethereum) return alert('Please install Metamask')

    const accounts = await ethereum.request({
      method: 'eth_requestAccounts',
    })

    setGlobalState('connectedAccount', accounts[0])
  } catch (error) {
    reportError(error)
  }
}

const payToMint = async () => {
  console.log("About to send transaction...")
  try {
    if (!ethereum) return alert('Please install wallet')

    // 🔥 ENSURE WALLET IS CONNECTED
    let accounts = await ethereum.request({ method: 'eth_accounts' })

    if (!accounts.length) {
      accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setGlobalState('connectedAccount', accounts[0])
    }

    const contract = await getEthereumContract()

    const amount = ethers.parseEther('0.001')

    const tx = await contract.payToMint({
      value: amount,
    })

    console.log("Wallet should pop now 👆")

    await tx.wait()
    alert("MINTED")

    await loadNfts()
  } catch (error) {
    console.error("MINT ERROR:", error)
  }
}
const loadNfts = async () => {
  try {
    const contract = await getEthereumContract()
    const nfts = await contract.getAllNFTs()
    const structured = await structuredNfts(nfts) //new

    setGlobalState('nfts', structured)
    console.log(structured)
  } catch (error) {
    reportError(error)
  }
}

// const structuredNfts = (nfts) =>
//   nfts
//     .map((nft) => ({
//       id: Number(nft.id),
//       url: opensea_uri + nft.id,
//       buyer: nft.buyer,
//       imageURL: nft.imageURL,
//       cost: Number(nft.cost) / 1e18,
//       timestamp: Number(nft.timestamp),
//     }))
//     .reverse()

const structuredNfts = async (nfts) => {
  const items = await Promise.all(
    nfts.map(async (nft) => {
      const metadata = await fetch(nft.imageURL).then((res) => res.json())

      return {
        id: Number(nft.id),
        url: opensea_uri + nft.id,
        buyer: nft.buyer,
        imageURL: metadata.image,
        cost: ethers.formatEther(nft.cost),
        timestamp: Number(nft.timestamp),

      }
    })
  )

  return items.reverse()
}

export {
  isWalletConnected,
  connectWallet,
  payToMint,
  loadNfts,
}