import Link from "next/link";
import Image from "next/image";
import { Instagram } from "@/components/instagram";
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
                alt="Logo KKN Berdampak Kelompok 7"
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
            <p>Ikuti kegiatan kami melalui Instagram.</p>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagram.username} (tab baru)`} className="text-link light">
              <Instagram size={18} aria-hidden="true" />
              <span>{site.instagram.username}</span>
            </a>
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
