import React from "react";
import { motion } from "framer-motion";

import { Translations } from "@/data/translations";

export function AreaSection({ t, areaIcons }: { t: Translations, areaIcons: React.ReactNode[] }) {
  return (
    <section id="areas" className="py-20 md:py-28 px-4 bg-slate-900 text-white overflow-hidden relative scroll-mt-20">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-bold tracking-widest uppercase text-xs block mb-3">{t.areas.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            {t.areas.title} <span className="text-yellow-400">{t.areas.titleHighlight}</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">{t.areas.desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content - Map */}
          <div className="relative w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-slate-700/50">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.863929014514!2d100.4338867!3d13.605121599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d6286f3f3d97b%3A0x36b8f0b66ff94c64!2z4Lij4LiW4LiV4Li54LmJ4Lit4Liy4Lij4Lih4LiT4LmM4LiU4Li1!5e0!3m2!1sth!2sth!4v1772468810529!5m2!1sth!2sth" 
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Area Map"
            ></iframe>
          </div>

          {/* Right Content - Cards */}
          <div className="flex flex-col gap-6">
            {t.areas.items.map((item, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (i * 0.1), duration: 0.4 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 transition-colors flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-yellow-500 text-slate-900 flex items-center justify-center shrink-0 shadow-lg">{areaIcons[i]}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.area}</h3>
                  <p className="text-yellow-400/70 text-xs font-semibold uppercase tracking-wider mb-2">{item.areaEn}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
