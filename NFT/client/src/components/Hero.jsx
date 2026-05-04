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

    <h1 className="text-yellow-900 text-3xl font-extrabold text-center">ETI arts
      <br/>
      <span className="text-gradient">NFT</span> COLLECTION</h1>
      <p className="text-white font-semibold text-sm ml-3">
        Mint and Collect the hottest NFTs around</p>
      <button className="shadow-xl shadow-black p-2 cursor-pointer my-4
       text-white bg-[#220894] hover:bg-[#ea5d1b] rounded-2xl "
       onClick={onMintNFT}
       >
        MINT NOW
        </button>
      <a
       className="flex justify-center items-center
       space-x-2 bg-[#000000ad] rounded-full my-4 pr-3 cursor-pointer"
       href="www.outsidein.com" target='_blank'
       >
        <img className='w-11 h-11 object-contain rounded-full' src={avatar} alt="o" />
        <div className='flex flex-col font-semibold text-white'>
          <span>wallet id</span>
          <span className='text-[#8aba36]'>damilola</span>
        </div>
      </a>
      <p className='text-white text-sm font-medium text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br/>Cupiditate quos delectus debitis dolorem laudantium omnis? <br/>Maiores facilis nostrum perferendis cupiditate minus eius, 
      <br/>ab saepe ullam esse earum fugiat harum iure? <br/>
      Quisquam, dolore dolorum unde necessitatibus
      </p>
      <ul className='flex flex-row justify-center
      space-x-2 items-center my-4'>

        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={github} alt="Github" />
        </a>
        
        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={twitter} alt="Github" />
        </a>

        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={facebook} alt="Github" />
        </a>

        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={linkedIn} alt="Github" />
        </a>

        <a href="#" className='bg-white rounded-full'>
          <img className= 'hover:scale-50 w-7 h-7' src={medium} alt="Github" />
        </a>

      </ul>
      <div>
        <div className='shadow-xl shadow-black flex justify-center
        items-center w-10 h-10 rounded-full bg-white cursor-pointer
        p-3 ml-4 text-black hover:bg-[#ed255f]
        hover:text-white transition-all duration-75 delay-75'>

        <span className='text-sm font-bold'>{nfts.length}/99</span>
        </div>
      </div>
    </div>
    </div>
      
  )
}

export default Hero
