"use client";
import Navbar from "@/components/Navbar";
import HomeArticle from "@/components/HomeArticle";
import axios from "axios";
import { useEffect, useState } from "react";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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

export default function Home({ params }: any) {
  const [articles, setArticles] = useState<Article[]>([]); // Initialize articles state
  const getArticleById = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/articles/");
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
    {
      src: "/dummyIMG/corgi.webp",
      alt: "Paw patrol: China's most popular new police officer is a corgi",
    },
    {
      src: "/dummyIMG/chrisbrown.webp",
      alt: "Chris Brown gets back with Rihanna and punches ASAP Wocky",
    },
    { src: "/dummyIMG/kanye.webp", alt: "Kanye West joins Neo Nazi Program" },
  ];
  return (
    <main className="bg-gray-200 min-h-screen">
      {/* Carousel Slider */}

      <div className="flex justify-center py-11">
        <Carousel className="flex max-w-4xl max-h-fit min-w-xs relative">
          <CarouselContent className="max-h-full">
            {images.map((image, index) => (
              <CarouselItem className="py-0" key={index}>
                <Card className="flex items-center justify-center h-full">
                  <CardContent className="w-full h-full p-0 relative">
                    <a href="/article/[id]">
                      <img
                        className="object-fill w-full h-full"
                        src={image.src}
                        alt={image.alt}
                      />
                      {/* News Title */}
                      <div className="absolute w-full h-max bottom-0 bg-black/65 text-justify text-white font-semibold text-2xl px-4 py-4">
                        {image.alt}
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="right-3 bg-gray-200/50 border-none disabled:hidden" />
          <CarouselPrevious className="left-3 bg-gray-200/50 border-none disabled:hidden" />
        </Carousel>
      </div>

      {/*Display Article Section*/}

      <div className="flex flex-col justify-between max-w-7xl mx-auto px-2">
        <div className="font-semibold text-black text-2xl py-5">
          Latest Fake News
        </div>
        {articles.length > 0 ? (
          <div className="grid grid-cols-3 gap-y-5">
            {articles.map((article) => (
              <HomeArticle
                key={article._id || article.title}
                article={article}
              />
            ))}
          </div>
        ) : (
          <div>Loading articles...</div>
        )}
      </div>
    </main>
  );
}
