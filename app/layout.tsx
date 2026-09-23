import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TAJELSIR / SYSTEMS",
  description:
    "Software engineer building practical systems, automation and security-oriented software. Based in Khartoum, Sudan.",
  metadataBase: new URL("https://github.com/Raztaj"),
  openGraph: {
    title: "TAJELSIR / SYSTEMS",
    description:
      "Software engineer building practical systems, automation and security-oriented software.",
    url: "https://github.com/Raztaj",
    siteName: "TAJELSIR / SYSTEMS",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-bg text-fg font-sans">
        <Cursor />
        {children}
      </body>
    </html>
  );
}