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
import Filmstrip from "@/components/Filmstrip";
import ScreenLoop from "@/components/ScreenLoop";
import LockedImage from "@/components/LockedImage";
import LayerStack from "@/components/LayerStack";
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

        <div className="flex justify-center bg-ink/[0.03] py-16">
          <div className="aspect-[480/984] w-[260px] overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.4)]">
            <Image
              src="/caixabank/home.png"
              alt="CaixaBank home screen — accounts, cards and daily spending"
              width={700}
              height={2100}
              sizes="260px"
              priority
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>

        <PanelStack>
          <StackedPanel index={0} number="01" label={P["01"].label} title={P["01"].title} wide>
            <div className="grid grid-cols-1 items-center gap-x-14 gap-y-8 md:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-4">
                {P["01"].body.map((p) => (
                  <p key={p} className={text}>
                    {p}
                  </p>
                ))}
                <QuoteBlock quote={P["01"].quote} className="py-2! text-left! text-xl! md:text-2xl!" />
              </div>
              <LayerStack layers={P["01"].layers} />
            </div>
          </StackedPanel>

          <StackedPanel index={1} number="02" label={P["02"].label} title={P["02"].title} wide>
            <p className={text}>{P["02"].intro}</p>
            <p className="mt-3 text-xs text-ink-soft/70 md:text-sm">{P["02"].context}</p>
            <DiagramFlow steps={P["02"].flow} compact className="my-6" />
            <div className="grid grid-cols-1 items-center gap-x-10 gap-y-6 md:grid-cols-[0.6fr_1.4fr]">
              <div className="space-y-4">
                <p className={text}>{P["02"].transition}</p>
                <QuoteBlock quote={P["02"].quote} className="py-2! text-left! text-xl! md:text-2xl!" />
              </div>
              <Filmstrip frames={P["02"].frames} />
            </div>
          </StackedPanel>

          <StackedPanel index={2} number="03" label={P["03"].label} title={P["03"].title} wide>
            <div className="grid grid-cols-1 items-center gap-x-14 gap-y-8 md:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-4">
                <p className={text}>{P["03"].body}</p>
                <p className={text}>{P["03"].after}</p>
                <QuoteBlock quote={P["03"].quote} className="py-2! text-left! text-xl! md:text-2xl!" />
              </div>
              <figure className="mx-auto w-full max-w-[210px]">
                <ScreenLoop frames={P["03"].visual.frames} alt={P["03"].visual.alt} dwell={1900} fade={400} locked />
                <figcaption className="mt-3 text-center text-[10px] font-medium uppercase tracking-wide text-ink-soft md:text-xs">
                  {P["03"].visual.caption}
                </figcaption>
              </figure>
            </div>
          </StackedPanel>

          <StackedPanel index={3} number="04" label={P["04"].label} title={P["04"].title} dark wide>
            <div className="grid grid-cols-1 items-center gap-x-12 gap-y-6 md:grid-cols-2">
              <div className="space-y-4">
                {P["04"].body.map((p) => (
                  <p key={p} className="text-base text-ink-dark/80 md:text-lg">
                    {p}
                  </p>
                ))}
              </div>
              <LockedImage src={P["04"].visual.src} alt={P["04"].visual.alt} width={1600} height={841} />
            </div>
            <QuoteBlock quote={P["04"].quote} className={compactQuote} />
          </StackedPanel>

          <StackedPanel index={4} number="05" label={P["05"].label} title={P["05"].title} wide>
            <div className="grid grid-cols-1 items-center gap-x-14 gap-y-8 md:grid-cols-[1.3fr_0.7fr]">
              <div className="space-y-4">
                <p className={text}>{P["05"].body}</p>
                <QuoteBlock quote={P["05"].quote} className="py-2! text-left! text-xl! md:text-2xl!" />
              </div>
              <div className="mx-auto aspect-[480/984] w-full max-w-[210px] overflow-hidden rounded-[1.6rem] border-[5px] border-ink bg-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.4)]">
                <Image
                  src={P["05"].visual.src}
                  alt={P["05"].visual.alt}
                  width={560}
                  height={1211}
                  sizes="220px"
                  className="h-full w-full object-cover object-top"
                />
              </div>
            </div>
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
