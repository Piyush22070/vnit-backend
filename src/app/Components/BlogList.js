"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import LoadingScreen from './Loading'
import { ThumbsUp, ThumbsDown, MessageCircle, Repeat, Send, MoreHorizontal, X } from "lucide-react";

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/data");

      // Sort posts by upvotes in descending order
      const sortedPosts = response.data.sort((a, b) => b.votes.upvotes - a.votes.upvotes);

      setPosts(sortedPosts);
      setError(null);
    } catch (err) {
      setError("Failed to fetch posts. Please try again later.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <div className="flex justify-center p-8"><LoadingScreen/></div>;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto">
      {posts.map((post) => (
        <Post key={post.id} post={post} refreshPosts={fetchPosts} />
      ))}
    </div>
  );
}

function Post({ post, refreshPosts }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} • ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  const toggleComments = () => setShowComments(!showComments);

  const handleVote = async (type) => {
    if (loadingAction) return;
    setLoadingAction(true);

    try {
      await axios.put(`/api/data/${post.id}`, { action: type });
      refreshPosts();
    } catch (error) {
      console.error("Error updating votes:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    setLoadingAction(true);

    try {
      await axios.put(`/api/data/${post.id}`, {
        action: "addComment",
        comment: { content: commentText, author: "John Doe" },
      });
      setCommentText("");
      refreshPosts();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setLoadingAction(true);

    try {
      await axios.delete(`/api/data/${post.id}`);
      refreshPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      {/* Post Header */}
      <div className="flex items-start p-4">
        <img src={"/images/default.png"} alt={post.name} className="w-12 h-12 rounded-full mr-3" />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-base">{post.name}</h3>
              <p className="text-gray-500 text-sm">{post.category} • {formatDate(post.createdAt)}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                <MoreHorizontal size={20} />
              </button>
              <button onClick={handleDelete} className="text-gray-500 hover:bg-gray-100 p-1 rounded-full">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <h2 className="font-semibold text-lg mb-2">{post.title}</h2>
        <p className="text-gray-800 mb-4">{post.content}</p>
      </div>

      {/* Post Image if available */}
      {post.image && (
        <div className="w-full">
          <img src={'/images/sample.jpg'} alt={post.title} className="w-full object-cover max-h-96" />
        </div>
      )}

      {/* Post Stats */}
      <div className="px-4 py-2 border-t border-gray-200 flex justify-between text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span>{post.votes.upvotes}</span>
          <span>upvotes</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{post.votes.downvotes}</span>
          <span>downvotes</span>
        </div>
        <div>
          <span>{post.comments.length} comments</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-gray-200">
        <button onClick={() => handleVote("upvote")} disabled={loadingAction} className="flex-1 py-2 flex justify-center items-center gap-2 hover:bg-gray-100 text-gray-600">
          <ThumbsUp size={18} />
          <span>Like</span>
        </button>
        <button onClick={() => handleVote("downvote")} disabled={loadingAction} className="flex-1 py-2 flex justify-center items-center gap-2 hover:bg-gray-100 text-gray-600">
          <ThumbsDown size={18} />
          <span>Dislike</span>
        </button>
        <button onClick={toggleComments} className="flex-1 py-2 flex justify-center items-center gap-2 hover:bg-gray-100 text-gray-600">
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button className="flex-1 py-2 flex justify-center items-center gap-2 hover:bg-gray-100 text-gray-600">
          <Repeat size={18} />
          <span>Repost</span>
        </button>
        <button className="flex-1 py-2 flex justify-center items-center gap-2 hover:bg-gray-100 text-gray-600">
          <Send size={18} />
          <span>Send</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          {/* Comment Input */}
          <div className="flex items-start gap-3 mb-4">
            <img src="/images/default.png" alt="User" className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a comment..."
                rows="2"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button onClick={handleAddComment} disabled={loadingAction} className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium hover:bg-blue-700">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
