"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Camera, Zap, CheckCircle2 } from "lucide-react";

export default function Scan() {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  return (
    <div className="px-6 pt-12 pb-32 h-full min-h-[90vh] flex flex-col">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Food Scanner</h1>
        <p className="text-gray-500 mt-2">Log your meals with AI.</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {!scanned ? (
          <motion.div 
            className="w-full aspect-[3/4] bg-gray-100 rounded-[3rem] relative overflow-hidden flex items-center justify-center border-4 border-white shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {scanning ? (
              <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                <motion.div 
                  className="w-full h-1 bg-[#34C759] absolute top-0"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <Zap className="w-12 h-12 text-[#34C759] animate-pulse" />
              </div>
            ) : (
              <button 
                onClick={handleScan}
                aria-label="Start food scan"
                className="w-20 h-20 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg transform transition active:scale-95"
              >
                <Camera className="w-8 h-8 text-gray-800" />
              </button>
            )}
            <Image
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=800&fit=crop"
              className="absolute inset-0 w-full h-full object-cover opacity-30 select-none z-[-1]"
              alt="Salad Example"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </motion.div>
        ) : (
          <motion.div 
            className="w-full bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 mt-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#34C759]/20 p-3 rounded-full">
                <CheckCircle2 className="w-8 h-8 text-[#34C759]" />
              </div>
              <div>
                <h3 className="font-bold text-xl">Grilled Chicken Salad</h3>
                <p className="text-gray-500 text-sm">Detected with 98% confidence</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-3 bg-gray-50 rounded-2xl">
                <p className="text-xs text-gray-500 mb-1">Calories</p>
                <p className="font-bold">420</p>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-2xl">
                <p className="text-xs text-xs text-blue-500 mb-1">Protein</p>
                <p className="font-bold text-blue-700">35g</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-2xl">
                <p className="text-xs text-xs text-orange-500 mb-1">Carbs</p>
                <p className="font-bold text-orange-700">12g</p>
              </div>
            </div>

            <button 
              onClick={() => setScanned(false)}
              className="w-full bg-gray-900 text-white font-medium py-4 rounded-xl active:scale-95 transition-transform"
            >
              Log Meal
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
