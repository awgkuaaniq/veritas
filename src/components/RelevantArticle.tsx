import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightFromSquare } from "lucide-react";

interface RelevantArticleProps {
  article: {
    title: string;
    content: string;
    similarity_score: number;
    url: string;
  } | null;
}

export default function RelevantArticle({ article }: RelevantArticleProps) {
  if (!article) return null;

  return (
    <Card className="mt-8 bg-white dark:bg-gray-800 transition-colors duration-200">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          Most Relevant Article
          <Badge
            variant="secondary"
            className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
          >
            {Math.round(article.similarity_score * 100)}% Similar
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
          {article.title}
        </h3>
        <p className="text-muted-foreground mb-4">
          {article.content.slice(0, 200)}...
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:underline dark:text-blue-400"
        >
          Read full article
          <ArrowUpRightFromSquare className="ml-1 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
}
