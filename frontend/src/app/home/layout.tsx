import "@/styles/home.css"

import React from "react"
import type { Metadata } from "next"

import Footer from "./components/Footer"
import Navbar from "./components/Navbar"

export const metadata: Metadata = {
  title: "Travel",
  description: "Travel UI/UX App for Camping",
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="relative overflow-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
