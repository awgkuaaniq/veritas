import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookieValue = request.cookies.get("article_id")?.value || ""; // Safely get the cookie value

  return NextResponse.json({ articleId: cookieValue });
}
