import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Paul Arthur Meteng — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background:
            "radial-gradient(circle at 20% 0%, #1e3a8a 0%, #030712 55%)",
          color: "#f9fafb",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontSize: "30px",
            color: "#93c5fd",
            fontWeight: 600,
            letterSpacing: "2px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              background: "#1d4ed8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            P
          </div>
          PAULMETENG.SPACE
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ fontSize: "88px", fontWeight: 800, lineHeight: 1.05 }}>
            Paul Arthur Meteng
          </div>
          <div style={{ fontSize: "44px", fontWeight: 600, color: "#60a5fa" }}>
            AI Engineer
          </div>
        </div>

        <div style={{ fontSize: "30px", color: "#cbd5e1", maxWidth: "900px" }}>
          RAG systems · LLM applications · Conversational AI · Knowledge Graphs
        </div>
      </div>
    ),
    { ...size },
  );
}
