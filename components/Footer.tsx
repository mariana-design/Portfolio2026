type FooterProps = { text: string };

export default function Footer({ text }: FooterProps) {
  return (
    <footer className="border-t border-ink/10 px-6 py-8 md:px-12">
      <div className="mx-auto flex max-w-5xl items-center justify-between text-sm text-ink-soft">
        <span>{text}</span>
        <a href="#top" className="transition-colors hover:text-ink">
          Back to top ↑
        </a>
        <span className="font-display font-bold text-ink">MB.</span>
      </div>
    </footer>
  );
}
