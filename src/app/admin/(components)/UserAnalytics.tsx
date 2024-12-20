"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import PageRatings from "./PageRatings";
import axios from "axios";

// Define the types for the data
interface SearchTrend {
  keyword: string;
}

// Define the types for the data
interface Ratings {
  ratings: number;
}

interface AnalyticsData {
  visitors: number;
  visitorChange: number; // Percentage change from last week
  searchTrends: SearchTrend[];
}

export default function UserAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/analytics");
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">User Analytics</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-6">
        {/* Page Visitors Section */}
        <div className="flex items-center gap-4 border p-4 rounded-lg shadow-sm bg-white">
          <div className="flex items-center justify-center w-16 h-16 rounded-full">
            <img
              src="/Visitors.svg"
              alt="Visitor Icon"
              className="w-10 h-10 text-black"
            />
          </div>
          <div>
            <p className="text-lg font-medium">Page Visitors</p>
            <p className="text-lg font-medium">
              {analyticsData?.visitors ?? "Loading..."}
            </p>
            <p
              className={`text-sm font-medium ${
                analyticsData?.visitorChange < 0
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {analyticsData?.visitorChange ?? "Loading..."}% compared last week
            </p>
          </div>
        </div>
        {/* Search Trends Section */}
        <div className="flex flex-col gap-4 border p-4 rounded-lg shadow-sm bg-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-16 h-16 rounded-full">
              <img
                src="/Trends.svg"
                alt="Trends Icon"
                className="w-10 h-10 text-black"
              />
            </div>
            <p className="text-lg font-medium">Search Trends</p>
          </div>
          <ul className="pl-6 list-disc space-y-1">
            {analyticsData?.searchTrends.map((trend, index) => (
              <li key={index} className="text-sm font-medium">
                {trend.keyword}
              </li>
            )) || <p>Loading...</p>}
          </ul>
        </div>
        <PageRatings></PageRatings>
      </CardContent>
    </Card>
  );
}
