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
  const sideItems = navItems.filter((item) => item.name !== "Scan");
  const scanItem = navItems.find((item) => item.name === "Scan");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-0 pb-0">
      <div className="max-w-md mx-auto relative">
        {scanItem && (
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -top-8"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
          >
            <Link
              href={scanItem.href}
              className="h-16 w-16 rounded-full bg-gradient-to-br from-[#34C759] to-[#209845] text-white inline-flex items-center justify-center shadow-[0_20px_36px_-16px_rgba(22,163,74,0.9)] border border-white/65"
              aria-label="Open Scan"
            >
              <motion.div whileHover={{ y: -2, scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                <scanItem.icon className="h-7 w-7" />
              </motion.div>
            </Link>
          </motion.div>
        )}

        <nav className="glass-surface rounded-t-[2rem] rounded-b-none pt-4 pb-[calc(env(safe-area-inset-bottom)+0.55rem)] px-5 shadow-[0_28px_42px_-34px_rgba(15,23,42,0.85)] border-b-0">
          <div className="grid grid-cols-4 items-end">
            {sideItems.slice(0, 2).map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center h-12"
                >
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-x-2 inset-y-0 rounded-2xl bg-[#34C759]/12"
                      transition={{ type: "spring", bounce: 0.24, duration: 0.56 }}
                    />
                  )}

                  <item.icon
                    className={`h-5 w-5 z-10 transition-colors ${
                      isActive ? "text-[#1f9b44]" : "text-slate-400"
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-1 font-medium z-10 transition-colors ${
                      isActive ? "text-[#1f9b44]" : "text-slate-400"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}

            <div className="h-12" />

            {sideItems.slice(2).map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative flex flex-col items-center justify-center h-12"
                >
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="absolute inset-x-2 inset-y-0 rounded-2xl bg-[#34C759]/12"
                      transition={{ type: "spring", bounce: 0.24, duration: 0.56 }}
                    />
                  )}

                  <item.icon
                    className={`h-5 w-5 z-10 transition-colors ${
                      isActive ? "text-[#1f9b44]" : "text-slate-400"
                    }`}
                  />
                  <span
                    className={`text-[10px] mt-1 font-medium z-10 transition-colors ${
                      isActive ? "text-[#1f9b44]" : "text-slate-400"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
