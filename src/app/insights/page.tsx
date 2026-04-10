"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, AlertCircle } from "lucide-react";

const WeeklyCaloriesChart = dynamic(
  () => import("@/components/insights/WeeklyCaloriesChart").then((m) => m.WeeklyCaloriesChart),
  {
    ssr: false,
    loading: () => <div className="h-48 w-full rounded-2xl bg-emerald-50/70 animate-pulse" />,
  },
);

export default function Insights() {
  return (
    <div className="px-6 pt-12 pb-32 h-full flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Insights</h1>
        <p className="text-gray-500 mt-2">Your AI health breakdown.</p>
      </header>

      <motion.div 
        className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold">Weekly Calories</h3>
          <span className="text-sm font-medium text-[#34C759] bg-[#34C759]/10 px-3 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> In range
          </span>
        </div>
        
        <WeeklyCaloriesChart />
      </motion.div>

      <h3 className="font-semibold text-xl mb-4">AI Analysis</h3>
      
      <div className="space-y-4">
        <motion.div 
          className="bg-purple-50 border border-purple-100 rounded-2xl p-4 flex gap-4 items-start"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-purple-200/50 p-2 rounded-xl text-purple-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-purple-900 mb-1">Consistency Award</h4>
            <p className="text-xs text-purple-800/80 leading-relaxed">You hit your protein goal 5 days in a row this week. Fantastic job keeping the muscles fueled!</p>
          </div>
        </motion.div>

        <motion.div 
          className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex gap-4 items-start"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-orange-200/50 p-2 rounded-xl text-orange-700">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-orange-900 mb-1">Late Night Snacking</h4>
            <p className="text-xs text-orange-800/80 leading-relaxed">We noticed a spike in calories after 9 PM on weekends. Try drinking tea when cravings hit.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
