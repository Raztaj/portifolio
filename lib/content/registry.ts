export const workSlugs = ["hasdo", "easily", "darthvader", "shockwave"] as const;

export const labSlugs = [
  "darthvader",
  "web-scanner",
  "isnaad-database",
  "crm-automation",
  "whatsapp-webjs",
  "whatsapp-business-api",
  "university-disclosure",
  "misconfiguration-lab",
  "jwt-lab",
  "rate-limit-lab",
  "offline-sync",
  "payment-verification",
  "android-sdk-prototype",
  "sudan-security-atlas",
  "linux-privilege-lab",
  "instagram-messaging-api",
] as const;

export const noteSlugs = [
  "why-offline-first-changes-your-architecture",
  "designing-idempotent-financial-events",
  "when-local-storage-beats-a-backend",
] as const;

export type WorkSlug = (typeof workSlugs)[number];
export type LabSlug = (typeof labSlugs)[number];
export type NoteSlug = (typeof noteSlugs)[number];