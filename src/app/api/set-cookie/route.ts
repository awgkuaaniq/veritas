import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { articleId, type } = await request.json(); // `type` can be "view", "like", or "dislike"

    if (!articleId || !type) {
      return NextResponse.json({ message: "Article ID or type is missing" }, { status: 400 });
    }

    // Determine the cookie name based on the interaction type
    const cookieName = `${type}_article_id`;

    // Retrieve the current cookies from the request headers
    const existingCookie = request.headers.get("cookie")?.split(";").find(c => c.trim().startsWith(`${cookieName}=`))?.split("=")[1];

    // Parse the cookie value (if it exists) into a Set of article IDs
    const interactedArticles = new Set(existingCookie ? existingCookie.split(",") : []);

    // Check if the article has already been interacted with
    if (!interactedArticles.has(articleId)) {
      try {
        // Call the appropriate backend API based on the interaction type
        const apiUrl = `http://127.0.0.1:8000/api/increment-${type}s`;
        const res = await axios.post(apiUrl, { _id: articleId });

        console.log(`Increment ${type} response:`, res.data);

        // Update the Set with the new article ID
        interactedArticles.add(articleId);
        const updatedCookieValue = Array.from(interactedArticles).join(",");

        // Set the cookie with an expiration time of 1 day
        const expires = new Date();
        expires.setDate(expires.getDate() + 1); // Add 1 day to the current date
       
        // Set the updated cookie value
        const response = NextResponse.json({ message: `${type} cookie set and count incremented` });
        response.cookies.set({
          name: cookieName,
          value: updatedCookieValue,
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires
        });

        return response;
      } catch (error) {
        if (error instanceof AxiosError) {
          console.error(`Error incrementing ${type}:`, error.response ? error.response.data : error.message);
        } else {
          console.log("Unexpected error", error);
        }
      }
    }

    // If the article has already been interacted with, return a message
    return NextResponse.json({ message: `Article already ${type}d` });
  } catch (error) {
    console.error(`Error in /api/set-cookie for ${type}:`, error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
