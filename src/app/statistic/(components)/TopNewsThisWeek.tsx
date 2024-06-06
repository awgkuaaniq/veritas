import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'

export default function TopNewsThisWeek() {
    // Array of image URLs
  const images = [
    { src: "/dummyIMG/corgi.webp", title: "Paw patrol: China's most popular new police officer is a corgi" },
    { src: "/dummyIMG/chrisbrown.webp", title: "Chris Brown gets back with Rihanna and punches ASAP Wocky" },
    { src: "/dummyIMG/kanye.webp", title: "Kanye West joins Neo Nazi Program" },
  ];
  return (
    <Card className='flex flex-col'>
            <CardHeader>
              <CardTitle className=''>Top News This Week</CardTitle>
            
            </CardHeader>
            <CardContent className='flex flex-col flex-grow overflow-y-auto font-semibold gap-y-4'>
            {images.map((image, index) => (
              <div className='flex gap-x-4 pb-4 border-b-2 border-gray-300 rounded hover:bg-gray-200' key={index}>
                <img className='aspect-video h-28' src={image.src}/>
                <p className='font-normal'>{image.title}</p>
              </div>
            ))}
            </CardContent>
            <CardFooter>

            </CardFooter>
          </Card>
  )
}
