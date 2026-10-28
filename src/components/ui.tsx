import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Photograph } from "@/types";

export function Photo({
  image,
  className = "",
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  image: Photograph;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{
          objectFit: image.fit || "cover",
          objectPosition: image.position || "center",
        }}
      />
      {image.placeholder && (
        <span className="photo-notice">
          Foto ilustrasi · bukan Sadang Serang
        </span>
      )}
    </div>
  );
}
export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`text-link ${light ? "light" : ""}`}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function SectionLabel({
  children,
  number,
}: {
  children: React.ReactNode;
  number?: string;
}) {
  return (
    <p className="eyebrow">
      {number && <span className="section-number">{number}</span>}
      {children}
    </p>
  );
}
export function PageHeader({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent?: string;
  description: string;
}) {
  return (
    <header className="page-header wrap">
      <SectionLabel>{label}</SectionLabel>
      <h1>
        {title}
        {accent && (
          <>
            <br />
            <em>{accent}</em>
          </>
        )}
      </h1>
      <p className="lead">{description}</p>
    </header>
  );
}
export function SampleNote({
  children = "Informasi rinci menunggu konfirmasi tim dan pengurus wilayah.",
}: {
  children?: React.ReactNode;
}) {
  return (
    <p className="sample-note">
      <span aria-hidden="true" />
      {children}
    </p>
  );
}
