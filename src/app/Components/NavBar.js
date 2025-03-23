"use client";

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white p-4 shadow-lg rounded-lg relative">
      <div className="text-2xl font-bold">Logo</div>

      {/* Hamburger Menu for Mobile */}
      <div
        className="flex flex-col cursor-pointer md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className="w-8 h-1 bg-white my-1 transition-all"></span>
        <span className="w-8 h-1 bg-white my-1 transition-all"></span>
        <span className="w-8 h-1 bg-white my-1 transition-all"></span>
      </div>

      {/* Navigation Links */}
      <ul
        className={`absolute md:static top-14 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0 transition-all duration-300 ease-in-out ${
          menuOpen ? "block" : "hidden md:flex"
        }`}
      >
        <li>
          <Link
            href="/"
            className="text-lg px-4 py-2 rounded hover:bg-red-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/Blogs"
            className="text-lg px-4 py-2 rounded hover:bg-red-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Blogs
          </Link>
        </li>
        <li>
          <Link
            href="/Login"
            className="text-lg px-4 py-2 rounded hover:bg-red-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            href="/SignUp"
            className="text-lg px-4 py-2 rounded hover:bg-red-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Signup
          </Link>
        </li>
        <li>
          <Link
            href="/Profile"
            className="text-lg px-4 py-2 rounded hover:bg-red-500 transition"
            onClick={() => setMenuOpen(false)}
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
