"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LikeDislikeButtons({
  id,
  initialLikes,
  initialDislikes,
}: {
  id: string;
  initialLikes: number;
  initialDislikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Fetch like/dislike status and counts on component mount
  useEffect(() => {
    const fetchLikeDislikeData = async () => {
      try {
        // Fetch like status with cache busting
        const likeRes = await fetch(
          `${baseUrl}/api/get-cookie?type=like&articleId=${id}&_=${Date.now()}`
        );
        const likeData = await likeRes.json();
        setHasLiked(likeData.hasInteracted || likeData.articleId?.includes(id));

        // Fetch dislike status with cache busting
        const dislikeRes = await fetch(
          `${baseUrl}/api/get-cookie?type=dislike&articleId=${id}&_=${Date.now()}`
        );
        const dislikeData = await dislikeRes.json();
        setHasDisliked(
          dislikeData.hasInteracted || dislikeData.articleId?.includes(id)
        );

        // Fetch current like/dislike counts from the server with cache busting
        const articleRes = await fetch(
          `${
            process.env.NEXT_PUBLIC_BACKEND_URL
          }/api/articles/${id}?_=${Date.now()}`
        );
        const articleData = await articleRes.json();
        setLikes(articleData.likes);
        setDislikes(articleData.dislikes);
      } catch (err) {
        console.error("Error fetching like/dislike data:", err);
      }
    };

    fetchLikeDislikeData();
  }, [id, baseUrl]);

  // Handle like/dislike actions
  const handleLikeDislike = async (type: "like" | "dislike") => {
    setIsLoading(true);
    try {
      if (
        (type === "like" && hasLiked) ||
        (type === "dislike" && hasDisliked)
      ) {
        // Undo action
        const response = await fetch(
          `${baseUrl}/api/set-cookie?_=${Date.now()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ articleId: id, type: `remove-${type}` }),
          }
        );

        if (response.ok) {
          if (type === "like") {
            setLikes((prev) => prev - 1);
            setHasLiked(false);
          } else {
            setDislikes((prev) => prev - 1);
            setHasDisliked(false);
          }
        }
      } else {
        // Normal action
        const response = await fetch(
          `${baseUrl}/api/set-cookie?_=${Date.now()}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ articleId: id, type }),
          }
        );

        if (response.ok) {
          if (type === "like") {
            setLikes((prev) => prev + 1);
            setHasLiked(true);
            if (hasDisliked) {
              setDislikes((prev) => prev - 1);
              setHasDisliked(false);
            }
          } else {
            setDislikes((prev) => prev + 1);
            setHasDisliked(true);
            if (hasLiked) {
              setLikes((prev) => prev - 1);
              setHasLiked(false);
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error handling ${type}:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={hasLiked ? "default" : "outline"}
        size="icon"
        onClick={() => handleLikeDislike("like")}
        aria-label="Like"
        disabled={isLoading}
        className={`transition-colors duration-200 ${
          hasLiked
            ? "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
            : "hover:bg-green-100 dark:hover:bg-green-900"
        }`}
      >
        <ThumbsUp
          className={`h-4 w-4 ${
            hasLiked ? "text-white" : "text-green-500 dark:text-green-400"
          }`}
        />
      </Button>
      <span className="mx-2 text-sm">{likes}</span>
      <Button
        variant={hasDisliked ? "default" : "outline"}
        size="icon"
        onClick={() => handleLikeDislike("dislike")}
        aria-label="Dislike"
        disabled={isLoading}
        className={`transition-colors duration-200 ${
          hasDisliked
            ? "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
            : "hover:bg-red-100 dark:hover:bg-red-900"
        }`}
      >
        <ThumbsDown
          className={`h-4 w-4 ${
            hasDisliked ? "text-white" : "text-red-500 dark:text-red-400"
          }`}
        />
      </Button>
      <span className="ml-2 text-sm">{dislikes}</span>
    </>
  );
}
