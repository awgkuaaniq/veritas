import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Rating from "@mui/material/Rating"; // Import Rating component

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Feedback = {
  ratings: number; // Assuming ratings are numbers (e.g., 1-5 scale)
  body: string;
};

export const columns: ColumnDef<Feedback>[] = [
  {
    accessorKey: "rating",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const rating = row.getValue("rating");
      return (
        <div className="flex justify-center">
          <Rating value={rating as number} readOnly size="large" />
        </div>
      );
    },
  },
  {
    accessorKey: "body",
    header: () => {
      return <div className="text-center">Comments</div>;
    },
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("body")}</div>;
    },
  },
];
