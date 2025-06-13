import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Subtropic Software Solutions",
  description: "Professional services in consulting, design, development, and infrastructure management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
