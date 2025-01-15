"use client"; // Mark this as a Client Component

import { useUser } from "@auth0/nextjs-auth0/client";
import React from "react";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid"; // Import the icon
import UserAnalytics from "./(components)/UserAnalytics";
import ArticleAnalytics from "./(components)/ArticleAnalytics";
import WebsiteFeedback from "./(components)/WebsiteFeedback";
import ManualCheckFeedback from "./(components)/ManualCheckFeedback";

export default function StatisticsPage() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
          {/* VERITAS Logo */}
          <div className="mb-6">
            <a href=".." className="flex items-center justify-center">
              <CodeBracketSquareIcon className="size-12 text-black mr-2" />
              <span className="text-black text-xl font-bold">VERITAS</span>
            </a>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Access Restricted
          </h1>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            You must be logged in to access this page. Please log in to
            continue.
          </p>

          {/* Login Button */}
          <button
            onClick={() => (window.location.href = "/api/auth/login")}
            className="w-full bg-black text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Sign in with Auth0
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="py-20 bg-gray-200  dark:bg-offblack">
      {/* Main Container */}
      <div className="flex flex-col mx-auto px-2 max-w-7xl py-11">
        {/* Grid Container */}
        <div className="grid grid-cols-10 gap-4 items-start">
          {/* User Analytics */}
          <div className="col-span-10 rounded-lg shadow-md h-auto">
            <UserAnalytics />
          </div>
          {/* Article Analytics */}
          <div className="col-span-10 rounded-lg shadow-md h-auto">
            <ArticleAnalytics />
          </div>
          {/* Website Feedback */}
          <div className="col-span-4 rounded-lg shadow-md h-auto">
            <WebsiteFeedback />
          </div>
          {/* Manual Check Feedback */}
          <div className="col-span-6 rounded-lg shadow-md h-auto">
            <ManualCheckFeedback />
          </div>
        </div>
      </div>
    </main>
  );
}
