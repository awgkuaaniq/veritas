// src/app/api/set-cookie/route.ts
import axios, { AxiosError } from "axios";
import { NextResponse, NextRequest } from "next/server";

const COOKIE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export async function POST(request: NextRequest) {
  try {
    const { articleId, type } = await request.json();

    if (!articleId || !type) {
      return NextResponse.json(
        { message: "Article ID or type is missing" },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      message: `${type} cookie set and count incremented`,
    });

    // For views, handle separately
    if (type === "view") {
      const cookieName = `${type}_article_id`;
      const existingCookie = request.cookies.get(cookieName)?.value || "";
      let articles = existingCookie
        ? existingCookie.split(",").filter(Boolean)
        : [];

      if (!articles.includes(articleId)) {
        articles.push(articleId);
        await axios.post(`http://127.0.0.1:8000/api/increment-views`, {
          _id: articleId,
        });

        response.cookies.set({
          name: cookieName,
          value: articles.join(","),
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(Date.now() + COOKIE_EXPIRY),
        });
      }
      return response;
    }

    // Handle remove actions
    if (type.startsWith("remove-")) {
      const actionType = type.replace("remove-", "");
      const cookieName = `${actionType}_article_id`;
      const existingCookie = request.cookies.get(cookieName)?.value || "";
      let articles = existingCookie
        ? existingCookie.split(",").filter(Boolean)
        : [];

      articles = articles.filter((id) => id !== articleId);

      await axios.post(`http://127.0.0.1:8000/api/decrement-${actionType}s`, {
        _id: articleId,
      });

      if (articles.length > 0) {
        response.cookies.set({
          name: cookieName,
          value: articles.join(","),
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(Date.now() + COOKIE_EXPIRY),
        });
      } else {
        response.cookies.set({
          name: cookieName,
          value: "",
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(0),
        });
      }

      return response;
    }

    // Handle like/dislike actions
    const cookieName = `${type}_article_id`;
    const oppositeType = type === "like" ? "dislike" : "like";
    const oppositeCookieName = `${oppositeType}_article_id`;

    const existingCookie = request.cookies.get(cookieName)?.value || "";
    const existingOppositeCookie =
      request.cookies.get(oppositeCookieName)?.value || "";

    let currentArticles = existingCookie
      ? existingCookie.split(",").filter(Boolean)
      : [];
    let oppositeArticles = existingOppositeCookie
      ? existingOppositeCookie.split(",").filter(Boolean)
      : [];

    // Check if article is in opposite cookie and remove it
    if (oppositeArticles.includes(articleId)) {
      oppositeArticles = oppositeArticles.filter((id) => id !== articleId);

      await axios.post(`http://127.0.0.1:8000/api/decrement-${oppositeType}s`, {
        _id: articleId,
      });

      if (oppositeArticles.length > 0) {
        response.cookies.set({
          name: oppositeCookieName,
          value: oppositeArticles.join(","),
          httpOnly: true,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          expires: new Date(Date.now() + COOKIE_EXPIRY),
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

      await axios.post(`http://127.0.0.1:8000/api/increment-${type}s`, {
        _id: articleId,
      });

      response.cookies.set({
        name: cookieName,
        value: currentArticles.join(","),
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        expires: new Date(Date.now() + COOKIE_EXPIRY),
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