import { permanentRedirect } from "next/navigation";
// The former government page is now part of the two RW profiles.
export default function GovernmentPage() {
  permanentRedirect("/profil#pengurus");
}
