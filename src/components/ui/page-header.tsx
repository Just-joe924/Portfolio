import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Typewriter } from "@/components/ui/typewriter";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <Container className="pb-8 pt-12 md:pt-16">
      {/* No Reveal on the title: it types instead, and the two together read as
          one effect too many. The intro below still fades in. */}
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
        <Typewriter>{title}</Typewriter>
      </h1>
      {intro && (
        <Reveal delay={90}>
          <p className="mt-3 max-w-prose text-muted">{intro}</p>
        </Reveal>
      )}
    </Container>
  );
}
