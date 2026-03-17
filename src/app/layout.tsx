import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";
import { PwaRegistrar } from "@/components/pwa-registrar";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body"
});

const displayFont = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["400", "500", "700"]
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#08111a" },
    { media: "(prefers-color-scheme: light)", color: "#08111a" }
  ]
};

export const metadata: Metadata = {
  title: "Project Totoro",
  description:
    "Многостраничный атлас климатического города: flagship-район, версии развития, три сценария климатической машины и appendix с provenance.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" }
    ],
    apple: [{ url: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" }]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Totoro Atlas"
  },
  formatDetection: {
    telephone: false
  },
  other: {
    "mobile-web-app-capable": "yes"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <a href="#main-content" className="skip-link">
          Перейти к содержимому
        </a>
        {children}
        <PwaRegistrar />
      </body>
    </html>
  );
}
