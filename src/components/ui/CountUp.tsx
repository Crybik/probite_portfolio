"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefs } from "@/lib/prefs";
import { localiseDigits } from "@/lib/digits";

/**
 * Counts up to `value` the first time it is seen.
 *
 * Renders the final value on the server and for anyone with reduced motion, so
 * the number is never wrong or missing — the animation is decoration on top of
 * correct output, not the thing that produces it.
 */
export function CountUp({
  value,
  decimals = 0,
  suffix = "",
  className = "",
  duration = 1400,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const { locale } = usePrefs();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // State already holds the final value, so reduced motion needs no work at
    // all — the correct number is on screen either way.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          // Ease-out cubic: fast to the neighbourhood, gentle into the value.
          setShown(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) frame = requestAnimationFrame(tick);
          else setShown(value);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {localiseDigits(shown.toFixed(decimals), locale)}
      {suffix}
    </span>
  );
}
