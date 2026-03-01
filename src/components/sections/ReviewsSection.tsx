"use client";

import React, { useRef, useEffect } from "react";
import { Star } from "lucide-react";
import { Translations } from "@/data/translations";

export function ReviewsSection({ t }: { t: Translations }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>(0);

  // Seamless infinite scroll — same technique as timeline
  useEffect(() => {
    let paused = false;
    const el = scrollRef.current;
    if (!el) return;

    const scroll = () => {
      if (!paused && el) {
        el.scrollLeft += 1;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      animationIdRef.current = requestAnimationFrame(scroll);
    };

    animationIdRef.current = requestAnimationFrame(scroll);
    const handleEnter = () => { paused = true; };
    const handleLeave = () => { paused = false; };
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    el.addEventListener("touchstart", handleEnter);
    el.addEventListener("touchend", handleLeave);

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
      el.removeEventListener("touchstart", handleEnter);
      el.removeEventListener("touchend", handleLeave);
    };
  }, []);

  const items = t.reviews.items;

  return (
    <section id="reviews" className="py-20 md:py-28 px-4 bg-slate-50 relative scroll-mt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-yellow-600 font-bold tracking-widest uppercase text-xs block mb-3">{t.reviews.subtitle}</span>
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-slate-900">{t.reviews.title}</h2>
          <p className="text-slate-500 max-w-xl mx-auto">{t.reviews.desc}</p>
        </div>

        {/* Scrollable Container — items rendered twice for infinite loop */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0 cursor-grab active:cursor-grabbing"
        >
          {[...items, ...items].map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-slate-100 flex flex-col relative hover:-translate-y-1 hover:shadow-xl transition-all duration-300 w-[85vw] md:w-[calc(33.333%-16px)] shrink-0"
            >
              <div className="flex gap-1 text-yellow-500 mb-5">
                {[...Array(5)].map((_, i) => (<Star key={i} size={18} fill="currentColor" />))}
              </div>
              <p className="text-slate-600 leading-relaxed flex-grow text-[15px] whitespace-pre-line break-words">&ldquo;{review.text}&rdquo;</p>
              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 text-yellow-500 rounded-full flex items-center justify-center font-bold text-sm shrink-0">{review.avatar}</div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                  <p className="text-xs text-slate-400">{review.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
