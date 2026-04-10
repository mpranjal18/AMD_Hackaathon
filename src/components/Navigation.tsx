"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ScanLine, BarChart2, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Scan", href: "/scan", icon: ScanLine },
  { name: "Insights", href: "/insights", icon: BarChart2 },
  { name: "Profile", href: "/profile", icon: User },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-8 pt-4 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
      <nav className="flex justify-between items-center max-w-md mx-auto relative">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-12"
            >
              {isActive && (
                <motion.div
                  layoutId="bubble"
                  className="absolute inset-0 bg-[#34C759]/10 rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <item.icon
                className={`w-6 h-6 z-10 transition-colors duration-300 ${
                  isActive ? "text-[#34C759]" : "text-gray-400"
                }`}
              />
              <span
                className={`text-[10px] mt-1 z-10 font-medium transition-colors duration-300 ${
                  isActive ? "text-[#34C759]" : "text-gray-400"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
