"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photograph } from "@/types";
import { motionSettings, reducedMotionQuery } from "@/lib/motion";
export function HeroCarousel({ slides }: { slides: Photograph[] }) {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState<number[]>([0]);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [reduced, setReduced] = useState(true);
  const touch = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const query = matchMedia(reducedMotionQuery);
    const sync = () => setReduced(query.matches);
    const visibility = () => setHidden(document.hidden);
    sync();
    visibility();
    query.addEventListener("change", sync);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      query.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  const playing = !hover && !focus && !hidden && !reduced;
  const go = (next: number) => {
    const value = (next + slides.length) % slides.length;
    setLoaded((old) => (old.includes(value) ? old : [...old, value]));
    setIndex(value);
  };
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      const next = (index + 1) % slides.length;
      setLoaded((old) => (old.includes(next) ? old : [...old, next]));
      setIndex(next);
    }, motionSettings.carousel);
    return () => clearTimeout(timer);
  }, [playing, index, slides.length]);
  return (
    <section
      className="hero-carousel"
      aria-roledescription="karusel"
      aria-label="Dokumentasi kegiatan"
      onFocusCapture={() => setFocus(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocus(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          go(index + (e.key === "ArrowRight" ? 1 : -1));
        }
      }}
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x,
          dy = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4)
          go(index + (dx < 0 ? 1 : -1));
        touch.current = null;
      }}
    >
      <div
        className="carousel-stage"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`carousel-slide ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${slides.length}`}
          >
            {loaded.includes(i) && (
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 767px) 100vw, 45vw"
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                style={{ objectFit: slide.fit || "contain" }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <div className="carousel-dots">
          {slides.map((slide, i) => (
            <button
              type="button"
              key={slide.src}
              aria-label={`Tampilkan foto ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
      <p
        className="carousel-caption"
        aria-live={playing ? "off" : "polite"}
        aria-atomic="true"
      >
        {index + 1} / {slides.length} · {slides[index].alt}
      </p>
    </section>
  );
}
