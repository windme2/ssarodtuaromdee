"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Translations } from "@/data/translations";

export function ArticlesSection({ t, lang }: { t: Translations; lang: string }) {
  if (!t.articles || !t.articles.items || t.articles.items.length === 0) return null;

  return (
    <section id="articles" className="py-20 md:py-28 px-4 bg-white scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-yellow-600 font-bold tracking-widest uppercase text-xs block mb-3">
            {t.articles.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-slate-900">
            {t.articles.title}
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t.articles.desc}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.articles.items.map((article, idx) => (
            <Link
              href={`/${lang}/articles/${article.id}`} 
              key={article.id}
              className="bg-slate-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'both' }}
            >
              <div className="relative w-full h-[240px] overflow-hidden">
                <Image 
                  src={article.image} 
                  alt={article.title} 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
                  {article.date}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-yellow-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                  {article.desc}
                </p>

                <div className="flex items-center text-red-600 font-bold text-sm tracking-wide uppercase group-hover:text-red-700 transition-colors mt-auto">
                  {t.articles.readMore}
                  <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
