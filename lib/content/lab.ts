export type LabCategory = "SECURITY" | "AUTOMATION" | "SYSTEMS" | "RESEARCH";

export type LabStatus = "ACTIVE" | "RESOLVED" | "PROTOTYPE" | "EXPERIMENT" | "RESEARCH";

export interface LabEntry {
  slug: string;
  index: string;
  category: LabCategory;
  tag: string;
  name: string;
  stack: string[];
  status: LabStatus;
  year: string;
  question: string;
  why: string;
  approach: string[];
  flow?: string[];
  result?: string;
  learned?: string[];
  note?: string;
}

export const labEntries: LabEntry[] = [
  {
    slug: "darthvader",
    index: "01",
    category: "SECURITY",
    tag: "SECURITY TOOLING",
    name: "DARTHVADER",
    stack: ["Python", "Bash", "HTTP/DNS/TLS"],
    status: "ACTIVE",
    year: "2025",
    question:
      "Can reconnaissance and security checks be automated without turning the scanner into a noisy hammer?",
    why: "Most scanning tools scream at everything. I wanted a CLI that walks an authorized target methodically, collects evidence, and reports — quiet where it should be quiet.",
    approach: [
      "Attack-surface discovery: enumerate hosts, subdomains, ports.",
      "Layered checks: DNS, TLS, HTTP, API and auth posture, CMS fingerprints.",
      "Evidence collection with findings that survive a report — not just output.",
      "Scope enforcement so the tool refuses to go where it wasn't authorized.",
      "Scan comparison, retesting, and monitoring so a fix can be verified.",
      "Risk scoring, report generation, safe from within its own sandbox.",
    ],
    flow: [
      "TARGET → SCOPE CHECK → DISCOVERY",
      "           └→ DNS / TLS / HTTP",
      "           └→ API / AUTH / CMS",
      "           └→ EVIDENCE → FINDINGS → REPORT",
    ],
    result:
      "A working reconnaissance CLI that treats authorization as a first-class control, not an afterthought.",
    learned: [
      "Noise is a risk, not a feature. Loud tools get ignored.",
      "Evidence collected at scan time beats recon later.",
      "Scope enforcement is the difference between a tool and a liability.",
    ],
  },
  {
    slug: "web-scanner",
    index: "02",
    category: "SECURITY",
    tag: "SECURITY / CONCURRENCY",
    name: "WEB-SCANNER",
    stack: ["Python", "threading", "HTTP"],
    status: "PROTOTYPE",
    year: "2025",
    question:
      "Where does concurrent scanning outpace serial, and where does concurrency start creating problems?",
    why: "The obvious win is speed. The messy question is where parallelism stops helping and starts breaking the client, the target, and the results.",
    approach: [
      "Serial baseline scanner with timing on each check class.",
      "Threaded version with a connection budget and per-host limits.",
      "Measured throughput, error rate, and result stability as workers grew.",
      "Compared against the serial baseline on the same targets.",
    ],
    flow: ["REQUEST → WORKERS → RESPONSES", "      ↕", "SERIAL     vs     THREADED"],
    result:
      "A prototype showing real speedups — and the point where threads began colliding on rate limits and connection pools.",
    learned: [
      "Concurrency is a dimension with diminishing returns, not a free multiplier.",
      "Rate-limited endpoints punish parallel clients; polite throttling wins.",
      "The engineering story is the measurement, not the speed itself.",
    ],
  },
  {
    slug: "isnaad-database",
    index: "03",
    category: "SYSTEMS",
    tag: "DATA SYSTEM",
    name: "ISNAAD DATABASE SYSTEM",
    stack: ["Python", "SQL", "Excel", "local infrastructure"],
    status: "ACTIVE",
    year: "2024",
    question:
      "Can a spreadsheet-heavy workflow survive as a local database across multiple PCs?",
    why: "Beneficiary management was living in Excel files moving over Flash drives and WhatsApp. It needed search, filtering, reporting, and backups — without a server.",
    approach: [
      "Local database with entry, search, and filtering replacing the master sheet.",
      "Reports and import/export that stay compatible with the existing Excel world.",
      "Backups built in, because 'it was on the thumb drive' is not a backup.",
      "Multi-PC local operation — each machine offline-capable, one source of truth.",
    ],
    result:
      "A data workflow that replaced spreadsheet chaos while keeping Excel as the interchange format.",
    learned: [
      "Local-first beats cloud when the office has no reliable internet.",
      "Migrating data matters more than migrating features.",
      "Backup is a feature users will not ask for and will blame you for omitting.",
    ],
  },
  {
    slug: "crm-automation",
    index: "04",
    category: "AUTOMATION",
    tag: "AUTOMATION",
    name: "CRM AUTOMATION",
    stack: ["Python"],
    status: "PROTOTYPE",
    year: "2024",
    question:
      "How much of relationship management is just follow-up — and can it be automated without feeling automated?",
    why: "A huge fraction of CRM work is the same follow-up loop. I wanted to see how much of the loop could be handled without making the contact feel like a number.",
    approach: [
      "Email follow-ups scheduled and personalized by simple state rules.",
      "Data entry captured once instead of retyped into three places.",
      "Lead management: stages, last-touch dates, and next-action queues.",
    ],
    result:
      "A compact automation layer that removed the repetitive middle of the lead workflow.",
    learned: [
      "Automation should remove keystrokes, not humanity.",
      "The state machine of a lead is more useful than a long notes field.",
    ],
  },
  {
    slug: "whatsapp-webjs",
    index: "05",
    category: "AUTOMATION",
    tag: "MESSAGING AUTOMATION",
    name: "WHATSAPP-WEB.JS",
    stack: ["Node.js", "whatsapp-web.js", "LocalAuth"],
    status: "PROTOTYPE",
    year: "2025",
    question:
      "Can an unofficial client carry a production-feeling assistant, and where does it start to leak?",
    why: "Before committing to any API, I tested the unofficial path: QR auth, local sessions, and real message routing.",
    approach: [
      "QR authentication with persistent LocalAuth sessions.",
      "Arabic greeting detection and Arabic-number normalization.",
      "Randomized menus, realistic typing delays, and routing rules.",
      "Error handling around session drops and paired-device limits.",
    ],
    flow: ["WHATSAPP", "  ↓ (unofficial client)", "BOT", "  ↓ routing", "HANDLER / HUMAN"],
    learned: [
      "Unofficial clients work until they don't — session tos and breakage risk are real.",
      "The comparison that mattered was official API vs unofficial client (see next entry).",
    ],
    note: "Prototype built for learning. Production messaging deserves the official path.",
  },
  {
    slug: "whatsapp-business-api",
    index: "06",
    category: "AUTOMATION",
    tag: "MESSAGING AUTOMATION",
    name: "WHATSAPP BUSINESS API",
    stack: ["Node.js", "Express", "Meta Graph API"],
    status: "PROTOTYPE",
    year: "2025",
    question:
      "What changes when you automate messaging through the official API instead of an unofficial client?",
    why: "The counter-experiment to whatsapp-web.js: webhooks, Meta Graph API credentials, and message templates instead of a logged-in browser session.",
    approach: [
      "Express webhook receiver for inbound messages.",
      "Message routing and a database for state across conversations.",
      "Human handoff for the moments automation should stop.",
      "Templates and temporary credentials per Meta's model.",
    ],
    flow: ["USER → META GRAPH API → WEBHOOK → ROUTER", "              ↘ DB ↩", "              ↘ HUMAN HANDOFF"],
    result:
      "A second approach to the same problem — official architecture versus unofficial client — built side by side.",
    learned: [
      "Official APIs trade convenience for stability and compliance.",
      "Template constraints shape the UX before you write a line of bot logic.",
      "The right answer depends on the risk the business can carry.",
    ],
  },
  {
    slug: "university-disclosure",
    index: "07",
    category: "SECURITY",
    tag: "RESPONSIBLE DISCLOSURE",
    name: "UNIVERSITY DISCLOSURE",
    stack: ["recon", "reporting"],
    status: "RESOLVED",
    year: "2025",
    question:
      "What does responsible disclosure actually demand after the finding?",
    why: "A university system exposed its configuration — a publicly reachable .env carrying database credentials, with MySQL/phpMyAdmin exposed.",
    approach: [
      "Documented exposure: public .env, leaked credentials, reachable DB admin.",
      "Proved impact locally with a sanitized reproduction.",
      "Reported through the proper channel and waited out the fix.",
      "Received a formal recognition certificate on 26 January 2025.",
    ],
    flow: ["SURFACE → .env EXPOSED → CREDS → DB ACCESS", "         → REPORTED → FIXED → CERTIFIED"],
    result:
      "The issue was remediated, and the report was formally acknowledged with a recognition certificate.",
    learned: [
      "A reproducible chain (exposure → impact) matters more than a scary headline.",
      "The certificate is the part you can show; the details stay sanitized.",
    ],
    note: "Sensitive technical details intentionally sanitized.",
  },
  {
    slug: "misconfiguration-lab",
    index: "08",
    category: "SECURITY",
    tag: "LOCAL LAB",
    name: "MISCONFIGURATION LAB",
    stack: ["HTTP", "local infra"],
    status: "EXPERIMENT",
    year: "2025",
    question:
      "Can a one-page reproduction show a whole attack chain before anyone touches a real target?",
    why: "Instead of narrating other people's vulnerabilities, recreate the exact chain locally: exposed .env, HTTP retrieval, leaked credentials, database access.",
    approach: [
      "Local server with the file accidentally outside the web root.",
      "HTTP retrieval demonstrates the leak end-to-end.",
      "Fix by moving secrets outside the web root.",
      "Re-run to show the chain is closed.",
    ],
    flow: [
      "127.0.0.1:8081 → .env EXPOSED → HTTP GET",
      "          → DATABASE CREDS → LOCAL ACCESS",
      "          → FIX: MOVE SECRETS OUT OF WEB ROOT",
    ],
    result:
      "Vulnerability → reproduction → impact → remediation, demonstrated locally and safely.",
    learned: [
      "Reproducing a chain on localhost is the honest version of 'I know OWASP'.",
      "Root check: can an HTTP request read your secrets?",
    ],
  },
  {
    slug: "jwt-lab",
    index: "09",
    category: "SECURITY",
    tag: "AUTHENTICATION",
    name: "JWT LAB",
    stack: ["token auth"],
    status: "EXPERIMENT",
    year: "2025",
    question: "What actually happens when authentication assumptions fail?",
    why: "JWTs are everywhere, and their failure modes are subtle. The lab walks the token lifecycle and its attack cases.",
    approach: [
      "Token structure, signing, and verification.",
      "Expiration, claims, and where they are trusted.",
      "Attack and failure cases: weak algorithms, missing verification, alg confusion.",
    ],
    learned: [
      "Verification is the contract; a hand-rolled validator usually breaks it.",
      "The token format is easy. The trust boundaries around it are the work.",
    ],
  },
  {
    slug: "rate-limit-lab",
    index: "10",
    category: "SECURITY",
    tag: "API SECURITY",
    name: "API RATE LIMIT LAB",
    stack: ["HTTP", "API design"],
    status: "EXPERIMENT",
    year: "2025",
    question: "How should an API react when a client stops behaving politely?",
    why: "An unthrottled endpoint is one curl loop away from downtime. This lab maps request behavior under flood, then adds a limit.",
    approach: [
      "Baseline: no limit, request flood, observe behavior.",
      "Add a threshold and a retry contract.",
      "Compare response behavior before and after.",
      "Document the trade-offs of each limiting strategy.",
    ],
    flow: ["NO LIMIT → FLOOD → DOWNTIME", "RATE LIMIT → 429 → TRADE-OFFS"],
    learned: [
      "429 with a Retry-After header is a contract, not just an error.",
      "Limiting is a shaping decision with UX consequences.",
    ],
  },
  {
    slug: "offline-sync",
    index: "11",
    category: "SYSTEMS",
    tag: "DISTRIBUTED SYSTEMS",
    name: "OFFLINE SYNC",
    stack: ["state sync"],
    status: "EXPERIMENT",
    year: "2025",
    question: "What does sync actually mean when both ends are offline?",
    why: "My volunteer work kept hitting the same wall: devices that must keep working with no connection and still converge later. This lab makes the problem concrete.",
    approach: [
      "Device A makes local changes with no connectivity.",
      "Device B changes the same data offline.",
      "Sync runs when a connection appears — conflicts are the point.",
    ],
    flow: ["DEVICE A ─ LOCAL CHANGE", "        ↘ SYNC ↙", "DEVICE B ─ LOCAL CHANGE", "   CONFLICT HANDLING"],
    learned: [
      "The conflict policy is the product; the transport is the easy part.",
      "Replicated state means you have already decided on last-write-wins or a richer model.",
    ],
  },
  {
    slug: "payment-verification",
    index: "12",
    category: "SYSTEMS",
    tag: "FINTECH / BACKEND",
    name: "PAYMENT VERIFICATION",
    stack: ["ledger design"],
    status: "EXPERIMENT",
    year: "2025",
    question: "How do you stop the same payment event from counting twice?",
    why: "Payments are the sharpest idempotency problem I know. A duplicate Webhook or a replayed request must not double-charge.",
    approach: [
      "Payment request → verification → transaction state → ledger.",
      "Duplicate and replay detection with idempotency keys.",
      "Failed states, retries, and reconciliation of partial writes.",
    ],
    flow: ["PAYMENT REQUEST → VERIFY → TRANSACTION STATE → LEDGER", "   IDEMPOTENCY + REPLAY GUARD"],
    learned: [
      "Idempotency is about making retries safe, not just 'unique'.",
      "The ledger is where money becomes truth — protect it like it.",
    ],
  },
  {
    slug: "android-sdk-prototype",
    index: "13",
    category: "SYSTEMS",
    tag: "ANDROID / SDK",
    name: "ANDROID SDK PROTOTYPE",
    stack: ["Android", "interfaces"],
    status: "PROTOTYPE",
    year: "2026",
    question:
      "What does an ad request flow look like when the SDK is the whole integration surface?",
    why: "Out of the advertising-platform work: the publisher app should only ever see a small interface. Everything else lives behind it.",
    approach: [
      "Publisher app embeds the SDK surface.",
      "SDK issues the ad request to the platform.",
      "Platform returns an ad response; SDK renders and reports the event.",
      "Explicitly a prototype — not a claim of a production SDK.",
    ],
    flow: [
      "PUBLISHER APP → SDK → AD REQUEST → PLATFORM",
      "                      AD RESPONSE → DISPLAY → EVENT",
    ],
    result:
      "A working prototype of the integration boundary, shown as a full request lifecycle.",
    learned: [
      "The SDK is a contract with the publisher, not a library.",
      "Nothing about this was a production ad system — the boundary was the experiment.",
    ],
    note: "Marked prototype on purpose. This is the shape of the problem, not a shipped SDK.",
  },
  {
    slug: "sudan-security-atlas",
    index: "14",
    category: "RESEARCH",
    tag: "SECURITY RESEARCH",
    name: "SUDAN INTERNET ATLAS",
    stack: ["recon inventory", "DNS", "TLS", "research"],
    status: "RESEARCH",
    year: "2025",
    question: "What does Sudan's internet actually look like when you measure it?",
    why: "A multi-domain inventory of Sudan's public internet — the kind of baseline no one had written down.",
    approach: [
      "Domains and subdomains, DNS/DNSSEC posture, TLS behavior.",
      "Servers, APIs, authentication surfaces, databases, cloud and CMS fingerprints.",
      "Sectors: telecom, fintech, government, universities, healthcare, NGOs.",
      "Routing, reliability, privacy, and DevOps hygiene across surfaces.",
    ],
    result:
      "A roughly 1,730-line Markdown inventory — a structured, sourced baseline for the sector.",
    learned: [
      "A baseline turns 'is this bad?' into 'has this changed?'.",
      "Research like this has real ethical weight — it must stay observational and shareable without weaponizing detail.",
    ],
    note: "Observational inventory from public surfaces.",
  },
  {
    slug: "linux-privilege-lab",
    index: "15",
    category: "RESEARCH",
    tag: "OPERATING SYSTEMS",
    name: "LINUX PRIVILEGE LAB",
    stack: ["Linux", "permissions"],
    status: "RESEARCH",
    year: "2025",
    question: "Where do the real boundary lines live inside a Linux system?",
    why: "Foundational, not shiny: permissions, users and groups, sudo, processes, and privilege boundaries.",
    approach: [
      "Observed how permissions and ownership actually gate access.",
      "Mapped grep-able sudo and process boundaries.",
      "Kept as a research log — no claims of a built system.",
    ],
    learned: [
      "The kernel draws the real lines; config just decides who stands where.",
      "Privilege is a boundary problem wearing a config-file costume.",
    ],
    note: "Research log, not a finished tool.",
  },
  {
    slug: "instagram-messaging-api",
    index: "16",
    category: "RESEARCH",
    tag: "API RESEARCH",
    name: "INSTAGRAM MESSAGING API",
    stack: ["Meta Graph API", "webhooks"],
    status: "RESEARCH",
    year: "2025",
    question:
      "Can official Instagram messaging automation exist inside Meta's boundaries?",
    why: "The counterpoint to unofficial automation: webhooks, professional accounts, messaging, comments and DMs — all through the official surface.",
    approach: [
      "Mapped the official Instagram Messaging API surface and its limitations.",
      "Documented webhook-based comment/DM automation.",
      "Flagged clearly: API research, not a finished automation product.",
    ],
    learned: [
      "Platform boundaries are the product spec you have to respect.",
      "Research here is about knowing what exists before proposing what to build.",
    ],
    note: "Marked as API research — no finished system claimed.",
  },
];

export function getLabEntry(slug: string) {
  return labEntries.find((e) => e.slug === slug);
}

export function labCategoryLabel(category: LabCategory) {
  return category.charAt(0) + category.slice(1).toLowerCase();
}