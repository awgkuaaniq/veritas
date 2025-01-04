// app/admin/layout.tsx
"use client"; // Mark this as a Client Component

import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}
