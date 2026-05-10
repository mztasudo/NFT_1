import ethlogo from "../assets/ethlogo.png"

const Footer = () => {
  return (
    <div className="w-full flex md:justify-center justify-between
    items-center flex-col p-4 gradient-bg-footer">
        <div className="w-full flex flex-col
         justify-between items-center my-4">
            
            <div className="flex justify-center items-center mt-2">
                  <img className= "w-4" src={ethlogo} alt="logo" />
                  <span className="text-white text-sm">ETI &copy; 2016 - &infin; with love mike!</span>
            </div>
        </div>
      
    </div>
  )
}

export default Footer
