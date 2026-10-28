import { ImageResponse } from "next/og";
import { site } from "@/data/site";
export const alt = `${site.name} · ${site.group} UNIKOM`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#1f3028",
        color: "#f7f6f2",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", fontSize: 25, letterSpacing: 4 }}>
        {site.name.toUpperCase()}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 72,
          lineHeight: 1.15,
        }}
      >
        <span>Bergerak Bersama,</span>
        <span>Bertumbuh Bersama.</span>
      </div>
      <div style={{ display: "flex", fontSize: 20 }}>
        {site.brandCaption} · {site.location}
      </div>
    </div>,
    size,
  );
}
