import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NutriMind | AI-Powered Health Assistant",
  description: "Your intelligent food tracking and health assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen text-gray-900 overflow-x-hidden pb-24`} suppressHydrationWarning>
        <main className="max-w-md mx-auto min-h-screen relative shadow-2xl bg-white sm:rounded-[3rem] sm:my-8 sm:border-[8px] sm:border-gray-900 sm:overflow-hidden sm:min-h-[852px]">
          {children}
          <Navigation />
        </main>
      </body>
    </html>
  );
}
