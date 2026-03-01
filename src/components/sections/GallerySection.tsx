"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Translations } from "@/data/translations";

type GalleryImage = { src: string; alt: string; span?: string; caption?: string };

export function GallerySection({
  t,
  galleryImages,
  timelineImages,
}: {
  t: Translations;
  galleryImages: GalleryImage[];
  timelineImages?: GalleryImage[];
}) {
  const [lightboxData, setLightboxData] = useState<{ images: GalleryImage[]; index: number } | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<number>(0);

  // Seamless infinite scroll: render items×2, reset at midpoint
  useEffect(() => {
    let paused = false;
    const el = timelineRef.current;
    if (!el) return;

    const scroll = () => {
      if (!paused && el) {
        el.scrollLeft += 1.5;
        // When we've scrolled past the first copy, silently jump back
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

    return () => {
      cancelAnimationFrame(animationIdRef.current);
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const openLightbox = (images: GalleryImage[], index: number) => setLightboxData({ images, index });
  const closeLightbox = () => setLightboxData(null);

  const prevImage = useCallback(() => {
    if (!lightboxData) return;
    const { images, index } = lightboxData;
    setLightboxData({ images, index: (index - 1 + images.length) % images.length });
  }, [lightboxData]);

  const nextImage = useCallback(() => {
    if (!lightboxData) return;
    const { images, index } = lightboxData;
    setLightboxData({ images, index: (index + 1) % images.length });
  }, [lightboxData]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxData) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxData, prevImage, nextImage]);

  const currentImage = lightboxData ? lightboxData.images[lightboxData.index] : null;

  return (
    <>
      <section id="gallery" className="py-20 md:py-28 px-4 bg-slate-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-yellow-600 font-bold tracking-widest uppercase text-xs block mb-3">{t.gallery.subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">{t.gallery.title}</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">{t.gallery.desc}</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[260px]">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${img.span || ""}`}
                onClick={() => openLightbox(galleryImages, idx)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {img.caption && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <p className="absolute bottom-5 left-5 text-xl md:text-2xl font-bold text-white tracking-wide">{img.caption}</p>
                  </>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 transform scale-95 group-hover:scale-100">
                    View
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Gallery */}
          {t.gallery.timelineTitle && (
            <div className="mt-32 pb-16">
              <div className="text-center mb-10">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">{t.gallery.timelineTitle}</h3>
                <p className="text-slate-500 mt-2 max-w-xl mx-auto">{t.gallery.timelineDesc}</p>
              </div>

              <div
                ref={timelineRef}
                className="w-full overflow-x-auto pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              >
                <div className="flex gap-4 md:gap-6 w-max px-4 md:px-0">
                  {/* Render twice for seamless infinite loop */}
                  {[...(timelineImages || galleryImages), ...(timelineImages || galleryImages)].map((img, idx) => (
                    <div
                      key={`timeline-${idx}`}
                      className="relative w-[280px] h-[380px] md:w-[350px] md:h-[450px] rounded-2xl overflow-hidden shrink-0 group cursor-pointer shadow-lg"
                      onClick={() => openLightbox(timelineImages || galleryImages, idx % (timelineImages || galleryImages).length)}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 280px, 350px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="w-8 h-1 bg-yellow-500 mb-3 rounded-full" />
                        <p className="text-white font-bold text-lg md:text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {img.caption || `Trip ${idx + 1}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal with Navigation */}
      <AnimatePresence>
        {currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/60 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-md transition-all z-10"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium z-10">
              {lightboxData!.index + 1} / {lightboxData!.images.length}
            </div>

            {/* Prev Button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-3 md:left-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-10"
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxData!.index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-5xl h-[80vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                quality={95}
              />
              {currentImage.caption && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-medium">
                  {currentImage.caption}
                </div>
              )}
            </motion.div>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-3 md:right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all z-10"
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {lightboxData!.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxData({ images: lightboxData!.images, index: i }); }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === lightboxData!.index ? "bg-white w-4" : "bg-white/40"}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
