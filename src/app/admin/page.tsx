import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import TrendingKeywords from "./(components)/TrendingKeywords";
import UserAnalytics from "./(components)/UserAnalytics";
import ArticleAnalytics from "./(components)/ArticleAnalytics";
import WebsiteFeedback from "./(components)/WebsiteFeedback";

export default function StatisticsPage() {
  return (
    <main className="bg-gray-200">
      {/* Main Container */}
      <div className="flex flex-col mx-auto px-2 max-w-7xl py-11">
        {/* Grid Container */}
        <div className="grid grid-cols-10 gap-4">
          {/* User Analytics */}
          <div className="col-span-10 rounded-lg shadow-md">
            <UserAnalytics />
          </div>
          {/* Article Analytics */}
          <div className="col-span-10 rounded-lg shadow-md">
            <ArticleAnalytics />
          </div>
          {/* Website Feedback */}
          <div className="col-span-4 rounded-lg shadow-md">
            <WebsiteFeedback />
          </div>
          {/* Website Feedback */}
          <div className="col-span-6 rounded-lg shadow-md">
            <WebsiteFeedback />
          </div>
        </div>
      </div>
    </main>
  );
}
