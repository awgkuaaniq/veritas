import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CloseIcon from "@mui/icons-material/Close";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CheckFeedback = {
  thumbs_up: boolean; // Assuming ratings are numbers (e.g., 1-5 scale)
  body: string;
  comments: string;
  fake: number;
};

export const columns: ColumnDef<CheckFeedback>[] = [
  {
    accessorKey: "thumbs_up",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Like/Dislike
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const thumbsUp = row.getValue("thumbs_up") as boolean;
      return (
        <div className="flex justify-center">
          {thumbsUp ? (
            <ThumbUpIcon className="text-green-500" />
          ) : (
            <ThumbDownIcon className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "body",
    header: () => {
      return <div className="text-center">Contents</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("body")}</div>;
    },
  },
  {
    accessorKey: "comments",
    header: () => {
      return <div className="text-center">Comments</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("comments")}</div>;
    },
  },
  {
    accessorKey: "fake",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Potentially Fake
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const fake = row.getValue("fake") as number;
      return (
        <div className="flex justify-center">
          {fake === 1 ? (
            <CheckIcon className="text-green-500 w-5 h-5" />
          ) : (
            <CloseIcon className="text-red-500 w-5 h-5" />
          )}
        </div>
      );
    },
  },
];
