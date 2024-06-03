import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const Menubar = () => {
  return (
    <div className="flex flex-col w-60 h-fit items-center bg-gray-200 border border-black/25 rounded-lg">
      {/* Avatar Icon & Name */}
      <div className="flex flex-col w-full h-fit items-center space-y-1 border-b border-black/20 py-3 px-2">
        <Avatar className="aspect-square w-11 h-11">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col w-full items-center">
          <p className="text-base">ShadCN</p>
          <p className="text-sm text-black/50">shadcn@gmail.com</p>
        </div>
      </div>
      {/* Navigation Links */}
      {/* Settings */}
      <div className="flex py-2 px-5 w-full space-x-5">
        <Cog6ToothIcon className="w-6" />
        <p>Settings</p>
      </div>
      {/* Feedback */}
      <div className="flex py-2 px-5 w-full space-x-5">
        <EnvelopeIcon className="w-6" />
        <p>Feedback</p>
      </div>
      {/* Sign Out */}
      <div className="flex py-2 px-5 w-full space-x-5">
        <ArrowLeftStartOnRectangleIcon className="w-6" />
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default Menubar;
