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
    <main className="bg-gray-100">
      {/* Main Container */}
      <div className="flex flex-col mx-auto px-2 max-w-7xl py-11">
        {/* Grid Container */}
        <div className="grid grid-cols-10 grid-rows-9 gap-4">
          {/* Top Left Component spanning 4x6 */}
          <div className="col-span-6 row-span-4 rounded-lg shadow-md">
            <TrendingKeywords />
          </div>

          {/* Top Right Components */}
          <div className="col-span-4 row-span-2 rounded-lg shadow-md">
            <FakeNewsAddedToday />
          </div>
          <div className="col-span-4 row-span-2 rounded-lg shadow-md">
            <TopFakeNewsSource />
          </div>

          {/* Bottom Left Component spanning 5x4 */}
          <div className="col-span-4 row-span-5 rounded-lg shadow-md">
            <TopNewsThisWeek />
          </div>

          {/* Bottom Right Component spanning 5x6 */}
          <div className="col-span-6 row-span-5 rounded-lg shadow-md">
            <VolumeFakeNews />
          </div>
        </div>
      </div>
    </main>
  );
}
