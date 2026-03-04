import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { translations, Lang } from "@/data/translations";
import { siteConfig } from "@/config/site";
import { ChevronLeft, Calendar } from "lucide-react";

export async function generateStaticParams() {
  // Generate params for all languages and all article IDs
  const langs = ["th", "en", "zh"] as const;
  const params: { lang: string; id: string }[] = [];

  for (const lang of langs) {
    const articles = translations[lang].articles.items;
    for (const article of articles) {
      params.push({ lang, id: article.id });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Lang;
  const { id } = resolvedParams;
  const t = translations[lang];
  const article = t.articles.items.find((item) => item.id === id);

  if (!article) return {};

  return {
    title: `${article.title} - ${lang === "en" ? "Rodtuaromdee" : "รถตู้อารมณ์ดี"}`,
    description: article.desc,
    openGraph: {
      title: article.title,
      description: article.desc,
      images: [article.image],
    },
    alternates: {
      canonical: `/${lang}/articles/${article.id}`,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Lang;
  const { id } = resolvedParams;

  const t = translations[lang];
  const article = t.articles.items.find((item) => item.id === id);

  if (!article) {
    notFound();
  }

  const { phoneNumber, lineOaUrl } = siteConfig.contact;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Simple Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href={`/${lang}#articles`}
            className="flex items-center gap-2 text-slate-500 hover:text-red-700 transition-colors py-2"
          >
            <ChevronLeft size={20} />
            <span className="font-medium text-sm md:text-base">
              {lang === "en" ? "Back to Articles" : lang === "zh" ? "返回文章" : "กลับไปที่บทความทั้งหมด"}
            </span>
          </Link>
          <Link href={`/${lang}`} className="font-black text-xl text-red-700">
            {lang === "en" ? "Rodtuaromdee" : "รถตู้อารมณ์ดี"}
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="max-w-4xl mx-auto px-4 pt-10 md:pt-16">
        <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Hero Image */}
          <div className="relative w-full h-[300px] md:h-[450px]">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-center gap-2 text-slate-500 mb-6 font-medium text-sm">
              <Calendar size={18} />
              <span>{article.date}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-lg md:text-xl">
                {article.desc}
              </p>
              
              <div className="my-10 p-6 bg-red-50 rounded-xl border border-red-100">
                <h3 className="text-red-800 font-bold text-xl mb-3">
                  {lang === "en"
                    ? "Need a VIP Van for this trip?"
                    : lang === "zh"
                    ? "需要VIP包车吗？"
                    : "สนใจเดินทางทริปนี้ด้วยรถตู้ VIP?"}
                </h3>
                <p className="text-red-700 mb-6">
                  {lang === "en"
                    ? "Contact us now for a free quote and consultation."
                    : lang === "zh"
                    ? "立即联系我们，获取免费报价和咨询。"
                    : "ติดต่อเราวันนี้เพื่อประเมินราคาและวางแผนการเดินทางฟรี"}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={lineOaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00B900] text-white px-6 py-3 rounded-full font-bold hover:bg-[#009900] transition-colors shadow-sm"
                  >
                    LINE: @519oggok
                  </a>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="bg-red-700 text-white px-6 py-3 rounded-full font-bold hover:bg-red-800 transition-colors shadow-sm"
                  >
                    Tel: 084-290-8841
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
