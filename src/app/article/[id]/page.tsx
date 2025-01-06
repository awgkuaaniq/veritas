import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { ArrowUpRightFromSquare, ThumbsDown, ThumbsUp } from "lucide-react";
import { cookies } from "next/headers";

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
import LikeDislikeButtons from "@/components/LikeDislikeButtons";

async function getArticle(id: string) {
  // Fetch article data with cache busting
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}?_=${Date.now()}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }
  const article = await res.json();

  // Use an absolute URL for the /api/get-cookie endpoint
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  // Check if the user has already viewed this article
  const viewCookieRes = await fetch(
    `${baseUrl}/api/get-cookie?type=view&articleId=${id}`
  );
  const viewCookieData = await viewCookieRes.json();
  const hasViewed =
    viewCookieData.hasInteracted || viewCookieData.articleId?.includes(id);

  // Increment view count only if the user hasn't viewed the article yet
  if (!hasViewed) {
    await fetch(`${baseUrl}/api/set-cookie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ articleId: id, type: "view" }),
    });

    // Increment the view count locally (optional, if you want immediate UI feedback)
    article.views += 1;
  }

  return article;
}

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticle(params.id);

  if (!article) {
    notFound();
  }

  return (
    <main className="py-8 min-h-screen bg-gray-50 dark:bg-offblack transition-colors duration-200">
      <div className="flex flex-col mx-auto px-4 max-w-4xl overflow-hidden">
        <Card className="overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-200">
          <CardHeader className="relative p-0">
            <Image
              src={article.image_url}
              alt={article.title}
              width={1200}
              height={630}
              className="object-cover w-full h-64 rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <CardTitle className="text-3xl font-bold text-white mb-2">
                {article.title}
              </CardTitle>
              <div className="flex items-center justify-between text-white/80">
                <span>{article.source}</span>
                <span>{format(new Date(article.published_at), "PPP")}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <Badge
                variant="outline"
                className="bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground"
              >
                {article.domain}
              </Badge>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {article.views} views
                </span>
              </div>
            </div>
            <div
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center border-t pt-4 dark:border-gray-700">
            <div className="flex space-x-2">
              <Suspense fallback={<LikeDislikeSkeleton />}>
                <LikeDislikeButtons
                  id={article._id}
                  initialLikes={article.likes}
                  initialDislikes={article.dislikes}
                />
              </Suspense>
            </div>
            <a
              href={article.url}
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
          <RelevantArticle article={article.most_relevant_article} />
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
