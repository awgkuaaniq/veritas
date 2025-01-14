"use client";

import React, { useState, useEffect } from "react";
import Menubar from "@/components/Menubar";
import NavSearch from "@/components/NavSearch";
import { useUser } from "@auth0/nextjs-auth0/client"; // Import useUser
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
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { user, isLoading } = useUser(); // Get user and loading state

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      // Only update state if there's a significant scroll (>10px)
      if (Math.abs(prevScrollPos - currentScrollPos) > 10) {
        setIsVisible(isScrollingUp || currentScrollPos < 10);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <nav
      className={`
      fixed top-0 left-0 right-0 w-full
      bg-gray-100/70 dark:bg-offblack/70 
      border-b border-black/15 
      shadow-lg backdrop-blur
      transition-transform duration-300
      ${isVisible ? "translate-y-0" : "-translate-y-full"}
      z-20
    `}
    >
      {/* General Container */}
      <div className="flex justify-between max-w-7xl mx-auto items-center px-2 h-fit">
        {/* Logo */}
        <div>
          <a
            href=".."
            className="flex items-center hover:scale-105 transition-all ease-out duration-150"
          >
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
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150"
          >
            Tweets
          </a>
          <a
            href="/statistic"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150"
          >
            Statistics
          </a>
          <a
            href="/manualcheck"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150"
          >
            Manual Check
          </a>
          <a
            href="/about"
            className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150"
          >
            About
          </a>
          {/* Conditionally Render Admin Link */}
          {!isLoading && user && (
            <a
              href="/admin"
              className="py-5 px-6 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150"
            >
              Admin
            </a>
          )}
        </div>

        {/* Desktop Search Bar - Hidden on mobile */}
        <div className="hidden md:block">
          <NavSearch />
        </div>

        {/* Burger Menu Button */}
        <div className="relative">
          <button
            className={`p-2 rounded-md transition-colors ease-out duration-150 ${
              isLargeScreenMenuOpen
                ? "bg-gray-200 dark:bg-offgray dark:bg-offgray"
                : "hover:bg-gray-200 dark:hover:bg-offgray"
            }`}
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
          <div className="md:hidden bg-gray-100 dark:bg-offblack shadow-2xl py-2">
            {/* Mobile Search */}
            <div className="px-4 pb-2">
              <NavSearch />
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex divide-y divide-black/15 dark:divide-white/15 border-b border-black/15 shadow-2xl flex-col justify-center text-center items-center">
              <a
                href="/tweet"
                className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150 dark:text-white"
              >
                Tweets
              </a>
              <a
                href="/statistic"
                className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150 dark:text-white"
              >
                Statistics
              </a>
              <a
                href="/manualcheck"
                className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150 dark:text-white"
              >
                Manual Check
              </a>
              <a
                href="/about"
                className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150 dark:text-white"
              >
                About
              </a>
              {/* Conditionally Render Admin Link */}
              {!isLoading && user && (
                <a
                  href="/admin"
                  className="px-4 w-full py-2 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150 dark:text-white"
                >
                  Admin
                </a>
              )}

              {/* Settings, Feedback, and Sign Out */}
              <button
                className="flex w-full px-4 py-2 space-x-3 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150 justify-center dark:text-white"
                onClick={() => setIsSettingsOpen(true)}
              >
                Settings
              </button>
              <button
                className="flex w-full px-4 py-2 space-x-3 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150 justify-center dark:text-white"
                onClick={() => setIsFeedbackOpen(true)}
              >
                Feedback
              </button>
              {/* Conditionally Render Sign Out */}
              {!isLoading && user && (
                <a
                  href="/api/auth/logout" // Redirect to Auth0 logout endpoint
                  className="flex w-full px-4 py-2 space-x-3 hover:bg-gray-200 dark:hover:bg-offgray transition-colors ease-out duration-150 justify-center dark:text-white"
                >
                  <p>Sign Out</p>
                </a>
              )}
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