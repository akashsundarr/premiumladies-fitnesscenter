"use client";

import { useEffect, useRef, useMemo, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollReveal.css";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
}

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 5,
  blurStrength = 10,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ TEXT ONLY (this is intentional)
  const splitText = useMemo(() => {
    if (typeof children !== "string") return null;

    return children.split(/(\s+)/).map((word, i) => {
      if (word.trim() === "") return word;
      return (
        <span key={i} className="word inline-block">
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".word");
    if (!words.length) return;

    gsap.fromTo(
      el,
      { rotate: baseRotation },
      {
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      words,
      { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : "none" },
      {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [enableBlur, baseOpacity, baseRotation, blurStrength]);

  return (
    <div
      ref={containerRef}
      className="scroll-reveal font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-wide"
    >
      <span className="text-gray-900">{splitText}</span>
    </div>
  );
}
