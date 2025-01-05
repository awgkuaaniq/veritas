"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid"; // Import the icon

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
  image_url?: string; // Ensure this is included in the type
  classification: Classification;
};

type Classification = {
  category: string;
  probability: number;
  hasBeenChecked: boolean;
};

export default function TopNewsThisWeek() {
  const [articles, setArticles] = useState<Article[]>([]); // Initialize articles state

  const getArticleById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-top-articles/`
      );
      const fetchedArticles = response.data; // Assuming the response contains an array of articles
      setArticles(fetchedArticles); // Update state with fetched articles
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getArticleById();
  }, []);

  return (
    <Card className="flex flex-col h-full dark:bg-offgray">
      <CardHeader>
        <CardTitle className="">Top News This Week</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow overflow-y-auto font-semibold gap-y-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <a
              href={`/article/${article._id}`}
              className="flex gap-x-4 pb-4 border-b-2 border-gray-300 rounded hover:bg-gray-200"
              key={article._id}
            >
              {/* Image or Placeholder Logo */}
              {article.image_url ? (
                <img
                  className="aspect-video h-28 object-cover rounded-lg"
                  src={article.image_url}
                  alt={article.title}
                />
              ) : (
                <div className="aspect-video h-28 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CodeBracketSquareIcon className="size-12 text-black" />
                </div>
              )}
              <p className="font-normal">{article.title}</p>
            </a>
          ))
        ) : (
          <p className="text-gray-500 font-light text-center my-auto dark:text-gray-400">No articles available</p>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
