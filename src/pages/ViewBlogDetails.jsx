import { BiSolidEdit } from "react-icons/bi";
import Review from "../component/ViewBlogDetails/Review";
import SharedModal from "../Shared/SharedModal";
import { useContext, useState } from "react";
import EditBlog from "./EditBlog";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { MagnifyingGlass } from "react-loader-spinner";

const ViewBlogDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  console.log(user);

  // Get WishlistCount
  const { data: blogDetails = [], isLoading } = useQuery(
    ["my-wishlist"],
    async () => {
      const res = await fetch(
        `https://daily-blog-server.vercel.app/blog-details/${id}`
      );
      return res.json();
    },
    {
      refetchInterval: 1000,
      refetchOnMount: true,
    }
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleAction = (data) => {
    setModalTitle("Edit Your Blog");
    setModalOpen(true);
    setModalContent(
      <EditBlog key={data.id} data={data} setModalOpen={setModalOpen} />
    );
  };

  // console.log(blogDetails);
  return (
    <div className="pt-[20px] mb-[50px]">
      <h1 className="text-primary py-2 px-4 font-semibold text-[20px]  border mb-[20px]">
        View Blog Details
      </h1>

      {isLoading ? (
        <>
          <div>
            <img
              src={blogDetails?.blogPhoto}
              className="w-full max-w-[550px] rounded-lg mx-auto max-h-[300px] object-cover"
              alt=""
            />
            <h1 className="text-[24px] capitalize lg:text-[30px] font-bold text-center mt-2 mb-4 text-secondBlack">
              {blogDetails?.blogTitle}
            </h1>
            <div className="flex items-center justify-between w-full">
              <div>
                <p className="text-secondBlack text-opacity-70 text-[15px] font-semibold">
                  Written by -
                </p>
                <div className="flex flex-wrap items-center mb-4 lg:mb-0 mt-1">
                  <img
                    className="object-cover border-2 border-primary mb-1 mr-2 rounded-full shadow w-9 h-9 lg:mb-0"
                    src={
                      blogDetails?.authorPhoto ||
                      "https://i.ibb.co/zXw7H0W/360-F-107434511-iar-F2z88c6-Ds6-Algtwot-HSAkt-WCd-YOn7.jpg"
                    }
                  />
                  <div>
                    <h2 className="mr-2 text-[13px] font-medium text-gray-700 dark:text-gray-400">
                      {blogDetails?.authorName}
                    </h2>
                    <p className="text-[11px] font-medium text-gray-400 dark:text-gray-400">
                      {" "}
                      {blogDetails?.currentDate}
                    </p>
                  </div>
                </div>
              </div>
              {blogDetails?.category && (
                <div className="border py-[1px] px-3 shadow-sm rounded-full">
                  {blogDetails?.category}
                </div>
              )}
              {blogDetails?.authorEmail === user?.email && (
                <div>
                  <button
                    type="button"
                    onClick={() => handleAction(blogDetails)}
                    className="text-base text-secondBlack duration-150 flex items-center justify-end gap-1 hover:text-primary font-medium"
                  >
                    <BiSolidEdit size={20} className="mt-[-2px]" />
                    Edit Blog
                  </button>
                </div>
              )}
            </div>

            <div className="mt-[30px] ">
              <p className="text-secondBlack text-base font-medium flex items-center gap-2">
                <span className="bg-primary text-white px-[6px] text-[15px] font-medium tracking-wide pb-[2px] rounded-[4px]">
                  Summery:
                </span>
                {blogDetails?.shortDescription}
              </p>
            </div>

            <div className="mt-[15px] border  rounded-lg py-2 px-3">
              <p className="text-secondBlack text-opacity-75 text-base font-medium flex items-center gap-2">
                {blogDetails?.longDescription}
              </p>
            </div>
          </div>
          <div className="mt-[30px]">
            <Review data={blogDetails} />
          </div>
        </>
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

      <SharedModal
        title={modalTitle}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalContent={modalContent}
      />
    </div>
  );
};

export default ViewBlogDetails;
