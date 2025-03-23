"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll event to toggle sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        isSticky ? "bg-gray-900 shadow-lg py-3" : "bg-gray-900 py-4"
      }`}
    >
      <div className="flex justify-between items-center text-white px-6 md:px-12">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image
              className="h-[50px] w-[50px]"
              src="/images/rem-removebg-preview.png"
              alt="Logo"
              width={50}
              height={50}
              priority
            />
          </Link>
        </div>

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
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent flex flex-col md:flex-row md:items-center gap-4 p-4 md:p-0 transition-all duration-300 ease-in-out ${
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
      </div>
    </nav>
  );
};

export default Navbar;
