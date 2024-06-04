"use client";
import React, { useState } from 'react';

const LikeDislikeBar = () => {
  const [likes, setLikes] = useState(432);
  const [dislikes, setDislikes] = useState(40);

  const total = likes + dislikes;
  const likePercentage = (likes / total) * 100;
  const dislikePercentage = (dislikes / total) * 100;

  return (
    <div className="flex flex-col px-2 w-1/4">
      {/* Like/Dislike Bar */}
      <div className="flex rounded-3xl p-0.5 bg-black h-3 gap-x-1">
        {/* Like */}
        <div
          className="bg-green-500 rounded-l-3xl"
          style={{ width: `${likePercentage}%` }}
        ></div>
        {/* Dislike */}
        <div
          className="bg-red-500 rounded-r-3xl"
          style={{ width: `${dislikePercentage}%` }}
        ></div>
      </div>
      <div className="flex mt-1 text-sm gap-x-1">
        <span>{likes} likes,</span>
        <span>{dislikes} dislikes</span>
      </div>
    </div>
  );
};

export default LikeDislikeBar;
