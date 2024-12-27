import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { articleId, type } = await request.json();

    if (!articleId || !type) {
      return NextResponse.json(
        { message: "Article ID or type is missing" },
        { status: 400 }
      );
    }

    // Determine the cookie names
    const cookieName = `${type}_article_id`;
    const oppositeType = type === "like" ? "dislike" : "like";
    const oppositeCookieName = `${oppositeType}_article_id`;

    const response = NextResponse.json({
      message: `${type} cookie set and count incremented`,
    });

    // For views, handle separately
    if (type === "view") {
      const existingViewCookie = request.cookies.get(cookieName)?.value || "";

      // Split by comma and filter out empty strings
      const viewedArticles = existingViewCookie
        ? existingViewCookie.split(",").filter(Boolean)
        : [];

      if (!viewedArticles.includes(articleId)) {
        viewedArticles.push(articleId);
        response.cookies.set({
          name: cookieName,
          value: viewedArticles.join(","), // Don't encode the comma
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(Date.now() + 14 * 60 * 60 * 1000),
        });
        await axios.post(`http://127.0.0.1:8000/api/increment-views`, {
          _id: articleId,
        });
      }
      return response;
    }

    // Get both cookie values using the cookies API
    const existingCookie = request.cookies.get(cookieName)?.value || "";
    const existingOppositeCookie =
      request.cookies.get(oppositeCookieName)?.value || "";

    // Split by comma and filter out empty strings
    let currentArticles = existingCookie
      ? existingCookie.split(",").filter(Boolean)
      : [];
    let oppositeArticles = existingOppositeCookie
      ? existingOppositeCookie.split(",").filter(Boolean)
      : [];

    // Check if article is in opposite cookie and remove it
    if (oppositeArticles.includes(articleId)) {
      // Remove from opposite array
      oppositeArticles = oppositeArticles.filter((id) => id !== articleId);

      // Decrement the opposite type count
      await axios.post(`http://127.0.0.1:8000/api/decrement-${oppositeType}s`, {
        _id: articleId,
      });

      // Update or remove opposite cookie
      if (oppositeArticles.length > 0) {
        response.cookies.set({
          name: oppositeCookieName,
          value: oppositeArticles.join(","), // Don't encode the comma
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        });
      } else {
        response.cookies.set({
          name: oppositeCookieName,
          value: "",
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(0),
        });
      }
    }

    // Add to current type if not already present
    if (!currentArticles.includes(articleId)) {
      currentArticles.push(articleId);

      // Increment the current type count
      await axios.post(`http://127.0.0.1:8000/api/increment-${type}s`, {
        _id: articleId,
      });

      // Update current cookie
      response.cookies.set({
        name: cookieName,
        value: currentArticles.join(","), // Don't encode the comma
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
    }

    return response;
  } catch (error) {
    console.error(`Error in /api/set-cookie:`, error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}