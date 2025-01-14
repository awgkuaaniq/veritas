"use client";

import {
  useEffect,
  useState,
  Suspense,
  lazy,
  useRef,
  useCallback,
} from "react";
import axios from "axios";

interface CrosscheckResult {
  title: string;
  content: string;
  source: string;
  probability: number;
}

interface Tweets {
  id: string;
  name: string;
  username: string;
  avatar: string;
  body: string;
  tweet_url: string;
  article_url?: string;
  published_at: Date;
  crosscheck: CrosscheckResult;
}

const Tweet = lazy(() => import("@/components/Tweet"));

export default function TweetsPage() {
  const [tweets, setTweets] = useState<Tweets[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Add hasMore state
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchTweets = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tweets/?page=${page}`
      );
      setTweets((prevTweets) => [...prevTweets, ...response.data]);
      // Set hasMore based on the response length
      setHasMore(response.data.length > 0);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (hasMore) {
      fetchTweets(page);
    }
  }, [page]);

  const lastTweetElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading || !hasMore) return; // Stop observing if loading or no more tweets
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <main className="bg-gray-100 py-20 dark:bg-offblack min-h-screen">
      {/* Main Container */}
      <div className="flex flex-col divide-y divide-black/15 dark:divide-offgray mx-auto px-2 max-w-7xl">
        <Suspense fallback={<div>Loading tweets...</div>}>
          {tweets.map((tweet, index) => {
            if (tweets.length === index + 1) {
              return (
                <Tweet ref={lastTweetElementRef} key={tweet.id} tweet={tweet} />
              );
            } else {
              return <Tweet key={tweet.id} tweet={tweet} />;
            }
          })}
        </Suspense>
        {loading && <div>Loading more tweets...</div>}
      </div>
    </main>
  );
}
