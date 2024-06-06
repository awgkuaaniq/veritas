import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import React from 'react'

export default function TrendingKeywords() {
  return (
    <Card className='flex flex-col h-full'>
            <CardHeader>
              <CardTitle className=''>Trending Keywords</CardTitle>
            
            </CardHeader>
            <CardContent className='flex max-h-80 flex-grow justify-between font-semibold overflow-y-auto'>
                {/* Left Part */}
              <div className='flex flex-col gap-y-4'>
                  <div>
                    <p>Trump</p>
                    <p className='text-gray-500 font-thin text-sm'>1,281 mentioned</p>
                  </div>
                  <div>
                  <p>Biden</p>
                    <p className='text-gray-500 font-thin text-sm'>2,928 mentioned</p>
                  </div>
                  <div>
                  <p>Smoking</p>
                    <p className='text-gray-500 font-thin text-sm'>928 mentioned</p>
                  </div>
                  <div>
                  <p>iPhone</p>
                    <p className='text-gray-500 font-thin text-sm'>12,211 mentioned</p>
                  </div>
                  <div>
                  <p>Steve Jobs</p>
                    <p className='text-gray-500 font-thin text-sm'>423 mentioned</p>
                  </div>
              </div>
              {/* Right Part */}
              <div className='flex flex-col gap-y-4'>
                  <div>
                  <p>Android</p>
                    <p className='text-gray-500 font-thin text-sm'>6,220 mentioned</p>
                  </div>
                  <div>
                  <p>Israel</p>
                    <p className='text-gray-500 font-thin text-sm'>92,192 mentioned</p>
                  </div>
                  <div>
                  <p>Water</p>
                    <p className='text-gray-500 font-thin text-sm'>23,029 mentioned</p>
                  </div>
                  <div>
                  <p>Congo</p>
                    <p className='text-gray-500 font-thin text-sm'>62,522 mentioned</p>
                  </div>
                  <div>
                  <p>Murder</p>
                    <p className='text-gray-500 font-thin text-sm'>10,678 mentioned</p>
                  </div>
              </div>
            </CardContent>
          </Card>
  )
}
