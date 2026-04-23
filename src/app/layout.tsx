import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { tv } from "tailwind-variants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Population by Country",
  description: "Population with race chart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { html, body } = ROOT_LAYOUT_VARIANTS();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${html()}`}
    >
      <body className={body()}>{children}</body>
    </html>
  );
}

const ROOT_LAYOUT_VARIANTS = tv({
  slots: {
    html: ["h-full", "antialiased"],
    body: ["min-h-full", "flex", "flex-col"],
  },
});
