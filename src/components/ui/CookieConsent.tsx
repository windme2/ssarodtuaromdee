"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Locale } from "@/i18n-config";
import { translations } from "@/data/translations";

export default function CookieConsent({ lang }: { lang: Locale }) {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing the banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem("cookie-consent", accepted ? "accepted" : "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-6 md:pb-8 flex justify-center pointer-events-none"
        >
          <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-4 md:p-6 max-w-4xl w-full flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between pointer-events-auto">
            <div className="flex-1 text-sm md:text-base text-gray-700">
              <p>🚌 {t.cookie.message}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => handleConsent(false)}
                className="flex-1 md:flex-none px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-100 rounded-xl transition-colors"
              >
                {t.cookie.decline}
              </button>
              <button
                onClick={() => handleConsent(true)}
                className="flex-1 md:flex-none px-6 py-2 text-sm font-semibold text-white bg-[#D60000] hover:bg-[#b30000] shadow-md shadow-red-500/20 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                {t.cookie.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
