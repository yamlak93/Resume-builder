import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Resume Builder - Create Professional Resumes",
  description:
    "Build professional resumes with our modern, responsive resume builder. Features live preview, multiple templates, AI suggestions, and export to PDF/Markdown.",
  keywords: "resume builder, CV maker, professional resume, job application, career tools",
  authors: [{ name: "Resume Builder Team" }],
  openGraph: {
    title: "Resume Builder - Create Professional Resumes",
    description: "Build professional resumes with live preview, multiple templates, and AI suggestions.",
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
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
