import React, { useState } from "react";
import { Link } from "react-router";
import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  // Email validation function
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password || !name) {
      toast.error("Please fill all the fields");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email }));
    setTimeout(() => {
      navigate("/");
      setName("");
      setEmail("");
      setPassword("");
    }, 1500);
    toast.success("Login successful");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 border rounded px-7 py-10 bg-white shadow-lg">
        <form className="text-center space-y-6" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold">Login</h1>
          <div className="flex justify-center space-x-4">
            <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#08C2FF] hover:text-white transition duration-300 cursor-pointer">
              <FaGoogle />
            </span>
            <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#08C2FF] hover:text-white transition duration-300 cursor-pointer">
              <FaLinkedin />
            </span>
            <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#08C2FF] hover:text-white transition duration-300 cursor-pointer">
              <FaGithub />
            </span>
          </div>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Name"
              className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <ToastContainer />
          <p className="text-xs text-red-600">{error}</p>
          <div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-2 rounded transition duration-300"
            >
              Login
            </button>
          </div>
          <p className="text-xs mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
