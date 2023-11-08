import { useContext } from "react";
import useTitle from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { TbHeartMinus } from "react-icons/tb";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "react-query";
import { MagnifyingGlass } from "react-loader-spinner";
import { toast } from "react-toastify";

const MyWishlist = () => {
  const { user } = useContext(AuthContext);

  // Get WishlistCount
  const { data: myWishList = [], isLoading } = useQuery(
    ["my-wishlist"],
    async () => {
      const res = await fetch(
        `https://daily-blog-server.vercel.app/my-wishlist/email?email=${user?.email}`
      );
      return res.json();
    },
    {
      refetchInterval: 1000,
      refetchOnMount: true,
    }
  );
  console.log(myWishList);

  const handleRemoveWishList = (id) => {
    console.log(id);
    // Here Are Delete Operation Start
    fetch(`https://daily-blog-server.vercel.app/my-wishlist/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Deleted from wishlist");
      });
  };
  // Set Title
  useTitle("My Wishlist");

  return (
    <div className="w-full max-w-[1300px] mx-auto font-ageo relative mb-[50px] pb-[60px]">
      <h1 className="text-primary py-2 px-4 font-semibold text-[20px] mt-[100px] border">
        My Wishlist Blogs
      </h1>
      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
        {!isLoading ? (
          myWishList?.length > 0 ? (
            myWishList?.map((blog) => (
              <>
                <div className="shadow-xl border border-[#f4f3f359] rounded-[15px] flex flex-col items-center justify-center">
                  <div className="w-full max-h-[200px]">
                    <img
                      src={blog?.blogPhoto}
                      className="w-full h-full object-cover rounded-t-[15px]"
                      alt=""
                    />
                  </div>
                  <div className="px-6 pb-4 w-full text-left">
                    <p className="text-[14px] text-secondary mt-4 font-medium border shadow-sm py-0 px-2 rounded-full w-fit">
                      {blog?.category}
                    </p>
                    <h1 className="text-[20px] mt-1 lg:text-[22px] font-bold">
                      {blog?.blogTitle.length > 2 ? `${blog?.blogTitle.slice(0, 26)}...` : blog?.blogTitle}
                    </h1>
                    <p
                      className="text-base text-[#7d7d7d] tracking-wide text-left mb-3
            "
                    >
                      {blog?.shortDescription.length > 40
                        ? `${blog?.shortDescription.slice(0, 35)}...`
                        : blog?.shortDescription}
                    </p>
                    <div className="flex items-center justify-between w-full pb-2">
                      <Link
                        to={`/view-blog-details/${blog?._id}`}
                        className="text-base bg-primary text-white tracking-wide py-[7px] px-[10px] rounded-[6px] shadow-md hover:shadow-xl font-medium hover:bg-darkPrimary"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => handleRemoveWishList(blog?._id)}
                        className=" text-primary"
                      >
                        <TbHeartMinus size={22} />
                      </button>
                    </div>
                  </div>

                  <div className="border-t w-full">
                    <div className="flex items-center gap-1 px-6 py-3">
                      <img
                        src={
                          blog?.authorPhoto
                            ? blog?.authorPhoto
                            : "https://i.ibb.co/zXw7H0W/360-F-107434511-iar-F2z88c6-Ds6-Algtwot-HSAkt-WCd-YOn7.jpg"
                        }
                        alt="author"
                        className="w-[22px] h-[22px] rounded-full border-2 border-secondary"
                      />
                      <h3 className="text-[15px] text-secondary font-medium">
                        {blog?.authorEmail ? blog?.authorEmail : "Anonymous"}
                      </h3>
                    </div>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="mt-[56px] w-fit">
              <h1 className="text-[16px] text-center text-secondary font-medium">You wishlist is empty</h1>
            </div>
          )
        ) : (
          <div className="w-full col-span-full h-[100px] flex items-center justify-center">
            <MagnifyingGlass
              visible={true}
              height="55"
              width="55"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="white"
              color="#A27B5C"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
