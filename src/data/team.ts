import { biographies } from "./biographies";

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  linkedin?: string;
  biography?: string;
  nationality?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  committee?: string;
  responsibilities?: string;
}

// Executive Committee
export const executiveCommittee: TeamMember[] = [
  {
    id: "jean-jacques",
    name: "Jean Jacques IRADUKUNDA",
    position: "Founder and President",
    image: "/team/jean-jacques-iradukunda.jpeg",
    linkedin: "https://www.linkedin.com/in/jean-jacques-iradukunda-mdp-867aa1103/",
    committee: "Executive Committee",
    responsibilities: "Senior Management, Strategic Oversight",
    biography: biographies["jean-jacques"],
    nationality: "Rwandan",
    twitter: "https://x.com/JJ_Iradukunda",
    instagram: "https://www.instagram.com/jeanjacquesiradukunda/"
  },
  {
    id: "jean-eric-hirwa",
    name: "Jean Eric Hirwa",
    position: "Vice Chair of the Board",
    image: "/team/hirwa-jean-eric.jpeg",
    linkedin: "https://rw.linkedin.com/in/jean-eric-hirwa",
    committee: "Executive Committee",
    responsibilities: "Senior Management, Technology, Sustainability and Innovation",
    biography: biographies["jean-eric-hirwa"],
    nationality: "Rwandan",
    twitter: "https://x.com/hirwa_jean_eric",
    instagram: "https://www.instagram.com"
  },
  {
    id: "sharon-furaha",
    name: "Marie Sharon Furaha",
    position: "Board Treasurer",
    image: "/team/sharon-furaha.png",
    linkedin: "https://www.linkedin.com/in/sharon-furaha-mba-077b3aa1",
    committee: "Executive Committee",
    responsibilities: "Senior Management, Admin & Financial Management, Fundraising",
    biography: biographies["sharon-furaha"],
    nationality: "Rwandan",
    twitter: "https://x.com/FergoSharon"
  },
  {
    id: "uwase-ishimwe",
    name: "Uwase Ishimwe Diane",
    position: "Board Secretary",
    image: "/team/ishimwe-diane.jpg",
    committee: "Executive Committee",
    responsibilities: "Youth Ambassadors & Youth Programming",
    biography: biographies["uwase-ishimwe"],
    nationality: "Rwandan",
  }
];

// Audit Committee
export const auditCommittee: TeamMember[] = [
  {
    id: "kevin-karlo",
    name: "Kevin Karlo Lakot",
    position: "President, Audit Committee",
    image: "/team/kevin-karlo-lakot.jpg",
    committee: "Audit Committee",
    responsibilities: "Senior Management, Civic Education Programming (Rights for both women and youth)",
    biography: biographies["kevin-karlo"],
    nationality: "Ugandan"
  },
  {
    id: "nabaasa-kellen",
    name: "Nabaasa Kellen",
    position: "Vice President, Audit Committee",
    image: "/team/nabaasa-kellen.jpg",
    linkedin: "https://www.linkedin.com/in/kellen-nabaasa-00298a2a8",
    committee: "Audit Committee",
    responsibilities: "Senior Management, Youth Programming",
    biography: biographies["nabaasa-kellen"],
    nationality: "Ugandan",
    twitter: "https://x.com/NabaasaKel85977",
    instagram: "https://www.instagram.com/nabaasakellen"
  }
];

// Conflict Resolution Committee
export const conflictResolutionCommittee: TeamMember[] = [
  {
    id: "tariba-traore",
    name: "Tariba Traoré",
    position: "President, Conflict Resolution Committee",
    image: "/team/tariba-traore.jpeg",
    linkedin: "https://www.linkedin.com/in/tariba-traore-2p",
    committee: "Conflict Resolution Committee",
    responsibilities: "Senior Management, Community Empowerment Programming",
    biography: biographies["tariba-traore"],
    nationality: "Malian",
    facebook: "https://www.facebook.com/tariba.traore"
  },
  {
    id: "ifeza-aimee",
    name: "Ifeza Aimee Opulence",
    position: "Vice President, Conflict Resolution Committee",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
    linkedin: "https://linkedin.com/in/ifeza-aimee-opulence",
    committee: "Conflict Resolution Committee",
    responsibilities: "Youth Ambassadors & Youth Programming",
    biography: biographies["ifeza-aimee"],
    nationality: "Rwandan",
    twitter: "@ifezaaimee_alh",
    facebook: "ifeza.aimee",
    instagram: "@ifezaaimee_alh"
  }
];

// Legacy exports for backward compatibility
export const teamMembers: TeamMember[] = [];
export const boardMembers: TeamMember[] = [];
export const advisors: TeamMember[] = [];