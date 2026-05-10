import { useEffect, useState } from "react"
import { isWalletConnected, connectWallet, loadNfts } from './Mike'
import { getSigner } from "./web3"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Artworks from "./components/Artworks"
import Footer from "./components/Footer"
// import Alert from "./components/Alert"
import Loading from "./components/Loading"
import { useGlobalState, setGlobalState } from './store'


function App() {
  // const [address, setAddress] = useState("")

  // const connectWallet = async () => {
  //   const signer = await getSigner()
  //   const addr = await signer.getAddress()
  //   setAddress(addr)
  // }
  const [nfts] = useGlobalState('nfts')

  useEffect(() => {
    if (window.ethereum) {

    window.ethereum.on("accountsChanged", async (accounts) => {
      const account = accounts[0]

      console.log("Switched account:", account)

      // update wallet state
      setGlobalState('connectedAccount', account)
      // reload NFTs for new wallet
      await loadNfts(account)
    })

    window.ethereum.on("chainChanged", () => {
      window.location.reload()
    })
  }
  const init = async () => {
    try {
      await isWalletConnected()
      await loadNfts()
      console.log('Blockchain Loaded')

      // optional
    } catch (error) {
      console.error(error)
    }
  }

  init()
}, [])

  return (
    <div className="h-screen  bg-[#5fbcf3] text-white">
      <div>
       <Header/>
      <Hero/></div>
      <Artworks/>
      <Footer/>
      {/* <Alert/> */}
      <Loading/>

      {/* <button
        onClick={connectWallet}
        className="px-6 py-2 bg-blue-600 rounded-xl"
        >
        Connect Wallet
      </button>

      {address && <p className="mt-4">{address}</p>} */}
    </div>
  )
}

export default App
