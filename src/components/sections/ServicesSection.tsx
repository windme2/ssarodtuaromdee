import React from "react";
import Image from "next/image";

import { Translations } from "@/data/translations";

export function ServicesSection({ t, serviceImages, serviceIcons }: { t: Translations, serviceImages: string[], serviceIcons: React.ReactNode[] }) {
  return (
    <section id="services" className="py-20 md:py-28 px-4 bg-slate-50 scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-yellow-600 font-bold tracking-widest uppercase text-xs block mb-3">{t.services.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-slate-900">{t.services.title}</h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t.services.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.services.items.map((service, idx: number) => (
            <div key={idx} className="relative rounded-3xl overflow-hidden group h-[420px] flex items-end animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
              <Image 
                src={serviceImages[idx]} 
                alt={service.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110" 
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
              <div className="relative z-10 p-8 w-full">
                <div className="w-12 h-12 rounded-xl bg-yellow-500 text-slate-900 flex items-center justify-center mb-4 shadow-lg">{serviceIcons[idx]}</div>
                <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                <p className="text-yellow-400/80 text-xs font-semibold uppercase tracking-wider mb-3">{service.sub}</p>
                <p className="text-white/70 text-sm leading-relaxed">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
