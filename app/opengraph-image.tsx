import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mariana Benítez — Senior Product Designer & Strategist";

export default async function OpengraphImage() {
  const assets = join(process.cwd(), "app/og-assets");
  const [archivo800, archivo600, frauncesItalic] = await Promise.all([
    readFile(join(assets, "archivo-800.ttf")),
    readFile(join(assets, "archivo-600.ttf")),
    readFile(join(assets, "fraunces-500i.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "#111111",
          color: "#f2f0ec",
          fontFamily: "Archivo",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 3,
              color: "rgba(242,240,236,0.55)",
            }}
          >
            PORTFOLIO 2026 — BARCELONA
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 9999,
              background: "rgba(241,145,107,0.16)",
              color: "#f1916b",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            MB.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 104,
              fontWeight: 800,
              letterSpacing: -3,
              lineHeight: 1,
            }}
          >
            Mariana Benítez
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              marginTop: 28,
              fontSize: 42,
              fontWeight: 600,
              color: "rgba(242,240,236,0.82)",
            }}
          >
            <span style={{ marginRight: 14 }}>Senior Product</span>
            <span style={{ fontFamily: "Fraunces", fontStyle: "italic", fontWeight: 500, color: "#f1916b" }}>
              Designer &amp; Strategist
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 1,
            color: "rgba(242,240,236,0.55)",
          }}
        >
          marianabenitezcorona.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Archivo", data: archivo800, weight: 800, style: "normal" },
        { name: "Archivo", data: archivo600, weight: 600, style: "normal" },
        { name: "Fraunces", data: frauncesItalic, weight: 500, style: "italic" },
      ],
    }
  );
}
