import React from "react";
import { Car, Users, Clock, ShieldCheck, Mountain, Building2, Plane, Navigation as NavIcon } from "lucide-react";
import { Translations } from "@/data/translations";

export const siteConfig = {
  contact: {
    phoneNumber: "0842908841",
    lineOaUrl: "https://lin.ee/ceodEHa",
    whatsappUrl: "https://wa.me/message/LEZ3ZQMI237NK1",
    facebookUrl: "https://www.facebook.com/songphop652?locale=th_TH",
  },
  getNavLinks: (t: Translations) => [
    { href: "#about", label: t.nav.whyUs },
    { href: "#services", label: t.nav.services },
    { href: "#areas", label: t.nav.areas },
    { href: "#reviews", label: t.nav.reviews },
    { href: "#gallery", label: t.nav.gallery },
    { href: "#articles", label: t.nav.articles },
    { href: "#contact", label: t.nav.contact },
  ],
  whyUsImage: "/assets/images/section_gallery_01.webp",
  heroImage: "/assets/images/section_hero.webp",
  contactBgImage: "/assets/images/section_contact.webp",
  galleryImages: [
    { src: "/assets/images/section_gallery_01.webp", alt: "VIP Van Interior", span: "col-span-2 row-span-2", caption: "Premium Vans" },
    { src: "/assets/images/section_gallery_02.webp", alt: "Road Trip" },
    { src: "/assets/images/section_gallery_03.webp", alt: "Mountain View" },
    { src: "/assets/images/section_gallery_04.webp", alt: "Beach Trip", span: "col-span-2" },
    { src: "/assets/images/section_gallery_05.webp", alt: "Scenic Route" },
    { src: "/assets/images/section_gallery_06.webp", alt: "Temple Tour" },
    { src: "/assets/images/section_gallery_07.webp", alt: "Van Fleet", span: "col-span-2" },
    { src: "/assets/images/section_gallery_08.webp", alt: "Waterfall Trip" },
    { src: "/assets/images/section_gallery_09.webp", alt: "National Park" },
    { src: "/assets/images/section_gallery_10.webp", alt: "City Drive", span: "col-span-2" },
    { src: "/assets/images/section_gallery_11.webp", alt: "Sunrise Trip" },
    { src: "/assets/images/section_gallery_12.webp", alt: "Forest Drive" },
    { src: "/assets/images/section_gallery_13.webp", alt: "Airport Transfer", span: "col-span-2" },
    { src: "/assets/images/section_gallery_14.webp", alt: "Island Tour" },
    { src: "/assets/images/section_gallery_15.webp", alt: "Hill Station" },
  ],
  timelineImages: [
    { src: "/assets/images/section_timeline_01.webp", alt: "Trip 1", caption: "Pattaya Tour" },
    { src: "/assets/images/section_timeline_02.webp", alt: "Trip 2", caption: "Chiang Mai" },
    { src: "/assets/images/section_timeline_03.webp", alt: "Trip 3", caption: "Phuket Beach" },
    { src: "/assets/images/section_timeline_04.webp", alt: "Trip 4", caption: "Khao Yai" },
    { src: "/assets/images/section_timeline_05.webp", alt: "Trip 5", caption: "Ayutthaya" },
    { src: "/assets/images/section_timeline_06.webp", alt: "Trip 6", caption: "Kanchanaburi" }
  ],
  featureIcons: [
    <Car key="car" size={28} />,
    <Users key="users" size={28} />,
    <Clock key="clock" size={28} />,
    <ShieldCheck key="shield" size={28} />,
  ],
  serviceImages: [
    "/assets/images/section_service_tour.webp",
    "/assets/images/section_service_seminar.webp",
    "/assets/images/section_service_airport.webp",
  ],
  serviceIcons: [
    <Mountain key="mountain" size={32} />,
    <Building2 key="building" size={32} />,
    <Plane key="plane" size={32} />,
  ],
  areaIcons: [
    <Building2 key="building" size={24} />,
    <NavIcon key="nav" size={24} />,
    <Plane key="plane" size={24} />,
  ],
};
