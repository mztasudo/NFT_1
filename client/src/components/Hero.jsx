import avatar from '../assets/breathofestova.png'
import github from '../assets/github_icon.png'
import twitter from '../assets/twitter_icon.png'
import facebook from '../assets/facebook_icon.png'
import medium from '../assets/medium_icon.png'
import linkedIn from '../assets/linkedIn_icon.png'
import { setAlert, setGlobalState, useGlobalState } from '../store'
import { payToMint } from '../Mike'



const Hero = () => {
const [nfts] = useGlobalState('nfts')

 const onMintNFT = async () => {
  try {
    setGlobalState('loading', {
      show: true,
      msg: 'Minting new NFT to your account',
    })

    await payToMint()

    setAlert('Minting Successful...', 'green')
  } catch (error) {
    console.error(error)
    setAlert('Mint failed', 'red')
  } finally {
    setGlobalState('loading', { show: false, msg: '' })
  }
}


  return (
    <div className="bg-blue-200 bg-no-repeat
    bg-cover">
      
    <div className="flex flex-col justify-center
      items-center mx-auto py-10">

    
      <p className="text-black font-semibold text-3xl ml-3">
        Click On Mint and Collect the Hottest NFTs Around</p>
      <button className="shadow-xl shadow-black p-2 cursor-pointer my-4
       text-white bg-[#1996fd] hover:bg-[#ea5d1b] rounded-2xl "
       onClick={onMintNFT}
       >
        MINT NOW
        </button>
      <a
       className="flex justify-center items-center
       space-x-2 bg-[#000000ad] rounded-full  pr-3 cursor-pointer"
       href="www.houtsidein.com" target='_blank'
       >
        
      </a>
      
      <ul className='flex flex-row justify-center
      space-x-2 items-center my-4'>
        

        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={github} alt="Github" />
        </a>
        
        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={twitter} alt="twitter" />
        </a>

        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={facebook} alt="facebook" />
        </a>

        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={linkedIn} alt="linkedin" />
        </a>

        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={medium} alt="medium" />
        </a>

      </ul>
      <div>
        <div className='shadow-xl shadow-black flex justify-center
        items-center w-10 h-10 rounded-full bg-white cursor-pointer
        p-3 ml-4 text-black hover:bg-[#ed255f]
        hover:text-white transition-all duration-75 delay-75'>

        <span className='text-sm font-bold bg-slate-400'>{nfts.length}/99</span>
        </div>
      </div>
    </div>
    </div>
      
  )
}

export default Hero
