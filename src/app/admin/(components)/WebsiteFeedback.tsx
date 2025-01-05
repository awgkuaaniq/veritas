"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Feedback, columns } from "./feedbackColumn";
import { DataTable } from "./data-table";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home({ params }: any) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]); // Initialize articles state
  const getArticleById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/feedbacks/`
      );
      const fetchedFeedbacks = response.data;

      setFeedbacks(fetchedFeedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  useEffect(() => {
    getArticleById();
  }, []);

  return (
    <Card className="flex flex-col h-full dark:bg-offgray">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Website Feedback</CardTitle>
      </CardHeader>
      <DataTable columns={columns} data={feedbacks} />
      <CardContent className="grid grid-cols-3 gap-6"></CardContent>
    </Card>
  );
}
