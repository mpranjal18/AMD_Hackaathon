"use client";

import { motion } from "framer-motion";
import { Settings, LogOut, Bell, Shield, Heart } from "lucide-react";

export default function Profile() {
  const menuItems = [
    { icon: Heart, label: "Health Goals", value: "Weight Loss" },
    { icon: Bell, label: "Notifications", value: "Enabled" },
    { icon: Shield, label: "Privacy & Data", value: "" },
    { icon: Settings, label: "Settings", value: "" },
  ];

  return (
    <div className="px-6 pt-12 pb-32 h-full flex flex-col">
      <header className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Profile</h1>
      </header>

      <motion.div 
        className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 flex flex-col items-center mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#34C759] to-[#2ecc71] p-1 mb-4">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-[#34C759]">A</span>
          </div>
        </div>
        <h2 className="text-2xl font-bold">Alex Johnson</h2>
        <p className="text-gray-500 text-sm mt-1">Free Plan</p>
        
        <div className="grid grid-cols-3 gap-6 mt-6 w-full pt-6 border-t border-gray-100">
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">Age</p>
            <p className="font-semibold text-lg">28</p>
          </div>
          <div className="text-center border-l border-r border-gray-100">
            <p className="text-gray-500 text-xs mb-1">Weight</p>
            <p className="font-semibold text-lg">75<span className="text-sm font-normal text-gray-400">kg</span></p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">Height</p>
            <p className="font-semibold text-lg">180<span className="text-sm font-normal text-gray-400">cm</span></p>
          </div>
        </div>
      </motion.div>

      <h3 className="font-semibold text-gray-500 text-sm uppercase tracking-wider mb-4 px-2">Preferences</h3>
      
      <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100">
        {menuItems.map((item, index) => (
          <motion.button 
            key={item.label}
            className={`w-full flex items-center justify-between p-4 ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center gap-4">
              <div className="bg-gray-50 p-2 rounded-xl text-gray-600">
                <item.icon className="w-5 h-5" />
              </div>
              <span className="font-medium text-gray-800">{item.label}</span>
            </div>
            {item.value && (
              <span className="text-sm text-gray-400">{item.value}</span>
            )}
          </motion.button>
        ))}
      </div>

      <button className="mt-8 flex items-center justify-center gap-2 text-red-500 font-medium py-4 px-6 rounded-2xl bg-red-50 active:scale-95 transition-transform w-full">
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
