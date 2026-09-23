export const caixabank = {
  tags: ["BANKING", "FINTECH", "MOBILE", "COMPLEX SYSTEMS"],
  title: "CaixaBank",
  subtitle: "Designing financial products where *every detail matters*.",
  intro: [
    "At CaixaBank, I worked across multiple banking experiences — Bizum refunds, account and transaction experiences, card activation, currency exchange, home bills, and other banking flows, mainly on the CaixaBank app, with some work on CaixaBank Business web.",
    "The work was rarely about designing a single screen. It was about understanding what happens before, after and around it — permissions, legal requirements, technical dependencies, validation, errors and edge cases. The interface was only one layer of the problem.",
  ],
  meta: [
    { label: "Role", value: "Product Designer" },
    { label: "Team", value: "[placeholder]" },
    { label: "Period", value: "May 2024 — Jun 2025" },
    { label: "Platform", value: "iOS · Android (CaixaBank app), some CaixaBank Business web" },
  ],

  panels: {
    "01": {
      label: "The interface",
      title: "The screen is never *just a screen*",
      body: [
        "Start with a simple banking interface — the accounts screen above. Nothing unusual about it: balances, cards, recent movements.",
        "But as you scroll through anything a user does on that screen, there are layers behind it that never show up in the UI:",
      ],
      layers: ["Customer", "Business rules", "Regulation", "Technical dependencies", "Validation", "Error states", "Design"],
      quote: "What looks like one interaction is usually a system of decisions.",
    },
    "02": {
      label: "The refund flow",
      title: "One action. *Many states*.",
      intro: "Take the Bizum refund experience: request → conditions → confirmation → validation → processing → success/failure.",
      context:
        "The Bizum refund flow I designed sits inside a network CaixaBank uses for over 9.5 million registered users in Spain — Bizum's largest single bank by volume.",
      flow: ["Information", "Conditions", "Confirmation", "Validation", "Processing", "Success / failure"],
      transition:
        "In banking, the happy path is never the whole story — designing the experience means designing what happens when things don't go as expected. Here's what the real screens looked like at each state:",
      frames: [
        { src: "/caixabank/refund-request.png", alt: "Refund request — confirming the details of a Bizum return", caption: "Information" },
        { src: "/caixabank/refund-terms.png", alt: "Refund conditions document", caption: "Conditions" },
        { src: "/caixabank/refund-confirm.png", alt: "Refund confirmation screen", caption: "Confirmation" },
        { src: "/caixabank/refund-success.png", alt: "Refund completed successfully", caption: "Success" },
        { src: "/caixabank/refund-fail.png", alt: "Refund failed state", caption: "Failure" },
      ],
      quote: "This is where the complexity lives.",
    },
    "03": {
      label: "A product I can't name yet",
      title: "A product I *can't name yet*",
      body: "I worked on a new payment product still in development — under NDA, so I can't share its name or show the interface. The challenge wasn't designing the final screens; it was defining how the experience worked across every moment surrounding it, since using it meant leaving CaixaBank's app entirely to set it up elsewhere, then coming back.",
      after: "On return, two questions the design had to answer immediately: where am I, and what happens next?",
      visual: {
        alt: "Related CaixaBank screens — logging back in, pending operations waiting to be confirmed, and the accounts home",
        frames: ["login", "pending", "home"].map((n) => `/caixabank/related-${n}.webp`),
        caption: "Related screens, not the product",
      },
      quote: "The goal wasn't to over-explain the UI. It was to design for the disconnect a user feels when a task continues somewhere else.",
    },
    "04": {
      label: "One click, several banks",
      title: "One click, *several banks*",
      body: [
        "Another project, similar in spirit to what Revolut offers: holding and moving money between currencies.",
        "The screen was the easy part. The real work happened in months of meetings with business and legal: how much to charge per transaction, whether a user could hold a foreign balance, what limits applied. A single transfer has to pass through several banks before reaching its destination — each one approving its own step.",
      ],
      visual: {
        src: "/caixabank/related-flow.webp",
        alt: "A CaixaBank flow board with a decision point splitting into two paths, several screens on each",
      },
      quote: "The transaction touched several banks. For the user, it still had to feel like pressing one button.",
    },
    "05": {
      label: "Bills",
      title: "Bills have *more options* than I expected",
      body: "A new world for me. I owned the UX for showing when a bill was coming, what price to expect, whether it could be split, what happens if something looks wrong, and how to stop or dispute it. Users without their bills linked to the bank needed a way to bring them in, too.",
      visual: {
        src: "/caixabank/related-bills.webp",
        alt: "CaixaBank shared account — the Recibos shortcut, Iberdrola and mortgage payments in the movements list, and a Fraccionar pago (split payment) link",
      },
      quote: "Even I, the designer, found the flow confusing — before I simplified it.",
    },
    "06": {
      label: "Legal as UX",
      title: "Legal information is *part of the experience*",
      body: "Terms and conditions aren't a compliance afterthought bolted onto the journey — they're part of the product experience, and they show up right inside the refund flow above.",
      questions: [
        "What needs to be shown?",
        "What can be summarized?",
        "What needs explicit acceptance?",
        "When can the user continue?",
      ],
      after: "Legal requirements don't exist outside UX. They're part of it.",
    },
  },

  closing: {
    title: "Banking taught me to design for *what happens after the button*",
    body: [
      "A banking experience isn't finished when the user taps a button. You also have to think about what happens if it fails, what the system needs to validate, what happens when someone leaves and comes back, what needs to be legally explicit.",
      "A good interface can make something feel simple. But good product design means understanding the complexity that makes that simplicity possible.",
    ],
    quote: "The simpler the experience feels, the more carefully the complexity behind it has been designed.",
  },

  next: {
    href: "/work/strands",
    title: "Strands",
    description: "B2B fintech · White-label banking tech",
  },
};
