export const strands = {
  tags: ["B2B FINTECH", "WHITE-LABEL BANKING TECH"],
  title: "Strands / Moneybox",
  subtitle: "Designing the demo that *sells the technology*",
  intro: [
    "Strands (part of CRIF) builds financial management technology that banks license and rebrand as their own — white-label PFM/BFM tools banks like HSBC, Crédit Agricole and Akbank use inside their own apps.",
    "My job was to design and build the app that showed banks what their customers' experience could look like — both web and iOS — the reference product the sales team used to close deals. I was the only designer on the team, working alongside 2 engineers, a product owner, a PM and QA.",
  ],
  meta: [
    { label: "Role", value: "Product Designer (only designer on the team)" },
    { label: "Team", value: "2 engineers, 1 product owner, 1 PM, 1 QA" },
    { label: "Platform", value: "Web · iOS" },
    { label: "Status", value: "Internal tool, used to sell to banks" },
  ],

  panels: {
    "01": {
      label: "The showcase app",
      title: "Selling a *feeling*, not a feature list",
      body: "Banks don't buy a spec sheet — they buy what their own customers would feel using it. When I joined, Strands had the backend logic (account aggregation, a financial calendar, spending analysis) but no real interface to show for it. I designed and built the UI and UX from the ground up, and pushed back on the backend itself where it didn't hold up — because a demo that breaks doesn't sell anything.",
      visuals: ["Account Aggregation flow", "Financial Calendar flow", "Financial Analysis flow"],
      quote: "There was no interface to inherit. If a bank was going to picture their logo on it, I had to build the thing worth picturing first.",
    },
    "02": {
      label: "Moneybox, from zero",
      title: "No base, no precedent, *just a product owner and a whiteboard*",
      body: "Moneybox went a step further: it wasn't backend logic waiting for a UI. It didn't exist at all. It was our flagship feature — a savings goals tool I built alongside the product owner from nothing, deciding screen by screen: choosing a purpose (travel, a car, debt, a rainy-day fund), setting an amount and a target date, then picking how to fund it — manually, or automatically on a monthly, weekly or daily schedule.",
      visual: "goal creation flow — purpose, amount, frequency, calendar",
      quote: "There was nothing to redesign. We had to decide what 'right' even looked like first.",
    },
    "03": {
      label: "A goal has more states",
      title: "Designing the whole *lifecycle*, not just the happy path",
      body: [
        "A savings goal isn't just “saving” or “done.” I designed eight states for a single goal — on track, off track, paused, expired, completed, releasing, released, deleting — each with its own message, its own available actions, and its own way of guiding the user to what's next.",
        "Every add-money or withdraw-money action ran through an “Adjust impact” step first: showing exactly how the change would move the monthly payment or the target date, before the user confirmed anything. Every delete required a confirmation explaining, in plain terms, that the saved money would be refunded — and where.",
      ],
      states: ["On track", "Off track", "Paused", "Expired", "Completed", "Releasing", "Released", "Deleting"],
      quote: "If the user was going to trust us with their money, every state had to explain itself — not just the good ones.",
    },
    "04": {
      label: "A bank that doesn't exist yet",
      title: "Backend-first, *client-agnostic*",
      body: "Every screen had to work for whichever bank licensed it next — different currencies, different rules, different brand. I couldn't design for one user; I had to design for a system flexible enough to become anyone's app.",
      quote: "The interface wasn't the client. The client was whoever hadn't signed yet.",
    },
  },

  closing: {
    title: "Design without a *single, definite user*",
    body: "Strands taught me to design without a single, definite user in front of me — and to design for what happens after the happy path, not just the demo screen. A savings goal that's expired, or a withdrawal that changes someone's monthly plan, needed just as much care as the moment it's created. Building for a demo that had to convince a room of bankers, and for a product a real bank would eventually hand to millions of customers who'd never know my name was on it.",
  },

  next: {
    href: "/work/darma",
    title: "Darma",
    description: "Designing when AI should act — and when humans should step in.",
  },
};
