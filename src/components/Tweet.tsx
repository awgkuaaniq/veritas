import React, { forwardRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  InformationCircleIcon,
  LinkIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";

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

const truncateBody = (body: string): string => {
  const firstFullStopIndex = body.indexOf(".");
  return firstFullStopIndex !== -1
    ? body.slice(0, firstFullStopIndex + 1)
    : body; // If no full stop is found, return the entire body
};

// Tweet.tsx
const Tweet = forwardRef<HTMLDivElement, { tweet: Tweets }>(
  ({ tweet }, ref) => {
    const formattedDate = formatDate(tweet.published_at);
    const [showInfo, setShowInfo] = useState(false);

    const toggleInfo = () => {
      setShowInfo((prev) => !prev);
    };

    const getProbabilityColor = (probability: number) => {
      const similarityPercentage = (1 - probability) * 100;
      if (similarityPercentage >= 65) return "text-green-500";
      if (similarityPercentage >= 30) return "text-yellow-500";
      return "text-red-500";
    };

    return (
      <div
        ref={ref}
        className={`flex flex-col h-fit w-full ${
          showInfo ? "bg-gray-200 dark:bg-offgray shadow" : ""
        }transition-colors hover:bg-gray-200 dark:hover:bg-offgray ease-out duration-150`}
      >
        {/* Tweet */}
        <div className="flex min-h-28 h-fit">
          {/* Tweet Icon */}
          <div className="flex flex-col h-full p-2.5">
            <Avatar className="aspect-square w-11 h-11">
              <AvatarImage src={tweet.avatar} alt={`@${tweet.username}`} />
              <AvatarFallback>
                {`${tweet.name[0]}${tweet.name[1]}`}
              </AvatarFallback>
            </Avatar>
          </div>
          {/* Tweet Content */}
          <div className="flex flex-col pr-2.5 w-full h-full">
            {/* Tweet Header - Modified for mobile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-y-1 sm:gap-y-0 sm:space-x-2.5 px-2.5 pt-2.5 w-full h-fit">
              {/* User Info */}
              <div className="flex flex-col sm:flex-row space-x-1 w-fit h-fit text-sm sm:text-base items-center text-wrap">
                {/* Name */}
                <p className="font-semibold text-wrap">{tweet.name}</p>
                {/* Username */}
                <p className="font-light text-gray-700 dark:text-gray-400 text-wrap">
                  @{tweet.username}
                </p>
              </div>
              {/* DateTime */}
              <div className="text-sm sm:text-base font-light text-gray-700 dark:text-gray-400">
                <p>{formattedDate}</p>
              </div>
            </div>

            {/* Tweet Body */}
            <div className="flex px-2.5 text-sm sm:text-base w-full h-fit mt-1">
              <p className="break-words">{tweet.body}</p>
            </div>

            {/* Tweet Footer */}
            <div className="flex p-2.5 justify-between content-end w-full h-full">
              <button
                className={`rounded-full p-2 ${
                  showInfo
                    ? "bg-gray-300 dark:bg-sage"
                    : "hover:bg-gray-300 dark:hover:bg-sage transition-colors ease-out duration-150"
                }`}
                onClick={toggleInfo}
                title="Crosschecking Sources"
              >
                <InformationCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="flex space-x-5">
                <a
                  className="hover:bg-gray-300 rounded-full p-2 dark:hover:bg-sage transition-colors ease-out duration-150"
                  title="Tweet URL"
                  href={tweet.tweet_url}
                  target="_blank"
                >
                  <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tweet Info */}
        {showInfo && tweet.crosscheck && (
          <div className="flex flex-col pb-8 justify-center items-center px-4 md:px-20 w-full h-fit">
            <div className="flex flex-col shadow-2xl rounded-3xl w-full">
              {/* Info Header */}
              <div className="flex w-full text-sm sm:text-base justify-center rounded-t-3xl py-2.5 h-fit px-2.5 mx-auto bg-gray-100 dark:bg-offblack">
                <p className="font-semibold">Source</p>
              </div>
              {/* Info Body */}
              <div className="flex w-full h-fit p-2.5">
                <div className="flex flex-col w-full h-fit p-3 gap-3 items-center md:flex-row md:gap-x-3">
                  <div className="flex items-center gap-2">
                    <h1
                      className="text-lg sm:text-xl font-semibold whitespace-nowrap"
                      title="How similar it is to the related article (Higher similarity = More probability to be true)"
                    >
                      Similarity:
                    </h1>
                    <h1
                      className={`text-3xl sm:text-4xl font-bold ${getProbabilityColor(
                        tweet.crosscheck.probability
                      )}`}
                    >
                      {((1 - tweet.crosscheck.probability) * 100).toFixed(2)}%
                    </h1>
                  </div>
                  <div className="flex flex-col">
                    <a
                      className="text-sm sm:text-base font-semibold hover:text-sky-600 break-words"
                      href={tweet.crosscheck.source}
                      target="_blank"
                    >
                      {tweet.crosscheck.title}
                    </a>
                    <h2 className="text-xs sm:text-sm font-light text-justify">
                      {truncateBody(tweet.crosscheck.content)}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);
Tweet.displayName = "Tweet";
export default Tweet;
