export type WorkStatus = "ACTIVE" | "DEPLOYED" | "MAINTENANCE";

import type { WorkSlug, LabSlug, NoteSlug } from "./registry";

export type { WorkSlug, LabSlug, NoteSlug };

export interface Constraint {
  id: string;
  label: string;
  note?: string;
}

export interface Tradeoff {
  decision: string;
  cost: string;
}

export interface Threat {
  id: string;
  label: string;
  mitigation: string;
}

export interface ArchNode {
  id: string;
  label: string;
  sub?: string;
}

export interface ArchEdge {
  from: string;
  to: string;
}

export interface Decision {
  title: string;
  body: string;
}

export interface Broken {
  assumption: string;
  failure: string;
  solution: string;
}

export interface ResultBit {
  label: string;
  value: string;
}

export interface MediaImage {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  slug: WorkSlug;
  index: string;
  kind: string;
  title: string;
  year: string;
  status: WorkStatus;
  description: string;
  tagline: string;
  stack: string[];
  links: { label: string; href?: string }[];
  problem: string[];
  constraints: Constraint[];
  architectureIntro: string;
  architectureNodes: ArchNode[];
  architectureEdges: ArchEdge[];
  decisions: Decision[];
  tradeoffs: Tradeoff[];
  security?: {
    note?: string;
    threatModel: string[];
    mitigation: string[];
  };
  whatsBroken: Broken[];
  result: ResultBit[];
  media?: MediaImage[];
}