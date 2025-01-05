"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import SearchArticle from "@/components/SearchArticle";
import { Input } from "@/components/ui/input";
import TestArticle from "@/components/test";

interface Article {
  _id: string;
  title: string;
  body: string;
  source: string;
  url: string;
  published_at: Date;
  likes: number;
  source: string;
  image_url: string;
  dislikes: number;
  views: number;
  time_added: Date;
  unique_hash?: string;
  image_url: string;
  classification: Classification;
}

interface Classification {
  category: string;
  probability: number;
  hasBeenChecked: boolean;
}

// Child component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q"); // Extract the search query
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(q || "");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (q) {
      const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/api/get-search-article-result/?search_query=${encodeURIComponent(
              q as string
            )}`
          );
          if (!response.ok) throw new Error("Failed to fetch search results");

          const data: Article[] = await response.json();

          // Sanitize any http:// URLs in the response
          const sanitizedData = data.map((article) => ({
            ...article,
            image_url: article.image_url?.replace("http://", "https://"),
          }));

          setResults(sanitizedData);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [q]); // Trigger search when searchQuery changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchInput)}`); // Update the URL on Enter
    }
  };

  return (
    <main className="bg-gray-100 min-h-screen pb-10 dark:bg-offblack">
      {/* Upper Component */}
      {/* Search Bar */}
      <div className="flex justify-center mx-auto px-2 max-w-7xl py-11">
        <Input
          className="border-black/25 w-full dark:border-white/10 dark:bg-offgray text-sm placeholder-gray-700 dark:placeholder-gray-400"
          type="text"
          id="search"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search news, terms and more"
        />
      </div>
      {/* Bottom Component */}
      <div className="flex divide-y divide-black/15 flex-col *:py-5 max-w-7xl mx-auto px-2">
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {results.length > 0 ? (
          results.map((article) => (
            <TestArticle key={article._id} article={article} /> // Pass article data to SearchArticle
          ))
        ) : (
          <div className="flex flex-col justify-items-center mx-auto items-center text-xl space-y-5">
            <p>
              Sorry, there are no results for{" "}
              <span className="flex-inline font-bold">&apos;{q}&apos;</span>
            </p>
            <p className="text-2xl font-bold pt-4">Suggestions</p>
            <ul className="list-disc">
              <li>Make sure all words are spelled correctly</li>
              <li>Try different terms or keywords</li>
              <li>Try more general keywords</li>
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

// Parent component that wraps SearchContent in Suspense
export default function SearchResult() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
