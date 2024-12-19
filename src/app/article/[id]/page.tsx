"use client";

import LikeDislikeBar from "@/components/LikeDislikeBar";
import { Button } from "@/components/ui/button";
import { HandThumbDownIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

type Article = {
  _id: string;
  title: string;
  body: string;
  url: string;
  published_at?: Date;
  likes: number;
  dislikes: number;
  views: number;
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
  const [error, setError] = useState(null); // State for any error
  const [isCookieLoading, setIsCookieLoading] = useState(false);
  const { id } = params; // Dynamic article ID from the route

  const hasIncremented = useRef(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://localhost:8000/api/articles/${id}` // Fetch article details by ID
        );

        if (response.data) {
          setArticle(response.data);
        } else {
          throw new Error("Article not found.");
        }
      } catch (error) {
        setError(error);
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

  if (isCookieLoading) return <div>Processing cookies...</div>;
  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error fetching article.</div>;

  // Function to check and set cookies dynamically based on type
  async function manageCookieForType(type: "view" | "like" | "dislike", articleId: string) {
    try {
      const res = await fetch(`/api/get-cookie?type=${type}`); // Check if cookie exists for the type
      const data = await res.json();

      const interactedArticles = data.articleId ? data.articleId.split(",") : [];

      if (!interactedArticles.includes(articleId)) {
        await fetch("/api/set-cookie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ articleId, type }), // Pass type and articleId to set the cookie
        });
      }
    } catch (err) {
      console.error(`Error managing cookie for ${type}:`, err);
    }
  }

  const articleDetail = {
    src: "/dummyIMG/corgi.webp",
    desc: "In this screen grab taken from a video released by the Weifang public security bureau, Fuzai is seen wearing a police dog vest, in eastern China's Shandong province",
  };

  return (
    <main className="bg-gray-200">
      {/* Main Container */}
      <div className="flex flex-col mx-auto px-2 max-w-5xl">
        {/* Article Title */}
        <div className="flex text-3xl font-semibold py-6">
          <h1>{article?.title}</h1>
        </div>

        {/* Article Details */}
        <div className="flex justify-between text-sm font-light h-fit">
          {/* Article Source and Date */}
          <div>
            <div>
              <h1>By Jessie Yeung and Hassan Tayir, CNN</h1>
            </div>
            <div>
              <h1>Fri, 29 March 2024</h1>
            </div>
          </div>

          {/* Article Views */}
          <div className="flex flex-col min-h-full justify-end">
            <h1 className="">{article?.views} views</h1>
          </div>
        </div>

        {/* Article AI Check and Thumbnail */}
        <div className="py-6">
          <div className="flex justify-between bg-black text-white items-center text-2xl font-bold py-4 px-5 rounded-3xl max-w-4xl mx-auto">
            <h1>{Math.round(article?.classification.probability * 100)}%</h1>
            <h1>{article?.classification.category} News Detected</h1>
            {/* Like/Dislike Button Container */}
            <div className="flex gap-x-3">
              <Button
                onClick={() => manageCookieForType("like", id)}
                className="bg-green-500 rounded-full aspect-square h-fit p-1 hover:bg-green-700"
              >
                <HandThumbUpIcon className="text-black size-8" />
              </Button>
              <Button
                onClick={() => manageCookieForType("dislike", id)}
                className="bg-red-500 rounded-full aspect-square h-fit p-1 hover:bg-red-700"
              >
                <HandThumbDownIcon className="text-black size-8" />
              </Button>
            </div>
          </div>

          {/* Article Like/Dislike Bar */}
          <div className="flex justify-end py-5 pr-12 w-full py-2">
            {article && <LikeDislikeBar likes={article.likes} dislikes={article.dislikes} />}
          </div>

          {/* Article Thumbnail and Description */}
          <div className="flex flex-col mx-auto max-w-3xl text-sm text-justify font-light gap-y-5">
            <img src={articleDetail.src} alt="" />
            <span>{articleDetail.desc}</span>
          </div>
        </div>

        {/* Article Content */}
        <div className="flex flex-col gap-y-5 py-5 max-w-2xl mx-auto">
          {article?.body}
        </div>
      </div>
    </main>
  );
}
