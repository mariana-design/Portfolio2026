import { SectionObserverProvider } from "@/lib/section-observer";
import FloatingNav from "@/components/FloatingNav";
import HomeHero from "@/components/HomeHero";
import Section from "@/components/Section";
import WideSection from "@/components/WideSection";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import AboutTeaser from "@/components/AboutTeaser";
import Footer from "@/components/Footer";
import { home } from "@/content/home";
import { testimonials } from "@/content/testimonials";

export default function HomePage() {
  return (
    <SectionObserverProvider>
      <FloatingNav showBack={false} />

      <main>
        <HomeHero {...home.hero} />

        <AboutTeaser {...home.teaser} />

        <WideSection id="work" anchor="work" number="01" label="Selected work" title={home.work.title}>
          <p className="mb-12 max-w-xl text-lg text-ink-soft">{home.work.intro}</p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-4">
            {home.work.projects.map((p, i) => (
              <ProjectCard key={p.n} {...p} featured={i === 0} className={i === 0 ? "md:col-span-2" : ""} />
            ))}
          </div>
        </WideSection>

        <WideSection id="says" number="”" label="Kind words" title="What people *say*">
          <TestimonialCarousel items={testimonials} />
        </WideSection>

        <Section id="02" anchor="contact" number="02" label="Contact" title={home.contact.title} dark>
          <p className="max-w-xl text-lg text-ink-dark/80">{home.contact.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {home.contact.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full border border-ink-dark/30 px-5 py-2 text-sm font-medium transition-colors hover:bg-ink-dark hover:text-paper-dark"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        </Section>
      </main>

      <Footer text={home.footer} />
    </SectionObserverProvider>
  );
}
