import { SectionObserverProvider } from "@/lib/section-observer";
import FloatingNav from "./FloatingNav";
import ProgressRail from "./ProgressRail";
import PanelStack from "./PanelStack";
import StackedPanel from "./StackedPanel";
import TagList from "./TagList";
import MetaRow from "./MetaRow";
import VisualPlaceholder from "./VisualPlaceholder";
import HowIWorkIntro from "./HowIWorkIntro";
import NDANote from "./NDANote";
import ReadNext from "./ReadNext";

type PlaceholderCaseStudyProps = {
  tags: string[];
  title: string;
  subtitle: string;
  next: { href: string; title: string; description: string };
  nda?: boolean;
};

const blocks = [
  { label: "Context", title: "The *context*" },
  { label: "Role", title: "My *role*" },
  { label: "The real problem", title: "The real *problem*" },
  { label: "Design decision", title: "The design *decision*" },
  { label: "Result", title: "The *result*" },
  { label: "What I took from it", title: "What I *took from it*" },
];

export default function PlaceholderCaseStudy({ tags, title, subtitle, next, nda = true }: PlaceholderCaseStudyProps) {
  const segments = blocks.map((b, i) => ({ id: String(i + 1).padStart(2, "0"), label: b.label }));

  return (
    <SectionObserverProvider>
      <FloatingNav />

      <main className="pb-16">
        <div className="px-6 pb-12 pt-32 md:px-12">
          <TagList tags={tags} className="mb-6" />
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">{title}</h1>
          <p className="mt-4 max-w-xl text-xl font-medium text-ink-soft md:text-2xl">{subtitle}</p>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <p className="max-w-xl text-lg text-ink-soft">[placeholder]</p>
            <MetaRow
              className="md:grid-cols-2!"
              items={[
                { label: "Role", value: "[placeholder]" },
                { label: "Team", value: "[placeholder]" },
                { label: "Status", value: "[placeholder]" },
                { label: "Platform", value: "[placeholder]" },
              ]}
            />
          </div>
        </div>

        <VisualPlaceholder label="hero — case study visual" aspect="wide" className="rounded-none" />

        <HowIWorkIntro />
        {nda && <NDANote />}

        <PanelStack>
          {blocks.map((b, i) => (
            <StackedPanel
              key={b.label}
              index={i}
              number={String(i + 1).padStart(2, "0")}
              label={b.label}
              title={b.title}
              last={i === blocks.length - 1}
            >
              <p className="text-lg text-ink-soft">[placeholder]</p>
            </StackedPanel>
          ))}
        </PanelStack>

        <ReadNext {...next} />
      </main>

      <ProgressRail segments={segments} />
    </SectionObserverProvider>
  );
}
