import { IntroLogo } from "@/components/motion/IntroLogo";
import { ScrollTools } from "@/components/motion/ScrollTools";
import type { Metadata } from "next";
import { Manrope, DM_Sans, Instrument_Serif } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/utils";
import "./globals.css";
import { ScrollReveals } from "@/components/motion/ScrollReveals";
const heading = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    locale: "id_ID",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body
        className={`${heading.variable} ${body.variable} ${editorial.variable}`}
      >
        <a href="#main-content" className="skip-link">
          Lewati ke konten utama
        </a>
        <IntroLogo />
        <Header />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <ScrollReveals />
        <ScrollTools />
        <Footer />
      </body>
    </html>
  );
}
