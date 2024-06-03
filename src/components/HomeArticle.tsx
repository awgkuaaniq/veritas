import React from "react";

const HomeArticle: React.FC = () => {
    
  return (
    <div className="flex flex-col gap-4 w-fit">
        {/* Article Picture */}
      <div className="relative w-96 aspect-video">
        <img className="absolute inset-0 h-full w-full object-cover rounded-xl" src="/dummyIMG/kanye.webp"></img>
      </div>
      {/* Article Title */}
      <div className="text-black font-semibold text-base h-12">
        Kanye West joins Neo Nazi Program
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
