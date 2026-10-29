import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { members, team } from "@/data/team";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { SectionLabel } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return members.map(({slug}) => ({slug})); }
export async function generateMetadata({params}: Props) {
 const {slug}=await params;
 const member=members.find(m=>m.slug===slug);
 if(!member) notFound();
 return pageMetadata(member.name, `${member.name}, ${member.position} Divisi ${member.division}, ${team.name} UNIKOM di Sadang Serang. ${member.studyProgram}.`, `/tentang/anggota/${slug}`);
}
export default async function MemberPage({params}: Props) {
 const {slug}=await params;
 const index=members.findIndex(m=>m.slug===slug);
 if(index<0) notFound();
 const member=members[index];
 const previous=members[(index-1+members.length)%members.length];
 const next=members[(index+1)%members.length];
 return <div className="wrap section member-page">
  <nav className="member-breadcrumb" aria-label="Breadcrumb"><Link href="/">Beranda</Link><span aria-hidden="true">/</span><Link href="/tentang">Tentang Kami</Link><span aria-hidden="true">/</span><span aria-current="page">{member.name}</span></nav>
  <section className="member-profile" data-reveal="fade">
   <div className="portrait-frame member-portrait"><Image src={member.image} alt={member.imageAlt} fill priority sizes="(max-width: 767px) 90vw, 40vw" /></div>
   <div className="member-copy">
    <SectionLabel>{team.name} · Divisi {member.division}</SectionLabel>
    <h1>{member.name}</h1><p className="lead">{member.position}</p>
    <h2>Informasi akademik</h2>
    <dl className="detail-list">{[["NIM",member.nim],["Program studi",member.studyProgram],["Perguruan tinggi",site.university]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    <h2>Perjalanan KKN</h2>
    <dl className="detail-list">{[["Program","KKN Berdampak"],["Wilayah",site.location],["Periode",team.period],["Divisi",member.division],["Jabatan",member.position]].map(([label,value])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   </div>
  </section>
  <nav className="member-navigation" aria-label="Navigasi anggota"><Link href={`/tentang/anggota/${previous.slug}`}>← Sebelumnya<span>{previous.name}</span></Link><Link href="/tentang#anggota">Semua anggota</Link><Link href={`/tentang/anggota/${next.slug}`}>Berikutnya →<span>{next.name}</span></Link></nav>
 </div>;
}
