export interface ImpactStat {
  id: string;
  title: string;
  value: string;
  description: string;
  category: string;
}

export const impactStats: ImpactStat[] = [
  {
    id: "teachers-upgraded",
    title: "Teachers Upgraded",
    value: "5,000",
    description: "Primary teachers upgraded to bachelor's degree level",
    category: "Education"
  },
  {
    id: "climate-ambassadors",
    title: "Climate Ambassadors",
    value: "150+",
    description: "Youth trained as climate action ambassadors",
    category: "Environment"
  },
  {
    id: "youth-educated-rights",
    title: "Youth Educated on Rights",
    value: "60,000+",
    description: "Young people reached with rights awareness programs",
    category: "Rights Education"
  },
  {
    id: "trees-planted-goal",
    title: "Trees Planted Goal",
    value: "3 Million",
    description: "Target for trees planted through One Tree Program",
    category: "Environment"
  },
  {
    id: "teen-mothers-supported",
    title: "Teen Mothers Supported",
    value: "22,000+",
    description: "Annual cases of teenage pregnancy addressed",
    category: "Women Empowerment"
  },
  {
    id: "youth-trained-job-readiness",
    title: "Youth Trained for Jobs",
    value: "2,000+",
    description: "Graduates trained in job readiness and career skills",
    category: "Youth Empowerment"
  },
  {
    id: "rights-clubs-established",
    title: "Rights Clubs Established",
    value: "50+",
    description: "Youth rights clubs established nationwide",
    category: "Rights Education"
  },
  {
    id: "hectares-restored",
    title: "Hectares Restored",
    value: "5,000",
    description: "Land restored through climate action programs",
    category: "Environment"
  },
  {
    id: "schools-reached",
    title: "Schools Reached",
    value: "50+",
    description: "Schools engaged in civic education programs",
    category: "Education"
  },
  {
    id: "universities-partnered",
    title: "Universities Partnered",
    value: "10+",
    description: "Universities integrated with job readiness programs",
    category: "Education"
  },
  {
    id: "employers-connected",
    title: "Employers Connected",
    value: "100+",
    description: "Employers providing mentorship and internships",
    category: "Youth Empowerment"
  },
  {
    id: "community-dialogues",
    title: "Community Dialogues",
    value: "100+",
    description: "Community dialogues conducted on human rights",
    category: "Civic Education"
  }
];

export const impactCategories = [
  "Education",
  "Environment", 
  "Rights Education",
  "Women Empowerment",
  "Youth Empowerment",
  "Civic Education"
];

export function getImpactStatsByCategory(category: string): ImpactStat[] {
  return impactStats.filter(stat => stat.category === category);
}
