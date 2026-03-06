import React from "react";
import Image from "next/image";
import { ShieldCheck, Clock, ThumbsUp, Phone, MessageCircle, MapPin, Facebook } from "lucide-react";

import { Translations } from "@/data/translations";

export function FooterSection({ t, phoneNumber, lineOaUrl, whatsappUrl, facebookUrl, navLinks, lang }: { 
  t: Translations, 
  phoneNumber: string, 
  lineOaUrl: string, 
  whatsappUrl: string,
  facebookUrl: string,
  navLinks: { href: string; label: string }[],
  lang?: string
}) {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand & Desc */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-xl bg-white p-1">
              <Image src="/assets/images/section_logo.webp" alt="Rodtuaromdee Logo" width={48} height={48} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-tight leading-none text-white">รถตู้อารมณ์ดี</span>
              <span className="text-[9px] text-yellow-500/80 font-bold uppercase tracking-[0.2em]">Premium Van Service</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">{t.footer.brandDesc}</p>
          <div className="flex flex-col gap-2 mt-2">
            <span className="flex items-center gap-2 text-xs"><ShieldCheck size={14} className="text-yellow-500" /> {t.footer.insurance}</span>
            <span className="flex items-center gap-2 text-xs"><Clock size={14} className="text-yellow-500" /> {t.footer.allDay}</span>
            <span className="flex items-center gap-2 text-xs"><ThumbsUp size={14} className="text-yellow-500" /> {t.footer.trips}</span>
          </div>
        </div>

        {/* Column 2: Navigation Menu */}
        <div className="lg:pl-8">
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">{t.footer.menuTitle}</h4>
          <ul className="space-y-4 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}><a href={link.href} className="hover:text-yellow-500 transition-colors inline-block">{link.label}</a></li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact Channels */}
        <div>
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">{t.footer.contactTitle}</h4>
          <div className="space-y-5">
            <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 hover:text-yellow-500 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-yellow-500 transition-colors"><Phone size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">{t.footer.phone}</p>
                <p className="font-bold text-white text-sm group-hover:text-yellow-500 transition-colors">{phoneNumber}</p>
              </div>
            </a>
            <a href={lineOaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#00C300] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-[#00C300] transition-colors"><MessageCircle size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">LINE OA</p>
                <p className="font-bold text-white text-sm group-hover:text-[#00C300] transition-colors">รถตู้อารมณ์ดี</p>
              </div>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#25D366] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-[#25D366] transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">WhatsApp</p>
                <p className="font-bold text-white text-sm group-hover:text-[#25D366] transition-colors">Chat with us</p>
              </div>
            </a>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#1877F2] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-[#1877F2] transition-colors"><Facebook size={16} /></div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Facebook</p>
                <p className="font-bold text-white text-sm group-hover:text-[#1877F2] transition-colors">รถตู้อารมณ์ดี</p>
              </div>
            </a>
          </div>
        </div>

        {/* Column 4: Location */}
        <div>
          <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-wider">{t.footer.location}</h4>
          <div className="flex gap-3 text-sm">
            <MapPin size={18} className="text-slate-500 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed text-slate-400 max-w-[200px]">{t.footer.locationValue}</p>
          </div>
        </div>

      </div>

      <div className="max-w-6xl mx-auto border-t border-slate-800 mt-16 pt-8 flex border-opacity-50 justify-between items-center gap-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
          <p className="text-slate-500 text-xs text-center sm:text-left">© {new Date().getFullYear()} รถตู้อารมณ์ดี — All rights reserved.</p>
          <a href={`/${lang || 'th'}/privacy`} className="text-slate-500 hover:text-white text-xs transition-colors underline decoration-slate-700 underline-offset-4">{t.footer.privacyPolicy}</a>
        </div>
        <p className="text-slate-600 text-[10px] uppercase tracking-widest hidden sm:block">Premium Van Service Thailand</p>
      </div>
    </footer>
  );
}
