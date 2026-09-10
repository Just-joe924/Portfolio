import { Container } from "@/components/ui/container";

export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <Container className="pb-8 pt-12 md:pt-16">
      <h1 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
      {intro && <p className="mt-3 max-w-prose text-muted">{intro}</p>}
    </Container>
  );
}
