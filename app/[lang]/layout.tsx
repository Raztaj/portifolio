import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Noto_Kufi_Arabic } from "next/font/google";
import type { Locale } from "@/lib/i18n";
import { isLocale, getLocaleDir, getDictionary } from "@/lib/i18n";
import "../globals.css";
import Cursor from "@/components/cursor";
import { site } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const kufi = Noto_Kufi_Arabic({
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
    metadataBase: new URL(site.origin),
    openGraph: {
      title: "TAJELSIR / SYSTEMS",
      description: dict.metadata.ogDescription,
      url: site.origin,
      siteName: "TAJELSIR / SYSTEMS",
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
      images: [
        {
          url: locale === "ar" ? "/social-og-ar.png" : "/social-og.png",
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
      images: [locale === "ar" ? "/social-og-ar.png" : "/social-og.png"],
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
      className={`${manrope.variable} ${jetbrains.variable} ${kufi.variable} antialiased`}
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