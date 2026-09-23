import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n";

function prefersArabic(request: NextRequest): boolean {
  const header = request.headers.get("accept-language") ?? "";
  return header
    .split(",")
    .map((s) => s.split(";")[0].trim().toLowerCase())
    .some((l) => l.startsWith("ar"));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const cookie = request.cookies.get("locale")?.value;
  const locale =
    cookie === "ar" || cookie === "en" ? cookie : prefersArabic(request) ? "ar" : defaultLocale;

  const url = request.nextUrl.clone();
  if (locale === defaultLocale) {
    url.pathname = `/en${pathname === "/" ? "" : pathname}`;
    return NextResponse.rewrite(url);
  }
  url.pathname = pathname === "/" ? "/ar" : `/ar${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};