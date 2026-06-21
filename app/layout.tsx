import type { Metadata } from "next";
import { Gloock } from "next/font/google";
import { Figtree } from "next/font/google";
import "./globals.css";

const gloock = Gloock({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "DermaRoute — Intelligent Wound Routing Platform",
  description:
    "DermaRoute unifies benefits verification, insurance routing, healing tracking, and product ordering across your Wound Care, Lymphedema, and Ocular service lines.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${gloock.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
