import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type") || "view"; // Get the type query parameter (default to "view")
  const cookieName = `${type}_article_id`; // Cookie name for the specific type
  const cookieValue = request.cookies.get(cookieName)?.value || ""; // Safely get the cookie value

  return NextResponse.json({ articleId: cookieValue });
}
