import React from "react";

import { Translations } from "@/data/translations";
import { AnimatedStat } from "@/components/AnimatedStat";

export function StatsSection({ t }: { t: Translations }) {
  return (
    <section className="py-14 bg-slate-900 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { value: "500+", label: t.stats.trips },
          { value: "99%", label: t.stats.satisfaction },
          { value: "8+", label: t.stats.experience },
          { value: "24/7", label: t.stats.available },
        ].map((stat, idx) => (
          <div key={idx} className="text-center animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}>
            <p className="text-4xl md:text-5xl font-black text-yellow-400 mb-2">
              <AnimatedStat value={stat.value} />
            </p>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
