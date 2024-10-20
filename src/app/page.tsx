import Navbar from "@/components/Navbar";
import HomeArticle from "@/components/HomeArticle";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  // Array of image URLs
  const images = [
    { src: "/dummyIMG/corgi.webp", alt: "Paw patrol: China's most popular new police officer is a corgi" },
    { src: "/dummyIMG/chrisbrown.webp", alt: "Chris Brown gets back with Rihanna and punches ASAP Wocky" },
    { src: "/dummyIMG/kanye.webp", alt: "Kanye West joins Neo Nazi Program" },
  ];
  return (
    <main className="bg-gray-200">

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
        <div className="grid grid-cols-3 gap-y-5">
          {/* Columns */}
          <div className="justify-self-start"><HomeArticle/></div>
          <div className="justify-self-center"><HomeArticle/></div>
          <div className="justify-self-end"><HomeArticle/></div>
            {/* Columns */}
          <div className="justify-self-start"><HomeArticle/></div>
          <div className="justify-self-center"><HomeArticle/></div>
          <div className="justify-self-end"><HomeArticle/></div>
            
            
        </div>

      </div>
    </main>
  );
}
