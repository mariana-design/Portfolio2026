export const home = {
  hero: {
    eyebrow: "SENIOR PRODUCT DESIGNER & STRATEGIST — BARCELONA",
    name: "Mariana Benítez",
    introLead: "Industrial engineer turned product",
    words: ["designer", "strategist", "builder"],
    footer: "MB. — PORTFOLIO 2026 · SCROLL TO EXPLORE",
  },

  work: {
    title: "Some things I've *built*",
    intro:
      "A few projects from the last few years, each with its own kind of complexity. Some I can show in full. Some only in part. Click through for the complete case study.",
    projects: [
      {
        n: "01",
        title: "Darma",
        meta: "AI-native product · Web · iOS",
        href: "/work/darma",
        mockups: [
          {
            src: "/darma/darma-hero-poster-v3.jpg",
            video: "/darma/darma-hero-v3.mp4",
            poster: "/darma/darma-hero-poster-v3.jpg",
            alt: "Darma iOS — the onboarding screen, on device",
          },
        ],
      },
      {
        n: "02",
        title: "CaixaBank",
        meta: "Banking · Fintech · Complex systems",
        href: "/work/caixabank",
        mockups: [{ src: "/caixabank/home.png", alt: "CaixaBank app — accounts, cards and daily spending" }],
      },
      {
        n: "03",
        title: "Strands",
        meta: "B2B fintech · White-label banking tech",
        href: "/work/strands",
        mockups: [{ src: "/strands/state-1.webp", alt: "Strands Moneybox — a savings goal on track", locked: true }],
      },
    ],
  },

  contact: {
    title: "Let's build something *worth overthinking*.",
    body: "I'm interested in products where the problem isn't obvious yet. I've worked across banking, AI, mobility, food tech, and public services — what draws me in isn't the industry, it's when the problem is genuinely hard to define. If you're working on something like that, I'd like to hear about it.",
    links: [
      { label: "Email me", href: "mailto:marianabenitezcorona@gmail.com" },
      { label: "LinkedIn", href: "https://linkedin.com/in/marianabenitezcorona" },
      { label: "Download CV", href: "/cv/Mariana-Benitez-CV.pdf", download: true },
    ],
  },

  teaser: {
    title: "Spoiler: I'm more than my *resume*.",
    body: "Nine years in Barcelona, a turtle named Hybri, a weakness for tacos and speciality coffee — and yes, I photograph doors more often than I photograph myself.",
    cta: "Get to know me",
    href: "/about",
    cover: "/home/home-la-cover.webp",
  },

  footer: "Mariana Benitez · Barcelona · 2026",
};
