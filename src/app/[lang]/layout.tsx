import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/i18n-config";
import { Analytics } from "@vercel/analytics/react";
import CookieConsent from "@/components/ui/CookieConsent";

// Switch to Prompt for better Thai and English readability (modern and clean)
const prompt = Prompt({ subsets: ["thai", "latin"], weight: ["300", "400", "500", "700", "800", "900"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const isEn = resolvedParams.lang === "en";
  
  const title = isEn 
    ? "Rodtuaromdee | VIP Van Rental with Professional Driver in Thailand"
    : "รถตู้อารมณ์ดี | VIP Van Rental with Professional Driver in Thailand";
    
  const description = isEn
    ? "Premium VIP van rental with professional driver. New vans, clean, comfortable. Nationwide service in Thailand. Airport transfer, events, seminars. Call 084-290-8841 or LINE: @519oggok"
    : "บริการเช่ารถตู้ VIP พร้อมคนขับมืออาชีพ รถใหม่ สะอาด แอร์เย็น เดินทางทั่วไทย รับ-ส่งสนามบิน งานอีเวนต์ สัมมนา | Premium VIP van rental with professional driver. New vans, clean, comfortable. Nationwide service in Thailand.";

  const keywords = isEn
    ? "VIP van rental Thailand, van rental Bangkok, private van service, airport transfer Bangkok"
    : "เช่ารถตู้, รถตู้ VIP, รถตู้พร้อมคนขับ, เช่ารถตู้กรุงเทพ, รถตู้เที่ยว, รถตู้อารมณ์ดี";

  return {
    title,
    description,
    keywords,
    metadataBase: new URL("https://rodtuaromdee.com"),
    icons: {
      icon: "/favicon.png",
      apple: "/favicon.png",
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: isEn ? "en_US" : "th_TH",
      images: [
        {
          url: "/og-image.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.webp"],
    },
    alternates: {
      canonical: `/${resolvedParams.lang}`,
      languages: {
        th: "/th",
        en: "/en",
        zh: "/zh",
      },
    },
  };
}

// JSON-LD Structured Data for Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "รถตู้อารมณ์ดี — Premium VIP Van Service",
  description:
    "บริการเช่ารถตู้ VIP พร้อมคนขับมืออาชีพ รถใหม่ สะอาด แอร์เย็น เดินทางทั่วไทย | Premium VIP van rental with professional driver in Thailand.",
  telephone: "+66842908841",
  url: "https://rodtuaromdee.com",
  image: "/og-image.webp",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bangkok",
    addressCountry: "TH",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "13.7563",
    longitude: "100.5018",
  },
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
  },
  sameAs: [
    "https://line.me/ti/p/~@519oggok",
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  return (
    <html lang={resolvedParams.lang}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={prompt.className}>
        {children}
        <Analytics />
        <CookieConsent lang={resolvedParams.lang as Locale} />
      </body>
    </html>
  );
}