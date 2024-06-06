import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import { NewspaperIcon } from "@heroicons/react/24/outline";

export default function FakeNewsAddedToday() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-x-5">Fake News Added Today
            <span>
                <NewspaperIcon className="size-6"/>
            </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">+573</p>
        <p className="text-gray-500 text-sm">+20 since yesterday</p>
      </CardContent>
      
    </Card>
  );
}
