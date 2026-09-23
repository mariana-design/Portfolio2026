export const darma = {
  tags: ["AI PRODUCT", "WEB", "IOS", "WEB APP", "2025—NOW"],
  title: "Darma",
  subtitle: "Designing when AI should act — and when humans should step in.",
  intro:
    "Darma is an AI assistant that negotiates scheduling on a user's behalf — inside real email threads — and knows when to stop and bring the human back in.",
  meta: [
    { label: "Role", value: "Product Designer → Product Lead" },
    { label: "Team", value: "6 engineers, 5 countries" },
    { label: "Status", value: "Early access" },
    { label: "Platform", value: "iOS · Web · Email" },
  ],

  panels: {
    "01": {
      label: "The evolution",
      title: "From AI chat to *AI coordination*",
      body: "Darma started as a dark, chat-first iOS app built around one interaction: you asked, it answered. As the product moved into B2B2C, the interface got lighter — and the core interaction moved out of the app entirely.",
      beforeAfter: [
        { before: "Dark, CEO-focused", after: "Light, B2B2C" },
        { before: "iOS only", after: "iOS + Web app" },
        { before: "Chat-first", after: "Email-native" },
        { before: "You talk to Darma", after: "Darma handles the conversation" },
      ],
      quote: "The interaction moved from talking to Darma — to letting it handle the conversation.",
    },
    "02": {
      label: "The shift",
      title: "The interface was no longer *the conversation*",
      intro:
        "The real interaction moved into email. Darma could be copied into a thread — read the context, negotiate times, handle rejections, and reach an agreement on its own.",
      flow: ["User", "Email thread", "Darma", "Negotiation", "Agreement"],
      body: "Email gave almost no visual space to design in. So the work was heavily UX-driven: what should Darma propose? How should it respond to a rejection? When should it keep negotiating, and when should it stop?",
      email: {
        subject: "Design Catch Up",
        from: "ea@askdarma.ai",
        to: "raynor@gmail.com",
        body: "Hi [Name], your 30-min meeting has been rescheduled.\nWed 29 Apr, 13:00–13:45 (Europe/Madrid)\nPreviously: Mon 11 May, 14:30–15:00\n[Org] picked this time based on your availability. Reply here if anything changes.\n— Darma, on behalf of mariana@darma.ai",
      },
      // NDU-DU: Darma writes to the guest (raynor@gmail.com) on behalf of the organizer (mariana@darma.ai) — the
      // recipient and the person Darma acts "on behalf of" are different people, so the signature is correct.
      line: "Email was where Darma worked. The app was where the human stayed aware.",
      quote: "I wasn't designing screens. I was designing behaviour.",
    },
    "03": {
      label: "The hard part",
      title: "The hard part wasn't scheduling. It was *knowing what to do next*.",
      body: "A real proposal Darma sent inside an email thread. To write it, Darma had to understand the conversation without hallucinating — getting it wrong could change the outcome of the negotiation.",
      email: {
        subject: "Design Catch Up",
        from: "ea@askdarma.ai",
        to: "galla@darma.ai",
        body: "Hi [Org], I found 3 times for your 45-min meeting — these all work for everyone:\nTue 28 Apr, 15:45–16:30\nWed 29 Apr, 13:00–13:45\nThu 30 Apr, 11:00–11:45\nReply with one of the times above, or any changes.\n— Darma",
      },
      // DU-DU: both the organizer (galla@darma.ai) and every guest use Darma, so it has direct calendar access and
      // writes to the organizer as itself — never "on behalf of" the person it's writing to.
      certainty: [
        { label: "Said", desc: "The literal content of the thread — safe ground to act on." },
        { label: "Inferred", desc: "Reasonable context Darma can factor in, but hold loosely." },
        { label: "Unknown", desc: "The line Darma isn't allowed to guess across." },
      ],
    },
    "04": {
      label: "Designing the stop",
      title: "The important decision was *knowing when to stop*",
      intro:
        "Not every guest uses Darma. When they don't (NDU-DU), a rejection triggers two things at once: Darma keeps the guest warm while it checks back with the organizer — then returns with an answer.",
      fork: {
        linear: [
          "Organizer delegates to Darma",
          "Darma proposes 3 times",
          "Guest negotiates",
          "Darma sends 3 new proposals",
          "Guest rejects",
        ],
        holdLabel: "Darma holds the guest",
        holdSub: "\"Give me a moment — checking with the organizer\"",
        askLabel: "Darma asks the organizer",
        askSub: "\"They rejected — what should I do?\"",
        mergeLabel: "Organizer gives instructions",
        returnLabel: "Darma resumes with the guest",
        agreementLabel: "Agreement confirmed",
      },
      body: "This is what that decision point looked like — on iOS and on web — a real conflict, and the choice Darma hands to the human instead of making it alone.",
      visual: "\"Resolve overlap\" screen — choosing which meeting to act on",
      quote: "Every continue was a decision Darma could make. Every stop was one it couldn't.",
    },
    "05": {
      label: "Command & control",
      title: "The apps became *command and control*",
      body: "iOS and web app — command and control. Conflicts flagged automatically, replies that need a decision, end-of-day recaps, and the settings that define Darma's rules — all without opening the email thread itself. Darma Chat lived only on iOS, for quick lookups — not for running the negotiation.",
      screens: {
        iosScroll: { src: "/darma/seq-ios-cc-scroll.webp", alt: "Darma iOS home screen — conflicts flagged at the top, scrolling down into the Email scheduling states: Needs your reply, In progress, Booked", width: 480, height: 1283 },
        iosTabBar: { src: "/darma/seq-ios-cc-tabbar.webp", alt: "Darma iOS tab bar — Home, Chat, Calendar", width: 480, height: 122 },
        web: [
          { src: "/darma/seq-web-1-select.webp", alt: "Darma web app — choosing Suggest new time for the Team Sync conflict", width: 1100, height: 900 },
          { src: "/darma/seq-web-2-times.webp", alt: "Darma web app — selecting one of 4 proposed times", width: 1100, height: 900 },
          { src: "/darma/seq-web-3-confirmed.webp", alt: "Darma web app — conflict resolved confirmation", width: 1100, height: 900 },
        ],
      },
      quote: "Email did the work. The apps kept the human in control.",
    },
    "06": {
      label: "Product Designer → Lead",
      title: "The product grew. So did *my role*",
      body: "I owned the creative direction of the entire product — the iOS app, the web app, and the marketing site. For a few months, I was also the engineering lead: I picked up terms I'd never needed before, learned Linear, translated priorities into tickets, and coordinated six engineers across five countries, alongside the design work itself.",
      quote: "I wasn't just designing the product. I was building all of it.",
    },
    "07": {
      label: "GTM & outcome",
      title: "We didn't just launch it. We tested whether people would *let Darma take over*.",
      body: "The go-to-market model gave every user 10 free meetings before needing to upgrade — and billing needed the same care as everything else: a clear meeting counter, an upgrade moment that didn't feel like a wall, and screens that explained exactly what came next.",
      visuals: [
        { src: "/darma/seq-billing-1-free.webp", alt: "Darma billing — Free plan at its 10-meeting monthly limit, with the upgrade to Premium", width: 480, height: 984 },
        { src: "/darma/seq-billing-2-premium.webp", alt: "Darma billing — Premium plan active, with plan details and payment method", width: 480, height: 984 },
        { src: "/darma/seq-billing-3-downgrade.webp", alt: "Darma billing — Premium plan set to downgrade to Free, showing what the user would lose", width: 480, height: 984 },
      ],
      stats: [
        { value: "50", label: "active users" },
        { value: "98%", label: "meeting-booked rate" },
      ],
    },
  },

  closing: {
    title: "A product you *shouldn't have to use*.",
    body: "Darma wasn't designed to become another app competing for attention — the more useful it became, the less the user needed to interact with it. The email thread became the interface, the apps became command and control, and the human stayed in the loop without having to be in every loop.\n\nWhen AI can read, decide and negotiate, good UX isn't about showing everything. It's about showing the right thing at the right moment.",
  },
};
