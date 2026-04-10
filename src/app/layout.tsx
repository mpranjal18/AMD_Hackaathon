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
      <body className={`${inter.className} min-h-screen text-gray-900 overflow-x-hidden`} suppressHydrationWarning>
        <main className="max-w-md mx-auto min-h-screen relative bg-white/55 backdrop-blur-xl shadow-[0_45px_95px_-64px_rgba(15,23,42,0.72)] sm:rounded-[3rem] sm:my-8 sm:overflow-hidden sm:min-h-[852px] sm:border sm:border-white/70 pb-[calc(env(safe-area-inset-bottom)+5rem)]">
          {children}
          <Navigation />
        </main>
      </body>
    </html>
  );
}
