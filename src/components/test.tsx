import { formatDate } from "@/utils/formatDate";
import React from "react";

interface Article {
  _id: string;
  title: string;
  body: string;
  url: string;
  published_at: Date | string;
  likes: number;
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

const HomeArticle: React.FC<{ article: Article }> = ({ article }) => {
  // Truncate the article body at the first full stop
  const truncateBody = (body: string): string => {
    const firstFullStopIndex = body.indexOf(".");
    return firstFullStopIndex !== -1
      ? body.slice(0, firstFullStopIndex + 1)
      : body; // If no full stop is found, return the entire body
  };

  return (
    <article className="border-b border-gray-200 pb-8">
      <a
        href={`/article/${article._id}`}
        className="flex flex-wrap lg:flex-nowrap gap-6 group"
      >
        {/* Article Image */}
        <div className="w-full lg:w-1/3 h-48 rounded-md overflow-hidden">
          <img
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            src={article.image_url}
            alt={article.title}
          />
        </div>

        {/* Article Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold group-hover:text-blue-600 mb-2">
            {article.title}
          </h3>

          <p className="text-base text-gray-700 mb-4">
            {truncateBody(article.body)}
          </p>
          <p className="text-sm text-gray-600">
            {formatDate(article.published_at)}
          </p>
        </div>
      </a>
    </article>
  );
};

export default HomeArticle;
