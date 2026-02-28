import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Translations } from "@/data/translations";

export function WhyUsSection({ t, featureIcons, whyUsImage }: { t: Translations, featureIcons: React.ReactNode[], whyUsImage: string }) {
  return (
    <section id="about" className="py-20 md:py-28 px-4 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-yellow-600 font-bold tracking-widest uppercase text-xs block mb-3">{t.whyUs.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-slate-900">
            {t.whyUs.title} <span className="text-yellow-500">{t.whyUs.brand}</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t.whyUs.desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Feature Grid (2x2) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-last lg:order-first">
            {t.whyUs.features.map((feature, idx: number) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (idx * 0.1), duration: 0.4 }}
                className="bg-slate-50 p-7 rounded-2xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-slate-900 text-yellow-400 flex items-center justify-center mb-5 shadow-md group-hover:bg-yellow-500 group-hover:text-slate-900 transition-colors">
                  {featureIcons[idx]}
                </div>
                <h3 className="text-lg font-bold mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: Driver Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden shadow-2xl order-first lg:order-last"
          >
            <Image 
              src={whyUsImage} 
              alt="Professional Driver" 
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
