"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp, FaCommentDots, FaShare } from "react-icons/fa";

const Post = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/data");
        
        // Ensure the response data is in array format
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setPosts([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!posts.length) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto space-y-5">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md rounded-lg p-5">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-3">
            <img
              src={post.ownerImage}
              alt={post.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="font-semibold text-lg">{post.name}</h2>
              <p className="text-gray-500 text-sm">{post.category}</p>
            </div>
          </div>

          {/* Post Content */}
          <h3 className="font-semibold text-xl">{post.title}</h3>
          <p className="text-gray-800 mb-3">{post.content}</p>

          {post.image && (
            <img src={post.image} alt="Post" className="w-full rounded-lg mb-3" />
          )}

          {/* Actions */}
          <div className="flex justify-between text-gray-600 text-sm">
            <button className="flex items-center gap-1 hover:text-blue-500">
              <FaThumbsUp /> {post.votes.upvotes} Likes
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <FaCommentDots /> {post.comments.length} Comments
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500">
              <FaShare /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
