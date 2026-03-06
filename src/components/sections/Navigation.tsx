"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Phone, Globe, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Translations } from "@/data/translations";

const LANGUAGES = [
  { code: "th", label: "ภาษาไทย", flag: "🇹🇭" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
];

export function Navigation({
  isScrolled,
  navLinks,
  lang,
  toggleLang,
  t,
  phoneNumber,
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  isScrolled: boolean;
  navLinks: { href: string; label: string }[];
  lang: string;
  toggleLang: (lang: string) => void;
  t: Translations;
  phoneNumber: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (val: boolean) => void;
}) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    setTimeout(() => {
      if (href === "#") { 
        window.scrollTo({ top: 0, behavior: "smooth" }); 
        return; 
      }
      const targetId = href.replace(/.*#/, "");
      const elem = document.getElementById(targetId);
      if (elem) {
        const topOffset = 80;
        const targetPosition = elem.getBoundingClientRect().top + window.scrollY - topOffset;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }
    }, 150);
  };

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/30"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 w-full h-20 flex justify-between items-center text-white">
        {/* Brand */}
        <a href="#" onClick={(e) => handleSmoothScroll(e, "#")} className="flex items-center gap-3 group">
          <div className="w-12 h-12 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform overflow-hidden rounded-xl bg-white p-1">
            <Image src="/assets/images/section_logo.webp" alt="Rodtuaromdee Logo" width={48} height={48} className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tight leading-none text-white">รถตู้อารมณ์ดี</span>
            <span className="text-[9px] text-yellow-500/90 font-bold uppercase tracking-[0.2em]">Premium Van Service</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="hover:text-yellow-400 transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-yellow-400 hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              <span>{currentLang.flag} {currentLang.label}</span>
              <ChevronDown size={12} className={`transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-40 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { toggleLang(l.code); setLangDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-medium hover:bg-white/10 transition-colors text-left ${
                        lang === l.code ? "text-yellow-400 bg-white/5" : "text-white"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400" />}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-2 bg-yellow-500 text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/25 hover:scale-105"
          >
            <Phone size={16} /> {t.nav.callNow}
          </a>
        </div>

        {/* Mobile Right */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Dropdown */}
          <div ref={undefined} className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-bold"
            >
              {currentLang.flag}
            </button>
            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-36 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl"
                >
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { toggleLang(l.code); setLangDropdownOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors ${
                        lang === l.code ? "text-yellow-400" : "text-white"
                      }`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="w-10 h-10 flex items-center justify-center">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="text-white text-lg font-medium hover:text-yellow-400 transition-colors py-3 border-b border-white/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={`tel:${phoneNumber}`}
                className="mt-4 flex justify-center items-center gap-2 bg-yellow-500 text-slate-900 px-5 py-3 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all shadow-lg shadow-yellow-500/25"
              >
                <Phone size={20} /> {t.nav.callNow}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
