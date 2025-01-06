import { Progress } from "@/components/ui/progress";

export default function LikeDislikeBar({
  likes,
  dislikes,
}: {
  likes: number;
  dislikes: number;
}) {
  const total = likes + dislikes;
  const likePercentage = total > 0 ? (likes / total) * 100 : 50;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-green-500 dark:text-green-400">
        {likes}
      </span>
      <Progress
        value={likePercentage}
        className="w-24 h-2 bg-gray-200 dark:bg-gray-700"
      />
      <span className="text-sm text-red-500 dark:text-red-400">{dislikes}</span>
    </div>
  );
}
