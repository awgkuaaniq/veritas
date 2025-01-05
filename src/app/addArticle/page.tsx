import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import AddArticle from "./(components)/AddArticle";

export default function StatisticsPage() {
  return (
    <main className="bg-gray-200">
      {/* Main Container */}
      <div className="flex flex-col mx-auto px-2 max-w-7xl py-11">
        {/* Grid Container */}
        <div className="grid grid-cols-10 gap-4 items-start text-gray-600 border-gray-30 hover:bg-gray 100">
          {/* User Analytics */}
          <div className="col-span-10 rounded-lg shadow-md h-auto">
            <AddArticle />
          </div>
        </div>
      </div>
    </main>
  );
}
