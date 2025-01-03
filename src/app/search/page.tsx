"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import SearchArticle from "@/components/SearchArticle";

interface Article {
  _id: string;
  title: string;
  body: string;
  url: string;
  published_at: Date;
  likes: number;
  dislikes: number;
  views: number;
  time_added: Date;
  unique_hash?: string;
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
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (q) {
      setSearchInput(q);
      const fetchResults = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/api/get-search-article-result?search_query=${encodeURIComponent(
              q as string
            )}`
          );
          if (!response.ok) throw new Error("Failed to fetch search results");
          const data: Article[] = await response.json();
          setResults(data);
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
    <main className="bg-gray-200 min-h-screen">
      {/* Upper Component */}
      {/* Search Bar */}
      <div className="flex justify-center mx-auto px-2 max-w-7xl py-11">
        <input
          className="border-black/25 w-full text-sm text-black placeholder-gray-700"
          type="text"
          id="search"
          value={searchInput} // Sync input field with state
          onChange={handleInputChange} // Update state and URL on change
          onKeyDown={handleKeyDown} // Trigger router.push only on Enter key
          placeholder={searchInput || "Search news, terms and more"}
        />
      </div>
      {/* Bottom Component */}
      <div className="flex flex-col space-y-5 max-w-7xl mx-auto px-2">
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {results.length > 0 ? (
          results.map((article) => (
            <SearchArticle key={article._id} article={article} /> // Pass article data to SearchArticle
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
