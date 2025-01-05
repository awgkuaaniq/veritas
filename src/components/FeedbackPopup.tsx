import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "@/components/ui/button";
import Rating from "@mui/material/Rating";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

const FeedbackPopup = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [rating, setRating] = useState<number | null>(3);
  const [error, setError] = useState("");
  const [body, setBody] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Track success message

  // Reset state when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      setRating(3); // Reset rating
      setBody(""); // Clear feedback
      setError(""); // Clear error message
      setSuccessMessage(""); // Clear success message
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!body.trim()) {
      setError("Feedback is required.");
      return;
    }
    setError(""); // Clear previous errors
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedback/`,
        {
          rating,
          body,
        }
      );
      console.log("Feedback submitted successfully:", response.data);
      // Set success message after successful submission
      setSuccessMessage(
        "Thank you for your feedback! Your response has been submitted."
      );
      setRating(3); // Reset rating
      setBody(""); // Clear feedback
      // Optional: Add success message or close dialog
    } catch (error) {
      console.error("Error submitting feedback:", error);
      // Optional: Add error handling
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/30 w-screen"
      />
      <div className="fixed inset-0 flex flex-col items-center justify-center">
      <DialogPanel className="fixed bg-white dark:bg-slate-900 rounded-lg dark:border-white/10 border-black/25 border shadow-md">
        
          <div className="px-16 py-10">
            <DialogTitle className="font-semibold text-2xl">
              Feedback
            </DialogTitle>
          </div>
          <div className="flex flex-col py-2.5 px-16 space-y-2">
            <p className="font-semibold">How was your experience?</p>
            <p className="max-w-[482px] font-light text-sm">
              Please feel free to share with us your experience using our
              website. Our admins will improve the website upon your feedback.
            </p>
          </div>
          <div className="flex items-center justify-between py-3 px-16">
            <Rating 
            classes={{icon: 'mx-8 dark:text-yellow-500'}}
            size="large"
            defaultValue={3}
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            />
          </div>
          <div className="flex flex-col items-center py-3 px-16">
            <Textarea
              className={`h-36 text-start ${
                error ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              }`}
              placeholder="Please give us your opinion. Your feedback is valuable to us."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            {error && (
              <p className="flex pt-3 text-red-500 text-sm w-fit">{error}</p>
            )}
          </div>
          <div className="flex flex-col px-16 pt-3 pb-12 w-full">
            <Button className="w-full" onClick={handleSubmit}>
              Submit
            </Button>
            {/* Success Message */}
            {successMessage && (
              <div className="pt-3 text-green-500 text-sm font-medium">
                {successMessage}
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default FeedbackPopup;
