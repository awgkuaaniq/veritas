"use client";

import LikeDislikeBar from "@/components/LikeDislikeBar";
import { Button } from "@/components/ui/button";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

type Article = {
  _id: string;
  title: string;
  body: string;
  url: string;
  published_at?: Date;
  likes: number;
  source: string;
  dislikes: number;
  views: number;
  image_url: string;
  time_added: Date;
  unique_hash?: string;
  classification: Classification;
};

type Classification = {
  category: string;
  probability: number;
  hasBeenChecked: boolean;
};

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<Article | null>(null); // State for fetched article
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for any error
  const [isCookieLoading, setIsCookieLoading] = useState(false);
  const { id } = params; // Dynamic article ID from the route
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const hasIncremented = useRef(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`
        );

        if (response.data) {
          setArticle(response.data);
        } else {
          throw new Error("Article not found.");
        }
      } catch (err) {
        // Type guard to handle different error types
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    if (id && !hasIncremented.current) {
      setIsCookieLoading(true);
      manageCookieForType("view", id).finally(() => {
        setIsCookieLoading(false);
        hasIncremented.current = true; // Ensure this logic only runs once
      });
    }
  }, [id]);

  useEffect(() => {
    const checkLikesDislikes = async () => {
      const liked = await checkCookieStatus("like", id);
      const disliked = await checkCookieStatus("dislike", id);

      setHasLiked(liked);
      setHasDisliked(disliked);
    };

    checkLikesDislikes();
  }, [id]);

  // Separate function to only check cookie status without setting
  async function checkCookieStatus(
    type: "like" | "dislike",
    articleId: string
  ) {
    try {
      const res = await fetch(`/api/get-cookie?type=${type}`);
      const data = await res.json();
      const interactedArticles = data.articleId
        ? data.articleId.split(",")
        : [];
      return interactedArticles.includes(articleId);
    } catch (err) {
      console.error(`Error checking cookie for ${type}:`, err);
      return false;
    }
  }

  if (isCookieLoading) return <div>Processing cookies...</div>;
  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error fetching article.</div>;

  // Function to handle like/dislike actions
  const handleLikeDislike = async (type: "like" | "dislike") => {
    if (!article) return;
    const updatedArticle = { ...article };

    try {
      // If user has already performed this action, handle as an undo
      if (
        (type === "like" && hasLiked) ||
        (type === "dislike" && hasDisliked)
      ) {
        // Decrement the count
        if (type === "like") {
          updatedArticle.likes -= 1;
          setHasLiked(false);
        } else {
          updatedArticle.dislikes -= 1;
          setHasDisliked(false);
        }

        // Call API to decrement count
        await fetch(`/api/set-cookie`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articleId: id,
            type: `remove-${type}`,
          }),
        });

        setArticle(updatedArticle);
        return;
      }

      // Handle normal like/dislike action
      const response = await fetch("/api/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articleId: id, type }),
      });

      if (response.ok) {
        if (type === "like") {
          updatedArticle.likes += 1;
          if (hasDisliked) {
            updatedArticle.dislikes -= 1;
            setHasDisliked(false);
          }
          setHasLiked(true);
        } else {
          updatedArticle.dislikes += 1;
          if (hasLiked) {
            updatedArticle.likes -= 1;
            setHasLiked(false);
          }
          setHasDisliked(true);
        }
        setArticle(updatedArticle);
      }
    } catch (err) {
      console.error(`Error handling ${type}:`, err);
    }
  };

  // Function to handle view counts
  async function manageCookieForType(type: "view", articleId: string) {
    try {
      const res = await fetch(`/api/get-cookie?type=${type}`);
      const data = await res.json();
      const interactedArticles = data.articleId
        ? data.articleId.split(",")
        : [];

      if (!interactedArticles.includes(articleId)) {
        await fetch("/api/set-cookie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articleId, type }),
        });
      }
    } catch (err) {
      console.error(`Error managing view cookie:`, err);
    }
  }

  // Function to split text into chunks of 3 sentences and add paragraphs
  const formatBody = (text: string | undefined) => {
    if (!text) return "";

    // Split by period and filter empty strings
    const sentences = text
      .split(".")
      .filter((sentence) => sentence.trim() !== "");

    // Group sentences into chunks of 3
    const chunkedSentences = [];
    for (let i = 0; i < sentences.length; i += 3) {
      chunkedSentences.push(sentences.slice(i, i + 3).join(".") + ".");
    }

    // Join chunks with <p> tags and add margin-bottom for spacing between paragraphs
    return chunkedSentences
      .map((chunk, index) => `<p key=${index} class="mb-4">${chunk.trim()}</p>`)
      .join("");
  };

  return (
    <main className="bg-gray-100 py-8 dark:bg-offblack">
      <div className="flex flex-col mx-auto px-4 max-w-4xl overflow-hidden">
        {/* Article Title */}
        <h1 className="text-4xl font-semibold text-gray-800 dark:text-white py-6">
          {article?.title}
        </h1>

        {/* Article Details */}
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
          <div>
            <p className="font-medium">By {article?.source}</p>
            <p>{new Date(article?.published_at ?? "").toLocaleDateString()}</p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-lg font-medium">{article?.views} views</p>
          </div>
        </div>

        {/* Article AI Check and Thumbnail */}
        <div className="py-6">
          <div className="flex justify-between bg-black dark:bg-offgray text-white items-center text-2xl font-bold py-4 px-5 rounded-3xl max-w-4xl mx-auto">
            <h1>
              {Math.round((article?.classification?.probability ?? 0) * 100)}%
            </h1>
            <h1>Possible Fake News Detected</h1>
            {/* Like/Dislike Button Container */}
            <div className="flex gap-x-3">
              <Button
                onClick={() => handleLikeDislike("like")}
                className={`rounded-full aspect-square h-fit p-1 ${
                  hasLiked
                    ? "bg-green-700 hover:bg-green-900"
                    : "bg-green-500 hover:bg-green-700"
                }`}
              >
                <HandThumbUpIcon className="text-black size-8" />
              </Button>
              <Button
                onClick={() => handleLikeDislike("dislike")}
                className={`rounded-full aspect-square h-fit p-1 ${
                  hasDisliked
                    ? "bg-red-700 hover:bg-red-900"
                    : "bg-red-500 hover:bg-red-700"
                }`}
              >
                <HandThumbDownIcon className="text-black size-8" />
              </Button>
            </div>
          </div>

          {/* Article Like/Dislike Bar */}
          <div className="flex justify-end max-w-4xl w-full py-2">
            {article && (
              <LikeDislikeBar
                likes={article.likes}
                dislikes={article.dislikes}
              />
            )}
          </div>
        </div>

        {/* Article Thumbnail and Description */}
        <div className="flex py-6 justify-center w-full items-center">
          <img
            src={article?.image_url}
            alt="Thumbnail"
            className="max-h-[600px] rounded-lg shadow-md"
          />
        </div>

        {/* Article Content */}
        <div className="prose lg:prose-xl text-gray-800 dark:text-white mb-6">
          <div
            className="flex flex-col space-y-8"
            dangerouslySetInnerHTML={{ __html: formatBody(article?.body) }}
          />
        </div>
      </div>
    </main>
  );
}
