export type ProjectStatus = "live" | "in-progress" | "archived";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  /** URL segment: /projects/<slug>. Lowercase, hyphenated, never changes. */
  slug: string;
  title: string;
  /** One line, shown on the card. */
  tagline: string;
  /** Two or three sentences: what it does and who for. */
  summary: string;
  /** Why it exists — the problem before the code. */
  problem: string;
  /** What you actually built. */
  build: string;
  /** What it taught you. */
  learnings: string[];
  /** "Solo build", "Frontend, team of four". */
  role: string;
  stack: string[];
  year: number;
  status: ProjectStatus;
  featured: boolean;
  liveUrl?: string;
  repoUrl?: string;
  cover: ProjectImage;
  screenshots?: ProjectImage[];
}

/** A project plus whatever the server worked out about it at build time. */
export interface ResolvedProject extends Project {
  /** False when cover.src isn't in public/ yet, so the UI can fall back. */
  hasCover: boolean;
}
