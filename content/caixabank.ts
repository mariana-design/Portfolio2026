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
    { label: "Team", value: "Me (Product Designer), PM, 2 Engineers, PO" },
    { label: "Period", value: "May 2024 — Jun 2025" },
    { label: "Platform", value: "iOS · Android (CaixaBank app), some CaixaBank Business web" },
  ],

  panels: {
    "01": {
      label: "The interface",
      title: "The screen is never *just a screen*",
      body: [
        "Take a simple banking interaction — checking a balance, tapping a card, reviewing a recent movement. Nothing unusual about it on the surface.",
        "But behind anything a user does on that screen, there are layers that never show up in the UI:",
      ],
      layers: ["Customer", "Business rules", "Regulation", "Technical dependencies", "Validation", "Error states", "Design"],
      quote: "What looks like one interaction is usually a system of decisions.",
    },
    "02": {
      label: "The refund flow",
      title: "One action. *Many states*.",
      context:
        "The Bizum refund flow I designed sits inside a network CaixaBank uses for over 9.5 million registered users in Spain — Bizum's largest single bank by volume.",
      flow: ["Information", "Conditions", "Confirmation", "Validation", "Processing", "Success / failure"],
      transition:
        "In banking, the happy path is never the whole story — designing the experience means designing what happens when things don't go as expected.",
      steps: [
        {
          src: "/caixabank/bizum-refund-1-home.webp",
          alt: "Bizum home — tapping into Consultar movimientos",
          tap: { x: 0.5, y: 0.696 },
        },
        {
          src: "/caixabank/bizum-refund-2-filtros.webp",
          alt: "Recent movements — the Bizum sent to Julio A.M.",
          tap: { x: 0.5, y: 0.5299 },
        },
        {
          src: "/caixabank/bizum-refund-3-pendiente.webp",
          alt: "Transaction detail — tapping Solicitar devolución",
          tap: { x: 0.51, y: 0.4551 },
        },
        {
          src: "/caixabank/bizum-refund-4-reconocer.webp",
          alt: "Quick reason picker — selecting incorrect amount",
          tap: { x: 0.5, y: 0.3283 },
        },
        {
          src: "/caixabank/bizum-refund-5-reason-empty-full.webp",
          alt: "Requesting the refund — choosing a reason",
          tap: { x: 0.5, y: 0.9241 },
          scroll: { fraction: 0.1133 },
        },
        {
          src: "/caixabank/bizum-refund-6-reason-selected-full.webp",
          alt: "Requesting the refund — reason selected: incorrect amount",
          tap: { x: 0.5, y: 0.9241 },
          scroll: { fraction: 0.1133 },
        },
        {
          src: "/caixabank/bizum-refund-7-confirm-warn-full.webp",
          alt: "Reviewing every detail — terms still need to be read and accepted",
          tap: { x: 0.5, y: 0.9477 },
          scroll: { fraction: 0.3451 },
        },
        {
          src: "/caixabank/bizum-refund-8-terms.webp",
          alt: "Reading the return conditions",
          tap: { x: 0.0627, y: 0.0956 },
        },
        {
          src: "/caixabank/bizum-refund-9-confirm-accept-full.webp",
          alt: "Reviewing every detail, terms read and accepted, ready to confirm",
          tap: { x: 0.5, y: 0.9477 },
          scroll: { fraction: 0.3451 },
        },
        {
          src: "/caixabank/bizum-refund-10-success.webp",
          alt: "Refund completed successfully — Devolución solicitada",
          tap: { x: 0.5, y: 0.8644 },
        },
      ],
      quote: "This is where the complexity lives.",
    },
    "03": {
      label: "Bizum Pay",
      title: "*Bizum Pay* — now live",
      body: "I worked on Bizum Pay while it was still an unnamed, unreleased payment product — under NDA, so the interface couldn't be shown at the time. It went live in September 2026, so it finally has a name and a face. The challenge was never just the final screens; it was defining how the experience worked across every moment surrounding it, since using it meant leaving CaixaBank's app entirely to activate it elsewhere, then coming back with the service ready.",
      after: "It's Bizum's own answer to tap-to-pay: the same network 9.5 million CaixaBank users already trust for Bizum transfers, extended to pay in physical stores — no new app to learn, no new number to give out.",
      visual: {
        alt: "Bizum Pay, live — the entry point inside Bizum, the activation screen, and the ready-to-pay state",
        steps: [
          {
            src: "/caixabank/bizum-pay-1-menu.webp",
            alt: "Bizum menu — Acceder a Bizum Pay",
            tap: { x: 0.5, y: 0.617 },
          },
          {
            src: "/caixabank/bizum-pay-2-onboarding.webp",
            alt: "Descubre Bizum Pay — activation steps",
            tap: { x: 0.5, y: 0.834 },
          },
          {
            src: "/caixabank/bizum-pay-3-ready.webp",
            alt: "Dispositivos vinculados — ready to activate",
            tap: { x: 0.5, y: 0.679 },
          },
        ],
        caption: "Bizum Pay — live since September 2026",
      },
      quote: "The goal wasn't to over-explain the UI. It was to design for the disconnect a user feels when a task continues somewhere else — and now that disconnect is something 9.5 million people can actually run into.",
    },
    "04": {
      label: "Currency exchange",
      title: "Buying and *selling currencies*",
      body: [
        "Another project, similar in spirit to what Revolut offers: buying, selling and holding foreign currencies from inside the app.",
        "The screen was the easy part. The real work happened in months of meetings with business and legal: how much to charge per transaction, whether a user could hold a foreign balance, what limits applied. And underneath the exchange itself, a single transaction still had to pass through several banks before settling — each one approving its own step, a constraint I had to design around rather than the point of the product.",
      ],
      visual: {
        src: "/caixabank/related-flow.webp",
        alt: "A CaixaBank flow board with a decision point splitting into two paths, several screens on each",
      },
      quote: "The exchange had to feel instant. Underneath, it was anything but.",
    },
    "05": {
      label: "Bills",
      title: "Bills have *more options* than I expected",
      body: "A new world for me. I owned the UX for showing when a bill was coming, what price to expect, whether it could be split, what happens if something looks wrong, and how to stop or dispute it. Users without their bills linked to the bank needed a way to bring them in, too.",
      visual: {
        alt: "The return-reason selection, the step-2 confirmation, and the return completed",
        steps: [
          {
            src: "/caixabank/bills-2-reason.webp",
            alt: "Devolver recibo — step 1 of 2, reason selected: not authorized",
            tap: { x: 0.5, y: 0.942 },
          },
          {
            src: "/caixabank/bills-3-confirm.webp",
            alt: "Devolver recibo — step 2 of 2, confirming every detail",
            tap: { x: 0.5, y: 0.942 },
          },
          {
            src: "/caixabank/bills-4-success.webp",
            alt: "Recibo devuelto — return completed",
            tap: { x: 0.5, y: 0.864 },
          },
        ],
        caption: "Reason → confirm → done",
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
