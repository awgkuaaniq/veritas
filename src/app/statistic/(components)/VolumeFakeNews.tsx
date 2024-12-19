'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import axios from'axios';
import React, {useEffect, useState} from "react";
import { LineChart } from '@tremor/react';

export default function VolumeFakeNews() {
  const [chartData, setChartData] = useState([]);
  const [granularity, setGranularity] = useState('month'); // Default to 'month'
  const [isLoading, setIsLoading] = useState(false); // Loading state for better UX

  // Transform API Data
  const transformData = (apiData: any) => {
    return apiData.data.map((item: any) => ({
      date: item.time, // Use the `time` field as the x-axis label
      Count: item.count, // Use the `count` field for the y-axis
    }));
  };
  
  // Fetch Data from API using Axios
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(`http://localhost:8000/api/get-article-graph-data/?range=${granularity}`);

        const transformedData = transformData(response.data);
        setChartData(transformedData);
        setIsLoading(false); // Start loading
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [granularity]);
  console.log('Chart Data State:', chartData); // Log chart data whenever it changes
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume of Fake News</CardTitle>
      </CardHeader>
      <CardContent>
      {isLoading ? (
          <p>Loading...</p> // Show loading state
        ) : (
          <LineChart
            className="h-80"
            data={chartData} // Transformed data
            index="date" // X-axis key
            categories={['Count']} // Y-axis values
            colors={['blue']}
            yAxisWidth={60}
          />
        )}
      </CardContent>
      <CardFooter>
      <div className="mt-4 flex space-x-2">
          {['day', 'week', 'month', '6months'].map((range) => (
            <button
              key={range}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                granularity === range
                  ? 'bg-blue-600 text-white border border-blue-700'
                  : 'bg-gray-200 text-gray-700 border border-gray-300'
              } hover:bg-blue-500 hover:text-white transition-colors`}
              onClick={() => setGranularity(range)} // Update granularity state
            >
              {range.charAt(0).toUpperCase() + range.slice(1)} {/* Capitalize first letter */}
            </button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
