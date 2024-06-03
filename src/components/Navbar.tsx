"use client";
import React, { useState } from "react";
import Menubar from "@/components/Menubar";
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
    <nav className="bg-gray-50 relative">
      {/* General Container */}
      <div className="flex justify-between max-w-7xl mx-auto items-center px-2 h-fit">
        {/* Logo */}
        <div>
          <a href="" className="flex items-center">
            <CodeBracketSquareIcon className="size-12 text-black mr-2" />
            <span className="text-black text-xl font-bold">VERITAS</span>
          </a>
        </div>
        {/* Navigation */}
        <div className="text-black flex justify-between items-center">
          <a href="#" className="py-5 px-6 rounded hover:bg-gray-200">
            Statistics
          </a>
          <a href="#" className="py-5 px-6 hover:bg-gray-200">
            Manual Check
          </a>
          <a href="#" className="py-5 px-6 hover:bg-gray-200">
            About
          </a>
        </div>
        {/* Search Bar */}
        <div className="flex items-center h-10 bg-gray-200 focus-within:shadow-lg overflow-hidden">
          <div className="grid place-items-center h-full w-12 text-gray-500">
            <MagnifyingGlassIcon className="h-6 w-6" />
          </div>

          <input
            className="bg-gray-200 outline-none text-sm text-black pr-2 placeholder-gray-700"
            type="text"
            id="search"
            placeholder="Search something.."
          />
        </div>
        {/* Burger Menu */}
        <div className="relative">
          <button onClick={toggleMenu}>
            <Bars3Icon className="size-8 text-black" />
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
