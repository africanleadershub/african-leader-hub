export interface Program {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  background: string;
  goal: string;
  objectives: string[];
  keyActivities: string[];
  targetGroups: string[];
  expectedOutcomes: string[];
  implementationPlan?: string;
  partners: string[];
  duration?: string;
  budget?: string;
  image: string;
  bannerImage: string;
}

export const programs: Program[] = [
  // Youth & Children Empowerment
  {
    id: "teen-mothers-empowerment",
    slug: "teen-mothers-empowerment",
    title: "Teen Mothers Restoration/Empowerment Program",
    category: "Youth & Children Empowerment",
    description: "Addresses teenage pregnancies through education, economic support, and stigma reduction.",
    background: "22,000+ cases annually in Rwanda, low contraceptive access, 38% child stunting. Focuses on cycles of poverty, school dropouts, and health risks.",
    goal: "Empower teen mothers for education/economic inclusion and protect their children.",
    objectives: [
      "Restore educational access (school/TVET re-entry)",
      "Promote economic empowerment (business skills)",
      "Protect children (health/nutrition)",
      "Reduce stigma/abandonment"
    ],
    keyActivities: [
      "Scholarships/grants for education",
      "Business training/micro-loans",
      "Mentorship/counseling (psychosocial, parenting)",
      "Health collaborations (reproductive services, maternal care)",
      "Community campaigns"
    ],
    targetGroups: ["Teen mothers (14-19)", "Their children", "Families/communities (focus: high-prevalence districts like Gatsibo)"],
    expectedOutcomes: [
      "Increased school/TVET enrollment",
      "More businesses/employment",
      "Improved child health (reduced stunting)",
      "Lower pregnancy incidence",
      "Reduced stigma"
    ],
    implementationPlan: "3-5 years; phases include research, pilots, scaling",
    partners: ["Imbuto Foundation", "UNDP Rwanda", "Rwanda Women's Network", "FAWE Rwanda", "UN Women", "MoH", "UNICEF", "NCDA", "MIGEPROF", "Save the Children", "Plan International"],
    duration: "3-5 years",
    image: "/background-pattern-3.jpg",
    bannerImage: "/hero-image.jpg"
  },
  {
    id: "fight-gbv",
    slug: "fight-gbv",
    title: "Fight Gender Based Violence",
    category: "Women Empowerment",
    description: "Addresses 1 in 3 African women affected by GBV.",
    background: "Addresses 1 in 3 African women affected by GBV.",
    goal: "Combat gender-based violence and support survivors.",
    objectives: [
      "Raise awareness",
      "Prevent GBV",
      "Support survivors",
      "Strengthen reporting"
    ],
    keyActivities: [
      "Awareness campaigns",
      "Prevention programs",
      "Support services",
      "Community education"
    ],
    targetGroups: ["Women/communities"],
    expectedOutcomes: [
      "Reduced GBV incidents",
      "Increased reporting",
      "Better support systems",
      "Community awareness"
    ],
    partners: ["Women's organizations", "Health services", "Legal aid"],
    image: "/background-pattern-3.jpg",
    bannerImage: "/hero-image.jpg"
  },
  {
    id: "know-your-rights",
    slug: "know-your-rights",
    title: "Know Your Rights Programme",
    category: "Youth & Children Empowerment",
    description: "Educates on legal and digital rights to protect youth/children from abuse, exploitation, and online risks.",
    background: "In Rwanda, 58% under 25 lack awareness of rights and reporting mechanisms.",
    goal: "Protect rights, promote holistic development, and empower as ethical leaders and advocates.",
    objectives: [
      "Raise awareness of rights/responsibilities",
      "Build trust with law enforcement",
      "Equip with advocacy/leadership skills",
      "Engage in dialogues/creative challenges",
      "Monitor changes"
    ],
    keyActivities: [
      "Posters/digital materials",
      "School/community workshops (role-plays, storytelling)",
      "Town halls with police/RIB",
      "Youth rights clubs (50+ nationwide)",
      "Digital safety campaigns (#KnowYourRightsRW on TikTok/radio)",
      "Safe internet initiatives"
    ],
    targetGroups: ["Youth/children (under 25)", "Parents", "Communities"],
    expectedOutcomes: [
      "60,000+ reached",
      "50+ clubs established",
      "Increased rights reporting",
      "Improved youth-police trust",
      "Digital safety in 30+ schools"
    ],
    implementationPlan: "2-3 years (pilot Year 1, expansion Years 2-3)",
    partners: ["Schools", "Local government", "Rwanda Data Protection Office", "National Police/RIB", "MINALOC", "MINIJUST"],
    duration: "2-3 years",
    image: "/background-pattern-3.jpg",
    bannerImage: "/hero-image.jpg"
  },
  // {
  //   id: "ubaka-program",
  //   slug: "ubaka-program",
  //   title: "Business Leaders Program (Ubaka Program)",
  //   category: "Youth & Children Empowerment",
  //   description: "A flagship leadership experience for emerging business and professional leaders. Ubaka equips participants to lead with integrity, innovation, and strategic impact; building people, institutions, and systems that uplift communities",
  //   background: "Targets 80% young women, rural women, and refugees to promote innovation and economic self-reliance amid high youth unemployment and displacement in Africa (e.g., 35 million displaced, 80% women/children).",
  //   goal: "Empower young entrepreneurs to grow businesses sustainably and drive local economic development.",
  //   objectives: [
  //     "Build capacities through training/mentorship",
  //     "Provide financial resources (grants/loans)",
  //     "Facilitate market/network access",
  //     "Promote innovation",
  //     "Strengthen ecosystems via partnerships"
  //   ],
  //   keyActivities: [
  //     "6-12 month phases including recruitment",
  //     "Training (business planning, financial literacy, digital tools)",
  //     "Mentorship (12+ hours over 3 months)",
  //     "Seed funding",
  //     "Market access (trade fairs, value chains)",
  //     "Graduation to commercial finance",
  //     "Eco-entrepreneurship challenges"
  //   ],
  //   targetGroups: ["Young women (80%)", "Rural women", "Youth in refugee camps"],
  //   expectedOutcomes: [
  //     "Businesses launched/expanded",
  //     "Revenue growth (~70% in 6 months)",
  //     "Job creation",
  //     "Gender-balanced enterprises",
  //     "Transition to sustainable financing"
  //   ],
  //   implementationPlan: "Phases: Onboarding (Month 1), Training/Mentorship (2-4), Innovation/Funding (5-8), Market Scale-Up (9-10), Sustainability (11-12)",
  //   partners: ["Inkomoko-inspired models", "Tony Elumelu Foundation", "RDB", "BRD Bank", "Mastercard Foundation", "UNDP", "YouthConnekt", "ASG Africa", "BPR Bank", "I&M Bank"],
  //   duration: "6-12 months per cohort",
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "healthy-children",
  //   slug: "healthy-children",
  //   title: "Healthy Children, Healthy Nations (Strong Families. Thriving Generations.)",
  //   category: "Youth & Children Empowerment",
  //   description: "Invests in early childhood development through nutrition, education, and family mentorship — nurturing strong foundations for ethical and flourishing future leaders.",
  //   background: "Addressing challenges like violence (41% African children affected) and neglect.",
  //   goal: "Promote children's rights, early care, civic education, and ethical leadership preparation.",
  //   objectives: [
  //     "Sensitize on child care (nutrition/breastfeeding)",
  //     "Promote school enrollment/retention",
  //     "Educate on rights/responsibilities",
  //     "Develop leadership skills",
  //     "Community outreach",
  //     "Advocate for policies"
  //   ],
  //   keyActivities: [
  //     "Workshops for mothers/caregivers",
  //     "Parent-teacher collaborations",
  //     "School clubs on UN CRC",
  //     "Mentorship/debates/camps",
  //     "Mobile outreach",
  //     "Policy advocacy (enforcement/penalties)"
  //   ],
  //   targetGroups: ["Children (0-18)", "Mothers/caregivers", "Teachers", "Communities", "Policymakers"],
  //   expectedOutcomes: [
  //     "Higher parental awareness",
  //     "Increased enrollment/retention",
  //     "Knowledgeable/ethical children",
  //     "Stronger community protection",
  //     "Enhanced laws"
  //   ],
  //   implementationPlan: "3-year pilot; participatory methods",
  //   partners: ["Imbuto Foundation", "UNDP Rwanda", "Rwanda Women's Network", "FAWE Rwanda", "UN Women", "MoH", "UNICEF", "NCDA", "MIGEPROF", "Save the Children"],
  //   duration: "3 years",
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "youth-leadership-camps",
  //   slug: "youth-leadership-camps",
  //   title: "Youth Leadership Camps",
  //   category: "Youth & Children Empowerment",
  //   description: "A mentorship and leadership development journey that nurtures purpose, character, and civic responsibility among young changemakers ready to influence their generation",
  //   background: "Addresses the need for practical skills, knowledge, and mentorship among young people.",
  //   goal: "Nurture leaders with practical skills, knowledge, and mentorship.",
  //   objectives: [
  //     "Equip with life skills (communication, entrepreneurship)",
  //     "Provide customized coaching/projects",
  //     "Offer ongoing mentorship",
  //     "Foster responsibility/innovation"
  //   ],
  //   keyActivities: [
  //     "Workshops on skills",
  //     "Personal projects (e.g., businesses, tree planting)",
  //     "Mentorship follow-up to high school graduation",
  //     "Community engagement"
  //   ],
  //   targetGroups: ["Youth (13-19) in secondary schools", "Families/communities"],
  //   expectedOutcomes: [
  //     "Improved skills/problem-solving",
  //     "Project implementation",
  //     "Financial literacy",
  //     "Career direction",
  //     "Mentorship networks"
  //   ],
  //   implementationPlan: "Phases: Recruitment, Camps, Mentorship, Evaluation",
  //   partners: ["Schools", "Youth organizations", "Financial institutions", "Local businesses"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "bategure-program",
  //   slug: "bategure-program",
  //   title: "Bategure Program (Prepared to Lead. Read to Serve)",
  //   category: "Youth & Children Empowerment",
  //   description: "Bridges education and employment by preparing graduates and early professionals for purpose-driven careers through mentorship, leadership training, and real-world readiness.",
  //   background: "Addresses skills gaps (e.g., communication, digital literacy) in Rwanda's labor market.",
  //   goal: "Enhance employability and connect to decent jobs.",
  //   objectives: [
  //     "Identify employer expectations",
  //     "Train/mentor in skills",
  //     "Integrate into curricula",
  //     "Facilitate mentorship/internships",
  //     "Digital outreach"
  //   ],
  //   keyActivities: [
  //     "Employer research/reports",
  //     "Workshops for 2,000 youth",
  //     "University/school dialogues (10 unis, 20 schools)",
  //     "CV coaching",
  //     "Internships with 100+ employers",
  //     "Online resources for 100,000"
  //   ],
  //   targetGroups: ["Final-year/recent graduates"],
  //   expectedOutcomes: [
  //     "2,000 trained",
  //     "100,000 reached",
  //     "Increased placements",
  //     "Partnerships strengthened"
  //   ],
  //   implementationPlan: "Annual; sustainability via integrations/alumni",
  //   partners: ["Universities", "Employers", "Secondary schools"],
  //   budget: "~USD 85,000/year",
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },

  // // Environment Protection & Climate Change
  // {
  //   id: "climate-ambassadors",
  //   slug: "climate-ambassadors",
  //   title: "Climate Ambassadors Programme",
  //   category: "Environment Protection & Climate Change",
  //   description: "Addresses Rwanda's climate challenges with youth as champions.",
  //   background: "Addresses Rwanda's climate challenges (deforestation, floods, food insecurity) with youth (65% under 25) as champions.",
  //   goal: "Build a network of youth ambassadors for community-led climate action.",
  //   objectives: [
  //     "Train 150+ ambassadors",
  //     "Implement grassroots initiatives",
  //     "Provide capital",
  //     "Support projects (agriculture, reforestation)",
  //     "Enhance literacy (1M reached)",
  //     "Strengthen partnerships",
  //     "Promote eco-entrepreneurship"
  //   ],
  //   keyActivities: [
  //     "Leadership Academy",
  //     "Local missions (tree planting, water management)",
  //     "Mentorship/seed funding",
  //     "Digital campaigns (#RwandaGreenLeaders)",
  //     "Innovation challenges",
  //     "Policy alignment"
  //   ],
  //   targetGroups: ["Youth across 30 districts"],
  //   expectedOutcomes: [
  //     "150+ ambassadors",
  //     "1M reached",
  //     "5,000 hectares restored",
  //     "30+ water projects",
  //     "50+ eco-enterprises",
  //     "Resilience to disasters"
  //   ],
  //   implementationPlan: "6 years (pilot in 5 districts, then national)",
  //   partners: ["UNDP", "REMA", "AfDB", "GGGI", "BRD", "MOYA", "UNEP", "FAO"],
  //   duration: "6 years",
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "one-tree-program",
  //   slug: "one-tree-program",
  //   title: "One Tree / African Family Program",
  //   category: "Environment Protection & Climate Change",
  //   description: "Tackles deforestation, malnutrition, and climate variability through household tree planting.",
  //   background: "Tackles deforestation, malnutrition, and climate variability (70% rely on agriculture); promotes household tree planting.",
  //   goal: "Mobilize households to plant/nurture trees for nutrition, income, and resilience.",
  //   objectives: [
  //     "Increase fruit access",
  //     "Restore soil/biodiversity",
  //     "Generate income",
  //     "Enhance landscapes",
  //     "Engage youth in stewardship"
  //   ],
  //   keyActivities: [
  //     "Tree distribution (fruit/alternatives like bamboo)",
  //     "Campaigns (#OneTreeRW)",
  //     "Urban innovations (rooftop gardens)",
  //     "Training/digital tools",
  //     "Cooperatives for markets",
  //     "Festivals/awards"
  //   ],
  //   targetGroups: ["Households (rural/urban)", "Youth"],
  //   expectedOutcomes: [
  //     "3M trees planted",
  //     "Improved nutrition for 15M",
  //     "Income streams",
  //     "Reduced erosion",
  //     "Youth jobs"
  //   ],
  //   implementationPlan: "Pilot (Year 1, 2 districts), expansion (Years 2-5)",
  //   partners: ["MINAGRI", "REMA", "RAB", "FAO", "UNEP", "GGGI", "AfDB"],
  //   duration: "5 years",
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },

  // // Civic Education & Leadership
  // {
  //   id: "local-leaders",
  //   slug: "local-leaders",
  //   title: "Local Leaders Program / Civic Education for Human Rights Awareness and Protection",
  //   category: "Civic Education & Leadership",
  //   description: "Addresses rights violations through awareness and reporting.",
  //   background: "Addresses rights violations (41% African children violent, 37% Rwandan women GBV) through awareness and reporting.",
  //   goal: "Foster rights awareness/protection and civic responsibility.",
  //   objectives: [
  //     "Train on principles",
  //     "Raise GBV awareness",
  //     "Strengthen reporting",
  //     "Foster accountability"
  //   ],
  //   keyActivities: [
  //     "School/university trainings (50 schools, 10 unis, 25,000 reached)",
  //     "Community dialogues (100)",
  //     "Campaigns (radio/social media, 500,000 reached)",
  //     "ToT for 200 leaders",
  //     "Referrals to RIB/Isange Centers"
  //   ],
  //   targetGroups: ["Children (10-18)", "Youth (19-35)", "Parents", "Teachers", "Leaders"],
  //   expectedOutcomes: [
  //     "25,000 trained",
  //     "500,000 reached",
  //     "Increased reporting",
  //     "Schools as civic platforms"
  //   ],
  //   implementationPlan: "12 months (phases: Consultations, Rollout, M&E)",
  //   partners: ["RGB", "MINALOC", "NURC", "National Youth Council", "Never Again Rwanda", "Imbuto", "UNICEF", "GenU", "UNDP", "Transparency International"],
  //   duration: "12-month pilot",
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "human-rights-promotion",
  //   slug: "human-rights-promotion",
  //   title: "Human Rights Promotion & Education",
  //   category: "Civic Education & Leadership",
  //   description: "Focuses on underreporting due to stigma/cultural barriers.",
  //   background: "Similar to Local Leaders Program; focuses on underreporting due to stigma/cultural barriers.",
  //   goal: "Foster rights understanding and action against GBV/violations.",
  //   objectives: [
  //     "Train on principles",
  //     "Increase GBV awareness",
  //     "Promote reporting",
  //     "Strengthen participation"
  //   ],
  //   keyActivities: [
  //     "Workshops/outreaches",
  //     "Materials (posters/digital)",
  //     "Dialogues",
  //     "Campaigns",
  //     "Referral systems"
  //   ],
  //   targetGroups: ["Children/youth (in/out of school)", "Parents", "Teachers", "Leaders"],
  //   expectedOutcomes: [
  //     "Increased knowledge",
  //     "Stronger reporting",
  //     "Reduced GBV tolerance",
  //     "Empowered leaders"
  //   ],
  //   implementationPlan: "Participatory; 12-month pilot",
  //   partners: ["Schools/universities", "CSOs", "Local government", "Media"],
  //   duration: "12 months",
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "peaceful-dispute-resolution",
  //   slug: "peaceful-dispute-resolution",
  //   title: "Peaceful / Alternative Dispute Resolution + Access to Justice",
  //   category: "Civic Education & Leadership",
  //   description: "Promotes non-violent conflict resolution.",
  //   background: "Part of civic education; promotes non-violent conflict resolution.",
  //   goal: "Promote peaceful conflict resolution and access to justice.",
  //   objectives: [
  //     "Train on conflict resolution",
  //     "Promote non-violent methods",
  //     "Strengthen community mechanisms",
  //     "Enhance access to justice"
  //   ],
  //   keyActivities: [
  //     "Training workshops",
  //     "Community mechanisms",
  //     "Mediation support",
  //     "Legal awareness"
  //   ],
  //   targetGroups: ["Youth/communities"],
  //   expectedOutcomes: [
  //     "Reduced conflicts",
  //     "Peaceful resolution",
  //     "Community harmony",
  //     "Access to justice"
  //   ],
  //   partners: ["Civic partners", "Legal aid organizations"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "wisdom-bridge",
  //   slug: "wisdom-bridge",
  //   title: "Wisdom Bridge Program",
  //   category: "Civic Education & Leadership",
  //   description: "Bridges generations for knowledge transfer in leadership/civic contexts.",
  //   background: "Bridges generations for knowledge transfer in leadership/civic contexts.",
  //   goal: "Facilitate intergenerational knowledge transfer and mentorship.",
  //   objectives: [
  //     "Connect youth with elders",
  //     "Transfer traditional knowledge",
  //     "Promote mentorship",
  //     "Build bridges between generations"
  //   ],
  //   keyActivities: [
  //     "Intergenerational dialogues",
  //     "Mentorship programs",
  //     "Knowledge sharing sessions",
  //     "Community events"
  //   ],
  //   targetGroups: ["Youth/elders"],
  //   expectedOutcomes: [
  //     "Knowledge preservation",
  //     "Intergenerational understanding",
  //     "Stronger communities",
  //     "Cultural continuity"
  //   ],
  //   partners: ["Civic partners", "Community organizations"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "service-delivery-improvement",
  //   slug: "service-delivery-improvement",
  //   title: "Improvement of Service Delivery in Key Sectors",
  //   category: "Civic Education & Leadership",
  //   description: "Enhances public services through civic advocacy.",
  //   background: "Enhances public services through civic advocacy.",
  //   goal: "Improve public service delivery through civic engagement.",
  //   objectives: [
  //     "Monitor service delivery",
  //     "Train communities",
  //     "Advocate for improvements",
  //     "Strengthen accountability"
  //   ],
  //   keyActivities: [
  //     "Monitoring/training",
  //     "Community advocacy",
  //     "Service evaluation",
  //     "Policy engagement"
  //   ],
  //   targetGroups: ["Communities"],
  //   expectedOutcomes: [
  //     "Better service delivery",
  //     "Community empowerment",
  //     "Improved accountability",
  //     "Policy influence"
  //   ],
  //   partners: ["Government/NGOs", "Service providers"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },

  // // Women Empowerment
  // {
  //   id: "women-leaders",
  //   slug: "women-leaders",
  //   title: "Women Leaders Program",
  //   category: "Women Empowerment",
  //   description: "Empowers women amid GBV and inequality.",
  //   background: "Empowers women amid GBV and inequality.",
  //   goal: "Build leadership and prevent violence.",
  //   objectives: [
  //     "Train leaders",
  //     "Fight GBV",
  //     "Promote innovators"
  //   ],
  //   keyActivities: [
  //     "Programs",
  //     "Dialogues",
  //     "Entrepreneurship support"
  //   ],
  //   targetGroups: ["Women"],
  //   expectedOutcomes: [
  //     "Empowered leaders",
  //     "Reduced GBV"
  //   ],
  //   partners: ["National Women Council", "GIZ", "MIGEPROF", "UN Women", "UNFPA", "CARE", "ActionAid", "Plan International"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "rural-innovators",
  //   slug: "rural-innovators",
  //   title: "Rural Innovators Programme (Entrepreneurs)",
  //   category: "Women Empowerment",
  //   description: "Supports rural women entrepreneurs.",
  //   background: "Supports rural women entrepreneurs.",
  //   goal: "Empower rural women through entrepreneurship.",
  //   objectives: [
  //     "Train entrepreneurs",
  //     "Provide funding",
  //     "Create networks",
  //     "Support innovation"
  //   ],
  //   keyActivities: [
  //     "Training programs",
  //     "Funding support",
  //     "Market access",
  //     "Innovation challenges"
  //   ],
  //   targetGroups: ["Rural women"],
  //   expectedOutcomes: [
  //     "Successful businesses",
  //     "Economic empowerment",
  //     "Rural development",
  //     "Innovation promotion"
  //   ],
  //   partners: ["Rural development organizations", "Financial institutions"],
  //     image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },

  // // Education
  // {
  //   id: "teacher-empowerment",
  //   slug: "teacher-empowerment",
  //   title: "Teacher Empowerment & Child Support",
  //   category: "Education",
  //   description: "Upgrades 5,000 primary teachers and supports vulnerable children.",
  //   background: "Upgrades 5,000 primary teachers (high school-qualified) and supports vulnerable children (rural/refugees/disabled) amid education barriers.",
  //   goal: "Improve education quality via teacher qualifications and scholarships.",
  //   objectives: [
  //     "Upgrade teachers to bachelor's",
  //     "Enhance methodologies",
  //     "Provide scholarships/materials",
  //     "Promote excellence"
  //   ],
  //   keyActivities: [
  //     "University partnerships/scholarships",
  //     "Mentorship/workshops",
  //     "Child identification/support (uniforms/fees)"
  //   ],
  //   targetGroups: ["Teachers (5,000)", "Vulnerable children"],
  //   expectedOutcomes: [
  //     "Better teaching",
  //     "Higher student performance",
  //     "Equitable access"
  //   ],
  //   implementationPlan: "5 years (phases: Recruitment/pilot, scaling, evaluation)",
  //   partners: ["Ministries of Education", "NGOs", "Universities"],
  //   duration: "5 years",
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },

  // // Healthcare
  // {
  //   id: "health-insurance",
  //   slug: "health-insurance",
  //   title: "Community Health Insurance Access",
  //   category: "Healthcare",
  //   description: "Ensures health coverage for vulnerable groups.",
  //   background: "Ensures health coverage for vulnerable groups.",
  //   goal: "Provide health coverage for vulnerable populations.",
  //   objectives: [
  //     "Subsidies/linkages",
  //     "Health access support"
  //   ],
  //   keyActivities: [
  //     "Health insurance subsidies",
  //     "Community linkages"
  //   ],
  //   targetGroups: ["Vulnerable people"],
  //   expectedOutcomes: [
  //     "Increased health coverage",
  //     "Better health outcomes"
  //   ],
  //   partners: ["MoH", "UNICEF", "Health partners"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },

  // // Conferences
  // {
  //   id: "women-policy-dialogue",
  //   slug: "women-policy-dialogue",
  //   title: "Women Policy Dialogue",
  //   category: "Conferences",
  //   description: "Forums on women's issues and policy advocacy.",
  //   background: "Forums on women's issues and policy advocacy.",
  //   goal: "Influence policy and advocate for women's rights.",
  //   objectives: [
  //     "Policy discussions",
  //     "Advocacy",
  //     "Stakeholder engagement",
  //     "Policy influence"
  //   ],
  //   keyActivities: [
  //     "Policy forums",
  //     "Discussions",
  //     "Advocacy campaigns",
  //     "Stakeholder meetings"
  //   ],
  //   targetGroups: ["Women/stakeholders"],
  //   expectedOutcomes: [
  //     "Policy influence",
  //     "Increased awareness",
  //     "Stakeholder engagement",
  //     "Policy changes"
  //   ],
  //   partners: ["UNICEF", "Save the Children", "World Bank", "NCDA", "MOYA", "Ministry of Justice"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "youth-policy-dialogue",
  //   slug: "youth-policy-dialogue",
  //   title: "Youth Policy Dialogue",
  //   category: "Conferences",
  //   description: "Youth-focused policy discussions and advocacy.",
  //   background: "Youth-focused policy discussions and advocacy.",
  //   goal: "Influence youth-related policies and advocate for youth rights.",
  //   objectives: [
  //     "Youth policy discussions",
  //     "Advocacy",
  //     "Stakeholder engagement",
  //     "Policy influence"
  //   ],
  //   keyActivities: [
  //     "Policy forums",
  //     "Youth discussions",
  //     "Advocacy campaigns",
  //     "Stakeholder meetings"
  //   ],
  //   targetGroups: ["Youth/stakeholders"],
  //   expectedOutcomes: [
  //     "Policy influence",
  //     "Youth engagement",
  //     "Policy changes",
  //     "Increased awareness"
  //   ],
  //   partners: ["Youth organizations", "Government", "NGOs"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // },
  // {
  //   id: "child-protection-dialogue",
  //   slug: "child-protection-dialogue",
  //   title: "Child Protection Policy Dialogue",
  //   category: "Conferences",
  //   description: "Child rights and protection policy discussions.",
  //   background: "Child rights and protection policy discussions.",
  //   goal: "Influence child protection policies and advocate for children's rights.",
  //   objectives: [
  //     "Child protection discussions",
  //     "Policy advocacy",
  //     "Stakeholder engagement",
  //     "Policy influence"
  //   ],
  //   keyActivities: [
  //     "Policy forums",
  //     "Child protection discussions",
  //     "Advocacy campaigns",
  //     "Stakeholder meetings"
  //   ],
  //   targetGroups: ["Children/stakeholders"],
  //   expectedOutcomes: [
  //     "Policy influence",
  //     "Child protection awareness",
  //     "Policy changes",
  //     "Stakeholder engagement"
  //   ],
  //   partners: ["Child protection organizations", "Government", "NGOs"],
  //   image: "/background-pattern-3.jpg",
  //   bannerImage: "/hero-image.jpg"
  // }
];

export const programCategories = [
  "Youth & Children Empowerment",
  "Environment Protection & Climate Change", 
  "Civic Education & Leadership",
  "Women Empowerment",
  "Education",
  "Healthcare",
  "Conferences"
];

export function getProgramsByCategory(category: string): Program[] {
  return programs.filter(program => program.category === category);
}

export function getProgramById(id: string): Program | undefined {
  return programs.find(program => program.id === id);
}

export function getProgramBySlug(slug: string): Program | undefined {
  return programs.find(program => program.slug === slug);
}