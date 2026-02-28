"use client";

import React from "react";
import Image from "next/image";
import { Users, Briefcase } from "lucide-react";

import { Translations } from "@/data/translations";

const carImages = [
  "/assets/images/section_car_camry.webp",
  "/assets/images/section_car_innova.webp",
  "/assets/images/section_car_fortuner.webp",
  "/assets/images/section_car_h1.webp",
  "/assets/images/section_car_alphard.webp",
  "/assets/images/section_car_commuter.webp",
];

export function ChooseCarSection({ t }: { t: Translations }) {
  if (!t.chooseCar || !t.chooseCar.cars) return null;
  
  return (
    <section className="py-20 md:py-28 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-slate-900">
            {t.chooseCar.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.chooseCar.cars.map((car, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center hover:shadow-xl hover:-translate-y-2 hover:border-red-200 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative w-full h-48 mb-6 overflow-hidden">
                <Image 
                  src={carImages[idx]}
                  alt={car.name}
                  fill
                  className={`object-contain transition-transform duration-500 group-hover:scale-110 ${idx === 3 ? "[transform:scaleX(-1)] group-hover:[transform:scaleX(-1)_scale(1.1)]" : ""}`}
                />
              </div>
              <h3 className="text-lg font-bold text-red-700 mb-6 group-hover:text-red-800 transition-colors">{car.name}</h3>
              
              <div className="flex items-center gap-8 text-sm font-bold text-slate-800">
                <div className="flex flex-col items-center gap-2">
                  <Users size={28} className="text-slate-900 group-hover:text-red-700 transition-colors" />
                  <span>{car.pax}</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Briefcase size={28} className="text-slate-900 group-hover:text-red-700 transition-colors" />
                  <span>{car.luggage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
