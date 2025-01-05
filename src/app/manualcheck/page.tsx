"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Article = {
  title: string;
  content?: string;
  similarity_score: number;
  url: string;
};

type CrosscheckResponse = {
  input: string;
  classification: boolean;
  most_relevant_article: Article;
  other_articles: Article[];
};

export default function FakeNewsChecker() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CrosscheckResponse | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/crosscheck`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ body: input }),
        }
      );
      const data: CrosscheckResponse = await response.json();
      setResult(data);
      setShowModal(true);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 dark:bg-offblack">
      <Card className="w-full max-w-2xl  dark:bg-offgray">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Fake News Checker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Enter text to check..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700  dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-200 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              type="submit"
              className="w-full  dark:bg-gray-600 dark:hover:bg-gray-500 dark: text-gray-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </>
              ) : (
                "Check"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-2xl font-bold">
              {result?.classification ? (
                <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              ) : (
                <XCircle className="mr-2 h-6 w-6 text-red-500" />
              )}
              {result?.classification ? "Likely True" : "Likely fake news"}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Most Relevant Source:</h3>
            <ArticleCard
              article={result?.most_relevant_article}
              isHighlighted={true}
            />
            <h3 className="text-lg font-semibold">Other Sources:</h3>
            {result?.other_articles.slice(0, 2).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ArticleCard({
  article,
  isHighlighted = false,
}: {
  article?: Article;
  isHighlighted?: boolean;
}) {
  if (!article) return null;

  return (
    <Card className={`${isHighlighted ? "border-2 border-blue-500" : ""}`}>
      <CardContent className="p-4">
        <h4 className="font-semibold mb-2">{article.title}</h4>
        <p className="text-sm text-gray-600 mb-2">
          Similarity: {(article.similarity_score * 100).toFixed(2)}%
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm"
        >
          Read More
        </a>
      </CardContent>
    </Card>
  );
}
