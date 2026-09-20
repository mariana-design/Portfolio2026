import { SectionObserverProvider } from "@/lib/section-observer";
import { renderEmphasis } from "@/lib/emphasis";
import FloatingNav from "@/components/FloatingNav";
import WideSection from "@/components/WideSection";
import PolaroidScatter from "@/components/PolaroidScatter";
import ExperienceAccordion from "@/components/ExperienceAccordion";
import WorldMapVisited from "@/components/WorldMapVisited";
import PersonalityCarousel from "@/components/PersonalityCarousel";
import Footer from "@/components/Footer";
import { about } from "@/content/about";
import { home } from "@/content/home";

const eyebrow = "text-xs font-medium uppercase tracking-wide text-ink-soft";

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className={eyebrow}>{title}</p>
      <ul className="mt-4 space-y-2 text-ink-soft">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <SectionObserverProvider>
      <FloatingNav showBack={false} />

      <main>
        <section className="px-6 pb-16 pt-36 md:px-12">
          <h1 className="font-serif text-5xl leading-[1.05] tracking-tight md:text-[4.4vw]">
            <span className="block">{about.headline.first}</span>
            <span className="mt-2 block">{renderEmphasis(about.headline.second)}</span>
          </h1>
        </section>

        <section className="overflow-hidden px-6 pb-24 md:px-12">
          <PolaroidScatter photos={[{}, {}, {}, {}, {}]} />
        </section>

        <WideSection id="01" number="01" label="Experience" title="Where I've *worked*">
          <ExperienceAccordion label="Professional Experience" items={about.experience} />

          <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <List title="Education" items={about.education} />
            <List title="Languages" items={about.languages} />
            <List title="Skills" items={about.skills} />
            <List title="Software" items={about.software} />
          </div>
        </WideSection>

        <WideSection id="02" number="02" label="Travel" title="Places I've *been*">
          <p className="mb-12 max-w-2xl text-xl text-ink-soft md:text-2xl md:leading-snug">{about.travel.text}</p>
          <WorldMapVisited countries={about.travel.countries} />
        </WideSection>

        <WideSection id="03" number="03" label="Personality" title="A few things that are *very me*">
          <PersonalityCarousel items={about.personality} />
        </WideSection>

        <WideSection id="04" number="04" label="Thinking" title="How I *think*">
          <div className="grid grid-cols-1 gap-x-16 gap-y-16 md:grid-cols-2">
            {about.thinking.map((g) => (
              <div key={g.group}>
                <h3
                  className={`font-display font-bold tracking-tight ${
                    g.big ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"
                  }`}
                >
                  {g.group}
                </h3>
                <ul className={`mt-5 space-y-2 text-ink-soft ${g.big ? "text-lg md:text-xl" : "text-base"}`}>
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </WideSection>
      </main>

      <Footer text={home.footer} />
    </SectionObserverProvider>
  );
}
