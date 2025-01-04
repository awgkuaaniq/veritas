import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Retrieve the "unique_visitor_id" cookie
  const uniqueVisitorId = request.cookies.get("unique_visitor_id")?.value || "";

  if (!uniqueVisitorId) {
    return NextResponse.json(
      { message: "Unique visitor ID not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ uniqueVisitorId });
}
