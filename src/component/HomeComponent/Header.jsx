import { Link } from "react-router-dom";
import { PlayStyleIcon } from "../../assets/icons";
import menIcon from "../../assets/men.png";
import ideaArrow from '../../assets/images/ideaarrow.png'

const Header = () => {
  return (
    <div className="mt-[70px] sm:mt-[120px] max-w-[1300px] overflow-x-hidden">
      <div className="flex flex-col md:flex-row items-center  md:justify-evenly gap-7">
        <div className="w-full md:mi-w-[70%]  flex items-center flex-col text-center mt-[30px] lg:mt-[80px]  xl:mt-[30px] md:text-left md:items-start">
          <h1 className="text-[35px] lg:text-[40px] xl:text-[50px] mt-[0px] md:mt-[-40px] lg:mt-[-150px] leading-[50px] lg:leading-[60px] font-[800] text-secondBlack  mb-2">
            <span className="text-primary">Scroll Down</span> To Get <br />
             Experience With Our <br />
            <span className="text-primary">Recent Daily Blogs</span>
          </h1>
          <p className="flex text-base lg:text-[18px] mb-8 mt-3 sm:max-w-[400px] lg:max-w-[550px] text-secondary font-medium">
            We have 100k+ monthly active user all over world, to write and read some amazing blogs join with us now.
          </p>
          <div className="flex items-center gap-2">
            <Link to="/login" className="bg-primary hover:bg-darkPrimary duration-150  text-white text-[18px] hover:shadow-xl shadow-md font-[500] py-[13px] px-[14px] rounded-md tracking-wider">
              Get Started
            </Link>

            <Link to='/login' className="flex items-center gap-1">
              <PlayStyleIcon />
              <p className="text-[18px] font-medium tracking-wide text-secondBlack hover:ml-1 duration-150 cursor-pointer">Learn More</p>
            </Link>
          </div>

        </div>

        <div className="max-w-[500px] relative w-full ">
            
        <img src={ideaArrow} className="absolute  top-[50PX] left-[0px] rotate-[20deg] z-[-1]" alt="" />

          <img src={menIcon} className="w-full z-[999]" alt="" />
        </div>
        
      </div>
      
      <div className="w-full hidden absolute bottom-[50px] left-[0] lg:flex flex-col gap-[10px] items-center justify-center">
          <a href="#recent-blog" className="mouseLoader"></a>
          <small className="capitalize text-[15px] font-normal  text-[#848484]">Scroll to see our recent blogs</small>
          </div>

    </div>
  );
};

export default Header;
