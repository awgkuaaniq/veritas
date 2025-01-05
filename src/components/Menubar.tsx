"use client"; // Mark this as a Client Component

import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import SettingsPopup from "./SettingsPopup";
import FeedbackPopup from "./FeedbackPopup";
import { useUser } from "@auth0/nextjs-auth0/client"; // Import useUser

const Menubar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const { user, isLoading } = useUser(); // Get user and loading state

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const openFeedback = () => setIsFeedbackOpen(true);
  const closeFeedback = () => setIsFeedbackOpen(false);

  return (
    <div className="hidden md:flex flex-col w-60 h-fit shadow-2xl items-center divide-y divide-black/15 bg-gray-200 border border-black/15 dark:bg-offgray dark:border shadow-2xl rounded-lg">
      {/* Navigation Links */}
      {/* Settings */}
      <button
        className="flex py-2 px-5 w-full space-x-5 hover:bg-gray-300 dark:hover:bg-sage transition-colors ease-out duration-150"
        onClick={openSettings}
      >
        <Cog6ToothIcon className="w-6" />
        <p>Settings</p>
      </button>
      {/* Feedback */}
      <button
        className="flex py-2 px-5 w-full space-x-5 hover:bg-gray-300 dark:hover:bg-sage transition-colors ease-out duration-150"
        onClick={openFeedback}
      >
        <EnvelopeIcon className="w-6" />
        <p>Feedback</p>
      </button>
      {/* Conditionally Render Sign Out */}
      {!isLoading && user && (
        <a
          href="/api/auth/logout" // Redirect to Auth0 logout endpoint
          className="flex py-2 px-5 w-full space-x-5 hover:bg-gray-300 dark:hover:bg-sage transition-colors ease-out duration-150"
        >
          <ArrowLeftStartOnRectangleIcon className="w-6" />
          <p>Sign Out</p>
        </a>
      )}
      {/* Settings Modal */}
      <SettingsPopup isOpen={isSettingsOpen} onClose={closeSettings} />
      <FeedbackPopup isOpen={isFeedbackOpen} onClose={closeFeedback} />
    </div>
  );
};

export default Menubar;
