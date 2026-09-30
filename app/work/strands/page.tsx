import { SectionObserverProvider } from "@/lib/section-observer";
import { renderEmphasis } from "@/lib/emphasis";
import FloatingNav from "@/components/FloatingNav";
import ProgressRail from "@/components/ProgressRail";
import PanelStack from "@/components/PanelStack";
import StackedPanel from "@/components/StackedPanel";
import TagList from "@/components/TagList";
import MetaRow from "@/components/MetaRow";
import QuoteBlock from "@/components/QuoteBlock";
import StrandsHeroVisual from "@/components/StrandsHeroVisual";
import ScreenLoop from "@/components/ScreenLoop";
import StateLoop from "@/components/StateLoop";
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
            <div>
              <MetaRow items={s.meta} className="md:grid-cols-2!" />
              <p className="mt-6 flex items-start gap-2 text-sm text-ink-soft">
                <svg aria-hidden viewBox="0 0 24 24" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft">
                  <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {s.ndaNote}
              </p>
            </div>
          </div>
        </div>

        <StrandsHeroVisual />

        <PanelStack>
          <StackedPanel index={0} number="01" label={P["01"].label} title={P["01"].title} wide>
            <div className="grid grid-cols-1 items-center gap-x-12 gap-y-8 md:grid-cols-[0.8fr_1.4fr]">
              <div>
                <p className={text}>{P["01"].body}</p>
                <QuoteBlock quote={P["01"].quote} className="py-6! text-left! text-xl! md:text-2xl!" />
              </div>
              <div className="grid grid-cols-3 gap-3 md:gap-5">
                {P["01"].loops.map((l) => (
                  <figure key={l.label}>
                    <ScreenLoop frames={l.frames} alt={l.alt} locked />
                    <figcaption className="mt-3 text-center text-[10px] font-medium uppercase tracking-wide text-ink-soft md:text-xs">
                      {l.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </StackedPanel>

          <StackedPanel index={1} number="02" label={P["02"].label} title={P["02"].title} wide>
            <div className="grid grid-cols-1 items-start gap-x-14 gap-y-8 md:grid-cols-[1.4fr_0.6fr]">
              <div>
                <p className={text}>{P["02"].body}</p>
                <QuoteBlock quote={P["02"].quote} className="py-6! text-left! text-xl! md:text-2xl!" />
              </div>
              <figure className="mx-auto w-full max-w-[220px]">
                <ScreenLoop
                  frames={P["02"].loop.frames}
                  dwells={P["02"].loop.dwells}
                  transition="slide"
                  fade={350}
                  alt={P["02"].loop.alt}
                  locked
                />
                <figcaption className="mt-3 text-center text-[10px] font-medium uppercase tracking-wide text-ink-soft md:text-xs">
                  New goal flow
                </figcaption>
              </figure>
            </div>
          </StackedPanel>

          <StackedPanel index={2} number="03" label={P["03"].label} title={P["03"].title} wide>
            <div className="grid grid-cols-1 items-start gap-x-14 gap-y-8 md:grid-cols-[1.3fr_0.7fr]">
              <div>
                <p className="text-sm text-ink-soft md:text-base">{P["03"].body[0]}</p>
                <p className="my-5 text-sm text-ink-soft md:text-base">{P["03"].body[1]}</p>
                <QuoteBlock quote={P["03"].quote} className="py-4! text-left! text-xl! md:text-2xl!" />
              </div>
              <StateLoop
                className="mx-auto w-full max-w-[210px]"
                states={P["03"].states}
                alt="Moneybox goal moving through its states: on track, off track, paused, expired, completed, releasing, released, deleting"
              />
            </div>
          </StackedPanel>

          <StackedPanel index={3} number="04" label={P["04"].label} title={P["04"].title} last>
            <p className="text-lg text-ink-soft">{P["04"].body}</p>
            <QuoteBlock quote={P["04"].quote} className="py-8!" />
          </StackedPanel>
        </PanelStack>

        <ReadNext {...s.next} />
      </main>

      <ProgressRail segments={segments} />
    </SectionObserverProvider>
  );
}
