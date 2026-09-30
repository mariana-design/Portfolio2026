import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
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
          borderRadius: "50%",
          color: "#f1916b",
          fontFamily: "Archivo",
          fontSize: 28,
          fontWeight: 800,
          letterSpacing: -1,
        }}
      >
        MB
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: archivo800, weight: 800, style: "normal" }] }
  );
}
