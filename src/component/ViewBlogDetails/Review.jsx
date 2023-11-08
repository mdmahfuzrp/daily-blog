import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const Review = ({ data }) => {
  const { user } = useContext(AuthContext);
  console.log(data);
  console.log(user);

  const currentDate = new Date().toLocaleString();

  // Get All comments
  const { data: comments = [], isLoading } = useQuery(
    ["all-comments"],
    async () => {
      const res = await fetch(
        `https://daily-blog-server.vercel.app/all-comments/blogId?blogId=${data?._id}`
      );
      return res.json();
    },
    {
      refetchInterval: 1000,
      refetchOnMount: true,
    }
  );

  console.log(comments);

  const handleAddComment = (e) => {
    e.preventDefault();
    const form = e.target;
    const message = form.message.value;

    if (!message) {
      toast.error("Please provide a comment");
    }

    const postComment = {
      message,
      userName: user?.displayName,
      userEmail: user?.email,
      blogId: data?._id,
      commentTime: currentDate,
      userPhoto: user?.photoURL || "",
    };

    console.log(postComment);

    fetch("https://daily-blog-server.vercel.app/all-comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(postComment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("postComment", data);
        if (data.insertedId) {
          toast.success("Comment posted");
          form.reset();
        }
      });
  };

  return (
    <section className=" ">
      <div className="w-full max-w-[1300px] py-6 mx-auto lg:py-4">
        <div className="">
          {user?.email !== data?.authorEmail && (
            <div>
              <div className="rounded-md">
                <h2 className="mb-4 text-xl text-primary font-semibold">
                  Leave a comment
                </h2>
                <form action="" className="" onSubmit={handleAddComment}>
                  <div className="mb-3">
                    <label
                      htmlFor="firstname"
                      className="block mb-0 font-medium text-gray-700 dark:text-gray-400"
                    >
                      Your comment *
                    </label>
                    <textarea
                      type="message"
                      placeholder="write a comment"
                      name="message"
                      className="block w-full px-4 leading-tight bg-white bg-opacity-60 outline-none border border-primary py-2 min-h-[90px] text-secondBlack rounded-md"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="firstname"
                      className="block mb-0 font-medium text-gray-700 dark:text-gray-400"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder=" name"
                      className="block w-full px-3 py-[10px] mb-3 leading-tight text-secondBlack bg-slate-200 bg-opacity-60 outline-none border-primary border rounded-md"
                      defaultValue={user?.displayName}
                      disabled
                    />
                  </div>
                  <div className=" mb-4">
                    <label
                      htmlFor="firstname"
                      className="block mb-0 font-medium text-gray-700 dark:text-gray-400"
                    >
                      Your Email *
                    </label>
                    <input
                      type="text"
                      placeholder="abc@gmail.com"
                      className="block bg-slate-200 w-full px-3 py-[10px] mb-3 leading-tight text-secondBlack  bg-opacity-60 outline-none border-primary border rounded-md"
                      defaultValue={user?.email}
                      disabled
                    />
                  </div>
                  <div className="">
                    <button className="primaryBtn hover:shadow-xl">
                      Submit Comment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4">
            <h1 className="border rounded-full py-[2px] px-3 w-fit mb-2">All Comments</h1>
            {!isLoading
              ? comments.length > 0
                ? comments.map((comment) => (
                    <>
                      <div className="p-6 bg-white bg-opacity-60 rounded-md shadow-md mb-5 border">
                        <div className="items-center justify-between block mb-4 lg:flex">
                          <div className="flex flex-wrap items-center mb-4 lg:mb-0">
                            <img
                              className="object-cover border-2 border-primary mb-1 mr-2 rounded-full shadow w-12 h-12 lg:mb-0"
                              src={
                                comment?.userPhoto ||
                                "https://i.ibb.co/zXw7H0W/360-F-107434511-iar-F2z88c6-Ds6-Algtwot-HSAkt-WCd-YOn7.jpg"
                              }
                            />
                            <div>
                              <h2 className="mr-2 text-lg font-medium text-gray-700 dark:text-gray-400">
                                {comment?.userName}
                              </h2>
                              <p className="text-sm font-medium text-gray-400 dark:text-gray-400">
                                {" "}
                                {comment?.commentTime}
                              </p>
                            </div>
                          </div>
                          <div>
                            <ul className="flex mb-1">
                              <li>
                                <Link href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="w-4 mr-1 text-primary bi bi-star-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                </Link>
                              </li>
                              <li>
                                <Link href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="w-4 mr-1 text-primary bi bi-star-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                </Link>
                              </li>
                              <li>
                                <Link href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="w-4 mr-1 text-primary bi bi-star-fill"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                                  </svg>
                                </Link>
                              </li>
                              <li>
                                <Link href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="w-4 mr-1 text-primary bi bi-star-half"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"></path>
                                  </svg>
                                </Link>
                              </li>
                              <li>
                                <Link href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="w-4 mr-1 text-primary bi bi-star-half"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z"></path>
                                  </svg>
                                </Link>
                              </li>
                            </ul>
                            <p className="text-secondBlack opacity-50 text-[12px] font-medium">
                              10 hr ago
                            </p>
                          </div>
                        </div>
                        <p className="mb-4 text-base text-secondBlack font-medium text-opacity-60">
                          {comment?.message}
                        </p>
                        <div className="flex items-center">
                          <div className="flex mr-3 text-sm text-gray-700 dark:text-gray-400">
                            <Link href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="w-4 h-4 mr-1 text-primary bi bi-hand-thumbs-up-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z"></path>
                              </svg>
                            </Link>
                            <span>Like</span>
                          </div>
                          <div className="flex text-sm text-gray-700 dark:text-gray-400">
                            <Link href="#">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="w-4 h-4 mr-1 text-primary bi bi-chat"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"></path>
                              </svg>
                            </Link>
                            <span>Reply</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
                : "No Comments Available"
              : "Loading..."}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
