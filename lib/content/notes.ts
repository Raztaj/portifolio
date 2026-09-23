export interface Note {
  slug: string;
  index: string;
  title: string;
  date: string;
  words: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
}

export const notes: Note[] = [
  {
    slug: "why-offline-first-changes-your-architecture",
    index: "01",
    title: "Why offline-first changes your architecture",
    date: "2026",
    words: "04 MIN READ",
    intro:
      "The design rule I keep coming back to: assume the network is absent, and everything downstream is a different, harder problem.",
    sections: [
      {
        heading: "The assumption is the architecture",
        body: [
          "A connected app can put truth in the cloud and treat the device as a viewer. An offline-first app treats the device as the source of truth and the cloud as a reconciliation target. That inverts caching, identity, and conflict handling at once.",
          "The cache stops being an optimization. It becomes the primary store. You now owe exactly what a cache was supposed to hide: a schema, migrations, and a backup story on every device.",
        ],
      },
      {
        heading: "Identity moves to the edge",
        body: [
          "No connection means no login round-trip at the moment of action. Anonymous device identity becomes the default, and accounts become an optional later layer. That shapes the data model before you write a line of sync code.",
          "Project example: Kharita used a device UUID so every save works fully offline, and RLS-style ownership was an afterthought rather than the starting model.",
        ],
      },
      {
        heading: "Sync is a conflict-resolution decision",
        body: [
          "The moment you have two capable devices, you have last-write-wins by default — whether you chose it or not. Making it explicit, or implementing a better policy, is the real work.",
          "Idempotency stops being a nice-to-have. A retry from an offline client is indistinguishable from a duplicate unless you carry a stable operation ID.",
        ],
      },
    ],
  },
  {
    slug: "designing-idempotent-financial-events",
    index: "02",
    title: "Designing idempotent financial events",
    date: "2026",
    words: "05 MIN READ",
    intro:
      "Money moves fast, networks lie, and retries happen twice. Idempotency is the discipline that keeps a duplicated event from becoming a double charge.",
    sections: [
      {
        heading: "An event is an operation, not a row",
        body: [
          "Treat each financial action as an event carrying a stable ID (an idempotency key) rather than as a bare database write. The key, not the payload, decides whether this is the first attempt or the hundredth retry.",
          "The ledger then becomes idempotent by construction: applying the same event ID twice is a no-op, and the response is the same as the first success.",
        ],
      },
      {
        heading: "Replay is not the same as retry",
        body: [
          "A retry is the same client asking the same question again. A replay is someone re-sending an event on purpose. Idempotency keys block the accident; verification and signature checks block the intent. You need both layers, named separately.",
        ],
      },
      {
        heading: "Failed and partial states are first-class",
        body: [
          "The hardest case is a write that half-succeeded before the network died. Releasing the idempotency key too early invites duplicates; holding it forever blocks legitimate retries. The answer is an explicit transaction state machine with a terminal 'failed' state that still remembers the key.",
        ],
      },
    ],
  },
  {
    slug: "when-local-storage-beats-a-backend",
    index: "03",
    title: "When local storage beats a backend",
    date: "2026",
    words: "03 MIN READ",
    intro:
      "Every meeting that starts with 'we need a server' should first answer: who touches the data, where they sit, and whether the network is a promise or a wish.",
    sections: [
      {
        heading: "The network is the deciding variable",
        body: [
          "In an office with spotty connectivity, a local database that opens in a second is a better product than a SaaS app that times out twice a day. Excel proved this for years — it just had no structure, search, or backups.",
        ],
      },
      {
        heading: "A backend is a contract you pay for",
        body: [
          "Hosting, auth, sync, backups, uptime. If the reliable answer to every one of those is 'it barely matters here', local-first is not a compromise — it is the correct architecture. The backend becomes a later export step, not the foundation.",
        ],
      },
      {
        heading: "Keep the interchange format",
        body: [
          "The reason spreadsheet systems survive is that Excel is the interchange format everyone can open. A local database that imports and exports to that format keeps every existing stakeholder while fixing the chaos around it.",
        ],
      },
    ],
  },
];

export function getNote(slug: string) {
  return notes.find((n) => n.slug === slug);
}