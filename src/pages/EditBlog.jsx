import { useEffect, useState } from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EditBlog = ({ setModalOpen, data }) => {
  console.log(data._id);
  const handleUpdate = (e) => {
    e.preventDefault();

    const form = e.target;
    const blogTitle = form.blogTitle.value;
    const shortDescription = form.shortDescription.value;
    const longDescription = form.longDescription.value;
    const blogPhoto = form.blogPhoto.value;

    const updateBlog = {
      blogTitle,
      shortDescription,
      longDescription,
      blogPhoto,
    };

    console.log(updateBlog);

    fetch(`https://daily-blog-server.vercel.app/update-blog/${data?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateBlog),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Blog Updated Successful");
          setModalOpen(false);
        } else {
          toast.error("Not changed anything");
          setModalOpen(false);
        }
      });
  };

  return (
    <form onSubmit={handleUpdate}>
      <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 ">
        <div className="col-span-full">
          <label
            htmlFor="toyName"
            className="block text-md font-medium leading-6 text-gray-900"
          >
            Blog title
          </label>
          <div className="mt-2">
            <div className="flex w-full rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-error">
              <span className="flex select-none items-center pl-3 text-secondBlack font-medium sm:text-md">
                Blog title/
              </span>
              <input
                type="text"
                name="blogTitle"
                id="blogTitle"
                autoComplete="blogTitle"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 rounded-r-md ring-inset focus:ring-2 focus:ring-inset focus:ring-error sm:text-md sm:leading-6 outline-none"
                placeholder="example have data w-full"
                defaultValue={data?.blogTitle}
              />
            </div>
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
              defaultValue={data?.shortDescription || ""}
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
              defaultValue={data?.longDescription || ""}
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
                  defaultValue={data?.blogPhoto || ""}
                />
              </div>
              <p className="text-xs leading-5 text-gray-600">
                Choose only http or https blog thumbnail link
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-3">
        <Link
          onClick={() => setModalOpen(false)}
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
  );
};

export default EditBlog;
