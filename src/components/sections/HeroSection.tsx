"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, Star, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Translations } from "@/data/translations";

export function HeroSection({ t, lineOaUrl, phoneNumber, bgImage }: { t: Translations, lineOaUrl: string, phoneNumber: string, bgImage: string }) {
  return (
    <section className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={bgImage} alt="Nature landscape" fill className="object-cover object-center" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 w-full text-center">
        <div className="text-white flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <Star className="text-yellow-400" size={14} fill="currentColor" />
            <span className="text-xs font-semibold tracking-widest uppercase">{t.hero.badge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-[1.15] tracking-tight">
            {t.hero.title1} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500">{t.hero.title2}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto font-light">{t.hero.desc}</p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
            {/* LINE CTA with bounce micro-interaction */}
            <motion.a
              href={lineOaUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93, y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center gap-3 bg-[#00C300] text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl shadow-green-500/30 w-full sm:w-auto cursor-pointer"
            >
              <MessageCircle size={22} /> {t.hero.ctaLine}
            </motion.a>

            {/* Call CTA with bounce micro-interaction */}
            <motion.a
              href={`tel:${phoneNumber}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93, y: 2 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-bold border border-white/25 w-full sm:w-auto cursor-pointer"
            >
              <Phone size={22} /> {t.hero.ctaCall}
            </motion.a>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 cursor-pointer group">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5 group-hover:border-yellow-400 transition-colors">
            <div className="w-1.5 h-3 bg-white/60 rounded-full group-hover:bg-yellow-400 transition-colors" />
          </div>
          <ChevronDown size={16} className="text-white/40 group-hover:text-yellow-400 transition-colors" />
        </div>
      </a>
    </section>
  );
}
