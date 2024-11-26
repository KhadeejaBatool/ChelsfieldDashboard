import React, { useState } from "react";

const AddNewArticle = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { title, address, image });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className=" bg-gray-800 text-white py-4 px-6">
        <h1 className="text-xl font-bold">Add New Article</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium mb-2 block">Image *</label>
              <div className="relative border-dashed border-2 border-gray-300 rounded-md flex justify-center items-center hover:shadow-lg transition aspect-square w-48 h-48">
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
              <label className="text-sm font-medium mb-2 block">Title </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter title"
                required
              />
            </div>

            {/* Address Input */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Description </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                placeholder="Enter address"
                maxLength={2000}
                required
              ></textarea>
              <span className="text-xs text-gray-500 mt-1 block">
                {address.length}/2000
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewArticle;
