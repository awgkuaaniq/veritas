"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import PageRatings from "./PageRatings";
import axios from "axios";

// Define the types for the visitor data
interface Visitor {
  _id: string;
  timestamp: string; // ISO date string
}

interface VisitorData {
  currentWeek: number;
  previousWeek: number;
}

// Define the type for search trends
interface SearchTrend {
  _id: string; // The search query
  total_count: number; // The total number of searches for this query
}

export default function UserAnalytics() {
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [searchTrends, setSearchTrends] = useState<SearchTrend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to get the start and end of a week
  const getWeekRange = (date: Date): { start: Date; end: Date } => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0); // Start of the day
    start.setDate(start.getDate() - start.getDay()); // Start of the week (Sunday)

    const end = new Date(start);
    end.setDate(end.getDate() + 6); // End of the week (Saturday)
    end.setHours(23, 59, 59, 999); // End of the day

    return { start, end };
  };

  // Helper function to filter visitors by week
  const filterVisitorsByWeek = (
    visitors: Visitor[],
    start: Date,
    end: Date
  ): number => {
    return visitors.filter((visitor) => {
      const visitorDate = new Date(visitor.timestamp);
      return visitorDate >= start && visitorDate <= end;
    }).length;
  };

  // Fetch visitor data and search trends
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch visitor data
        const visitorResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/unique-visitor-count`
        );
        const visitors: Visitor[] = visitorResponse.data;

        // Get the current week range
        const now = new Date();
        const { start: currentWeekStart, end: currentWeekEnd } =
          getWeekRange(now);

        // Get the previous week range
        const previousWeekStart = new Date(currentWeekStart);
        previousWeekStart.setDate(previousWeekStart.getDate() - 7);
        const previousWeekEnd = new Date(currentWeekEnd);
        previousWeekEnd.setDate(previousWeekEnd.getDate() - 7);

        // Filter visitors for the current and previous weeks
        const currentWeekVisitors = filterVisitorsByWeek(
          visitors,
          currentWeekStart,
          currentWeekEnd
        );
        const previousWeekVisitors = filterVisitorsByWeek(
          visitors,
          previousWeekStart,
          previousWeekEnd
        );

        // Set the visitor data
        setVisitorData({
          currentWeek: currentWeekVisitors,
          previousWeek: previousWeekVisitors,
        });

        // Fetch search trends
        const searchTrendsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/searches/`
        );
        setSearchTrends(searchTrendsResponse.data);

        setError(null); // Clear any previous errors
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate the percentage change in visitors
  const calculateVisitorChange = (
    currentWeek: number,
    previousWeek: number
  ): number => {
    if (previousWeek === 0) {
      return 0; // Avoid division by zero
    }
    return ((currentWeek - previousWeek) / previousWeek) * 100;
  };

  return (
    <Card className="flex flex-col h-full dark:bg-offgray">
      <CardHeader>
        <CardTitle className="text-xl font-bold dark:text-gray-100">
          User Analytics
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-3 gap-6">
        {/* Page Visitors Section */}
        <div className="flex items-center gap-4 border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800/50 dark:border-gray-700">
          <div className="flex items-center justify-center w-16 h-16 rounded-full dark:bg-gray-700">
            <img
              src="/Visitors.svg"
              alt="Visitor Icon"
              className="w-10 h-10 text-black dark:text-gray-300"
            />
          </div>
          <div>
            <p className="text-lg font-medium dark:text-gray-200">
              Page Visitors
            </p>
            {loading ? (
              <p className="text-lg font-medium dark:text-gray-300">
                Loading...
              </p>
            ) : error ? (
              <p className="text-lg font-medium text-red-500 dark:text-red-400">
                {error}
              </p>
            ) : (
              <>
                <p className="text-lg font-medium dark:text-gray-100">
                  {visitorData?.currentWeek ?? "N/A"}
                </p>
                <p
                  className={`text-sm font-medium ${
                    visitorData?.currentWeek &&
                    visitorData?.previousWeek &&
                    calculateVisitorChange(
                      visitorData.currentWeek,
                      visitorData.previousWeek
                    ) < 0
                      ? "text-red-500 dark:text-red-400"
                      : "text-green-500 dark:text-green-400"
                  }`}
                >
                  {visitorData?.currentWeek && visitorData?.previousWeek
                    ? `${calculateVisitorChange(
                        visitorData.currentWeek,
                        visitorData.previousWeek
                      ).toFixed(2)}% compared to last week`
                    : "N/A"}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Search Trends Section */}
        <div className="flex gap-4 border p-4 rounded-lg shadow-sm bg-white dark:bg-gray-800/50 dark:border-gray-700">
          {/* Left Side: Icon and Title */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center justify-center w-16 h-16 rounded-full dark:bg-gray-700">
              <img
                src="/Trends.svg"
                alt="Trends Icon"
                className="w-10 h-10 text-black dark:text-gray-300"
              />
            </div>
            <p className="text-lg font-medium dark:text-gray-200">
              Search Trends
            </p>
          </div>

          {/* Right Side: Vertical List of Keywords */}
          <ul className="flex-1 space-y-2 dark:text-gray-300">
            {loading ? (
              <li className="text-sm font-medium">Loading...</li>
            ) : error ? (
              <li className="text-sm font-medium text-red-500 dark:text-red-400">
                {error}
              </li>
            ) : searchTrends.length > 0 ? (
              searchTrends.map((trend, index) => (
                <li key={index} className="text-sm font-medium">
                  <a
                    href={`/search?q=${encodeURIComponent(trend._id)}`}
                    className="hover:underline hover:scale-105 transition-all ease-out duration-150"
                  >
                    {trend._id}
                  </a>
                  <span className="text-gray-500 dark:text-gray-400 ml-2">
                    ({trend.total_count} searches)
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm font-medium">No data available</li>
            )}
          </ul>
        </div>

        {/* Page Ratings Section */}
        <PageRatings />
      </CardContent>
    </Card>
  );
}
