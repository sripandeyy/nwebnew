import type React from "react"
import type { Metadata } from "next"
import { Roboto } from "next/font/google"

const inter = Roboto({ weight: "400", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nyeras CRM",
  description: "Manage your leads efficiently with NYERAS CRM",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

