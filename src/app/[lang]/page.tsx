"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { translations, Lang } from "@/data/translations";
import { siteConfig } from "@/config/site";

// Components
import { Navigation as NavBar } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { AreaSection } from "@/components/sections/AreaSection";
import { ChooseCarSection } from "@/components/sections/ChooseCarSection";
import { ReviewsSection } from "@/components/sections/ReviewsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FooterSection } from "@/components/sections/FooterSection";
import { FloatingActionButtons } from "@/components/sections/FloatingActionButtons";
import { FadeInSection } from "@/components/FadeInSection";

export default function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = React.use(params);
  const lang = resolvedParams.lang as Lang;
  const { phoneNumber, lineOaUrl, whatsappUrl, facebookUrl } = siteConfig.contact;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  // Navigate to selected language
  const toggleLang = (nextLang: string) => {
    router.push("/" + nextLang);
  };

  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const navLinks = siteConfig.getNavLinks(t);
  const { featureIcons, serviceImages, serviceIcons, areaIcons } = siteConfig;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <NavBar
        isScrolled={isScrolled}
        navLinks={navLinks}
        lang={lang}
        t={t}
        phoneNumber={phoneNumber}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        toggleLang={toggleLang}
      />

      {/* Hero: no fade — shows immediately */}
      <HeroSection t={t} lineOaUrl={lineOaUrl} phoneNumber={phoneNumber} bgImage={siteConfig.heroImage} />

      {/* Stats: attached directly to hero, no fade */}
      <StatsSection t={t} />

      <FadeInSection delay={0.05}>
        <WhyUsSection t={t} featureIcons={featureIcons} whyUsImage={siteConfig.whyUsImage} />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <ServicesSection t={t} serviceImages={serviceImages} serviceIcons={serviceIcons} />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <ChooseCarSection t={t} />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <AreaSection t={t} areaIcons={areaIcons} />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <HowItWorksSection t={t} />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <ReviewsSection t={t} />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <GallerySection t={t} galleryImages={siteConfig.galleryImages} timelineImages={siteConfig.timelineImages} />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <ArticlesSection t={t} lang={lang} />
      </FadeInSection>

      <FadeInSection delay={0.05}>
        <FaqSection t={t} lang={lang} />
      </FadeInSection>

      <ContactSection t={t} lineOaUrl={lineOaUrl} phoneNumber={phoneNumber} bgImage={siteConfig.contactBgImage} />

      <FooterSection t={t} phoneNumber={phoneNumber} lineOaUrl={lineOaUrl} whatsappUrl={whatsappUrl} facebookUrl={facebookUrl} navLinks={navLinks} lang={lang} />

      <FloatingActionButtons
        isScrolled={isScrolled}
        scrollToTop={scrollToTop}
        lineOaUrl={lineOaUrl}
        phoneNumber={phoneNumber}
        whatsappUrl={whatsappUrl}
      />
    </main>
  );
}