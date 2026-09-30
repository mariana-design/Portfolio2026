export type Testimonial = {
  quote: string;
  short: string;
  emphasis: string;
  name: string;
  role: string;
};

// Ordered most recent to oldest, matching LinkedIn. Only the 5 most recent are shown here —
// the rest are linked out to LinkedIn directly (see TestimonialCarousel's linkedinHref).
export const testimonials: Testimonial[] = [
  {
    short:
      "Mariana is a very complete professional, having a lot of knowledge about UX/UI design, service design, and product design. We had a lot of synergy, we managed to achieve very significant results and were appreciated by customers.",
    quote:
      "Mariana is a very complete professional, having a lot of knowledge about UX/UI design, service design, and product design. I had the great pleasure of working with her on projects together, me as a UX Researcher, and she as a service designer, and we had a lot of synergy, we managed to achieve very significant results and were appreciated by customers. Mariana also has enormous potential to plan and streamline workshops with users and stakeholders.",
    emphasis: "we managed to achieve very significant results and were appreciated by customers",
    name: "Caio Miolo",
    role: "Ph.D. in Design / UX Researcher — worked with Mariana on the same team",
  },
  {
    short:
      "During our time working together, Mariana consistently demonstrated her exceptional skills, dedication, and hard work. She is a true team player, always willing to go above and beyond to support her colleagues.",
    quote:
      "During our time working together, Mariana consistently demonstrated her exceptional skills, dedication, and hard work. Mariana's proactivity and commitment to excellence make her an outstanding member of the team. She is a true team player, always willing to go above and beyond to support her colleagues and ensure that projects are completed successfully.",
    emphasis: "exceptional skills, dedication, and hard work",
    name: "Brenda Bighetto",
    role: "Senior UX Researcher — worked with Mariana on the same team",
  },
  {
    short:
      "I can say she is the ideal designer to work with. She's dedicated, creative, and self-motivated. Mariana's hard work, expertise in design and creative thinking has immensely helped the team.",
    quote:
      "Mariana worked as a UX Designer at Debutify. I can say she is the ideal designer to work with. She's dedicated, creative, and self-motivated. Mariana's hard work, expertise in design and creative thinking has immensely helped the team. It was indeed a delight to work with Mariana and I recommend her for the position of UX Designer in your company.",
    emphasis: "the ideal designer to work with",
    name: "Raluca Voicu",
    role: "UI/UX Designer at Trasys Greece — managed Mariana directly",
  },
  {
    short:
      "Mariana would be a brilliant asset on any team looking to ideate, define, and develop outstanding products. If I were starting my own company, Mariana would be the first I would call.",
    quote:
      "Mariana would be a brilliant asset on any team looking to ideate, define, and develop outstanding products. I met Mariana when we were about to finish our bachelor's degree and working alongside her was incredibly fulfilling. She combines design and consumer behavior with an entrepreneurial energy that ensures the quality of the work she delivers every time. She focuses on important details without leaving aside the strategic vision and the big picture. If I were starting my own company, Mariana would be the first I would call.",
    emphasis: "If I were starting my own company, Mariana would be the first I would call",
    name: "Josep Villanueva",
    role: "Product Designer @ Peripheral AI — worked with Mariana on the same team",
  },
  {
    short:
      "Mariana destaca por su actitud pro-activa y la definen sus ganas de mejorar constantemente. Su organización y planificación estratégica fueron clave en varios de nuestros proyectos.",
    quote:
      "Mariana destaca por su actitud pro-activa y la definen sus ganas de mejorar constantemente. En el estudio estamos contentos de haber contado con su talento y ganas. Su organización y planificación estratégica fueron clave en varios de nuestros proyectos para ofrecer un resultado por encima de las expectativas del cliente. Recomiendo a cualquier equipo que busque una líder para proyectos que hable con ella.",
    emphasis: "Recomiendo a cualquier equipo que busque una líder para proyectos que hable con ella",
    name: "Juan Umbert Rosselló",
    role: "Entrepreneur, CEO, Innovator & creative soul — managed Mariana directly",
  },
];
