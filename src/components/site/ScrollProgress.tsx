"use client";

import { useEffect, useRef } from "react";
import { usePrefs } from "@/lib/prefs";

/**
 * A hairline reading indicator pinned under the header.
 *
 * Written straight to the DOM through a ref rather than through state — this
 * updates on every scroll frame and has no business re-rendering React.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = usePrefs();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      el.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5"
      role="progressbar"
      aria-label={t.a11y.scrollProgress}
    >
      <div
        ref={ref}
        className="h-full bg-kraft"
        style={{ transform: "scaleX(0)", transformOrigin: "left" }}
      />
    </div>
  );
}
