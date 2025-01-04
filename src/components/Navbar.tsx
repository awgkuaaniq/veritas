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
    <nav className="bg-gray-50 relative">
      {/* General Container */}
      <div className="flex justify-between max-w-7xl mx-auto items-center px-2 h-fit">
        {/* Logo */}
        <div>
          <a href=".." className="flex items-center">
            <CodeBracketSquareIcon className="size-12 text-black mr-2" />
            <span className="text-black text-xl font-bold">VERITAS</span>
          </a>
        </div>
        {/* Navigation */}
        <div className="text-black flex justify-between items-center">
          <a href="/tweet" className="py-5 px-6 hover:bg-gray-200">
            Tweets
          </a>
          <a href="/statistic" className="py-5 px-6 hover:bg-gray-200">
            Statistics
          </a>
          <a href="/manualcheck" className="py-5 px-6 hover:bg-gray-200">
            Manual Check
          </a>
          <a href="/about" className="py-5 px-6 hover:bg-gray-200">
            About
          </a>
          <a href="/admin" className="py-5 px-6 hover:bg-gray-200">
            Admin
          </a>
        </div>
        {/* Search Bar */}
        <NavSearch />
        {/* Burger Menu */}
        <div className="flex h-full relative">
          <button className="hover:bg-gray-200" onClick={toggleMenu}>
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
