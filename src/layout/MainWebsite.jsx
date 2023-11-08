import { useEffect, useState } from "react";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";
import { Outlet } from "react-router-dom";
import "./GlobalLoader.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const MainWebsite = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate data loading in the background
  useEffect(() => {
    // Simulate data loading delay with a setTimeout
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 2 seconds
    }, 1500);
  }, []);

  return (
    <div>
      <ToastContainer />
      {isLoading ? (
        <div className="absolute w-full h-screen flex items-center justify-center">
          <span className="globalLoader">Get Ready to Explore...</span>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="max-w-[1300px] px-5 mx-auto mt-[80px]">
            <Outlet />
          </div>
          <Footer />
        </>
      )}

    </div>
  );
};

export default MainWebsite;
