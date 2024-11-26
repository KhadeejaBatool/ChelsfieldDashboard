import React, { useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Springfield",
    profilePicture: "/assets/images/profile-placeholder.png",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    // Save the updated user data here
    console.log("User updated:", user);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold">User Profile</h1>
        <button
          onClick={handleEditToggle}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow focus:ring focus:ring-blue-300"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
        <div className="flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-6">
          {/* Profile Picture */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <label
                  htmlFor="profilePicture"
                  className="cursor-pointer text-white"
                >
                  Change
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setUser((prevUser) => ({
                      ...prevUser,
                      profilePicture: URL.createObjectURL(e.target.files[0]),
                    }))
                  }
                />
              </div>
            )}
          </div>

          {/* User Information */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800">{user.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800">{user.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800">{user.phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={user.address}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring focus:ring-blue-300 focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-800">{user.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end p-6 space-x-4">
            <button
              onClick={handleEditToggle}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 focus:ring focus:ring-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveChanges}
              className="px-5 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:ring focus:ring-blue-300"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
