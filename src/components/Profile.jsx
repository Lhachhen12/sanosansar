import React from "react";
import { useAuth } from "../context/AuthContext";
import Profile34 from "../Assets/photo1.png";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="flex flex-col items-center">
        <img
          src={Profile34}
          alt="Profile"
          className="h-24 w-24 rounded-full border-4 border-blue-500 mb-4"
          width={96}
          height={96}
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          Lhachhen Wanjyu Lama
        </h2>
        <p className="text-gray-500 mb-6">
          {user?.username || "Email not set"}
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-gray-600 font-medium">Full Name:</label>
          <p className="text-gray-800 font-semibold">Lhachhen Wanjyu Lama</p>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-600 font-medium">Email:</label>
          <p className="text-gray-800 font-semibold">
            {user?.username || "N/A"}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <label className="text-gray-600 font-medium">Phone Number:</label>
          <p className="text-gray-800 font-semibold">9860607898</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
