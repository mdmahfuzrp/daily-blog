import { Link, useLocation } from "react-router-dom";
import { CgMenuRightAlt } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { LogoDark, LogoWhite } from "../ui";
import { AuthContext } from "../Provider/AuthProvider";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logOutUser } = useContext(AuthContext);

  // Get WishlistCount
  const {
    data: totalWishlist = [],
  } = useQuery(["all-wishlist"], async () => {
    const res = await fetch(`https://daily-blog-server.vercel.app/all-wishlist/${user?.email}`);
    return res.json();
  }, {
    refetchInterval: 1000,
    refetchOnMount: true,
  });
  // console.log(totalWishlist);
  
  const itemList = (
    <>
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className={`${
          isMenuOpen
            ? location.pathname === "/"
              ? "text-secondBlack  font-semibold border-b-[3px] border-b-secondBlack w-fit mx-auto"
              : "text-secondBlack  font-semibold"
            : location.pathname === "/"
            ? "text-secondBlack  font-semibold border-b-[3px] border-b-primary w-fit mx-auto"
            : "text-secondBlack hover:text-primary font-semibold"
        } duration-150 cursor-pointer`}
      >
        Home
      </Link>

      {user?.accessToken && (
        <Link
          to="/add-blog"
          onClick={() => setIsMenuOpen(false)}
          className={`${
            isMenuOpen
              ? location.pathname === "/add-blog"
                ? "text-secondBlack  font-semibold border-b-[3px] border-b-secondBlack w-fit mx-auto"
                : "text-secondBlack  font-semibold"
              : location.pathname === "/add-blog"
              ? "text-secondBlack  font-semibold border-b-[3px] border-b-primary w-fit mx-auto"
              : "text-secondBlack hover:text-primary font-semibold"
          } duration-150 cursor-pointer`}
        >
          Add Blog
        </Link>
      )}
      <Link
        to="/all-blogs"
        onClick={() => setIsMenuOpen(false)}
        className={`${
          isMenuOpen
            ? location.pathname === "/all-blogs"
              ? "text-secondBlack  font-semibold border-b-[3px] border-b-secondBlack w-fit mx-auto"
              : "text-secondBlack  font-semibold"
            : location.pathname === "/all-blogs"
            ? "text-secondBlack  font-semibold border-b-[3px] border-b-primary w-fit mx-auto"
            : "text-secondBlack hover:text-primary font-semibold"
        } duration-150 cursor-pointer`}
      >
        All Blogs
      </Link>
      <Link
        to="/featured-blogs"
        onClick={() => setIsMenuOpen(false)}
        className={`${
          isMenuOpen
            ? location.pathname === "/featured-blogs"
              ? "text-secondBlack  font-semibold border-b-[3px] border-b-secondBlack w-fit mx-auto"
              : "text-secondBlack  font-semibold"
            : location.pathname === "/featured-blogs"
            ? "text-secondBlack  font-semibold border-b-[3px] border-b-primary w-fit mx-auto"
            : "text-secondBlack hover:text-primary font-semibold"
        } duration-150 cursor-pointer`}
      >
        Featured Blogs
      </Link>

      {user?.accessToken && (
        <Link
          to="/my-wishlist"
          onClick={() => setIsMenuOpen(false)}
          className={`relative ${
            isMenuOpen
              ? location.pathname === "/my-wishlist"
                ? "text-secondBlack  font-semibold border-b-[3px] border-b-secondBlack w-fit mx-auto"
                : "text-secondBlack  font-semibold"
              : location.pathname === "/my-wishlist"
              ? "text-secondBlack  font-semibold border-b-[3px] border-b-primary w-fit mx-auto"
              : "text-secondBlack hover:text-primary font-semibold"
          } duration-150 cursor-pointer`}
        >
          Wishlist
          <span
            className={`bg-secondary absolute top-[-5px] ${
              isMenuOpen ? "right-[10px] md:right-[-25px]" : "right-[-30px]"
            } text-white p-0 w-fit h-[17px] px-2 pb-[2px] text-[13px] flex items-center justify-center rounded-full`}
          >
            {totalWishlist?.totalWishlist || 0}
          </span>
        </Link>
      )}
    </>
  );

  // For Scroll Shadow in Navbar
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logOutUser()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div
      className={`${
        isVisible && "shadow-md duration-150 "
      } fixed border-b-[3px] border-b-primary w-full bg-white z-[999] top-0`}
    >
      <div className="hidden md:flex  items-center justify-between max-w-[1300px] mx-auto py-4 px-5 pl-[18px]">
        <div className="mt-[-3px]">
          <LogoDark />
        </div>
        <div>
          <ul className="flex gap-4 text-base font-medium">{itemList}</ul>
        </div>

        {!user?.accessToken ? (
          <div className="flex gap-3 items-center">
            <Link
              to="/login"
              className="text-base hidden lg:flex hover:underline hover:text-primary font-[600]"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="bg-primary hover:bg-darkPrimary duration-200  text-white text-base hover:shadow-xl shadow-md font-[500] py-[6px] px-[14px] rounded-md"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleLogout}
              type="button"
              className="flex items-center gap-1 hover:shadow-lg duration-100 text-[15px] font-medium border h-[30px] rounded-full px-2"
            >
              <RiLogoutCircleRLine />
              Logout
            </button>
            <img
              src={
                user?.photoURL ||
                "https://i.ibb.co/zXw7H0W/360-F-107434511-iar-F2z88c6-Ds6-Algtwot-HSAkt-WCd-YOn7.jpg"
              }
              alt=""
              className="w-[36px] h-[36px] rounded-full border-[3px] object-cover border-primary"
            />
          </div>
        )}
      </div>

      <div className="py-4 block md:hidden px-5 pl-[18px] max-w-[1300px] mx-auto">
        <div className="flex items-center justify-between">
          {isMenuOpen ? (
            <div className="z-[1000]">
              <LogoWhite />
            </div>
          ) : (
            <LogoDark />
          )}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="z-[99999]"
          >
            <CgMenuRightAlt
              size={28}
              className={`${
                isMenuOpen
                  ? "text-white hover:text-secondBlack"
                  : "text-primary hover:text-secondBlack"
              }  duration-100`}
            />
          </button>
        </div>
        <div
          className={`absolute flex justify-center items-center top-0 left-0 bg-primary duration-200 h-screen z-[999] w-full ${
            isMenuOpen ? "left-[0] opacity-100 ml-0 " : "left-[-100%] opacity-0"
          } transition-all duration-300 ease-in`}
        >
          <ul
            className={`text-center text-white text-base font-medium tracking-wide flex flex-col gap-4 w-fit`}
          >
            {itemList}

            {user?.accessToken ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  type="button"
                  className="flex items-center gap-1 hover:shadow-lg duration-100 text-base font-semibold border border-secondBlack text-secondBlack h-[30px] rounded-full px-2"
                >
                  <RiLogoutCircleRLine />
                  Logout
                </button>
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/zXw7H0W/360-F-107434511-iar-F2z88c6-Ds6-Algtwot-HSAkt-WCd-YOn7.jpg"
                  }
                  alt=""
                  className="w-[40px] h-[40px] rounded-full border-[3px] object-cover border-secondBlack"
                />
              </div>
            ) : (
              <div className="flex gap-3 items-center mt-3">
                <Link
                  to="/login"
                  className="bg-secondBlack hover:font-semibold hover:text-primary duration-200  text-white text-base hover:shadow-xl shadow-md font-[500] py-[6px] px-[14px] rounded-md"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-secondBlack hover:text-primary duration-200  text-white text-base hover:shadow-xl hover:font-semibold shadow-md font-[500] py-[6px] px-[14px] rounded-md"
                >
                  Register
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
