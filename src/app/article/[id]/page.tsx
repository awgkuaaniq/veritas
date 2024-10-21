"use client";

import LikeDislikeBar from "@/components/LikeDislikeBar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HandThumbDownIcon } from "@heroicons/react/24/outline";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type Article = {
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
  const [articleId, setArticleId] = useState<string | null>(null);
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const { id } = params; // Dynamic article ID from the route

  useEffect(() => {
    const fetchArticle = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = window.location.href; // Get the full URL
        const articleId = url.split("/article/")[1]; // Split the URL and get the part after "article/"

        // If you want to remove any trailing slashes or parameters (if they exist)
        const uniqueHash = articleId.split("/")[0]; // This will give you just the article ID
        console.log(uniqueHash);
        if (uniqueHash) {
          const response = await axios.get(
            `http://localhost:8000/api/articles${uniqueHash}` // Use unique_hash from URL
          );

          if (response.data) {
            console.log(response.data);
            setArticle(response.data);
          } else {
            console.error("Error fetching article");
          }
        } else {
          console.error("Missing unique_hash parameter in URL");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, []);
  // On component mount, check for cookie and handle view logic
  useEffect(() => {
    if (id) {
      checkAndSetArticleCookie(id);
    }
  }, [id]);

  if (isLoading) return <div>Loading article...</div>;
  if (error) return <div>Error fetching article:</div>;

  // Function to check if the cookie exists and set it if it doesn't
  async function checkAndSetArticleCookie(articleId: string) {
    try {
      const res = await fetch("/api/get-cookie");
      const data = await res.json();

      const visitedArticles = data.articleId ? data.articleId.split(",") : [];

      // If the article ID isn't in the cookie, increment the view count and set the cookie
      if (!visitedArticles.includes(articleId)) {
        await setArticleCookie(articleId);
      }

      // Set cookie value in state
      setCookieValue(data.articleId);
    } catch (err) {
      console.log("Error setting cookies.");
    }
  }

  // Function to set the article cookie and increment the view count
  async function setArticleCookie(articleId: string) {
    await fetch("/api/set-cookie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId }), // Pass the article ID to be set in the cookie
    });
  }

  // Pull from database and put the img src as well as desc here
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
          {/* AI Check */}
          <div className="flex justify-between bg-black text-white items-center text-2xl font-bold py-4 px-5 rounded-3xl max-w-4xl mx-auto">
            <h1>{Math.round(article?.classification.probability * 100)}%</h1>
            <h1>{article?.classification.category} News Detected</h1>
            {/* Like/Dislike Button Container */}
            <div className="flex gap-x-3">
              <Button className="bg-green-500 rounded-full aspect-square h-fit p-1 hover:bg-green-700">
                <HandThumbUpIcon className="text-black size-8" />
              </Button>
              <Button className="bg-red-500 rounded-full aspect-square h-fit p-1 hover:bg-red-700">
                <HandThumbDownIcon className="text-black size-8" />
              </Button>
            </div>
          </div>

          {/* Article Like/Dislike Bar */}
          <div className="flex justify-end py-5 pr-12 w-full py-2">
            <LikeDislikeBar />
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
