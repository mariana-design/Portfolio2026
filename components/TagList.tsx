type TagListProps = {
  tags: string[];
  className?: string;
};

export default function TagList({ tags, className = "" }: TagListProps) {
  return (
    <p
      className={`font-display text-sm font-semibold tracking-wide text-ink-soft ${className}`}
    >
      {tags.join(" · ")}
    </p>
  );
}
