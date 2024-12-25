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
  const [articles, setArticles] = useState<Article[]>([]); // Initialize articles state
  const getArticleById = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/articles");
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
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex justify-between items-center">
          <span>Article Analytics</span>
          <a
            href="/addArticle"
            className="flex items-center px-3 py-1 text-gray-600 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Article
          </a>
        </CardTitle>
      </CardHeader>

      <DataTable columns={columns} data={articles} />
      <CardContent className="grid grid-cols-3 gap-6"></CardContent>
    </Card>
  );
}
