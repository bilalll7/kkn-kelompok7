"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const close = () => {
      setOpen(false);
      toggle.current?.focus();
    };
    const keyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const links = panel.current?.querySelectorAll<HTMLAnchorElement>("a");
        const last = links?.[links.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          toggle.current?.focus();
        }
        if (e.shiftKey && document.activeElement === toggle.current) {
          e.preventDefault();
          last?.focus();
        }
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1024) close();
    };
    window.addEventListener("keydown", keyboard);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", keyboard);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="nav-wrap wrap">
        <Link
          href="/"
          className="brand"
          aria-label={`${site.name}, beranda`}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/images/documentation/logo.png"
            alt="Logo identitas proyek dari klien"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
          />
          <span>
            {site.shortName}
            <small>{site.brandCaption}</small>
          </span>
        </Link>
        <nav aria-label="Navigasi utama" className="desktop-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={
                (
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                )
                  ? "page"
                  : undefined
              }
              className={item.href === "/kontak" ? "nav-contact" : ""}
            >
              {item.label}
              {item.href === "/kontak" && <ArrowUpRight size={16} />}
            </Link>
          ))}
        </nav>
        <button
          className="icon-button menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <div
        id="mobile-navigation"
        className="mobile-panel"
        hidden={!open}
        ref={panel}
      >
        <nav aria-label="Navigasi seluler">
          {navigation.map((item, i) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={
                (
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                )
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              <span>0{i + 1}</span>
              {item.label}
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </nav>
        <p>{site.tagline}</p>
      </div>
    </header>
  );
}
