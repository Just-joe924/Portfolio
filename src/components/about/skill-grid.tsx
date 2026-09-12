import { skillCategories } from "@/data/skills";

export function SkillGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {skillCategories.map((category) => (
        <li
          key={category.name}
          className="rounded-lg border border-border bg-surface p-5"
        >
          <h3 className="font-display text-base font-semibold">{category.name}</h3>
          <p className="mt-1 text-sm text-muted">{category.note}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {category.items.map((item) => (
              <li
                key={item}
                className="rounded-md bg-surface-raised px-2.5 py-1 text-xs font-medium text-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
