import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://malikbello.is-a.dev"),
  title: "Malik Pelumi Bello — AI/ML Engineer & Researcher",
  description:
    "Turning uncertainty into advantage through data, models, and judgment. AI/ML Engineer at Wema Bank Plc — machine learning, GenAI systems, and applied research.",
  openGraph: {
    title: "Malik Pelumi Bello — AI/ML Engineer & Researcher",
    description:
      "Turning uncertainty into advantage through data, models, and judgment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${mono.variable}`}>
      <body className="bg-brand-bg text-brand-text antialiased">
        {children}
      </body>
    </html>
  );
}
