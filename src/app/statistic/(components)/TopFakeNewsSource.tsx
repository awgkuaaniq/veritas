import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { NewspaperIcon } from "@heroicons/react/24/outline";
import React from 'react'

export default function TopFakeNewsSource() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className=''>
        <CardTitle className="flex items-center justify-between gap-x-5">Top Fake News Source
            <span>
                <NewspaperIcon className="size-6"/>
            </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-2xl font-semibold'>Reuters - 794</p>
        <p className='text-gray-500 text-sm'>as of 30/3/2024</p>
      </CardContent>
      
    </Card>
  )
}
