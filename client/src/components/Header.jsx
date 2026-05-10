import ethlogo from "../assets/ethlogo.png"
import { connectWallet } from "../Mike"
import { useGlobalState, truncate } from "../store"
const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount")
  return (
    <nav className="w-4/5 flex justify-between md:justify-evenly
    items-center  py-4 mx-auto ">
      
    

    <div className="flex flex-row justify-start items-center
    md:flex-[0.5] flex-initial">
    <h1 className="text-yellow-900 text-3xl font-extrabold text-center">ETI arts
      <br/>
      <span className="text-gradient">NFT</span> COLLECTION</h1>
    </div>
    <ul className="md:flex md:flex-{0.5} text-white hidden 
    list-none flex-row justify-between items-center flex-initial">
    
    
    </ul>
     {connectedAccount ? (
       <button
         className="shadow-xl shadow-black text-white
       bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2
       rounded-full cursor-pointer"
       >
         {truncate(connectedAccount, 4, 4, 11)}
       </button>
     ) : (
       <button
         className="shadow-xl shadow-black text-white
       bg-[#e32970] hover:bg-[#bd255f] md:text-xs p-2
       rounded-full cursor-pointer"
         onClick={connectWallet}
       >
         Connect Wallet
       </button>
     )}

    </nav>
  )
}

export default Header
