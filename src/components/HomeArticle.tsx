import { formatDate } from "@/utils/formatDate";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid"; // Import the icon
import React from "react";

interface Article {
  _id: string;
  title: string;
  body: string;
  url: string;
  published_at: Date | string;
  likes: number;
  dislikes: number;
  source: string;
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

interface HomeArticleProps {
  article: Article;
}

const HomeArticle: React.FC<HomeArticleProps> = ({ article }) => {
  // Truncate the article body at the first full stop
  const truncateBody = (body: string): string => {
    const firstFullStopIndex = body.indexOf(".");
    return firstFullStopIndex !== -1
      ? body.slice(0, firstFullStopIndex + 1)
      : body; // If no full stop is found, return the entire body
  };

  return (
    <article className="flex flex-col h-full w-full">
      <a
        href={`/article/${article._id}`}
        className="flex flex-col h-full group"
      >
        {/* Article Image or VERITAS Logo */}
        <div className="relative rounded-md overflow-hidden h-48">
          {article.image_url ? (
            <img
              className="object-cover w-full h-full transition-transform group-hover:scale-105"
              src={article.image_url}
              alt={article.title}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <a href=".." className="flex items-center justify-center">
                <CodeBracketSquareIcon className="size-12 text-black mr-2" />
                <span className="text-black text-xl font-bold">VERITAS</span>
              </a>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="flex-1 mt-4">
          <h3 className="text-xl font-base group-hover:text-blue-600 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 uppercase mb-4">
            {article.source}
          </p>
        </div>
      </a>
    </article>
  );
};

export default HomeArticle;
