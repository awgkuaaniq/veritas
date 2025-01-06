"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { formatDate } from '@/utils/formatDate';
import { NewspaperIcon } from "@heroicons/react/24/outline";
import axios from 'axios';
import React, { useEffect, useState } from 'react'

type Source = {
  source: string;
  count: number;
  latest_date: Date | string;
};


export default function TopFakeNewsSource() {
  const [source, setSource] = useState<Source | undefined>(undefined);

  useEffect(() => {
    // Fetch article count data from FastAPI
    const fetchSource = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/top-source`
        );
        setSource(response.data);
      } catch (error) {
        console.error("Error fetching top source:", error);
      }
    };

    fetchSource();
  }, []);

  if (!source) {
    return <div>Loading...</div>;
  }
  
  return (
    <Card className="flex flex-col h-full dark:bg-offgray">
      <CardHeader className=''>
        <CardTitle className="flex items-center justify-between gap-x-5">Top Fake News Source
            <span>
                <NewspaperIcon className="size-6"/>
            </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-2xl font-semibold'>{source?.source} - {source?.count}</p>
        <p className='text-gray-500 dark:text-gray-400 text-sm'>as of {formatDate(source.latest_date)}</p>
      </CardContent>
      
    </Card>
  )
}
