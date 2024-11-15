import React from "react";

interface Article {
  _id: string
  title: string;
  body: string;
  url: string;
  published_at?: Date;
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

const HomeArticle: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <div className="flex flex-col gap-4 w-fit">
      {/* Article Picture (assuming an image prop is available) */}
      {article.url && (
        <div className="relative w-96 aspect-video">
          <a href={`/article/${article._id}`}>
            <img
              className="absolute inset-0 h-full w-full object-cover rounded-xl"
              src="/dummyIMG/kanye.webp"
            ></img>
          </a>
        </div>
      )}

      {/* Article Title */}
      <div className="text-black font-semibold text-base h-12">
        <a href={`/article/${article._id}`}>
          {article.title}
        </a>
      </div>

      {/* Article Info */}
      <div className="flex w-full gap-x-11 text-black font-extralight">
        <div>1 hour ago</div>
        <div>CNN</div>
      </div>
    </div>
  );
};

export default HomeArticle;
