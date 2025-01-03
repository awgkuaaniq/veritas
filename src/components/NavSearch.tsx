"use client";

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState} from 'react';
import { useRouter } from "next/navigation";  // For Next.js 13+ with app directory

const NavSearch = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(""); // Clear the input after navigation
    }
  };

    return (
      <div className="flex items-center h-10 bg-gray-200 border-black/25 border rounded-lg">
        <div className="grid place-items-center h-full w-12 text-gray-500">
          <MagnifyingGlassIcon className="h-6 w-6" />
        </div>

        <form onSubmit={handleSearch}>
          <input
            className="bg-gray-200 border-0 text-sm text-black pr-2 placeholder-gray-700 rounded-lg focus:ring-0"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search something.."
          />
        </form>
      </div>
    );
};

export default NavSearch;