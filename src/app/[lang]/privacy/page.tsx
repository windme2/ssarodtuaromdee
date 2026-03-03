"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { translations, Lang } from "@/data/translations";
import { siteConfig } from "@/config/site";
import { Navigation } from "@/components/sections/Navigation";
import { FooterSection } from "@/components/sections/FooterSection";

export default function PrivacyPolicyPage({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang as Lang;
  const t = translations[lang];
  const { phoneNumber, lineOaUrl, whatsappUrl, facebookUrl } = siteConfig.contact;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLang = (nextLang: string) => {
    router.push("/" + nextLang + "/privacy");
  };

  const navLinks = [
    { href: `/${lang}#why-us`, label: t.nav.whyUs },
    { href: `/${lang}#services`, label: t.nav.services },
    { href: `/${lang}#areas`, label: t.nav.areas },
    { href: `/${lang}#reviews`, label: t.nav.reviews },
    { href: `/${lang}#gallery`, label: t.nav.gallery },
    { href: `/${lang}#articles`, label: t.nav.articles },
    { href: `/${lang}#contact`, label: t.nav.contact },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navigation
        isScrolled={isScrolled}
        navLinks={navLinks}
        lang={lang}
        toggleLang={toggleLang}
        t={t}
        phoneNumber={phoneNumber}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100/50">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 pb-8 border-b border-gray-100">
              {t.privacy?.title || "Privacy Policy"}
            </h1>

            <div className="prose prose-lg max-w-none text-gray-600 prose-headings:text-gray-900 prose-a:text-[#D60000]">
              {t.privacy?.content?.map((paragraph: string, index: number) => (
                <p key={index} className="mb-6 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </main>

      <FooterSection 
        t={t} 
        phoneNumber={phoneNumber} 
        lineOaUrl={lineOaUrl} 
        whatsappUrl={whatsappUrl} 
        facebookUrl={facebookUrl} 
        navLinks={navLinks}
        lang={lang}
      />
    </div>
  );
}
