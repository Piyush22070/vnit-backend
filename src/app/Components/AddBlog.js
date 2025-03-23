"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaImage } from "react-icons/fa";
import { motion } from "framer-motion";

const backendUrl = "/api/data"; // Backend API URL

const PostInput = ({ onOpen }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-5 flex items-center cursor-pointer w-[100%]"
      onClick={onOpen}
    >
      <img
        src="/images/default.png"
        alt="User Profile"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-1 p-2 border rounded-full text-gray-500">
        Start a Blog
      </div>
    </div>
  );
};

const PostModal = ({ isOpen, onClose }) => {
  const [newPost, setNewPost] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePostSubmit = async () => {
    if (!newPost.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const postData = {
        title: "New Blog", // Default title
        content: newPost,
        name: "John Doe",
        category: "General",
        image, // Assuming the backend can handle a base64 image URL or path
        ownerImage: "/images/default.png",
      };

      const response = await axios.post(backendUrl, postData);

      if (response.status === 201) {
        setNewPost("");
        setImage(null);
        setImagePreview(null);
        onClose();
        alert("Blog posted successfully!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setImage(imageUrl); // Assuming backend accepts URL, adjust if it needs a file
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg p-5 w-96">
        <h2 className="text-lg font-semibold mb-3">Create a post</h2>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          placeholder="What do you want to talk about?"
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        ></textarea>

        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="w-full rounded-lg my-3" />
        )}

        <div className="flex items-center gap-3 mt-3">
          <label className="cursor-pointer flex items-center gap-2 text-blue-500">
            <FaImage /> Add Image
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-3">
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handlePostSubmit}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Post = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" space-y-5">
      <PostInput onOpen={() => setIsModalOpen(true)} />
      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Post;
