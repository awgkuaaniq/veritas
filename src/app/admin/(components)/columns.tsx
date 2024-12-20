"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Article = {
  title: string;
  views: number;
  likes: number;
  dislikes: number;
  time_added: Date;
};

export const columns: ColumnDef<Article>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 300,
  },
  {
    accessorKey: "views",
    cell: ({ row }) => {
      return (
        <div className="text-center">{parseFloat(row.getValue("views"))}</div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 100,
  },
  {
    accessorKey: "likes",
    cell: ({ row }) => {
      return (
        <div className="text-center">{parseFloat(row.getValue("likes"))}</div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Likes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 100,
  },
  {
    accessorKey: "dislikes",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {parseFloat(row.getValue("dislikes"))}
        </div>
      );
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Dislikes
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    size: 100,
  },
  {
    accessorKey: "time_added",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time Added
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("time_added"));
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour12: true,
      }).format(date);

      return <div className="text-center">{formattedDate}</div>;
    },
    size: 150,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
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
            <DropdownMenuItem>View Article </DropdownMenuItem>
            <DropdownMenuItem>Edit Article</DropdownMenuItem>
            <DropdownMenuItem>Delete Article</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
