"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, LinearProgress } from "@mui/material"; // MUI components

export type Feedback = {
  rating: number; // Assuming ratings are numbers (e.g., 1-5 scale)
  body: string;
};

export default function Home({ params }: any) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]); // State to hold the feedback data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [averageRating, setAverageRating] = useState<number | null>(null); // State to hold the average rating

  const getArticleById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedbacks`
      );
      const fetchedFeedbacks = response.data;
      // Calculate average rating
      const ratings = fetchedFeedbacks.map(
        (feedback: Feedback) => feedback.rating
      );
      const avgRating =
        ratings.reduce((acc: number, rating: number) => acc + rating, 0) /
        ratings.length;
      setFeedbacks(fetchedFeedbacks);
      setAverageRating(avgRating); // Set the average rating
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  useEffect(() => {
    getArticleById();
  }, []);

  return (
    <div className="flex items-center gap-4 border p-4 rounded-lg shadow-sm bg-white">
      {/* Left: Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full">
        <img
          src="/Ratings.svg"
          alt="Ratings Icon"
          className="w-10 h-10 text-black"
        />
      </div>

      {/* Right: Ratings Content */}
      <div>
        {loading ? (
          <p className="text-sm font-medium text-gray-500">Loading...</p>
        ) : averageRating !== null ? (
          <>
            <p className="text-lg font-medium">
              {averageRating.toFixed(2)} / 5
            </p>
            <p className="text-sm font-medium text-gray-500">
              {feedbacks.length} Ratings
            </p>
          </>
        ) : (
          <p className="text-sm font-medium text-gray-500">
            No ratings available
          </p>
        )}
      </div>
    </div>
  );
}
