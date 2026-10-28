export type Photograph = {
  src: string;
  alt: string;
  credit: string;
  source: string;
  position?: string;
  placeholder?: boolean;
  fit?: "cover" | "contain";
};
export type ActivityCategory =
  "Kesehatan" | "Pemetaan" | "Lingkungan" | "KKN" | "Masyarakat";
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: ActivityCategory;
  date: string | null;
  location: string | null;
  image: Photograph;
  body: { heading: string; text: string }[];
  status: "Menunggu verifikasi" | "Terverifikasi";
  featured?: boolean;
};
export type Program = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  scope: string;
  status: string;
  deliverables: string[];
  activitySlugs: string[];
};
export type Potential = Program;
export type GalleryItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: Photograph;
};
export type Official = {
  role: string;
  name: string | null;
  responsibilities: string;
  tier: number;
};
export type RWProfile = {
  id: string;
  number: string;
  title: string;
  description: string;
  focus: string;
  leader: string | null;
  population: number | null;
  households: number | null;
  rtCount: number | null;
  area: string | null;
  boundaries: string | null;
  history: string | null;
  activitySlugs: string[];
};
export type Team = {
  name: string;
  university: string;
  introduction: string;
  description: string;
  period: string | null;
  supervisor: string | null;
  coordinator: string | null;
  members: { name: string; role: string; studyProgram: string | null }[];
  principles: { title: string; description: string }[];
};
