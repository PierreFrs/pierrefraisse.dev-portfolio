import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "Pierre Fraisse Portfolio",
  description: "Professional portfolio of Pierre Fraisse",
};

export default function RootLayout({
   children,
       }: { 
   children: React.ReactNode;
}) {
  return (
      <html lang="en">
          <body className="antialiased">
              <Providers>
                {children}
              </Providers>
          </body>
      </html>
  );
}
