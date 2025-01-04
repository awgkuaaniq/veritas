"use client";
import React from "react"; // Ensure React is imported
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface ActionsCellProps {
  article: {
    _id: string;
  };
  deleteArticle: (articleId: string) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({
  article,
  deleteArticle,
}) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => router.push(`/article/${article._id}`)}
        >
          View Article
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => router.push(`/edit-article/${article._id}`)}
        >
          Edit Article
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => deleteArticle(article._id)}>
          Delete Article
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsCell;
