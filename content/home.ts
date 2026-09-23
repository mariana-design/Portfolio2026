export const home = {
  hero: {
    eyebrow: "SENIOR PRODUCT DESIGNER & STRATEGIST — BARCELONA",
    name: "Mariana Benítez",
    introLead:
      "I'm Mariana. I overthink small details, ask too many questions about how things actually work, and design",
    words: ["products", "systems", "decisions", "experiences"],
    footer: "MB. — PORTFOLIO 2026 · SCROLL TO EXPLORE",
  },

  work: {
    title: "Some things I've *built*",
    intro:
      "A few projects from the last few years. Some I can show. Some I can't. Click through for the full case study.",
    projects: [
      {
        n: "01",
        title: "Darma",
        meta: "AI-native product · Web · iOS",
        href: "/work/darma",
        mockups: [
          { src: "/darma/cc-resolve-overlap.webp", alt: "Darma iOS — resolving an overlap between two meetings" },
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
    body: "I'm interested in products where the problem isn't obvious yet — especially at the intersection of AI, fintech and emerging technology. If you're working on something difficult, I'd like to hear about it.",
    links: [
      { label: "Email me", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Download CV", href: "#" },
    ],
  },

  teaser: {
    title: "Spoiler: I'm more than my *resume*.",
    body: "Nine years in Barcelona, a turtle named Hybri, and a bad habit of asking too many questions.",
    cta: "Get to know me",
    href: "/about",
  },

  footer: "Mariana Benitez · Barcelona · 2026",
};
