"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motionSettings, reducedMotionQuery } from "@/lib/motion";
// One observer per route; server-rendered content remains visible without JS.
export function ScrollReveals() {
  const path = usePathname();
  useEffect(() => {
    const query = matchMedia(reducedMotionQuery);
    if (query.matches) return;
    const root = document.getElementById("main-content");
    if (!root) return;
    const animations = new Set<Animation>();
    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const node = entry.target as HTMLElement;
          const variant =
            node.dataset.reveal ||
            (node.matches(".community-copy")
              ? "right"
              : node.matches(".intro")
                ? "left"
                : node.matches(".preview-photo")
                  ? "image"
                  : "up");
          const offset = innerWidth < 768 ? 12 : 24;
          const from =
            variant === "left"
              ? `translateX(-${offset}px)`
              : variant === "right"
                ? `translateX(${offset}px)`
                : variant === "image"
                  ? "scale(.985)"
                  : variant === "fade"
                    ? "none"
                    : `translateY(${offset}px)`;
          const animation = node.animate(
            [
              { opacity: 0.15, transform: from },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: motionSettings.duration,
              delay: Number(node.dataset.stagger || 0),
              easing: motionSettings.easing,
              fill: "none",
            },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
          animation.oncancel = () => animations.delete(animation);
        });
      },
      { threshold: 0.08 },
    );
    const scan = () => {
      root
        .querySelectorAll<HTMLElement>(
          ".page-header,.section-heading,.intro,.rw-preview article,.program-index>a,.program-detail,.article-card,.gallery-grid figure,.preview-photo,.location,.community-copy,.team-introduction,.report-impact,.kkn-hero-copy,[data-reveal]",
        )
        .forEach((node) => {
          if (seen.has(node)) return;
          seen.add(node);
          if (
            node.parentElement?.matches(
              ".news-grid,.gallery-grid,.preview-grid,.program-index",
            )
          )
            node.dataset.stagger = String(
              (Array.from(node.parentElement.children).indexOf(node) % 4) *
                motionSettings.stagger,
            );
          observer.observe(node);
        });
    };
    scan();
    const mutations = new MutationObserver((records) => {
      if (
        records.some((record) =>
          Array.from(record.addedNodes).some(
            (node) => node instanceof HTMLElement,
          ),
        )
      )
        scan();
    });
    mutations.observe(root, { childList: true, subtree: true });
    const cancel = () => {
      if (query.matches) {
        observer.disconnect();
        animations.forEach((a) => a.cancel());
      }
    };
    query.addEventListener("change", cancel);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach((a) => a.cancel());
      query.removeEventListener("change", cancel);
    };
  }, [path]);
  return null;
}
