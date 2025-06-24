import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Therapeutic Scents - AI-Powered Massage Therapy",
  description:
    "Book personalized massage therapy with AI-driven aromatherapy recommendations. Reduce stress and improve sleep quality with therapeutic scents inspired by science.",
  keywords: "massage therapy, aromatherapy, AI-powered, therapeutic scents, wellness, stress relief, sleep quality",
  authors: [{ name: "Therapeutic Scents" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  openGraph: {
    title: "Therapeutic Scents - AI-Powered Massage Therapy",
    description: "Book personalized massage therapy with AI-driven aromatherapy recommendations.",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
