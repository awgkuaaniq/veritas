import { cookies } from 'next/headers'

export default function ArticleLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>{children}</section>
  }