import React from "react";

import { Translations } from "@/data/translations";

export function HowItWorksSection({ t }: { t: Translations }) {
  return (
    <section className="py-20 md:py-28 px-4 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-yellow-600 font-bold tracking-widest uppercase text-xs block mb-3">{t.howItWorks.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-slate-900">
            {t.howItWorks.title} <span className="text-yellow-500">{t.howItWorks.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t.howItWorks.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.howItWorks.steps.map((step, idx: number) => (
            <div key={idx} className="relative text-center animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}>
              {/* Connector line */}
              {idx < 2 && <div className="hidden md:block absolute top-14 left-[60%] w-[80%] border-t-2 border-dashed border-slate-200" />}
              <div className="w-28 h-28 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-4xl font-black text-yellow-500">{step.step}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
