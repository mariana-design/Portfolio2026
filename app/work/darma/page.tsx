import { SectionObserverProvider } from "@/lib/section-observer";
import FloatingNav from "@/components/FloatingNav";
import ProgressRail from "@/components/ProgressRail";
import PanelStack from "@/components/PanelStack";
import StackedPanel from "@/components/StackedPanel";
import TagList from "@/components/TagList";
import MetaRow from "@/components/MetaRow";
import BeforeAfterTable from "@/components/BeforeAfterTable";
import DiagramFlow from "@/components/DiagramFlow";
import EmailCard from "@/components/EmailCard";
import QuoteBlock from "@/components/QuoteBlock";
import StatBlock from "@/components/StatBlock";
import VisualPlaceholder from "@/components/VisualPlaceholder";
import ReadNext from "@/components/ReadNext";
import HowIWorkIntro from "@/components/HowIWorkIntro";
import { darma } from "@/content/darma";
import { renderEmphasis } from "@/lib/emphasis";

function Body({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((para, i) => (
        <p key={i} className="mb-4 text-lg text-ink-soft last:mb-0">
          {para}
        </p>
      ))}
    </>
  );
}

const P = darma.panels;
const segments = Object.entries(P).map(([id, panel]) => ({ id, label: panel.label }));

const compactQuote = "py-4! text-xl! md:text-2xl!";

export default function DarmaPage() {
  return (
    <SectionObserverProvider>
      <FloatingNav />

      <main className="pb-16">
        {/* Hero */}
        <div className="px-6 pb-12 pt-32 md:px-12">
          <TagList tags={darma.tags} className="mb-6" />
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            {darma.title}
          </h1>
          <p className="mt-4 max-w-xl text-xl font-medium text-ink-soft md:text-2xl">
            {darma.subtitle}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <p className="max-w-xl text-lg text-ink-soft">{darma.intro}</p>
            <MetaRow items={darma.meta} className="md:grid-cols-2!" />
          </div>
        </div>

        <VisualPlaceholder
          label="hero — Darma onboarding video / product visual"
          aspect="wide"
          className="rounded-none"
        />

        <HowIWorkIntro />

        {/* 7 numbered panels */}
        <PanelStack>
          <StackedPanel index={0} number="01" label={P["01"].label} title={P["01"].title}>
            <p className="text-lg text-ink-soft">{P["01"].body}</p>
            <BeforeAfterTable rows={P["01"].beforeAfter} className="my-8" />
            <QuoteBlock quote={P["01"].quote} className="py-6! text-xl! md:text-2xl!" />
          </StackedPanel>

          <StackedPanel index={1} number="02" label={P["02"].label} title={P["02"].title} wide>
            <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              <div>
                <p className="text-base text-ink-soft md:text-lg">{P["02"].intro}</p>
                <DiagramFlow steps={P["02"].flow} compact className="my-5" />
                <p className="text-base text-ink-soft md:text-lg">{P["02"].body}</p>
              </div>
              <div>
                <EmailCard {...P["02"].email} />
                <p className="mt-4 text-sm font-medium text-ink">{P["02"].line}</p>
              </div>
            </div>
            <QuoteBlock quote={P["02"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={2} number="03" label={P["03"].label} title={P["03"].title}>
            <p className="text-base text-ink-soft md:text-lg">{P["03"].body}</p>
            <EmailCard {...P["03"].email} className="my-4" />
            <div className="grid grid-cols-1 gap-3 border-y border-ink/10 py-3 md:grid-cols-3">
              {P["03"].certainty.map((c) => (
                <div key={c.label}>
                  <p className="font-display text-sm font-semibold uppercase tracking-wide text-accent-warm">
                    {c.label}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{c.desc}</p>
                </div>
              ))}
            </div>
          </StackedPanel>

          <StackedPanel index={3} number="04" label={P["04"].label} title={P["04"].title} dark wide>
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-6 md:grid-cols-2">
              <div>
                <p className="text-base text-ink-dark/80 md:text-lg">{P["04"].intro}</p>
                <DiagramFlow steps={P["04"].flow} compact className="my-5" />
                <p className="text-base text-ink-dark/80 md:text-lg">{P["04"].body}</p>
              </div>
              <VisualPlaceholder label={P["04"].visual} aspect="video" dark />
            </div>
            <QuoteBlock quote={P["04"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={4} number="05" label={P["05"].label} title={P["05"].title} wide>
            <p className="max-w-3xl text-base text-ink-soft md:text-lg">{P["05"].body}</p>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {P["05"].visuals.map((v) => (
                <VisualPlaceholder key={v} label={v} aspect="wide" />
              ))}
            </div>
            <QuoteBlock quote={P["05"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={5} number="06" label={P["06"].label} title={P["06"].title}>
            <DiagramFlow steps={P["06"].flow} compact className="mb-6" />
            <p className="text-lg text-ink-soft">{P["06"].body}</p>
            <QuoteBlock quote={P["06"].quote} className="py-6! text-xl! md:text-2xl!" />
          </StackedPanel>

          <StackedPanel index={6} number="07" label={P["07"].label} title={P["07"].title} wide last>
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-6 md:grid-cols-2">
              <div>
                <p className="text-base text-ink-soft md:text-lg">{P["07"].body}</p>
                <StatBlock stats={P["07"].stats} className="mt-8" />
              </div>
              <VisualPlaceholder label={P["07"].visual} aspect="video" />
            </div>
          </StackedPanel>
        </PanelStack>

        {/* Closing */}
        <div className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {renderEmphasis(darma.closing.title)}
            </h2>
            <Body text={darma.closing.body} />
          </div>
        </div>

        <ReadNext
          href="/work/caixabank"
          title="CaixaBank"
          description="Banking · Fintech · Complex systems"
        />
      </main>

      <ProgressRail segments={segments} />
    </SectionObserverProvider>
  );
}
