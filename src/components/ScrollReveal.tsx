"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollReveal({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        for (const lobe of root.querySelectorAll<HTMLElement>(".lobe")) {
          // Lobes already on screen stay as rendered, because hiding them after the first paint would flash.
          if (ScrollTrigger.isInViewport(lobe)) continue;

          gsap.from(lobe.querySelectorAll("[data-reveal]"), {
            autoAlpha: 0,
            y: 28,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: lobe,
              start: "top 75%",
              once: true,
            },
          });
        }
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return <div ref={rootRef}>{children}</div>;
}
