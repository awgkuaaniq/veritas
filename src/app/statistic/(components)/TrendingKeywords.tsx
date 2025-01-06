"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the type for the keyword objects
interface Keyword {
  keyword: string;
  total_count: number;
}

export default function TrendingKeywords() {
  // State to store the keywords data
  const [keywords, setKeywords] = useState<Keyword[]>([]);

  // Fetch trending keywords on component mount
  useEffect(() => {
    const fetchKeywords = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/keywords`
        );
        setKeywords(response.data); // Assuming your API returns an array of keyword objects
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    };

    fetchKeywords();
  }, []);
  return (
    <Card className="flex flex-col h-full dark:bg-offgray">
      <CardHeader>
        <CardTitle className="">Trending Keywords</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-x-40 gap-y-4 font-semibold overflow-y-auto">
        {keywords.map((keyword, index) => (
          <div key={index} className="flex flex-col">
            <a
              href={`/search?q=${encodeURIComponent(keyword.keyword)}`}
              className="relative hover:underline hover:scale-105 transition-all ease-out duration-150"
            >
              {keyword.keyword}
            </a>
            <p className="text-gray-500 dark:text-gray-400 font-normal text-sm">
              {keyword.total_count} mentioned
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
