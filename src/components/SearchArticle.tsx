import { formatDate } from "@/utils/formatDate";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { AlertOctagon } from "lucide-react";

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
  classification: Classification;
}

interface Classification {
  category: string;
  probability: number;
  hasBeenChecked: boolean;
}

const SearchArticle: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="flex space-x-6">
      {/* Thumbnail */}
      <div className="flex h-60 aspect-[3/2]">
        <a href={`/article/${article._id}`}>
          <img
            className="h-full w-full rounded-lg object-cover"
            src="/dummyIMG/kanye.webp"
          ></img>
        </a>
      </div>
      {/* Details */}
      <a href={`/article/${article._id}`}>
        <div className="flex flex-col space-y-1 py-2 px-4">
          <div className="text-xl font-semibold">{article.title}</div>
          <div className="flex space-x-5 pb-7 font-light">
            <div>{article.views} views</div>
            <div className="list-disc">
              <li>
                {article.published_at
                  ? formatDate(article.published_at)
                  : "No date available"}
              </li>
            </div>
          </div>
          <div className="flex space-x-2 pb-7 font-light">
            <UserCircleIcon className="h-6 w-6" />
            <p>AllYeezyNews</p>
          </div>
          <div className="text-sm font-light break-all">
            {truncateText(article.body, 100)} {/* Adjust maxLength as needed */}
          </div>
        </div>
      </a>
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
