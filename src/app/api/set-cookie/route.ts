import axios, { AxiosError } from 'axios';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { articleId } = await request.json(); // Get article ID from request body
    console.log(articleId);
    
    if (!articleId) {
      return NextResponse.json({ message: "Article ID is missing" }, { status: 400 });
    }

    // Get the current cookies from the request headers
    const existingCookie = request.headers.get("cookie")?.split(";").find(c => c.trim().startsWith("article_id="))?.split("=")[1];
    
    // Parse the cookie value (if it exists) into a Set of article IDs
    const visitedArticles = new Set(existingCookie ? existingCookie.split(",") : []);

    // If the article has not been visited yet, increment the view count
    if (!visitedArticles.has(articleId)) {
      try {
        // Call the backend API to increment views using Axios
        const res = await axios.post(`http://127.0.0.1:8000/api/increment-views`, {_id: articleId});
        console.log("Increment views response:", res.data);
        
        // Add this articleId to the visitedArticles Set
        visitedArticles.add(articleId);
        const updatedCookieValue = Array.from(visitedArticles).join(","); // Convert Set back to comma-separated string

        // Set the article_id cookie with the updated value
        const response = NextResponse.json({ message: "Cookie set and view incremented" });
        response.cookies.set({
          name: "article_id",
          value: updatedCookieValue,
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production", // Make it secure in production
          sameSite: "strict",
        });

        return response;
      } catch (error) {
        // Handle Axios error
        if (error instanceof AxiosError){
          console.error("Error incrementing views:", error.response ? error.response.data : error.message);
        }
        else{
          console.log('Unexpected error', error);
        }
      }
    }

    return NextResponse.json({ message: "Article already visited" });
  } catch (error) {
    console.error("Error in /api/set-cookie:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
