import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
  } from "@headlessui/react";
import { ChatBubbleLeftEllipsisIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "./ui/button";

const DisclaimerPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={() => {}} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-200 w-screen"
      />
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <DialogPanel className="fixed bg-white rounded-lg border-black/25 border">
          <div className="flex flex-col space-y-2.5 px-6 py-5 max-w-96">
            {/* Header */}
            <div className="flex flex-col space-y-1 px-2.5 pb-4 border-b border-black/30">
              <DialogTitle className="font-bold text-xl">
                VERITAS
              </DialogTitle>
              <p className="text-black/80 text-sm">Tips for getting started</p>
            </div>
            {/* Body */}
            {/* 1st tip */}
            <div className="flex flex-col space-y-1 p-2.5">
              <div className="flex space-x-2">
                <ChatBubbleLeftEllipsisIcon className="size-6" />
                <p className="text-sm font-semibold">Ask away</p>
              </div>
              <p className="text-sm text-black/80 text-justify">
                Our AI can help detect whether the news you asked is fake or
                not.
              </p>
            </div>
            {/* 2nd tip */}
            <div className="flex flex-col space-y-1 p-2.5">
              <div className="flex space-x-2">
                <ExclamationTriangleIcon className="size-6 text-amber-500" />
                <p className="text-sm font-semibold">Check your facts</p>
              </div>
              <p className="text-sm text-black/80 text-justify">
                While we have tweaked our AI model extensively, it may falsely
                flag the news, please exercise caution and fact check it.
              </p>
            </div>
            <div className="flex px-2.5 py-1 justify-end">
                <Button className="py-2.5 px-10"
                onClick={onClose}>
                    Okay
                </Button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DisclaimerPopup;