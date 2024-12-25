"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Next.js router for navigation
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function AddArticle() {
  const router = useRouter(); // Next.js router instance
  const [formData, setFormData] = useState({
    media: null,
    author: "",
    source: "",
    title: "",
    summary: "",
    content: "",
  });

  const onDrop = (acceptedFiles: File[]) => {
    setFormData({ ...formData, media: acceptedFiles[0] });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Submitting form:", formData);
    // Perform your API request here
  };

  return (
    <Card className="flex flex-col h-full p-6 space-y-6">
      <CardHeader className="flex items-center justify-between">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 p-2 mb-4 text-sm text-white border rounded-lg bg-black hover:bg-blue-100 self-start"
        >
          <ArrowBackIcon />
          Back
        </button>
        <CardTitle className="text-xl font-bold self-start">
          Add Article
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Media Upload Section */}
        <div
          {...getRootProps()}
          className={`w-3/4 mx-auto p-4 border-2 rounded-lg ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-dashed border-gray-300"
          } cursor-pointer`}
        >
          <input {...getInputProps()} />
          <p className="text-center text-gray-500">
            {isDragActive
              ? "Drop the files here ..."
              : "Drag and drop or click to upload files"}
          </p>
          {formData.media && (
            <p className="mt-2 text-center text-green-500">
              Uploaded: {formData.media.name}
            </p>
          )}
        </div>

        {/* Author and Source Section */}
        <div className="w-3/4 mx-auto space-y-4">
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Title Section */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Summary Section */}
        <div>
          <textarea
            name="summary"
            placeholder="Summary"
            value={formData.summary}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Content Section */}
        <div>
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </CardContent>

      <CardFooter>
        <button
          onClick={handleSubmit}
          className="w-full p-3 text-white bg-black rounded-lg hover:bg-blue-600"
        >
          Save
        </button>
      </CardFooter>
    </Card>
  );
}
