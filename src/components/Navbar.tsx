"use client";

import React, { useState, useEffect } from "react";
import Menubar from "@/components/Menubar";
import NavSearch from "@/components/NavSearch";
import {
  ArrowLeftStartOnRectangleIcon,
  Bars3Icon,
  CodeBracketSquareIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import SettingsPopup from "./SettingsPopup";
import FeedbackPopup from "./FeedbackPopup";

const Navbar: React.FC = () => {
  const [isSmallScreenMenuOpen, setIsSmallScreenMenuOpen] = useState(false);
  const [isLargeScreenMenuOpen, setIsLargeScreenMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toggleSmallScreenMenu = () => {
    setIsSmallScreenMenuOpen(!isSmallScreenMenuOpen);
  };

  const toggleLargeScreenMenu = () => {
    setIsLargeScreenMenuOpen(!isLargeScreenMenuOpen);
  };

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 border-b border-black/15 relative">
      {/* General Container */}
      <div className="flex justify-between max-w-7xl mx-auto items-center px-2 h-fit">
        {/* Logo */}
        <div>
          <a href=".." className="flex items-center">
            <CodeBracketSquareIcon className="size-12 text-black dark:text-white mr-2" />
            <span className="text-black dark:text-white text-xl font-bold">
              VERITAS
            </span>
          </a>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <div className="hidden md:flex text-black dark:text-white justify-between items-center">
          <a
            href="/tweet"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Tweets
          </a>
          <a
            href="/statistic"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Statistics
          </a>
          <a
            href="/manualcheck"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            Manual Check
          </a>
          <a
            href="/about"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            About
          </a>
        </div>

        {/* Desktop Search Bar - Hidden on mobile */}
        <div className="hidden md:block">
          <NavSearch />
        </div>

        {/* Burger Menu Button */}
        <div className="relative">
          <button
            className="hover:bg-gray-200 dark:hover:bg-gray-800 p-2 rounded-md"
            onClick={
              isSmallScreen ? toggleSmallScreenMenu : toggleLargeScreenMenu
            }
          >
            <Bars3Icon className="size-8 text-black dark:text-white" />
          </button>

          {/* Menu Bar for Large Screens - Inside the Parent of the Button */}
          {isSmallScreen === false && isLargeScreenMenuOpen && (
            <div className="absolute right-0 top-full mt-4 z-50">
              <Menubar />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu for Small Screens - Outside of the Parent of the Button */}
      {isSmallScreen && isSmallScreenMenuOpen && (
        <div className="absolute left-0 top-full mt-0 md:mt-4 md:left-auto z-50 w-full">
          <Menubar />
          <div className="md:hidden bg-gray-100 dark:bg-gray-900 py-2">
            {/* Mobile Search */}
            <div className="px-4 pb-2">
              <NavSearch />
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col justify-center text-center items-center">
              <a
                href="/tweet"
                className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white"
              >
                Tweets
              </a>
              <a
                href="/statistic"
                className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white"
              >
                Statistics
              </a>
              <a
                href="/manualcheck"
                className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white"
              >
                Manual Check
              </a>
              <a
                href="/about"
                className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white"
              >
                About
              </a>

              {/* Settings, Feedback, and Sign Out */}
              <button
                className="flex w-full px-4 py-2 space-x-3 hover:bg-gray-200 dark:hover:bg-gray-800 justify-center dark:text-white"
                onClick={() => setIsSettingsOpen(true)}
              >
                Settings
              </button>
              <button
                className="flex w-full px-4 py-2 space-x-3 hover:bg-gray-200 dark:hover:bg-gray-800 justify-center dark:text-white"
                onClick={() => setIsFeedbackOpen(true)}
              >
                Feedback
              </button>
              <button className="flex w-full px-4 py-2 space-x-3 hover:bg-gray-200 dark:hover:bg-gray-800 justify-center dark:text-white">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popups */}
      <SettingsPopup
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
      <FeedbackPopup
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </nav>
  );
};

export default Navbar;