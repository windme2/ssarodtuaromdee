"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedStatProps {
  value: string;
}

export function AnimatedStat({ value }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState("0");
  
  const numericPartMatch = value.match(/\d+/);
  
  const targetNumber = numericPartMatch ? parseInt(numericPartMatch[0], 10) : 0;
  const matchIndex = numericPartMatch ? numericPartMatch.index || 0 : 0;
  const prefix = numericPartMatch ? value.substring(0, matchIndex) : "";
  const suffix = numericPartMatch ? value.substring(matchIndex + numericPartMatch[0].length) : "";

  useEffect(() => {
    if (!isInView || targetNumber === 0) return;
    
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smooth deceleration (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      const currentNumber = Math.floor(easeProgress * targetNumber);
      setDisplayValue(currentNumber.toString());
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNumber.toString());
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, targetNumber]);

  if (!numericPartMatch) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
