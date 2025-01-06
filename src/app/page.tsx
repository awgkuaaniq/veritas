"use client";
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
import DisclaimerPopup from "@/components/DisclaimerPopup";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";

type Article = {
  _id: string;
  title: string;
  body: string;
  url: string;
  published_at: Date | string;
  likes: number;
  dislikes: number;
  source: string;
  views: number;
  time_added: Date;
  unique_hash?: string;
  classification: Classification;
  image_url: string;
};

type Classification = {
  category: string;
  probability: number;
  hasBeenChecked: boolean;
};

export default function Home() {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [carousel, setCarousel] = useState<Article[]>([]);

  const getArticleById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`
      );
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };
  const getCarouselById = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/get-top-articles?limit=5`
      );
      const fetchedArticles = response.data; // Assuming the response contains an array of articles
      setCarousel(fetchedArticles); // Update state with fetched articles
    } catch (error) {
      console.error("Error fetching articles for carousel:", error);
    }
  };

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        const response = await axios.post("/api/track-visitor");
        if (response.data.message === "Unique visitor tracked") {
          setShowDisclaimer(true);
        }
      } catch (error) {
        console.error("Error tracking visitor:", error);
      }
    };

    trackVisitor();
    getArticleById();
    getCarouselById();
  }, []);

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
  };

  // Filter out articles already in the carousel
  const carouselIds = new Set(carousel.map((article) => article._id));
  const filteredArticles = articles.filter(
    (article) => !carouselIds.has(article._id)
  );

  return (
    <main className="bg-gray-100 dark:bg-offblack min-h-screen py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-x divide-black/15 dark:divide-offgray gap-3 max-w-screen-xl px-4 border-b border-black/15 dark:border-white/15 mx-auto">
        {/* Left Side Articles */}
        <div className="lg:col-span-3 [&>*:last-child]:pt-3 divide-y divide-black/15 dark:divide-offgray flex flex-col gap-3">
          {filteredArticles.slice(0, 2).map((article) => (
            <HomeArticle key={article._id} article={article} />
          ))}
        </div>

        {/* Carousel Section */}
        <div className="lg:col-span-6 lg:pl-3">
          <div className="w-full overflow-hidden rounded-lg">
            <Carousel className="w-full">
              <CarouselContent>
                {carousel.map((carousel, index) => (
                  <CarouselItem className="group" key={index}>
                    <Card className="border-0">
                      <CardContent className="p-0 group-hover:text-blue-600 dark:group-hover:text-blue-600">
                        {/* Image */}
                        <a href={`/article/${carousel._id}`}>
                          <div className="h-full relative">
                            {carousel.image_url ? (
                              <img
                                className="object-cover w-full h-[400px] lg:h-[565px]"
                                src={carousel.image_url}
                                alt={carousel.title}
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-[400px] lg:h-[565px] bg-gray-100">
                                <a
                                  href=".."
                                  className="flex items-center justify-center"
                                >
                                  <CodeBracketSquareIcon className="size-12 text-black mr-2" />
                                  <span className="text-black text-xl font-bold">
                                    VERITAS
                                  </span>
                                </a>
                              </div>
                            )}
                          </div>

                          {/* Title Below the Image */}
                          <div className="p-4 h-full bg-gray-100 dark:bg-offblack">
                            <h3 className="text-xl font-base mb-2">
                              {carousel.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 uppercase mb-4">
                              {carousel.source}
                            </p>
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200/50 border-none disabled:hidden" />
              <CarouselPrevious className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-200/50 border-none disabled:hidden" />
            </Carousel>
          </div>
        </div>

        {/* Right Side Articles */}
        <div className="lg:col-span-3 [&>*:last-child]:pt-3 divide-y divide-black/15 dark:divide-offgray lg:pl-3 flex flex-col gap-3">
          {filteredArticles.slice(2, 4).map((article) => (
            <HomeArticle key={article._id} article={article} />
          ))}
        </div>
      </div>

      {/* Bottom Articles */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 px-4">
        {filteredArticles.slice(4).map((article) => (
          <div
            key={article._id}
            className="[&:nth-child(4n+1)]:pl-0 [&:nth-child(4n+1)]:border-l-0 [&:nth-child(-n+4)]:pt-0 *:pt-3 *:border-b border-l *:border-black/15 dark:border-offgray dark:*:border-offgray border-black/15 pl-3 h-100%"
          >
            <HomeArticle article={article} />
          </div>
        ))}
      </div>

      {/* Disclaimer Popup */}
      <DisclaimerPopup
        isOpen={showDisclaimer}
        onClose={handleCloseDisclaimer}
      />
    </main>
  );
}
