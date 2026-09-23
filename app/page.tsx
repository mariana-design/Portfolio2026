import { SectionObserverProvider } from "@/lib/section-observer";
import FloatingNav from "@/components/FloatingNav";
import HomeHero from "@/components/HomeHero";
import ClosingStatement from "@/components/ClosingStatement";
import HowIWorkIntro from "@/components/HowIWorkIntro";
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

        <HowIWorkIntro />

        <WideSection id="says" number="”" label="Kind words" title="What people *say*">
          <TestimonialCarousel items={testimonials} />
        </WideSection>

        <ClosingStatement
          id="02"
          anchor="contact"
          number="02"
          label="Contact"
          title={home.contact.title}
          body={home.contact.body}
          links={home.contact.links}
        />
      </main>

      <Footer text={home.footer} dark />
    </SectionObserverProvider>
  );
}
