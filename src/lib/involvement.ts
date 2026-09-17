export const INVOLVEMENT = {
  donate: {
    href: "/donate",
    title: "Donate",
    description: "Fuel education, rights, and climate programs for young African leaders.",
    banner: "/hero-image.jpg",
  },
  volunteer: {
    href: "/volunteer",
    title: "Volunteer",
    description: "Share your time and skills with youth, teachers, and community partners.",
    banner: "/tyler-franta-iusJ25iYu1c-unsplash.jpg",
  },
  partner: {
    href: "/partner",
    title: "Partner with us",
    description: "Collaborate with government, civil society, and private-sector allies.",
    banner: "/background-pattern-2.jpg",
  },
} as const;

export const involvementLinks = [INVOLVEMENT.donate, INVOLVEMENT.volunteer, INVOLVEMENT.partner];
