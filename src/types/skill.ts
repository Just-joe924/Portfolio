export interface SkillCategory {
  /** Heading shown above the group, e.g. "Languages". */
  name: string;
  /** One line on why these matter — keeps the grid from reading as a keyword dump. */
  note: string;
  items: string[];
}
