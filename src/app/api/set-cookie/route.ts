import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { articleId } = await request.json(); // Get article ID from request body

  // Set the article_id cookie
  const response = NextResponse.json({ message: "Cookie set and view incremented" });
  response.cookies.set({
    name: "article_id",
    value: articleId,
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict",
  });

  // Increment the view count in the database here
  // Assuming you have a MongoDB setup, you'd connect and increment the article's views

  return response;
}
