"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { requestForToken } from "../../firebase";
import axios from "axios";
import { getMessaging, deleteToken } from "firebase/messaging";
import { useTheme } from "@/context/ThemeContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

const SettingsPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Initialize theme from localStorage
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as "light" | "dark") || "light";
    }
    return "light";
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uniqueVisitorId, setUniqueVisitorId] = useState<string | null>(null);
  const [existingToken, setExistingToken] = useState<string | null>(null);

  // Fetch unique visitor ID and preferences on mount
  useEffect(() => {
    const fetchVisitorData = async () => {
      try {
        const idResponse = await fetch("/api/get-visitor");
        if (!idResponse.ok) {
          throw new Error("Failed to retrieve unique visitor ID");
        }
        const { uniqueVisitorId } = await idResponse.json();
        setUniqueVisitorId(uniqueVisitorId);

        // Fetch preferences using the uniqueVisitorId
        const preferenceResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preference/${uniqueVisitorId}`
        );
        const { notification, token } = preferenceResponse.data;

        // Only update notification and token, not theme
        setNotificationsEnabled(notification);
        setExistingToken(token);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    if (isOpen) {
      fetchVisitorData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      if (Notification.permission === "granted") {
        setNotificationsEnabled(true);
      } else {
        setNotificationsEnabled(false);
      }
    }
  }, []);

  const handleSave = async () => {
    if (!uniqueVisitorId) {
      console.error("Unique visitor ID not found");
      return;
    }

    setIsLoading(true);

    try {
      // Update theme in local storage and document class
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
      // First handle notification permission if it's being enabled
      if (notificationsEnabled) {
        if (!("serviceWorker" in navigator)) {
          setError("Service Worker is not supported in this browser.");
          setNotificationsEnabled(false);
          setIsLoading(false);
          return;
        }
        if (!("PushManager" in window)) {
          setError("Push API is not supported in this browser.");
          setNotificationsEnabled(false);
          setIsLoading(false);
          return;
        }

        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          setError("Notification permission denied.");
          setNotificationsEnabled(false);
          setIsLoading(false);
          return;
        }

        try {
          if (!existingToken) {
            const token = await requestForToken();
            if (token) {
              if ("serviceWorker" in navigator) {
                await navigator.serviceWorker.register(
                  "/firebase-messaging-sw.js"
                );
              }
              // Update all preferences including the token in a single request
              await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preference/${uniqueVisitorId}`,
                {
                  theme: theme,
                  notification: notificationsEnabled,
                  _id: uniqueVisitorId,
                  token: token,
                }
              );
              setExistingToken(token);
            }
          } else {
            // If token already exists, just update other preferences
            await axios.put(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preference/${uniqueVisitorId}`,
              {
                theme: theme,
                notification: notificationsEnabled,
                _id: uniqueVisitorId,
                token: existingToken, // Include existing token
              }
            );
          }
        } catch (err) {
          console.error("Error handling FCM token:", err);
          setError("Error handling FCM token.");
          setNotificationsEnabled(false);
          setIsLoading(false);
          return;
        }
      } else {
        // Handle disabling notifications
        try {
          const messaging = getMessaging();
          if (existingToken) {
            await deleteToken(messaging);
          }
          // Update preferences with null token
          await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/preference/${uniqueVisitorId}`,
            {
              theme: theme,
              notification: false,
              _id: uniqueVisitorId,
              token: null,
            }
          );
          setExistingToken(null);
        } catch (err) {
          console.error("Error deleting FCM token:", err);
          setError("Error deleting FCM token.");
          setIsLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error("Error updating preferences:", error);
      setError("Error updating preferences");
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const handleClose = async () => {
    onClose(); // Call the original onClose function
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 w-screen"
      />
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <DialogPanel className="flex flex-col justify-center bg-white dark:bg-offblack rounded-lg border-black/25 sm:h-fit sm:w-fit w-screen h-screen dark:border-white/10 border shadow-md">
          <div className="flex px-6 sm:px-16 py-8 sm:py-12 justify-between">
            <DialogTitle className="font-semibold text-xl sm:text-2xl text-center sm:text-left">
              Settings
            </DialogTitle>
            <button
              className="hover:scale-125 transition hover:text-bold ease-out duration-150"
              onClick={onClose}
              disabled={isLoading}
            >
              <XMarkIcon className="h-6" />
            </button>
          </div>
          <div className="flex items-start sm:items-center py-2 px-6 sm:px-16 space-y-4 sm:space-y-0 sm:space-x-24">
            <div className="flex flex-col w-full py-2 space-y-1">
              <p className="font-semibold">Dark Theme</p>
              <p className="font-light text-sm">Enables dark theme</p>
            </div>
            <div className="">
              <Switch
                className="hover:scale-105 transition ease-out duration-150"
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>
          </div>
          <div className="flex items-start sm:items-center py-2 space-x-10 px-6 sm:px-16 space-y-0 sm:space-y-0 sm:space-x-24">
            <div className="flex flex-col w-full py-2 space-y-1">
              <p className="font-semibold">Notification</p>
              <p className="font-light text-sm">
                Enables browser to send notifications regarding fake news
              </p>
            </div>
            <div className="self-center sm:self-auto">
              <Switch
                className="hover:scale-105 transition ease-out duration-150"
                checked={notificationsEnabled}
                onCheckedChange={(checked) => setNotificationsEnabled(checked)}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-sm px-6 sm:px-16 py-2 text-center sm:text-left">
              {error}
            </div>
          )}
          <div className="flex px-6 sm:px-16 py-12 sm:py-12 justify-center content-end sm:justify-end">
            <Button
              className="py-2 px-8 sm:w-fit w-full sm:px-10 mx-auto sm:mx-0 hover:scale-105 transition ease-out duration-150"
              onClick={handleSave}
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default SettingsPopup;
