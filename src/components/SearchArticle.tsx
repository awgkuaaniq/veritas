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
  // Function to strip HTML and truncate at first period
  const truncateAndStripHTML = (html: string): string => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Get text content (strips HTML)
    const textContent = tempDiv.textContent || tempDiv.innerText;
    
    // Find first period
    const firstPeriodIndex = textContent.indexOf('.');
    
    // Return truncated text or full text if no period found
    return firstPeriodIndex !== -1 
      ? textContent.slice(0, firstPeriodIndex + 1)
      : textContent;
  };

  return (
    <article className="hover:bg-gray-200 dark:hover:bg-offgray">
      <a
        href={`/article/${article._id}`}
        className="flex flex-wrap lg:flex-nowrap gap-6 group"
      >
        {/* Article Image or VERITAS Logo */}
        <div className="w-full lg:w-1/3 h-48 rounded-md overflow-hidden">
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
        <div className="flex-1">
          <h3 className="text-xl font-bold group-hover:text-blue-600 mb-2">
            {article.title}
          </h3>

          <p className="text-base text-gray-700 dark:text-gray-400 mb-4">
            {truncateAndStripHTML(article.body)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-500">
            {formatDate(article.published_at)}
          </p>
        </div>
      </a>
    </article>
  );
};

export default SearchArticle;
