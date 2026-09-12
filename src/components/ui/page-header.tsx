import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <Container className="pb-8 pt-12 md:pt-16">
      <Reveal>
        <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      </Reveal>
      {intro && (
        <Reveal delay={90}>
          <p className="mt-3 max-w-prose text-muted">{intro}</p>
        </Reveal>
      )}
    </Container>
  );
}
