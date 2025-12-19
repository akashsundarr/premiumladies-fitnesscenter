import type React from "react"
import type { Metadata } from "next"
import { Bebas_Neue, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

export const metadata: Metadata = {
  title: "Premium Ladies Fitness Center",
  description:
    "Welcome to Premium Fitness Ladies, where your wellness journey begins. Featuring a refined, women-only space designed for strength and confidence.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/tab-logo.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/tab-logo.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/tab-logo.jpg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${spaceGrotesk.variable} font-space antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
