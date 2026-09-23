import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "hasdo",
    index: "01",
    kind: "FIELD SYSTEM",
    title: "HASDO",
    year: "2025",
    status: "ACTIVE",
    description:
      "Arabic-first humanitarian platform with an interactive map of Sudan and a full admin content system.",
    tagline:
      "A field platform for humanitarian work — Arabic-first, map-first, manageable by a small NGO team.",
    stack: [
      "Next.js 15",
      "Supabase",
      "d3-geo",
      "TypeScript",
      "PostgreSQL",
      "IBM Plex Sans Arabic",
    ],
    links: [],
    problem: [
      "Most NGO sites are static brochures in English. The staff here work in Arabic, on the ground.",
      "Sudan is the subject — the map is the content, not a decoration.",
      "Content has to be updated by non-developers: projects, stories, resources, partners.",
      "The whole thing has to run on a free tier, because the budget is zero.",
    ],
    constraints: [
      { id: "ARABIC", label: "ARABIC-FIRST" },
      { id: "RTL", label: "FULL RTL" },
      { id: "MAP", label: "MAP AS CONTENT" },
      { id: "CMS", label: "NON-TECH ADMIN" },
      { id: "COST", label: "ZERO COST" },
      { id: "REACH", label: "AMMON / LOW-BANDWIDTH" },
    ],
    architectureIntro:
      "One Supabase project, two surfaces. The public site reads through an anon key; the admin panel writes through a server-only service role.",
    architectureNodes: [
      { id: "public", label: "PUBLIC SITE", sub: "Arabic RTL · 9 pages" },
      { id: "map", label: "SUDAN MAP", sub: "d3-geo · OCHA COD-AB" },
      { id: "admin", label: "ADMIN PANEL", sub: "login · CMS sections" },
      { id: "supabase", label: "SUPABASE", sub: "Postgres + Auth + RLS" },
    ],
    architectureEdges: [
      { from: "public", to: "supabase" },
      { from: "map", to: "public" },
      { from: "admin", to: "supabase" },
    ],
    decisions: [
      {
        title: "Why Supabase instead of a custom API?",
        body: "RLS policies, email auth, and a Postgres schema came free. The anon key lets the public site read safely; the service role stays server-only. No backend to maintain.",
      },
      {
        title: "Why Arabic-first?",
        body: "The audience reads Arabic. Building the layout RTL-first instead of translating a LTR site afterward means no mirrored galleries, no broken punctuation, no English-shaped components.",
      },
      {
        title: "Why OCHA COD-AB data for the map?",
        body: "Authoritative, open, and already maintained. A script prepares the GeoJSON into clean state and locality polygons served locally — no map API dependency at runtime.",
      },
      {
        title: "Why a demo-data fallback?",
        body: "The site must render before Supabase is wired. A data layer with placeholder content means a developer can open the repo and see the full design instantly.",
      },
      {
        title: "What changes at 100k visitors?",
        body: "The map GeoJSON and pages are static-exportable. Reads become cached; only the admin writes stay dynamic. RLS is already there — the shape survives.",
      },
    ],
    tradeoffs: [
      { decision: "Arabic-first", cost: "English content was deprioritized" },
      {
        decision: "Free tier (Supabase + Vercel)",
        cost: "Row limits, manual backups",
      },
      {
        decision: "Public anon reads",
        cost: "Aggressive RLS needed on every table",
      },
      {
        decision: "Centered on admin CMS",
        cost: "Content edits require connectivity",
      },
    ],
    security: {
      note: "Secrets stay out of the client. The anon key is public by design; everything sensitive is server-side.",
      threatModel: [
        "Public reads against private rows",
        "Service-role key exposure",
        "Admin account takeover",
        "Content tampering via public routes",
      ],
      mitigation: [
        "Row-level security on every table",
        "Service role used only in server code",
        "Supabase email auth + secured admin routes",
        "Read-only anon access pattern",
      ],
    },
    whatsBroken: [
      {
        assumption: "The first implementation assumed demo data would be swapped for live data with a config change.",
        failure:
          "Live Supabase wiring showed the data layer had to be env-aware everywhere, not just at the top.",
        solution:
          "A single data module with an env gated live/demo fallback, so the site stays renderable without a database.",
      },
      {
        assumption: "The map counts and the admin-entered project counts were independent.",
        failure:
          "State numbers disagreed, and nobody had a single source of truth.",
        solution:
          "Derive map-visible projects and list counts from one query path, then assert agreement in CI-ish checks.",
      },
      {
        assumption: "Arabic rendering would just work once the lang attribute was set.",
        failure:
          "Typos, line-height, pluralization, and a mobile menu all needed a dedicated Arabic pass.",
        solution: "A full RTL review pass over copy, spacing, and navigation.",
      },
    ],
    result: [
      { label: "STATUS", value: "ACTIVE" },
      { label: "LANGUAGE", value: "ARABIC / RTL" },
      { label: "MAP", value: "18 STATES" },
      { label: "LOCALITIES", value: "KHARTOUM / 7" },
      { label: "CMS", value: "PROJECTS · STORIES" },
      { label: "AUDIENCE", value: "PUBLIC + ADMIN" },
    ],
    media: [
      {
        src: "/work/hasdo/map.jpg",
        alt: "HASDO interactive Sudan map",
        caption: "INTERACTIVE SUDAN MAP — d3-GEO · OFFLINE OCHA GEOJSON",
      },
      {
        src: "/work/hasdo/home.jpg",
        alt: "HASDO Arabic RTL home page",
        caption: "ARABIC-FIRST HOME — FULL RTL · IBM PLEX SANS ARABIC",
      },
      {
        src: "/work/hasdo/projects.jpg",
        alt: "HASDO projects directory",
        caption: "PROJECTS DIRECTORY — CONTENT FROM THE ADMIN CMS",
      },
      {
        src: "/work/hasdo/login.jpg",
        alt: "HASDO admin login",
        caption: "ADMIN GATE — EMAIL AUTH · SECURED ROUTES",
      },
    ],
  },
  {
    slug: "easily",
    index: "02",
    kind: "WEB SYSTEM",
    title: "EASILY",
    year: "2026",
    status: "ACTIVE",
    description:
      "Event ticketing and gate check-in: QR tickets, camera scanning, role-gated dashboards, atomic check-in.",
    tagline:
      "Event entry, reduced to a camera and a QR code — with an atomic check-in that survives two scanners at once.",
    stack: [
      "Next.js 16",
      "Supabase",
      "qrcode",
      "html5-qrcode",
      "jsPDF",
      "xlsx",
      "TypeScript",
    ],
    links: [],
    problem: [
      "Guest lists at the gate are printed sheets — slow, and easy to exploit.",
      "Two scanners checking the same ticket should not both let the person in.",
      "Tickets had to be generateable in bulk, printed as PDFs, and resendable in seconds.",
      "The team that runs it is not an engineering team. Every screen has to be obvious.",
    ],
    constraints: [
      { id: "QR", label: "QR TICKETS" },
      { id: "CAMERA", label: "CAMERA CHECK-IN" },
      { id: "ROLES", label: "3 ROLES" },
      { id: "ATOMIC", label: "ATOMIC SCAN" },
      { id: "BULK", label: "BULK IMPORT" },
      { id: "COST", label: "ZERO COST" },
    ],
    architectureIntro:
      "One scan endpoint does the whole check-in atomically. Dashboards read the same tables through RLS-scoped roles.",
    architectureNodes: [
      { id: "scanner", label: "SCANNER", sub: "html5-qrcode · camera" },
      { id: "scan", label: "/API/SCAN", sub: "atomic check-in" },
      { id: "supabase", label: "SUPABASE", sub: "Postgres + RLS" },
      { id: "dashboard", label: "DASHBOARD", sub: "master / staff / scanner" },
      { id: "tickets", label: "TICKETS", sub: "QR · PDF · bulk XLSX" },
    ],
    architectureEdges: [
      { from: "scanner", to: "scan" },
      { from: "scan", to: "supabase" },
      { from: "dashboard", to: "tickets" },
      { from: "tickets", to: "supabase" },
    ],
    decisions: [
      {
        title: "Why an atomic scan endpoint?",
        body: "Check-in is a state transition, not a read. The endpoint decrements and returns the result in one database operation so two concurrent scanners cannot double-enter the same ticket.",
      },
      {
        title: "Why SQL GET DIAGNOSTICS?",
        body: "Counting returned rows is racy. Reading the affected-row count from GET DIAGNOSTICS inside the same statement gives a definitive answer about whether this scanner transitioned the state.",
      },
      {
        title: "Why QR tickets with PNG + PDF export?",
        body: "Gate teams need something printable and sendable. QR PNGs go out over WhatsApp; a multi-page PDF covers bulk printing before the event.",
      },
      {
        title: "Why role-gated dashboards?",
        body: "Master admin, staff, and scanners have different powers. Route and row-level checks keep the janitor from revoking tickets.",
      },
      {
        title: "Why immutable activity logs?",
        body: "A log that can be written over is a billboard. Database triggers forbid UPDATE and DELETE — the audit trail is append-only by construction.",
      },
    ],
    tradeoffs: [
      {
        decision: "QR as the single entry token",
        cost: "Screenshots can be forwarded — fine for staffed internal events",
      },
      {
        decision: "Atomic check-in via GET DIAGNOSTICS",
        cost: "More subtle SQL than a plain COUNT",
      },
      {
        decision: "Immutable logs",
        cost: "No silent deletions — cleanup is restricted to unused tickets",
      },
      {
        decision: "Free tier",
        cost: "Row/bandwidth ceilings on very large events",
      },
    ],
    security: {
      note: "This project genuinely warrants a threat model — it authorizes physical entry.",
      threatModel: [
        "Same ticket checked by two scanners",
        "Unused tickets fraudulently reused",
        "Unauthorized users reaching admin pages",
        "Tampering with the audit log",
      ],
      mitigation: [
        "Atomic check-in transition",
        "Check-in marks the ticket used",
        "Role-gated routes + RLS",
        "Immutable activity_logs via triggers",
      ],
    },
    whatsBroken: [
      {
        assumption: "The scan endpoint assumed it could count updated rows with RETURNING COUNT(*).",
        failure:
          "Under two concurrent scanners the count came back wrong — both reads raced.",
        solution:
          "Switched to GET DIAGNOSTICS so the affected-row count is decided inside the atomic statement.",
      },
      {
        assumption: "Auth would settle once. It didn't.",
        failure:
          "Went from full client-side auth to a proxy with cookies, then Next 16 changed the boundary again.",
        solution:
          "A clean client-side auth flow with the dashboard layout enforcing session checks.",
      },
      {
        assumption: "The reset function could count affected rows the easy way.",
        failure:
          "The naive count approach returned unreliable numbers in the same race.",
        solution:
          "Moved to GET DIAGNOSTICS in the reset path too — one consistent pattern.",
      },
    ],
    result: [
      { label: "STATUS", value: "ACTIVE" },
      { label: "CHECK-IN", value: "ATOMIC" },
      { label: "ROLES", value: "3" },
      { label: "LOGS", value: "IMMUTABLE" },
      { label: "TICKETS", value: "QR + PDF" },
      { label: "IMPORT", value: "XLSX" },
    ],
    media: [
      {
        src: "/work/easily/login.jpg",
        alt: "EASILY sign-in screen",
        caption: "SIGN-IN — THE ENTRY TO THE TICKETING CONSOLE",
      },
    ],
  },
  {
    slug: "darthvader",
    index: "03",
    kind: "SECURITY TOOLING",
    title: "DARTHVADER",
    year: "2025",
    status: "ACTIVE",
    description:
      "Reconnaissance CLI that automates discovery and layered security checks with scope enforcement first.",
    tagline:
      "Automated reconnaissance that treats authorization as a first-class control — quiet where it should be quiet.",
    stack: ["Python", "Bash", "HTTP/DNS/TLS", "CLI"],
    links: [],
    problem: [
      "Scanning tools come by default as noise machines — loud, unthrottled, and happy to hit anything.",
      "Authorization is usually a flag you pass, not a control the tool itself enforces.",
      "Findings die as terminal output — nothing survives for a report or a retest.",
      "Verifying a fix means re-running the same scan and eyeballing the diff.",
    ],
    constraints: [
      { id: "SCOPE", label: "SCOPE-FIRST" },
      { id: "QUIET", label: "QUIET BY DEFAULT" },
      { id: "EVIDENCE", label: "EVIDENCE AT SCAN TIME" },
      { id: "REPORTS", label: "REPORT GENERATION" },
      { id: "RETEST", label: "SCAN COMPARISON" },
      { id: "SANDBOX", label: "SANDBOXED RUN" },
    ],
    architectureIntro:
      "A single CLI pipeline. Scope gates every phase, each check class emits structured evidence, and results feed risk scoring and reports.",
    architectureNodes: [
      { id: "target", label: "TARGET", sub: "authorized scope" },
      { id: "scope", label: "SCOPE CHECK", sub: "gate · refuse out of bounds" },
      { id: "discovery", label: "DISCOVERY", sub: "hosts · subdomains · ports" },
      { id: "checks", label: "LAYERED CHECKS", sub: "DNS · TLS · HTTP · API/CMS" },
      { id: "evidence", label: "EVIDENCE", sub: "findings → report" },
    ],
    architectureEdges: [
      { from: "target", to: "scope" },
      { from: "scope", to: "discovery" },
      { from: "discovery", to: "checks" },
      { from: "checks", to: "evidence" },
    ],
    decisions: [
      {
        title: "Why scope enforcement first?",
        body: "A scanner pointed at the wrong host is a liability. Target definitions are checked at every phase, and out-of-bounds actions report an authorization refusal, not a result.",
      },
      {
        title: "Why quiet by default?",
        body: "Noise is a risk, not a feature — loud tools get ignored and can burn an engagement. The default profile is deliberate and throttled, so attention stays on evidence.",
      },
      {
        title: "Why evidence at scan time?",
        body: "The state is in front of the tool exactly once. Collecting evidence then — headers, responses, anomalies — beats reconstructing it later from memory or logs.",
      },
      {
        title: "Why layered checks instead of one scanner?",
        body: "DNS, TLS, HTTP, and API posture fail in different ways. Class-based modules run independently with a stable schema, so one broken phase can't cascade.",
      },
      {
        title: "Why scan comparison and retest?",
        body: "A fix is only verified when the same check reports a lower risk score against a stored snapshot — comparison is the difference between patched and believed patched.",
      },
    ],
    tradeoffs: [
      { decision: "Quiet, throttled by default", cost: "Slower across large attack surfaces" },
      { decision: "Evidence-first collection", cost: "Disk and schema overhead per scan" },
      { decision: "Scope as a hard gate", cost: "Operators must define targets precisely" },
      { decision: "Local sandboxed execution", cost: "No cloud orchestrator out of the box" },
    ],
    security: {
      note: "The tool is a liability if it forgets consent. Every phase re-checks scope; nothing interactive is built in.",
      threatModel: [
        "Scanning outside authorized scope",
        "Crossing from informational to disruptive checks",
        "Findings or reports leaking to unintended readers",
        "The tool being repurposed as a foothold",
      ],
      mitigation: [
        "Scope check gates every phase and refuses out-of-bounds targets",
        "Read-only, non-invasive checks by default",
        "Redaction and local-only report storage",
        "No interactive reverse-shell primitives; sandboxed execution",
      ],
    },
    whatsBroken: [
      {
        assumption: "earlier recon was a bash one-liner against a live host",
        failure:
          "No record survived — rerunning meant re-hammering the same target from scratch.",
        solution:
          "Evidence collection and persisted snapshots at scan time, so a retest compares against a real baseline.",
      },
      {
        assumption: "scope would be a launch flag",
        failure:
          "A flag is a suggestion — the tool happily scanned anything it was pointed at.",
        solution:
          "A hard scope gate evaluated per phase; refusals report authorization, not results.",
      },
      {
        assumption: "more checks always means more clarity",
        failure:
          "Parallel checks produced noisy, hard-to-compare output and louder traffic.",
        solution:
          "Class-based sequential checks with a stable schema and comparison-friendly output.",
      },
    ],
    result: [
      { label: "STATUS", value: "ACTIVE" },
      { label: "SCOPE", value: "HARD GATE" },
      { label: "CHECKS", value: "DNS · TLS · HTTP" },
      { label: "EVIDENCE", value: "STURDY REPORTS" },
      { label: "RETEST", value: "SNAPSHOTS" },
      { label: "CONDUCT", value: "QUIET" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}