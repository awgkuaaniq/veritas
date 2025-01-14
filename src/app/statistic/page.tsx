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
import FakeNewsAddedToday from "./(components)/FakeNewsAddedToday";
import TopFakeNewsSource from "./(components)/TopFakeNewsSource";
import TopNewsThisWeek from "./(components)/TopNewsThisWeek";
import VolumeFakeNews from "./(components)/VolumeFakeNews";

export default function StatisticsPage() {
  return (
    <main className="bg-gray-100 py-20 dark:bg-offblack">
      {/* Main Container */}
      <div className="flex flex-col mx-auto px-2 max-w-7xl">
        {/* Grid Container */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-10 grid-rows-auto">
          {/* Top Left Component spanning 4x6 */}
          <div className="rounded-lg shadow-2xl lg:col-span-6 lg:row-span-4">
            <TrendingKeywords />
          </div>

          {/* Top Right Components */}
          <div className="rounded-lg shadow-2xl lg:col-span-4 lg:row-span-2">
            <FakeNewsAddedToday />
          </div>
          <div className="rounded-lg shadow-2xl lg:col-span-4 lg:row-span-2">
            <TopFakeNewsSource />
          </div>

          {/* Bottom Right Component spanning 5x6 */}
          <div className="rounded-lg shadow-2xl lg:col-span-10 lg:row-span-5">
            <VolumeFakeNews />
          </div>
        </div>
      </div>
    </main>
  );
}
