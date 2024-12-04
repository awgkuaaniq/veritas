import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const SettingsPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop transition className="fixed inset-0 bg-black/30 w-screen" />
      <div className="fixed inset-0 flex flex-col items-center justify-center">
      <DialogPanel className="fixed bg-white rounded border-black/25 border">
        
          <div className="px-16 py-12">
            <DialogTitle className="font-semibold text-2xl">Settings</DialogTitle>
          </div>
          <div className="flex items-center py-2.5 px-16 space-x-24">
            <div className="flex flex-col w-full py-2.5 space-y-2">
                <p className="font-semibold">Theme</p>
                <p className="font-light text-sm">Enables dark theme</p>
            </div>
            <Switch/>
          </div>
          <div className="flex items-center py-2.5 px-16 space-x-24">
            <div className="flex flex-col py-2.5 space-y-2">
                <p className="font-semibold">Notification</p>
                <p className="font-light text-sm">Enables browser to send notifications regarding fake news</p>
            </div>
            <Switch/>
          </div>
          <div className="flex px-16 py-12 justify-end">
            <Button className="py-2.5 px-10">Save</Button>
          </div>
        
      </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SettingsPopup;
