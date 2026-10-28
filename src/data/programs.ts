import type { Program } from "@/types";
import { report } from "./report";
export const programs: Program[] = report.programs.map((p, i) => ({
  slug: ["dtde", "barcode", "berseka", "si-gaslah", "komposter"][i],
  title: p.name,
  subtitle: p.name,
  scope: "RW 12 & RW 13 · sumber PPT halaman 4",
  status: "Hasil Kelompok 7 menurut presentasi",
  description: report.attribution,
  deliverables: [
    `Target: ${p.target}`,
    `Realisasi dalam dokumen: ${p.result}`,
    `Capaian dalam dokumen: ${p.rate}`,
  ],
  activitySlugs: ["pemetaan-masyarakat"],
}));
