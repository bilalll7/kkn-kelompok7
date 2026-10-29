"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const sessionKey = "kkn-intro-seen";
export function IntroLogo() {
  const overlay = useRef<HTMLDivElement>(null);
  const path = usePathname();
  useEffect(() => {
    const node = overlay.current;
    if (!node) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    try {
      if (sessionStorage.getItem(sessionKey)) return;
    } catch {
      // Storage can be unavailable in private browsing; the intro still expires.
    }
    node.hidden = false;
    const dismiss = () => {
      node.hidden = true;
      try { sessionStorage.setItem(sessionKey, "1"); } catch { /* Storage is optional. */ }
    };
    const timer = window.setTimeout(dismiss, 1500);
    motion.addEventListener("change", dismiss);
    // Never obscure a visitor who starts interacting immediately.
    window.addEventListener("keydown", dismiss);
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("wheel", dismiss, {passive:true});
    window.addEventListener("touchstart", dismiss, {passive:true});
    return () => {
      clearTimeout(timer);
      // Strict Mode replays setup/cleanup; cleanup must not mark the intro seen.
      node.hidden = true;
      motion.removeEventListener("change", dismiss);
      window.removeEventListener("keydown", dismiss);
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, [path]);
  return <div ref={overlay} hidden className="intro-logo" aria-hidden="true">
    <div className="intro-logo-mark">
      <Image src="/images/documentation/logo.png" alt="" width={144} height={144} priority />
      <span className="intro-logo-line" />
    </div>
  </div>;
}
