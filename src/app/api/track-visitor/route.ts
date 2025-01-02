import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export async function POST(request: NextRequest) {
  const uniqueVisitorCookie = request.cookies.get("unique_visitor_id")?.value;

  if (!uniqueVisitorCookie) {
    const uniqueVisitorId = uuidv4();
    const response = NextResponse.json({ message: "Unique visitor tracked" });
    response.cookies.set({
      name: "unique_visitor_id",
      value: uniqueVisitorId,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 day expiration
    });

    // Call the backend API to increment the unique visitor count
    const uniqueVisitorApiUrl = `http://127.0.0.1:8000/api/add-unique-visitor`;
    await axios.post(uniqueVisitorApiUrl, {
      unique_visitor_id: uniqueVisitorId,
    });

    return response;
  }

  return NextResponse.json({ message: "Unique visitor already tracked" });
}
