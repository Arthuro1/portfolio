import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Paul Arthur Meteng — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same palette as the site: deep indigo ground, ochre accent, cream text.
const INDIGO = "#2b3593";
const NIGHT = "#090d1f";
const OCHRE = "#f2b544";
const CREAM = "#f7f5ef";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `radial-gradient(circle at 20% 0%, ${INDIGO} 0%, ${NIGHT} 60%)`,
          color: CREAM,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "30px",
            color: OCHRE,
            fontWeight: 600,
            letterSpacing: "2px",
          }}
        >
          <div
            style={{
              height: "64px",
              padding: "0 14px",
              borderRadius: "14px",
              background: INDIGO,
              border: "2px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              fontSize: "24px",
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: CREAM }}>&lt;PAM/&gt;</span>
          </div>
          PAULMETENG.SPACE
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "88px", fontWeight: 800, lineHeight: 1.05 }}>Paul Arthur Meteng</div>
          <div style={{ fontSize: "44px", fontWeight: 600, color: OCHRE }}>AI Engineer</div>
        </div>

        <div style={{ fontSize: "30px", color: "#a0aacb", maxWidth: "980px" }}>
          LLM applications · RAG systems · Conversational AI · Available at short notice
        </div>
      </div>
    ),
    { ...size },
  );
}
