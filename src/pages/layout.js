"use client"; // Include this only if needed

import localFont from "next/font/local";
import "./globals.css";
import Head from "next/head"; // Import Head component

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Set up META tags for SEO */}
        <meta name="description" content="The official Next.js Course Dashboard, built with App Router." />
        <meta name="keywords" content="keyword1, keyword2, keyword3" />
        <meta name="author" content="Your Name" />
        <title>Acme Dashboard</title>
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
