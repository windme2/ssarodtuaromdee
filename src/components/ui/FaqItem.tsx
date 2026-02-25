"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="font-bold text-slate-900 text-[15px] pr-4">{question}</span>
        <ChevronDown size={20} className={`text-slate-400 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 py-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
