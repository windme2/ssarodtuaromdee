import React from "react";
import Image from "next/image";
import { MessageCircle, Phone } from "lucide-react";

import { Translations } from "@/data/translations";

export function ContactSection({ t, lineOaUrl, phoneNumber, bgImage }: { t: Translations, lineOaUrl: string, phoneNumber: string, bgImage: string }) {
  return (
    <section id="contact" className="py-20 md:py-28 px-4 bg-slate-900 relative border-t border-slate-800 scroll-mt-20">
      <div className="absolute inset-0 opacity-[0.03]">
        <Image src={bgImage} alt="Background" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-bold tracking-widest uppercase text-xs block mb-3">
            {t.footer?.contactTitle || "Contact Us"}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-3 tracking-tight">
            {t.cta.title} <span className="text-yellow-400">{t.cta.titleHighlight || ""}</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t.cta.desc}
          </p>
        </div>
          
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto justify-center">
          <a href={`tel:${phoneNumber}`} className="flex items-center justify-center gap-3 bg-yellow-500 text-slate-900 px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-yellow-500/20 hover:scale-105 transition-transform w-full sm:w-auto">
            <Phone size={22} fill="currentColor" /> {phoneNumber}
          </a>
          <a href={lineOaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#00C300] text-white px-8 py-4 rounded-full text-lg font-bold shadow-xl shadow-green-500/20 hover:scale-105 transition-transform w-full sm:w-auto">
            <MessageCircle size={22} fill="currentColor" /> {t.cta.ctaLine}
          </a>
        </div>
      </div>
    </section>
  );
}
