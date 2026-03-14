import type { Metadata } from "next";
import { Manrope, Unbounded } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Project Totoro",
  description:
    "Многостраничный атлас климатического города: flagship-район, версии развития, три сценария климатической машины и appendix с provenance.",
  icons: {
    icon: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>{children}</body>
    </html>
  );
}
