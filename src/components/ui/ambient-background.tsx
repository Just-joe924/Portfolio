/**
 * Ambient layers behind every page:
 *
 *  - a faint static dot grid — a nod to a contact sheet
 *  - a soft accent glow that slowly breathes
 *  - a spotlight layer of the same grid in accent colour, revealed only around
 *    the pointer by <CursorGlow />
 *
 * All CSS. The grid is deliberately static so the spotlight dots line up
 * exactly with the dots underneath them. Decorative, so hidden from assistive
 * technology.
 */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-glow" />
      <div className="ambient-spotlight" />
    </div>
  );
}
