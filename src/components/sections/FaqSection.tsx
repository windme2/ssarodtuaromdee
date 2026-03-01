"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Translations } from "@/data/translations";

export function FaqSection({ t, lang }: { t: Translations, lang: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 px-4 bg-white scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-yellow-600 font-bold tracking-widest uppercase text-xs block mb-3">{t.faq.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-slate-900">{t.faq.title}</h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t.faq.desc}</p>
        </div>

        <div className="space-y-4">
          {t.faq.items.map((item, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div key={`${lang}-${idx}`} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-[15px] pr-4">{item.q}</span>
                  <ChevronDown size={20} className={`text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 py-5 text-slate-500 text-sm leading-relaxed border-t border-slate-100">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
