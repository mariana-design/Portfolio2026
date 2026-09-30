import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const archivo800 = await readFile(join(process.cwd(), "app/og-assets/archivo-800.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111111",
          color: "#f1916b",
          fontFamily: "Archivo",
          fontSize: 76,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        MB
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo800, weight: 800, style: "normal" }] }
  );
}
