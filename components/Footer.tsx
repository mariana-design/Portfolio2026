type FooterProps = { text: string; dark?: boolean };

export default function Footer({ text, dark = false }: FooterProps) {
  return (
    <footer className={`px-6 py-8 md:px-12 ${dark ? "bg-paper-dark text-ink-dark" : "border-t border-ink/10"}`}>
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between border-t pt-8 text-sm md:max-w-none ${
          dark ? "border-ink-dark/15 text-ink-dark/60" : "border-transparent pt-0 text-ink-soft"
        }`}
      >
        <span>{text}</span>
        <a href="#top" className={`transition-colors ${dark ? "hover:text-ink-dark" : "hover:text-ink"}`}>
          Back to top ↑
        </a>
        <span className={`font-display text-lg font-bold ${dark ? "text-ink-dark" : "text-ink"}`}>MB.</span>
      </div>
    </footer>
  );
}
