import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

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

export const metadata: Metadata = {
  title: "Fintrack",
  description: "Created by @noahwhlim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0`}
      >
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/"><h1 className="text-2xl font-bold text-gray-900">FinTrack</h1></Link>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">User profile</span>
            </Button>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
