export type TimelineKind = "work" | "education" | "certification";

export interface TimelineEntry {
  /** Displayed as-is, so write it how you want it read: "2026 — Present". */
  period: string;
  title: string;
  organisation: string;
  kind: TimelineKind;
  /** Optional detail lines. Keep them to what you actually did and shipped. */
  points?: string[];
}
