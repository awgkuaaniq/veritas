"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function AddArticle() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    media: null as File | null,
    author: "",
    source: "",
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSubmit = async () => {
    if (
      !formData.media ||
      !formData.author ||
      !formData.title ||
      !formData.content
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    const formPayload = new FormData();
    formPayload.append("media", formData.media);
    formPayload.append("author", formData.author);
    formPayload.append("source", formData.source);
    formPayload.append("title", formData.title);
    formPayload.append("content", formData.content);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/ui`,
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit article.");
      }

      const data = await response.json();
      console.log("Article submitted successfully:", data);

      // Display success message
      setSuccessMessage("Article submitted successfully!");

      // Clear the form
      setFormData({
        media: null,
        author: "",
        source: "",
        title: "",
        content: "",
      });
    } catch (err) {
      // Handle the error properly
      if (err instanceof Error) {
        setError(
          err.message || "An error occurred while submitting the article."
        );
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full p-6 space-y-6 bg-white shadow-lg rounded-lg">
      <CardHeader className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 p-2 mb-4 text-gray-600 text-sm rounded-md border border-gray-300 hover:bg-gray-100 self-start transition-colors duration-200"
        >
          <ArrowBackIcon />
          Back
        </button>
        <CardTitle className="text-2xl font-bold self-start text-gray-800">
          Add Article
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Media Upload Section */}
        <div
          {...getRootProps()}
          className={`w-3/4 mx-auto p-6 border-2 rounded-lg ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-dashed border-gray-300 bg-gray-50"
          } cursor-pointer transition-colors duration-200`}
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
            placeholder="Author *"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Title Section */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title *"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          />
        </div>

        {/* Content Section */}
        <div>
          <textarea
            name="content"
            placeholder="Content *"
            value={formData.content}
            onChange={handleChange}
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            required
          ></textarea>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center text-sm mt-2">{error}</p>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-center text-sm mt-2">
            {successMessage}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-3 text-white bg-black rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
        >
          {loading ? "Submitting..." : "Save"}
        </button>
      </CardFooter>
    </Card>
  );
}
