import Image from "next/image";
import { SectionObserverProvider } from "@/lib/section-observer";
import { renderEmphasis } from "@/lib/emphasis";
import FloatingNav from "@/components/FloatingNav";
import ProgressRail from "@/components/ProgressRail";
import PanelStack from "@/components/PanelStack";
import StackedPanel from "@/components/StackedPanel";
import TagList from "@/components/TagList";
import MetaRow from "@/components/MetaRow";
import DiagramFlow from "@/components/DiagramFlow";
import QuoteBlock from "@/components/QuoteBlock";
import VisualPlaceholder from "@/components/VisualPlaceholder";
import Filmstrip from "@/components/Filmstrip";
import HowIWorkIntro from "@/components/HowIWorkIntro";
import NDANote from "@/components/NDANote";
import ReadNext from "@/components/ReadNext";
import { caixabank as c } from "@/content/caixabank";

const P = c.panels;
const segments = Object.entries(P).map(([id, panel]) => ({ id, label: panel.label }));
const compactQuote = "py-4! text-xl! md:text-2xl!";
const text = "text-base text-ink-soft md:text-lg";

export default function CaixaBankPage() {
  return (
    <SectionObserverProvider>
      <FloatingNav />

      <main className="pb-16">
        <div className="px-6 pb-12 pt-32 md:px-12">
          <TagList tags={c.tags} className="mb-6" />
          <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">{c.title}</h1>
          <p className="mt-4 max-w-2xl font-display text-2xl font-bold tracking-tight md:text-4xl">
            {renderEmphasis(c.subtitle)}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="max-w-xl space-y-4 text-lg text-ink-soft">
              {c.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <MetaRow items={c.meta} className="md:grid-cols-2!" />
          </div>
        </div>

        <NDANote text={c.nda} />

        <div className="flex justify-center bg-ink/[0.03] py-16">
          <Image
            src="/caixabank/home.png"
            alt="CaixaBank home screen — accounts, cards and daily spending"
            width={700}
            height={2100}
            priority
            className="h-[70vh] w-auto rounded-3xl border border-ink/10 bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)]"
          />
        </div>

        <HowIWorkIntro />

        <PanelStack>
          <StackedPanel index={0} number="01" label={P["01"].label} title={P["01"].title} wide>
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-6 md:grid-cols-2">
              <div className="space-y-4">
                {P["01"].body.map((p) => (
                  <p key={p} className={text}>
                    {p}
                  </p>
                ))}
              </div>
              <ol className="space-y-1 text-center">
                {P["01"].layers.map((l, i, all) => (
                  <li key={l}>
                    <span
                      className={`inline-block rounded-full border px-5 py-1.5 text-sm font-medium ${
                        i === all.length - 1 ? "border-accent-warm text-accent-warm" : "border-ink/20"
                      }`}
                    >
                      {l}
                    </span>
                    {i < all.length - 1 && <span className="block text-sm leading-tight text-accent-warm">↓</span>}
                  </li>
                ))}
              </ol>
            </div>
            <QuoteBlock quote={P["01"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={1} number="02" label={P["02"].label} title={P["02"].title} wide>
            <p className={text}>{P["02"].intro}</p>
            <DiagramFlow steps={P["02"].flow} compact className="my-4" />
            <div className="grid grid-cols-1 items-start gap-x-10 gap-y-4 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className={text}>{P["02"].lead}</p>
                <div className="my-3 divide-y divide-ink/10 border-y border-ink/10 text-sm">
                  <div className="grid grid-cols-2 gap-3 py-2 text-xs font-medium uppercase tracking-wide text-ink-soft">
                    {P["02"].compare.head.map((h) => (
                      <span key={h}>{h}</span>
                    ))}
                  </div>
                  {P["02"].compare.rows.map((row) => (
                    <div key={row[0]} className="grid grid-cols-2 gap-3 py-2">
                      <span className="text-ink-soft">{row[0]}</span>
                      <span className="font-medium">{row[1]}</span>
                    </div>
                  ))}
                </div>
                <p className={text}>{P["02"].after}</p>
              </div>
              <Filmstrip frames={P["02"].frames} />
            </div>
            <QuoteBlock quote={P["02"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={2} number="03" label={P["03"].label} title={P["03"].title} wide>
            <DiagramFlow steps={P["03"].flow} compact className="mb-5" />
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-4 md:grid-cols-2">
              <p className={text}>{P["03"].body}</p>
              <div>
                <p className={text}>{P["03"].after}</p>
                <div className="mt-3 flex gap-3">
                  {P["03"].questions.map((q) => (
                    <span key={q} className="rounded-full border border-accent-warm px-4 py-1.5 text-sm font-medium text-accent-warm">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <QuoteBlock quote={P["03"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={3} number="04" label={P["04"].label} title={P["04"].title} wide>
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-6 md:grid-cols-2">
              <div className="space-y-4">
                {P["04"].body.map((p) => (
                  <p key={p} className={text}>
                    {p}
                  </p>
                ))}
              </div>
              <VisualPlaceholder label={P["04"].visual} aspect="video" />
            </div>
            <QuoteBlock quote={P["04"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={4} number="05" label={P["05"].label} title={P["05"].title} wide>
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-6 md:grid-cols-2">
              <p className={text}>{P["05"].body}</p>
              <VisualPlaceholder label={P["05"].visual} aspect="video" />
            </div>
            <QuoteBlock quote={P["05"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={5} number="06" label={P["06"].label} title={P["06"].title} last>
            <p className="text-lg text-ink-soft">{P["06"].body}</p>
            <ul className="my-6 space-y-2">
              {P["06"].questions.map((q) => (
                <li key={q} className="text-lg text-ink-soft">
                  — {q}
                </li>
              ))}
            </ul>
            <p className="font-medium">{P["06"].after}</p>
          </StackedPanel>
        </PanelStack>

        <div className="px-6 py-24 md:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">{renderEmphasis(c.closing.title)}</h2>
            <div className="mt-8 space-y-4 text-lg text-ink-soft">
              {c.closing.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <QuoteBlock quote={c.closing.quote} />
          </div>
        </div>

        <ReadNext {...c.next} />
      </main>

      <ProgressRail segments={segments} />
    </SectionObserverProvider>
  );
}
