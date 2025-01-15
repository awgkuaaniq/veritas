"use client";

import { Suspense } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowUpRightFromSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid"; // Import the icon

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import RelevantArticle from "@/components/RelevantArticle";
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
  domain: string;
  dislikes: number;
  views: number;
  image_url: string;
  time_added: Date;
  unique_hash?: string;
  classification: Classification;
   most_relevant_article?: {
    title: string;
    content: string;
    similarity_score: number;
    url: string;
  } | null;
};

type Classification = {
  category: string;
  probability: number;
  hasBeenChecked: boolean;
};

export default function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
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
  return (
    <main className="py-20 min-h-screen bg-gray-50 dark:bg-offblack transition-colors duration-200">
      <div className="flex flex-col mx-auto px-4 max-w-4xl overflow-hidden">
        <Card className="overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="relative p-0">
            {article?.image_url ? (
              <Image
                src={article?.image_url}
                alt={article?.title}
                width={1200}
                height={630}
                className="object-cover w-full h-64 rounded-t-lg"
              />
            ) : (
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-t-lg">
                <a href=".." className="flex items-center justify-center">
                  <CodeBracketSquareIcon className="size-12 text-black mr-2" />
                  <span className="text-black text-xl font-bold">VERITAS</span>
                </a>
              </div>
            )}

            {/* Keep the rest of the CardHeader content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {article?.title}
              </CardTitle>
              <div className="flex items-center justify-between text-white/80">
                <span>{article?.source}</span>
                <span>
                  {article?.published_at
                    ? format(new Date(article.published_at), "PPP")
                    : "Date not available"}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
              >
                {article?.domain}
              </Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {article?.views} views
                </span>
              </div>
            </div>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article?.body || "" }}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4 dark:border-gray-700">
            <div className="flex space-x-2">
              <Suspense fallback={<LikeDislikeSkeleton />}>
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
                      hasLiked
                        ? "text-white"
                        : "text-green-500 dark:text-green-400"
                    }`}
                  />
                </Button>
                <span className="mx-2 text-sm">{article?.likes}</span>
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
                      hasDisliked
                        ? "text-white"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  />
                </Button>
                <span className="ml-2 text-sm">{article?.dislikes}</span>
              </Suspense>
            </div>
            <a
              href={article?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-500 hover:underline dark:text-blue-400"
            >
              Read original article
              <ArrowUpRightFromSquare className="ml-1 h-4 w-4" />
            </a>
          </CardFooter>
        </Card>

        <Suspense fallback={<RelevantArticleSkeleton />}>
          <RelevantArticle article={article?.most_relevant_article} />
        </Suspense>
      </div>
    </main>
  );
}

function LikeDislikeSkeleton() {
  return (
    <div className="flex space-x-2">
      <Skeleton className="h-10 w-10 rounded-full" />
      <Skeleton className="h-10 w-10 rounded-full" />
    </div>
  );
}

function RelevantArticleSkeleton() {
  return (
    <Card className="mt-8">
      <CardHeader>
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>
    </Card>
  );
}
