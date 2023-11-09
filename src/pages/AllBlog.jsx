import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { TbHeartPlus } from "react-icons/tb";
import useTitle from "../hooks/useTitle";
import { BiSearch } from "react-icons/bi";
import { MagnifyingGlass } from "react-loader-spinner";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const AllBlog = () => {
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const handleAddWishList = (blog) => {
    if(!user){
      toast.error('Please you need to login first!');
      return;
    }
    const postData = {
      authorEmail: blog?.authorEmail,
      authorName: blog?.authorName,
      authorPhoto: blog?.authorPhoto,
      blogPhoto: blog?.blogPhoto,
      blogTitle: blog?.blogTitle,
      category: blog?.category,
      currentDate: blog?.currentDate,
      longDescription: blog?.longDescription,
      shortDescription: blog?.shortDescription,
      blogId: blog._id,
      userEmail: user?.email,
    };
    console.log(postData);
    fetch("https://daily-blog-server.vercel.app/all-wishlist", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("postdata", data);
        if (data.insertedId) {
          toast.success("Blog added to your wishlist");
        }
      });
  };


  const { totalBlogs } = useLoaderData(); // 7
  console.log(totalBlogs);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  console.log(totalBlogs);
  const totalPages = Math.ceil((totalBlogs || 0) / itemsPerPage);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);
  console.log(pageNumbers);

  // Set Title
  useTitle("All Blogs");

  // Data from other place
  const [searchName, setSearchName] = useState("");

  // Search by Category
  const [searchCategory, setSearchCategory] = useState("")
  console.log(searchCategory);

  const handleSetSearch = (event) => {
    const newValue = event.target.value;
    setSearchName(newValue);
    console.log(newValue);
  };

  console.log(searchName);

  let url = "";
  useEffect(() => {
    setIsLoading(true); // Set loading to true when the request starts

    searchName
      ? (url = `https://daily-blog-server.vercel.app/all-blogs?page=${currentPage}&limit=${itemsPerPage}&name=${searchName}&category=${searchCategory}`)
      : (url = `https://daily-blog-server.vercel.app/all-blogs?page=${currentPage}&limit=${itemsPerPage}&category=${searchCategory}&name=`);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data); // Set the fetched data
        setIsLoading(false); // Set loading to false when the request is completed
      });
  }, [currentPage, searchName, searchCategory]);

  const handleSetCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto font-ageo relative mb-[50px] ">
      <h1 className="text-primary py-2 px-4 font-semibold text-[20px] mt-[100px] border">
        Our All Blogs
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-between w-full ">
        <div className=" w-full sm:max-w-[300px] relative my-5">
          <input
            type="text"
            onChange={handleSetSearch}
            placeholder="Search any blogs..."
            className="border-primary w-full rounded-md font-medium py-2 pl-3 pr-[46px] outline-none border"
          />
          <div className="flex items-center justify-center px-[10px] text-white absolute top-0 right-0 bg-primary h-full rounded-r-md">
            <BiSearch size={23} />
          </div>
        </div>

        <div className="w-full sm:max-w-[180px]">
          <select
            id="category"
            name="category"
            autoComplete="category"
            className="block w-full rounded-md border border-primary text-primary font-medium sm:text-md sm:leading-6 outline-none cursor-pointer py-[9px] pl-1"
            onChange={(e) => setSearchCategory(e.target.value)}
          >
            <option value="">All Category</option>
            <option value="Sports">Sports</option>
            <option value="Politics">Politics</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Culture">Culture</option>
            <option value="Random">Random</option>
          </select>
        </div>
      </div>
      <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
        {!isLoading ? (
          blogs?.length > 0 ? (
            blogs?.map((blog) => (
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
                        onClick={() => handleAddWishList(blog)}
                        className=" text-primary"
                      >
                        <TbHeartPlus size={22} />
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
            "No Blogs Found"
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
      <div className="pagination p-5 w-fit ms-auto">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={`w-14 h-9 text-lg  ${
              currentPage === number
                ? "bg-primary text-white"
                : "bg-white text-primary border"
            }`}
            onClick={() => handleSetCurrentPage(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllBlog;
