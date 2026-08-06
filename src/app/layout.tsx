import type { Metadata, Viewport } from "next";
import { Archivo, Fraunces } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["italic", "normal"],
  display: "swap",
});

const siteUrl = "https://wewillbe.store";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "WEWILLBE — First Collection · LEGENDS",
  description:
    "WE DON'T FOLLOW. WE BECOME. Pre-order the WEWILLBE First Collection — LEGENDS Tee and LEGENDS Hoodie. Limited. No restocks. Ships this Sunday.",
  openGraph: {
    type: "website",
    siteName: "WEWILLBE",
    title: "WEWILLBE — First Collection · LEGENDS",
    description:
      "WE DON'T FOLLOW. WE BECOME. Pre-order the First Collection — limited, no restocks, ships this Sunday.",
    url: siteUrl,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WEWILLBE — First Collection · LEGENDS",
    description:
      "WE DON'T FOLLOW. WE BECOME. Pre-order the First Collection — limited, no restocks, ships this Sunday.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#131110",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${fraunces.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "WEWILLBE",
              url: siteUrl,
              logo: `${siteUrl}/icon-512.png`,
              slogan: "We don't follow. We become.",
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
