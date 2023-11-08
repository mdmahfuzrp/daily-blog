import { CompactTable } from "@table-library/react-table-library/compact";
import "../assets/Style/CustomStyle.css";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { MagnifyingGlass } from "react-loader-spinner";

const FeaturedBlogs = () => {
  // Set Title
  useTitle("Featured Blog");
  // Get All Blogs
  const {
    data: nodes = [],
    refetch,
    isLoading,
  } = useQuery(["top-blogs"], async () => {
    const res = await fetch("https://daily-blog-server.vercel.app/top-blogs");
    return res.json();
  });

  console.log(nodes);

  const nodesWithSerialNumbers = nodes.map((node, index) => ({
    ...node,
    serialNumber: index + 1,
  }));

  const COLUMNS = [
    {
      label: (
        <>
          <span className="ml-[100px] text-primary font-semibold">
            SERIAL NO
          </span>
        </>
      ),
      renderCell: (item) => (
        <div className="bg-slate-200 h-[45px] ml-[10px] flex items-center justify-center rounded-md mr-[10px]">
          {item.serialNumber}
        </div>
      ),
    },
    {
      label: (
        <>
          <span className="ml-[100px] text-primary font-semibold">
            BLOG TITLE
          </span>
        </>
      ),
      renderCell: (item) => (
        <Link
          to={`/view-blog-details/${item?._id}`}
          className="h-[45px] bg-slate-200 text-blue-500 ml-[10px] flex items-center justify-center rounded-md font-medium underline mr-[10px]"
        >
          {item.blogTitle.length > 2
            ? `${item.blogTitle.substring(0, 30)}...`
            : item.blogTitle}
        </Link>
      ),
    },
    {
      label: (
        <>
          <span className="ml-[100px] text-primary font-semibold">
            BLOG OWNER
          </span>
        </>
      ),
      renderCell: (item) => (
        <div className="bg-slate-200 h-[45px] ml-[10px] flex items-center justify-center rounded-md mr-[10px]">
          {item.authorName}
        </div>
      ),
    },
    {
      label: (
        <>
          <span className="ml-[100px] text-primary font-semibold">
            OWNER IMAGE
          </span>
        </>
      ),
      renderCell: (item) => (
        <div className="py-[10px] flex items-center justify-center">
          <div className="h-[45px] bg-slate-200 w-full ml-[10px] flex items-center justify-center rounded-md mr-[10px] py-[5px]">
            <img
              src={
                item?.authorPhoto ||
                "https://i.ibb.co/zXw7H0W/360-F-107434511-iar-F2z88c6-Ds6-Algtwot-HSAkt-WCd-YOn7.jpg"
              }
              alt={item?.authorPhoto || "author"}
              className="w-[45px] h-[45px] rounded-lg border"
            />
          </div>
        </div>
      ),
    },
  ];

  const data = { nodes: nodesWithSerialNumbers };
  return (
    <div className="my-[100px] mb-[50px]">
      <h1 className="text-primary py-2 px-4 font-semibold text-[20px] mb-[20px] border">
        Top Featured Blogs
      </h1>

      {!isLoading ? (
        <div className="border py-[10px] px-[5px]">
          <CompactTable columns={COLUMNS} data={data} className="" />
        </div>
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
  );
};

export default FeaturedBlogs;
