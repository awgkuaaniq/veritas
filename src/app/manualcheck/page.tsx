"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useState } from "react";

type Prediction = {
  category: string;
  confidence: number;
};

export default function ManualCheck() {
  const [body, setbody] = useState(""); // State to store user input
  const [predictionData, setPrediction] = useState<Prediction | null>(null); // State to store API response
  const [thumbsUp, setThumbsUp] = useState<boolean>();
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setbody(event.target.value);
  };

  const handleCheck = async () => {
    // Consider using a more specific event type
    if (!body) return; // Check if input is empty

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/predict?body=${userInput}`
      );
      setPrediction(response.data);
      console.log(response.data); // Optional: Log API response for debugging
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors (e.g., display error message)
    }
  };

  // Handle Enter key press in the input field (optional)
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCheck();
    }
  };

  const checkThumbsUp = async (id: string) => {
    if (id == "thumbs_up") {
      setThumbsUp(true);
    } else {
      setThumbsUp(false);
    }
  };

  const sendFeedback = async (event: React.FormEvent<HTMLFormElement>) => {
    let fake = 0;
    if (predictionData.category == "Fake") {
      fake = 1;
    }
    console.log(fake);
    event.preventDefault(); // Prevent page refresh
    if (!feedback || thumbsUp === undefined) {
      console.error("Feedback and thumbsUp state are required.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/manualcheckfeedback/`,
        {
          thumbs_up: thumbsUp,
          body: feedback,
          comments: feedback,
          fake: fake,
        }
      );
      console.log("Feedback submitted successfully:", response.data);
      // Optionally, reset feedback and thumbsUp state
      setFeedback("");
      setThumbsUp(undefined);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <main className="bg-gray-200 h-screen">
      {/* Input bar */}
      <div className="flex justify-center mx-auto px-2 max-w-7xl py-11">
        <Input
          className="border-black/25"
          placeholder="Enter URL or content"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Fake News Percentage Output*/}
      {predictionData !== null && (
        <div className="flex max-w-7xl mx-auto h-fit justify-center items-center px-2 py-3">
          {/* Fake News Card */}
          <div className="flex flex-col w-full h-fit p-3 gap-y-2 bg-black rounded-3xl text-white">
            {/* Card Title */}
            <div className="flex w-full h-fit px-4 py-3 justify-center items-center">
              <h1 className="text-2xl font-bold">
                {predictionData.category} News Detected
              </h1>
            </div>
            {/* Card Content Div */}
            <div className="flex w-full h-fit p-3 gap-x-3 items-center">
              <h1 className="text-xl text-nowrap font-bold">
                Confidence Level:
              </h1>
              <h1 className="text-8xl w-fit text-green-500 font-bold">
                {Math.round(predictionData.confidence * 100)}%
              </h1>
              <h1 className="text-xl w-full font-semibold">
                This article has been flagged as potentialy{" "}
                {predictionData.category.toLowerCase()} because it contains
                specific flags which our machine learning model has deemed to
                relate to {predictionData.category.toLowerCase()} news.
              </h1>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Div*/}
      {predictionData !== null && (
        <div className="flex max-w-7xl mx-auto h-fit justify-center items-center px-2 py-3">
          {/* Feedback Form */}
          <form
            className="flex flex-col w-full h-fit p-3 gap-y-2 bg-black rounded-3xl text-white"
            onSubmit={sendFeedback}
          >
            {/* Form Title */}
            <div className="flex w-full h-fit px-4 py-3 justify-center items-center">
              <h1 className="text-2xl font-bold">Feedback</h1>
            </div>
            {/* Form Content */}
            <div className="flex w-full h-fit p-3 gap-x-3 justify-center items-center">
              <Button
                type="button"
                className={`rounded-full aspect-square h-fit p-1 
                ${
                  thumbsUp
                    ? "bg-green-700 text-white"
                    : "bg-green-500 text-black"
                } 
                hover:bg-green-700`}
                onClick={() => checkThumbsUp("thumbs_up")}
              >
                <HandThumbUpIcon className="text-black size-8" />
              </Button>
              <Button
                type="button"
                className={`rounded-full aspect-square h-fit p-1 
                ${
                  thumbsUp === undefined
                    ? "bg-red-500 text-black" // Default color for the undefined state
                    : thumbsUp === false
                    ? "bg-red-700 text-white" // Color when thumbsUp is explicitly false
                    : "bg-red-500 text-black"
                } 
                hover:bg-red-700`}
                onClick={() => checkThumbsUp("thumbs_down")}
              >
                <HandThumbDownIcon className="text-black size-8" />
              </Button>
              <Input
                className="w-1/2 h-fit text-black"
                placeholder="Enter your feedback here"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <Button
                className="border border-gray-700 hover:bg-black hover:border-gray-900"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
