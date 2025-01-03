"use client";
import React, { useState } from "react";
import Menubar from "@/components/Menubar";
import NavSearch from "@/components/NavSearch";
import {
  Bars3Icon,
  CodeBracketSquareIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  

  return (
    <nav className="bg-gray-50 dark:bg-gray-900 relative shadow-md">
      {/* General Container */}
      <div className="flex justify-between max-w-7xl mx-auto items-center px-2 h-fit">
        {/* Logo */}
        <div>
          <a href=".." className="flex items-center">
            <CodeBracketSquareIcon className="size-12 dark:text-white text-black mr-2" />
            <span className="text-black dark:text-white text-xl font-bold">
              VERITAS
            </span>
          </a>
        </div>
        {/* Navigation */}
        <div className="text-black dark:text-white flex justify-between items-center">
          <a
            href="/tweet"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-gray-700/30 rounded transition-colors ease-out duration-150"
          >
            Tweets
          </a>
          <a
            href="/statistic"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-gray-700/30 rounded transition-colors ease-out duration-150"
          >
            Statistics
          </a>
          <a
            href="/manualcheck"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-gray-700/30 rounded transition-colors ease-out duration-150"
          >
            Manual Check
          </a>
          <a
            href="/about"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-gray-700/30 rounded transition-colors ease-out duration-150"
          >
            About
          </a>
        </div>
        {/* Search Bar */}
        <NavSearch />
        {/* Burger Menu */}
        <div className="flex h-full relative">
          <button
            className="hover:bg-gray-200 dark:hover:bg-gray-700/30 rounded transition-colors ease-out duration-150"
            onClick={toggleMenu}
          >
            <Bars3Icon className="size-8 text-black dark:text-white" />
          </button>
          {/* Menubar */}
          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-4 z-50">
              <Menubar />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
