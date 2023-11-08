import { FaPhotoVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import useTitle from "../hooks/useTitle";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AddBlog = () => {
  const {user} = useContext(AuthContext);
  console.log(user);
  // Set Title
  useTitle("Add Blog");

  const handleAddToySubmit = (event) => {
    event.preventDefault();
    const currentDate = new Date().toLocaleString();

    const form = event.target;
    const blogTitle = form.blogTitle.value;
    const category = form.category.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const blogPhoto = form.blogPhoto.value;
    const authorName = user?.displayName;
    const authorEmail = user?.email;
    const authorPhoto = user?.photoURL;

    if(!blogTitle || !category || !shortDescription || !longDescription || !blogPhoto || !authorName || !authorEmail){
      return toast.error('Please fill the field')
    }

    const newBlogPost = {
      blogTitle,
      category,
      shortDescription,
      longDescription,
      blogPhoto,
      authorName,
      authorEmail,
      currentDate,
      authorPhoto,
    };

    fetch("https://daily-blog-server.vercel.app/add-blog", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBlogPost),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('postdata', data);
        if (data.insertedId) {
          toast.success('Blog published')
          form.reset();
        }
      });
  };

  return (
    <div className="pt-[20px]">
      <h1 className="text-primary py-2 px-4 font-semibold text-[20px] mb-[20px] border">
        Add A New Blogs
      </h1>
      <div className=" my-7 mx-auto">
        <form onSubmit={handleAddToySubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className=" text-xl font-semibold leading-7 text-secondBlack">
                Post a <span className="text-primary">Blog</span>
              </h2>
              <p className="mt-1 text-base font-medium text-secondary leading-6 ">
                Fill up the all information and post a blog as a author
              </p>

              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="toyName"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Blog title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-error sm:max-w-md">
                      <span className="flex select-none items-center pl-3 text-secondBlack font-medium sm:text-md">
                        Blog title/
                      </span>
                      <input
                        type="text"
                        name="blogTitle"
                        id="toyName"
                        autoComplete="toyName"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 rounded-r-md ring-inset focus:ring-2 focus:ring-inset focus:ring-error sm:text-md sm:leading-6 outline-none"
                        placeholder="example have data"
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="category"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2">
                    <select
                      id="category"
                      name="category"
                      autoComplete="category"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-error sm:max-w-xs sm:text-md sm:leading-6 outline-none"
                    >
                      <option>Sports</option>
                      <option>Politics</option>
                      <option>Entertainment</option>
                      <option>Culture</option>
                      <option>Random</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Short Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="shortDescription"
                      rows={3}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-error placeholder:text-gray-400 outline-0 sm:text-md sm:leading-6"
                      defaultValue={""}
                      placeholder="Write a short description"
                    />
                  </div>
                  <p className="mt-3 text-md leading-6 text-gray-600">
                    Write a few sentences description.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="about"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Write your blog here (Long Description)
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="about"
                      name="longDescription"
                      rows={3}
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-error placeholder:text-gray-400 outline-0 sm:text-md sm:leading-6"
                      defaultValue={""}
                      placeholder="Write your blog post"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="toy-photo"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Blog thumbnail
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center w-full md:w-10/12">
                      <FaPhotoVideo
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-md leading-6 text-gray-600">
                        <input
                          id="toy-photo"
                          name="blogPhoto"
                          type="text"
                          className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-error placeholder:text-gray-400 outline-0 sm:text-md sm:leading-6"
                          placeholder="PhotoURL"
                        />
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        Choose only http or https blog thumbnail link
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-md leading-6 text-gray-600">
                Please provide valid information for submit a blog
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="authorName"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Author name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="authorName"
                      id="authorName"
                      autoComplete="authorName"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-error bg-slate-200 placeholder:text-gray-400  sm:text-md sm:leading-6 outline-none"
                      placeholder="Author name"
                      value={user?.displayName}
                      disabled
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="authorEmail"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Author email
                  </label>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="authorEmail"
                      id="authorEmail"
                      autoComplete="authorEmail"
                      className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-error bg-slate-200 placeholder:text-gray-400  sm:text-md sm:leading-6 outline-none"
                      placeholder="Author email"
                      value={user?.email}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-3">
            <Link
              to="/"
              type="button"
              className="bg-gray-500 py-2 hover:shadow-lg px-4 rounded-md text-md font-semibold leading-6 text-white "
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md bg-primary px-4 py-2 text-md font-semibold text-white hover:shadow-lg shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
