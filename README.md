# TAJELSIR / SYSTEMS

Personal portfolio and engineering write-up: software, automation, and security for real-world constraints — bilingual (EN / AR), dark, terminal-flavoured.

## Stack

- **Next.js** (App Router, RSC, statically prerendered routes)
- **TypeScript**
- **Tailwind CSS v4**
- **i18n**: `lib/i18n` (EN + AR dictionaries, full RTL support) + `lib/content` (project / lab / notes content per locale)

## Project structure

```
app/
  [lang]/        localized pages (work, lab, research, notes, about)
  icon.svg       favicon
  robots.ts      robots.txt
  sitemap.ts     sitemap.xml (all EN + AR routes)
components/      nav, footer, page-header, arch-diagram, ui primitives
lib/
  i18n/          config, dictionaries (dict = EN, ar.ts = AR)
  content/       projects, lab entries, notes (EN + AR)
proxy.ts         root-level middleware: rewrites "/" → "/en" (English-first)
```

## Routing

- Unprefixed paths (`/`, `/work/hasdo`) resolve to English.
- `/ar/...` serves the Arabic version (RTL).
- `proxy.ts` handles the `/ → /en` rewrite; language toggle links between the two locales.

## Scripts

```bash
npm run dev       # development server on :3000
npm run build     # production build
npm run start     # serve the production build
npx tsc --noEmit  # type-check
```

## Deployment

Deployed on Vercel. Canonical/OG URLs currently use the preview domain —
update `app/robots.ts`, `app/sitemap.ts`, and `app/[lang]/layout.tsx` (metadataBase)
when a custom domain is attached.

## TODO

- **Analytics**: none yet — add Vercel Analytics or Plausible when credentials are available.