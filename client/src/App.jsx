import { useEffect, useState } from "react"
import { isWalletConnected, connectWallet, loadNfts } from './Mike'
import { getSigner } from "./web3"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Artworks from "./components/Artworks"
import Footer from "./components/Footer"
// import Alert from "./components/Alert"
import Loading from "./components/Loading"
import { useGlobalState } from './store'


function App() {
  // const [address, setAddress] = useState("")

  // const connectWallet = async () => {
  //   const signer = await getSigner()
  //   const addr = await signer.getAddress()
  //   setAddress(addr)
  // }
  const [nfts] = useGlobalState('nfts')

  useEffect(() => {
  const init = async () => {
    try {
      await isWalletConnected()
      console.log('Blockchain Loaded')

      // optional
       await loadNfts()
    } catch (error) {
      console.error(error)
    }
  }

  init()
}, [])

  return (
    <div className="h-screen  bg-gray-900 text-white">
      <div className="text-3xl mb-4">Web3 Starter 🚀
       <Header/>
      <Hero/></div>
      <Artworks artworks={nfts} />
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
