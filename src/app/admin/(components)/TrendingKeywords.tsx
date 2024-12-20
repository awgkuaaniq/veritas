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
        const response = await axios.get("http://localhost:8000/api/keywords");
        setKeywords(response.data); // Assuming your API returns an array of keyword objects
      } catch (error) {
        console.error("Error fetching keywords:", error);
      }
    };

    fetchKeywords();
  }, []);
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="">Trending Keywords</CardTitle>
      </CardHeader>
      <CardContent className="flex max-h-80 flex-grow justify-between font-semibold overflow-y-auto">
        {/* Left Part */}
        <div className="flex flex-col gap-y-4">
          {keywords
            .slice(0, Math.ceil(keywords.length / 2))
            .map((keyword, index) => (
              <div key={index}>
                <p>{keyword.keyword}</p>
                <p className="text-gray-500 font-normal text-sm">
                  {keyword.total_count} mentioned
                </p>
              </div>
            ))}
        </div>

        {/* Right Part */}
        <div className="flex flex-col gap-y-4">
          {keywords
            .slice(Math.ceil(keywords.length / 2))
            .map((keyword, index) => (
              <div key={index}>
                <p>{keyword.keyword}</p>
                <p className="text-gray-500 font-normal text-sm">
                  {keyword.total_count} mentioned
                </p>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
