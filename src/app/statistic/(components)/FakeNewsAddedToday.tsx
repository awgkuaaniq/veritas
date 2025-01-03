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
import { NewspaperIcon } from "@heroicons/react/24/outline";
import axios from "axios";

export default function FakeNewsAddedToday() {
  const [articleCount, setArticleCount] = useState(0);
  const [changeSinceYesterday, setChangeSinceYesterday] = useState(null);

  useEffect(() => {
    // Fetch article count data from FastAPI
    const fetchArticleCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/count-articles-added-today`
        );
        const data = response.data;

        setArticleCount(data.today_article_count);

        // Optionally, calculate the change since yesterday here if your API provides it
        // (if not, you might need a different API endpoint for that data)
        setChangeSinceYesterday(data.change_since_yesterday); // Placeholder value; replace as needed
      } catch (error) {
        console.error("Error fetching article count:", error);
      }
    };

    fetchArticleCount();
  }, []);
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-x-5">
          Fake News Added Today
          <span>
            <NewspaperIcon className="size-6" />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold">+{articleCount}</p>
        <p className="text-gray-500 text-sm">
          {changeSinceYesterday} since yesterday
        </p>
      </CardContent>
    </Card>
  );
}
