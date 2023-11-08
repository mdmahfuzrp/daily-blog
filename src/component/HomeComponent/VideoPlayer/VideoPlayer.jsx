import videoplayer from "../../../assets/videoplayer.png";
import './VideoPlayer.css'
import {AiFillPlayCircle} from 'react-icons/ai'
const VideoPlayer = () => {
  return (
    <div className="flex w-full mt-[60px] max-w-[1100px] mx-auto flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
      <div className="flex flex-col text-center md:text-left justify-between h-full w-full max-w-[450px] gap-4">
        <div>
          <h1 className="text-[20px] mt-4 capitalize lg:text-[22px] font-bold text-primary">
            Earn money with our daily blog.
          </h1>
          <p className="text-[#7d7d7d] mt-4 mb-4">
          Once {"you've"} established your blog and grown your audience, there are several monetization options to consider. Select aligned with your interests for your daily blog and for more details <span>watch the video</span>
          </p>
        </div>
        <div>
          <button className="text-base font-medium border tracking-wide py-[4px] px-[15px] rounded-full hover:shadow-md duration-150">
            Watch Video
          </button>
        </div>
      </div>
      <div className="flex w-full max-w-[500px] relative">
        <img src={videoplayer} alt="" className="rounded-lg object-cover"/>

        <div className="absolute left-0 top-0 w-full h-full bg-[#00000079] rounded-lg flex items-center justify-center cursor-default">
          <span className="playerLoader"></span>
          <div className="absolute w-full h-full flex items-center justify-center"><AiFillPlayCircle className="text-white cursor-pointer rounded-full  z-[2]" size={50} /></div>
          <div className="absolute w-full h-full flex items-center justify-center ">
            <div className="w-[20px] cursor-pointer h-[20px] bg-primary  z-[1]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
