import { formatDate } from "@/utils/formatDate";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";
import React from "react";

interface Article {
  _id: string;
  title: string;
  body: string;
  url: string;
  source: string;
  published_at?: Date;
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

const SearchArticle: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Thumbnail */}
      <div className="relative w-full sm:w-72 h-60 aspect-[3/2] overflow-hidden rounded-lg">
        <a href={`/article/${article._id}`}>
          <div className="relative h-full w-full bg-gray-100 rounded-lg">
            {article.image_url ? (
              <img
                className="h-full w-full object-cover rounded-lg"
                src={article.image_url}
                alt={article.title}
                onError={(e) => {
                  // Fallback if the image fails to load
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                <CodeBracketSquareIcon className="w-12 h-12 text-gray-400" />
                <span className="text-gray-600 text-xl font-bold ml-2">
                  VERITAS
                </span>
              </div>
            )}
          </div>
        </a>
      </div>

      {/* Details */}
      <div className="flex-1">
        <a href={`/article/${article._id}`}>
          <div className="flex flex-col space-y-2">
            <div className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300">
              {article.title}
            </div>
            <div className="flex space-x-4 text-sm text-gray-600">
              <div>{article.views} views</div>
              <div>
                {article.published_at
                  ? formatDate(article.published_at)
                  : "No date available"}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <UserCircleIcon className="w-5 h-5" />
              <p>{article.source}</p>
            </div>
            <div className="text-sm text-gray-700">
              {truncateText(article.body, 150)}{" "}
              {/* Adjust maxLength as needed */}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export default SearchArticle;
