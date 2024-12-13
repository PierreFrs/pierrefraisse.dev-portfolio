import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";
import React from "react";

export const metadata: Metadata = {
  title: "Pierre Fraisse Portfolio",
  description: "Professional portfolio of Pierre Fraisse",
};

export default function RootLayout({
   children,
       }: Readonly<{
    children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
          <body className="antialiased">
              <Providers>
                {children}
              </Providers>
          </body>
      </html>
  );
}
