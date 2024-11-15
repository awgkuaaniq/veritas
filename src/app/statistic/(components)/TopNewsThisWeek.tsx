"use client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import React, {useEffect, useState} from 'react'
import axios from 'axios';

type Article = {
  _id: string;
  title: string;
  body: string;
  url: string;
  published_at?: Date;
  likes: number;
  dislikes: number;
  views: number;
  time_added: Date;
  unique_hash?: string;
  classification: Classification;
};

type Classification = {
  category: string;
  probability: number;
  hasBeenChecked: boolean;
};

export default function TopNewsThisWeek() {
  const [articles, setArticles] = useState<Article[]>([]); // Initialize articles state
  const getArticleById = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/get-top-articles/");
      const fetchedArticles = response.data; // Assuming the response contains an array of articles

      setArticles(fetchedArticles); // Update state with fetched articles
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    getArticleById();
  }, []);
    // Array of image URLs
  const images = [
    { src: "/dummyIMG/corgi.webp", title: "Paw patrol: China's most popular new police officer is a corgi" },
    { src: "/dummyIMG/chrisbrown.webp", title: "Chris Brown gets back with Rihanna and punches ASAP Wocky" },
    { src: "/dummyIMG/kanye.webp", title: "Kanye West joins Neo Nazi Program" },
  ];
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="">Top News This Week</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow overflow-y-auto font-semibold gap-y-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <a
              href={`/article/${article._id}`}
              className="flex gap-x-4 pb-4 border-b-2 border-gray-300 rounded hover:bg-gray-200"
              key={article._id}
            >
              <img
                className="aspect-video h-28"
                src={"/dummyIMG/kanye.webp"} // Fallback if `url` is missing
                alt={article.title}
              />
              <p className="font-normal">{article.title}</p>
            </a>
          ))
        ) : (
          <p className="text-gray-500">No articles available</p>
        )}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
