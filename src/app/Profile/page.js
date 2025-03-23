"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    image:
      "https://i.pinimg.com/736x/63/0c/4d/630c4de5e2db2f3f325410a9d70e43bd.jpg",
    bio: "Passionate blogger sharing insights on technology, coding, and AI.",
    summary: `I am a dedicated tech blogger, writing about the latest trends in web 
    development, AI, and software engineering. With years of experience in coding and 
    content creation, I strive to provide valuable insights, tutorials, and guides for 
    developers and tech enthusiasts. My articles cover a range of topics, including JavaScript, 
    React, MERN stack, and the ever-evolving world of artificial intelligence.`,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUserData((prev) => ({
        ...prev,
        name: storedUser.name || "User Name",
        email: storedUser.email || "user@example.com",
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        name: "Guest User",
        email: "guest@example.com",
      }));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 relative mt-12">
      {/* Radial Dots Background */}
      <div className="absolute inset-0 bg-gray-200 bg-[radial-gradient(circle,rgba(0,0,0,0.1) 1px,transparent 1px)] bg-[size:20px_20px]"></div>

      <div className="relative max-w-4xl w-full p-8 bg-white shadow-lg rounded-2xl">
        {/* Profile Header */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <Image
            src={userData.image}
            alt={userData.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-full border-4 border-blue-500 transform hover:scale-105 transition duration-300"
          />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {userData.name}
          </h1>
          <p className="text-lg text-gray-600">{userData.email}</p>
        </div>

        {/* Bio Section */}
        <div className="relative z-10 mt-6 p-6 bg-white rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-semibold text-blue-700">About Me</h2>
          <p className="text-gray-700 mt-3 leading-relaxed">{userData.bio}</p>
        </div>

        {/* Blogger Summary */}
        <div className="relative z-10 mt-6 p-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-center">My Blogging Journey</h2>
          <p className="mt-3 leading-relaxed">{userData.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
