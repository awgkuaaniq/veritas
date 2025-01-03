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

const Menubar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const openFeedback = () => setIsFeedbackOpen(true);
  const closeFeedback = () => setIsFeedbackOpen(false);

  return (
    <div className="flex flex-col w-60 h-fit items-center bg-gray-200 dark:bg-gray-900 border border-black/25 dark:border-black shadow-md rounded-lg">
      {/* Avatar Icon & Name */}
      <div className="flex flex-col w-full h-fit items-center space-y-1 border-b border-black/20 py-3 px-2">
        <Avatar className="aspect-square w-11 h-11">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full items-center">
          <p className="text-base">ShadCN</p>
          <p className="text-sm text-black/50 dark:text-white/50">
            shadcn@gmail.com
          </p>
        </div>
      </div>
      {/* Navigation Links */}
      {/* Settings */}
      <button
        className="flex py-2 px-5 w-full space-x-5 hover:bg-gray-300 dark:hover:bg-gray-700/30 transition-colors ease-out duration-150"
        onClick={openSettings}
      >
        <Cog6ToothIcon className="w-6" />
        <p>Settings</p>
      </button>
      {/* Feedback */}
      <button
        className="flex py-2 px-5 w-full space-x-5 hover:bg-gray-300 dark:hover:bg-gray-700/30 transition-colors ease-out duration-150"
        onClick={openFeedback}
      >
        <EnvelopeIcon className="w-6" />
        <p>Feedback</p>
      </button>
      {/* Sign Out */}
      <button className="flex py-2 px-5 w-full space-x-5 hover:bg-gray-300 dark:hover:bg-gray-700/30 transition-colors ease-out duration-150">
        <ArrowLeftStartOnRectangleIcon className="w-6" />
        <p>Sign Out</p>
      </button>
      {/* Settings Modal */}
      <SettingsPopup isOpen={isSettingsOpen} onClose={closeSettings} />
      <FeedbackPopup isOpen={isFeedbackOpen} onClose={closeFeedback} />
    </div>
  );
};

export default Menubar;
