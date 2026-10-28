"use client";
import { useEffect, useRef } from "react";
import { motionSettings, reducedMotionQuery } from "@/lib/motion";
export function AnimatedCounter({
  value,
  duration = motionSettings.counter,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale = "id-ID",
  className = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    `${prefix}${new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n)}${suffix}`;
  const final = format(value);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let frame = 0;
    let ran = false;
    const query = matchMedia(reducedMotionQuery);
    const fmt = (n: number) =>
      `${prefix}${new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n)}${suffix}`;
    const finish = () => {
      cancelAnimationFrame(frame);
      node.textContent = final;
    };
    const change = () => {
      if (query.matches) {
        ran = true;
        finish();
      }
    };
    query.addEventListener("change", change);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || ran) return;
        ran = true;
        observer.disconnect();
        if (query.matches || duration <= 0) {
          finish();
          return;
        }
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          node.textContent = fmt(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      query.removeEventListener("change", change);
    };
  }, [value, duration, decimals, prefix, suffix, locale, final]);
  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  );
}
