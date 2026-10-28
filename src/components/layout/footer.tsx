import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import { navigation } from "@/data/navigation";
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <Link href="/" className="brand">
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
            <p>{site.tagline}</p>
          </div>
          <nav aria-label="Navigasi footer">
            {navigation.slice(1).map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="footer-contact">
            <span className="eyebrow">MARI TERHUBUNG</span>
            <p>{site.email || "Kontak resmi segera dilengkapi."}</p>
            <Link href="/kontak" className="text-link light">
              Informasi kontak <ArrowUpRight size={16} />
            </Link>
            {site.socialLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}.
          </span>
          <span>
            {site.group} · {site.university}
          </span>
        </div>
        <p className="footer-disclaimer">{site.contentNotice}</p>
      </div>
    </footer>
  );
}
