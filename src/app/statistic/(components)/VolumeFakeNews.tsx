'use client'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function VolumeFakeNews() {

  const generateData = () => {
    let dataset = []
    const dates = [
      'Jun 30',
      'Jul 01',
      'Jul 02',
      'Jul 03',
      'Jul 04',
      'Jul 05',
      'Jul 06',
      'Jul 07',
      'Jul 08',
      'Jul 09',
      'Jul 10',
      'Jul 11',
      'Jul 12',
      'Jul 13',
      'Jul 14',
      'Jul 15',
      'Jul 16',
      'Jul 17',
    ]

    for (let date of dates) {
      dataset.push({
        date,
        'checkout-1': Math.round(150 + Math.random() * 20 - 10),
        'checkout-2': Math.round(200 + Math.random() * 20 - 10),
        'checkout-3': Math.round(250 + Math.random() * 20 - 10),
      })
    }

    return dataset
  }

  const mockDataset = generateData();
  console.log("Generated Data: ", mockDataset);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume of Fake News</CardTitle>
      </CardHeader>
      <CardContent>
      <ResponsiveContainer width="100%" aspect={1.66}>
        <LineChart
          width={500}
          height={300}
          data={mockDataset}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="checkout-1" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="checkout-2" stroke="#82ca9d" />
          <Line type="monotone" dataKey="checkout-3" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
