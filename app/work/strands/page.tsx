import { SectionObserverProvider } from "@/lib/section-observer";
import { renderEmphasis } from "@/lib/emphasis";
import FloatingNav from "@/components/FloatingNav";
import ProgressRail from "@/components/ProgressRail";
import PanelStack from "@/components/PanelStack";
import StackedPanel from "@/components/StackedPanel";
import TagList from "@/components/TagList";
import MetaRow from "@/components/MetaRow";
import QuoteBlock from "@/components/QuoteBlock";
import VisualPlaceholder from "@/components/VisualPlaceholder";
import Filmstrip from "@/components/Filmstrip";
import HowIWorkIntro from "@/components/HowIWorkIntro";
import NDANote from "@/components/NDANote";
import ReadNext from "@/components/ReadNext";
import { strands as s } from "@/content/strands";

const P = s.panels;
const segments = Object.entries(P).map(([id, panel]) => ({ id, label: panel.label }));
const compactQuote = "py-4! text-xl! md:text-2xl!";
const text = "text-base text-ink-soft md:text-lg";

export default function StrandsPage() {
  return (
    <SectionObserverProvider>
      <FloatingNav />

      <main className="pb-16">
        <div className="px-6 pb-12 pt-32 md:px-12">
          <TagList tags={s.tags} className="mb-6" />
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">{s.title}</h1>
          <p className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight md:text-4xl">
            {renderEmphasis(s.subtitle)}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="max-w-xl space-y-4 text-lg text-ink-soft">
              {s.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <MetaRow items={s.meta} className="md:grid-cols-2!" />
          </div>
        </div>

        <VisualPlaceholder label="hero — Strands showcase app, web and iOS" aspect="wide" className="rounded-none" />

        <HowIWorkIntro />
        <NDANote />

        <PanelStack>
          <StackedPanel index={0} number="01" label={P["01"].label} title={P["01"].title} wide>
            <p className={`max-w-3xl ${text}`}>{P["01"].body}</p>
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {P["01"].visuals.map((v) => (
                <VisualPlaceholder key={v} label={v} aspect="video" />
              ))}
            </div>
            <QuoteBlock quote={P["01"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={1} number="02" label={P["02"].label} title={P["02"].title} wide>
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-6 md:grid-cols-2">
              <p className={text}>{P["02"].body}</p>
              <VisualPlaceholder label={P["02"].visual} aspect="video" />
            </div>
            <QuoteBlock quote={P["02"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={2} number="03" label={P["03"].label} title={P["03"].title} wide>
            <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
              {P["03"].body.map((p) => (
                <p key={p} className="text-sm text-ink-soft md:text-base">
                  {p}
                </p>
              ))}
            </div>
            <Filmstrip frames={P["03"].states.map((caption) => ({ caption }))} className="mt-6" />
            <QuoteBlock quote={P["03"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={3} number="04" label={P["04"].label} title={P["04"].title} last>
            <p className="text-lg text-ink-soft">{P["04"].body}</p>
            <QuoteBlock quote={P["04"].quote} className="py-8!" />
          </StackedPanel>
        </PanelStack>

        <div className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{renderEmphasis(s.closing.title)}</h2>
            <p className="mt-8 text-lg text-ink-soft">{s.closing.body}</p>
          </div>
        </div>

        <ReadNext {...s.next} />
      </main>

      <ProgressRail segments={segments} />
    </SectionObserverProvider>
  );
}
