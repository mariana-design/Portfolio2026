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
        body: "Hi [Org], I found 3 times for your 45-min meeting — these all work for everyone:\nTue 28 Apr, 15:45–16:30\nWed 29 Apr, 13:00–13:45\nThu 30 Apr, 11:00–11:45\nReply with one of the times above, or any changes.\n— Darma, on behalf of [Organizer]",
      },
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
        "Darma could keep a negotiation going on its own — but some moments needed the human back in: when it couldn't reach an agreement, when a contact proposed something outside the rules, or when the context wasn't clear enough to act.",
      flow: ["Negotiate", "Negotiate", "Negotiate", "Decision point", "Continue / Stop"],
      body: "This is what that decision point looked like — on iOS and on web — a real conflict, and the choice Darma hands to the human instead of making it alone.",
      visual: "\"Resolve overlap\" screen — choosing which meeting to act on",
      quote: "Every continue was a decision Darma could make. Every stop was one it couldn't.",
    },
    "05": {
      label: "Command & control",
      title: "The apps became *command and control*",
      body: "iOS and web app — command and control. Conflicts flagged automatically, replies that need a decision, end-of-day recaps, and the settings that define Darma's rules — all without opening the email thread itself. Darma Chat lived only on iOS, for quick lookups — not for running the negotiation.",
      visuals: ["iOS notification — conflict alert", "web app — resolving an overlap"],
      quote: "Email did the work. The apps kept the human in control.",
    },
    "06": {
      label: "Product Designer → Lead",
      title: "The product grew. So did *my role*",
      flow: ["Product design", "Product direction", "Roadmap", "Engineering", "Product lead"],
      body: "I worked across the entire Darma experience — concept, UX, UI, flows, copy, the marketing site, iOS, web app and email. As the product evolved, so did my role: I built the product and engineering roadmap, learned Linear, and coordinated a distributed team of six engineers across five countries, while still leading product design myself.",
      quote: "I adapt quickly. If shipping the product meant taking on another function, I took it on.",
    },
    "07": {
      label: "GTM & outcome",
      title: "We didn't just launch it. We tested whether people would *let Darma take over*.",
      body: "The go-to-market model gave every user 10 free meetings before needing to upgrade — most reached 8–9, meaning most users were already letting Darma run the negotiation, again and again, before they ever hit a paywall.",
      visual: "billing screen — \"10 of 10 meetings used this month — you've reached your monthly limit\"",
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
