"use client";

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useRouter, useParams } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function EditArticle() {
  const router = useRouter();
  const { id } = useParams(); // Get the article ID from the URL
  const [formData, setFormData] = useState({
    media: null as File | null,
    author: "",
    source: "",
    title: "",
    body: "",
    image_url: "", // Add image_url to the formData state
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch article details on component mount
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch article.");
        }
        const data = await response.json();
        setFormData({
          media: null, // You can handle media separately if needed
          author: data.author || "",
          source: data.source || "",
          title: data.title || "",
          body: data.body || "",
          image_url: data.image_url || "", // Set the current image URL
        });
      } catch (err) {
        // Handle the error properly
        if (err instanceof Error) {
          setError(
            err.message || "An error occurred while fetching the article."
          );
        } else {
          setError("An unknown error occurred.");
        }
      }
    };

    fetchArticle();
  }, [id]);

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
    if (!formData.author || !formData.title || !formData.body) {
      setError("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const formPayload = new FormData();
    if (formData.media) {
      formPayload.append("media", formData.media);
    }
    formPayload.append("author", formData.author);
    formPayload.append("source", formData.source);
    formPayload.append("title", formData.title);
    formPayload.append("body", formData.body);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${id}`,
        {
          method: "PUT", // Use PUT or PATCH for updating
          body: formPayload,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update article.");
      }

      const data = await response.json();
      console.log("Article updated successfully:", data);
      router.push("/"); // Redirect to homepage or another route
    } catch (err) {
      // Handle the error properly
      if (err instanceof Error) {
        setError(
          err.message || "An error occurred while updating the article."
        );
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full p-6 space-y-6 bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-100">
      <CardHeader className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 p-2 mb-4 text-gray-600 text-sm rounded-md border border-gray-300 hover:bg-gray-100 self-start transition-colors duration-200 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
        >
          <ArrowBackIcon className="dark:text-gray-300" />
          Back
        </button>
        <CardTitle className="text-2xl font-bold self-start text-gray-800 dark:text-gray-100">
          Edit Article
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Display Current Image */}
        {formData.image_url && (
          <div className="w-3/4 mx-auto">
            <img
              src={formData.image_url}
              alt="Current Article Image"
              className="w-full h-auto rounded-lg shadow-sm"
            />
          </div>
        )}

        {/* Media Upload Section */}
        <div
          {...getRootProps()}
          className={`w-3/4 mx-auto p-6 border-2 rounded-lg ${
            isDragActive
              ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/30"
              : "border-dashed border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700"
          } cursor-pointer transition-colors duration-200`}
        >
          <input {...getInputProps()} />
          <p className="text-center text-gray-500 dark:text-gray-300">
            {isDragActive
              ? "Drop the files here ..."
              : "Drag and drop or click to upload files"}
          </p>
          {formData.media && (
            <p className="mt-2 text-center text-green-500 dark:text-green-400">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            required
          />
          <input
            type="text"
            name="source"
            placeholder="Source"
            value={formData.source}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            required
          />
        </div>

        {/* Content Section */}
        <div>
          <textarea
            name="content"
            placeholder="Content *"
            value={formData.body}
            onChange={handleChange}
            rows={8}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400"
            required
          ></textarea>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 dark:text-red-400 text-center text-sm mt-2">
            {error}
          </p>
        )}
      </CardContent>

      <CardFooter>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full p-3 text-white bg-black rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200 dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </CardFooter>
    </Card>
  );
}
