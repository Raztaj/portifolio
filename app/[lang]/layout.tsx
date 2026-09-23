import type { Metadata } from "next";
import { Inter, JetBrains_Mono, IBM_Plex_Sans_Arabic } from "next/font/google";
import type { Locale } from "@/lib/i18n";
import { isLocale, getLocaleDir, getDictionary } from "@/lib/i18n";
import "../globals.css";
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

const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dict = getDictionary(locale);
  return {
    title: "TAJELSIR / SYSTEMS",
    description: dict.metadata.description,
    metadataBase: new URL("https://portifolio-pink-gamma.vercel.app"),
    openGraph: {
      title: "TAJELSIR / SYSTEMS",
      description: dict.metadata.ogDescription,
      url: "https://portifolio-pink-gamma.vercel.app",
      siteName: "TAJELSIR / SYSTEMS",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
      images: [
        {
          url: "/social-og.png",
          width: 1080,
          height: 1080,
          alt: "TAJELSIR / SYSTEMS — software for real-world constraints",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "TAJELSIR / SYSTEMS",
      description: dict.metadata.ogDescription,
      images: ["/social-og.png"],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang = "en" } = (await params) ?? {};
  const locale: Locale = isLocale(lang) ? lang : "en";
  const dir = getLocaleDir(locale);
  const layoutDict = getDictionary(locale);
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${jetbrains.variable} ${plexArabic.variable} antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-bg text-fg font-sans">
        <Cursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tajelsir Khalid",
              url: "https://portifolio-pink-gamma.vercel.app",
              jobTitle: "Software Engineer",
              description:
                layoutDict.metadata.description,
              email: "mailto:tsgo132@gmail.com",
              knowsAbout: ["Software engineering", "Automation", "Application security"],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}