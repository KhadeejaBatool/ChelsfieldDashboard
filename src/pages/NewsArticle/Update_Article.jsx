import React, { useState } from "react";
import { Link } from "react-router-dom";

const UpdateArticle = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { title, address, image });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">Update Details</h1>
        <Link to="/add-article">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:ring focus:ring-blue-300">
            Add New
          </button>
        </Link>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <form onSubmit={handleSubmit} className="p-6 bg-gray-50 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Image *</label>
              <div className="relative border-dashed border-2 border-gray-300 rounded-md flex justify-center items-center hover:shadow-lg transition  aspect-square w-48 h-48">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-gray-500 hover:text-blue-500 flex flex-col items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mb-2 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M16.707 5.293a1 1 0 00-1.414 0L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 000-1.414z" />
                    </svg>
                    <span>Click to upload image</span>
                  </label>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
              </div>
            </div>

            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>

            {/* Address Input */}
            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                maxLength={200}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 resize-none focus:ring focus:ring-blue-300 focus:outline-none"
                required
              ></textarea>
              <span className="block text-xs text-gray-500 mt-1">
                {address.length}/200
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring focus:ring-gray-300"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Latest News Section */}
      <div className="mt-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>
        <ul className="space-y-4">
          <li className="border-b pb-4">
            <h3 className="text-lg font-semibold">
              Exciting News for Chelsfield CC!
            </h3>
            <p className="text-gray-600">
              CCC 3s will compete in the Kent Cricket League starting May 2025!
              We've secured Norton Sports Club as our new home ground.
            </p>
          </li>
          <li className="border-b pb-4">
            <h3 className="text-lg font-semibold">
              CCC First Year in Indoor Cricket League
            </h3>
            <p className="text-gray-600">
              Chelsfield Cricket Club is thrilled to join the indoor cricket
              league for the first time.
            </p>
          </li>
          <li>
            <h3 className="text-lg font-semibold">
              Ground Work Started for 2025 Season
            </h3>
            <p className="text-gray-600">
              We are excited to announce that groundwork for the 2025 season has
              officially commenced.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UpdateArticle;
