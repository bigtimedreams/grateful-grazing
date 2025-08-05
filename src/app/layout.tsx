// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script"; // Import the Script component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Grateful Grazing",
  description: "Grateful Grazing Mobile Charcuterie Co.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* This is the definitive fix. 
          This script loads the Netlify Identity Widget on every page.
          When a user clicks an invite or password reset link, this script
          will detect the token in the URL and open the correct login popup.
        */}
        <Script
          strategy="beforeInteractive"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
