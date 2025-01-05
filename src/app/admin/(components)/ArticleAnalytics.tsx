"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Article, columns } from "./columns";
import { DataTable } from "./data-table";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlusIcon } from "@radix-ui/react-icons";

export default function Home({ params }: any) {
  const [articles, setArticles] = useState<Article[]>([]);

  // Fetch articles
  const getArticleById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`
      );
      const fetchedArticles = response.data;
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Delete article
  const deleteArticle = async (articleId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${articleId}`
      );
      // Refresh the articles list after deletion
      getArticleById();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  useEffect(() => {
    getArticleById();
  }, []);

  return (
    <Card className="flex flex-col h-full  dark:bg-offgray">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Article Analytics</span>
          <a
            href="/addArticle"
            className="flex items-center px-3 py-1 text-gray-700 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition-colors duration-200 ease-in-out
                 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700/50 dark:bg-gray-800/30"
          >
            <PlusIcon className="w-4 h-4 mr-2 dark:text-gray-300" />
            Add Article
          </a>
        </CardTitle>
      </CardHeader>

      {/* Pass columns and data to DataTable */}
      <DataTable columns={columns(deleteArticle)} data={articles} />
      <CardContent className="grid grid-cols-3 gap-6"></CardContent>
    </Card>
  );
}
