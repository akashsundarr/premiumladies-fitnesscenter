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
  metadataBase: new URL("https://www.premiumladiesfitnesscenter.com"),
  alternates: {
    canonical: "/",
  },

  title: "Premium Ladies Gym | Women’s Gym in Al Ain, UAE",
  description:
    "Premium Ladies Gym is a women-only fitness center in Al Ain, UAE offering personal training, group workouts, and modern gym facilities exclusively for ladies.",

  icons: {
    icon: "/images/logo-mark2.png",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: "Premium Ladies Gym | Women’s Gym in Al Ain, UAE",
    description:
      "Women-only fitness center in Al Ain offering personal training, group workouts, and modern gym facilities for ladies.",
    url: "https://www.premiumladiesfitnesscenter.com",
    siteName: "Premium Ladies Gym",
    locale: "en_AE",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Premium Ladies Gym | Women’s Gym in Al Ain, UAE",
    description:
      "Women-only fitness center in Al Ain offering personal training, group workouts, and modern gym facilities for ladies.",
  },

  robots: {
    index: true,
    follow: true,
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
