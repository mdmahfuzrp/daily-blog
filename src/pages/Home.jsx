import { ToastContainer } from "react-toastify";
import Header from "../component/HomeComponent/Header";
import RecentBlog from "../component/HomeComponent/RecentBlog/RecentBlog";
import VideoPlayer from "../component/HomeComponent/VideoPlayer/VideoPlayer";
import Testimonial from "../component/HomeComponent/Testimonial/Testimonial";
import Subscribe from "../component/HomeComponent/Subscribe/Subscribe";
import useDefaultTitle from "../hooks/useDefaultTitle";

const Home = () => {
  useDefaultTitle('Daily Blog');
  return (
    <div className="">
      <ToastContainer />
      <div className="" id="home">
        <Header />
      </div>
      <div id="recent-blog">
        <RecentBlog />
        <VideoPlayer />
      </div>
      <div id="testimonial">
        <Testimonial />
      </div>
      <div className="" id="subscribe">
        <Subscribe />
      </div>
    </div>
  );
};

export default Home;
