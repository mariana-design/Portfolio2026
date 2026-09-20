import type { ReactNode } from "react";

/** Renders "plain *emphasis* plain" with the emphasis in terracotta serif italic. */
export function renderEmphasis(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="font-serif font-normal italic text-accent-warm">
        {part.slice(1, -1)}
      </em>
    ) : (
      part
    )
  );
}
