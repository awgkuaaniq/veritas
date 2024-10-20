import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const articleCookie = cookieStore.get("article_id");

  // Return the cookie value or null if it doesn't exist
  return new Response(JSON.stringify({ articleId: articleCookie?.value || null }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
