import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces, Inter } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.marianabenitezcorona.com"),
  title: "Mariana Benítez — Senior Product Designer & Strategist",
  description:
    "Portfolio of Mariana Benítez, Senior Product Designer & Strategist based in Barcelona.",
  openGraph: {
    title: "Mariana Benítez — Senior Product Designer & Strategist",
    description:
      "Portfolio of Mariana Benítez, Senior Product Designer & Strategist based in Barcelona.",
    url: "https://www.marianabenitezcorona.com",
    siteName: "Mariana Benítez",
    images: ["/opengraph-image"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mariana Benítez — Senior Product Designer & Strategist",
    description:
      "Portfolio of Mariana Benítez, Senior Product Designer & Strategist based in Barcelona.",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <div className="brand-loader" aria-hidden>
          <span>MB.</span>
        </div>
        {children}
      </body>
    </html>
  );
}
