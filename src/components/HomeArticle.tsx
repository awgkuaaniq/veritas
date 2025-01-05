import { formatDate } from "@/utils/formatDate";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid"; // Import the icon
import React from "react";

interface Article {
  _id: string;
  title: string;
  body: string;
  url: string;
  source: string;
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
  console.log("Image URL:", article.image_url);

  return (
    <div className="flex flex-col gap-4 w-fit">
      {/* Article Picture or VERITAS Logo if image_url is empty */}
      {article.image_url ? (
        <div className="relative w-96 aspect-video">
          <a href={`/article/${article._id}`}>
            <img
              className="absolute inset-0 h-full w-full object-cover rounded-xl"
              src={article.image_url}
              alt={article.title}
            />
          </a>
        </div>
      ) : (
        <div className="relative w-96 aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
          <a href=".." className="flex items-center justify-center">
            <CodeBracketSquareIcon className="size-12 text-black mr-2" />
            <span className="text-black text-xl font-bold">VERITAS</span>
          </a>
        </div>
      )}

      {/* Article Title */}
      <div className="text-black font-semibold text-base h-12">
        <a href={`/article/${article._id}`}>{article.title}</a>
      </div>

      {/* Article Info */}
      <div className="flex w-full gap-x-11 text-black font-extralight">
        <div>{formatDate(article.published_at)}</div>
        <div>{article.source}</div>
      </div>
    </div>
  );
};

export default HomeArticle;
