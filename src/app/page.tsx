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
  }, []);

  const handleCloseDisclaimer = () => {
    setShowDisclaimer(false);
  };

  const images = [
    {
      src: "/dummyIMG/corgi.webp",
      alt: "Paw patrol: China's most popular new police officer is a corgi",
      source: "CNN",
    },
    {
      src: "/dummyIMG/chrisbrown.webp",
      alt: "Chris Brown gets back with Rihanna and punches ASAP Wocky",
      source: "BBC",
    },
    { src: "/dummyIMG/kanye.webp", alt: "Kanye West joins Neo Nazi Program",
      source: "Meowkie",
     },
  ];

  return (
    <main className="bg-gray-100 dark:bg-gray-950 min-h-screen py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-x divide-black/15 gap-3 max-w-screen-xl px-4 border-b border-black/15 mx-auto">
        {/* Left Side Articles */}
        <div className="lg:col-span-3 [&>*:last-child]:pt-3 divide-y divide-black/15 flex flex-col gap-3">
          {articles.slice(0, 2).map((article) => (
            <HomeArticle key={article._id} article={article} />
          ))}
        </div>

        {/* Carousel Section */}
        <div className="lg:col-span-6 lg:pl-3">
          <div className="w-full overflow-hidden rounded-lg">
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem className="" key={index}>
                    <Card className="border-0">
                      <CardContent className="p-0">
                        {/* Image */}
                        <a href="/article/[id]">
                          <div className="h-full relative">
                            <img
                              className="object-cover w-full h-[400px] lg:h-[565px]"
                              src={image.src}
                              alt={image.alt}
                            />
                          </div>
                        </a>

                        {/* Title Below the Image */}
                        <div className="p-4 h-full bg-gray-100">
                          <h3 className="text-xl font-base group-hover:text-blue-600 mb-2">
                            {image.alt}
                          </h3>
                          <p className="text-sm text-gray-600 uppercase mb-4">
                            {image.source}
                          </p>
                        </div>
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
        <div className="lg:col-span-3 [&>*:last-child]:pt-3 divide-y divide-black/15 lg:pl-3 flex flex-col gap-3">
          {articles.slice(2, 4).map((article) => (
            <HomeArticle key={article._id} article={article} />
          ))}
        </div>
      </div>

      {/* Bottom Articles */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-3 px-4">
        {articles.slice(4).map((article) => (
          <div
            key={article._id}
            className="[&:nth-child(4n+1)]:pl-0 [&:nth-child(4n+1)]:border-l-0 [&:nth-child(-n+4)]:pt-0 *:pt-3 *:border-b border-l *:border-black/15 border-black/15 pl-3 h-100%"
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
