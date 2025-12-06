import React from "react";
import MigeprofLogo from "../assets/migeprof-logo";
import MinistryOfYouthAndArtsLogo from "../assets/ministry-of-youth-and-arts-logo";
import MinagriLogo from "../assets/minagri";
import MinalocLogo from "../assets/minaloc";
import MinijustLogo from "../assets/minijust";
import MohRwandaLogo from "../assets/moh-rwanda-logo";

export interface Partner {
  id: string;
  name: string;
  category: string;
  logo: string | React.ReactNode;
  website?: string;
  logoType?: "custom" | "image";
}

export const partners: Partner[] = [];
export const samplePartners: Partner[] = [
  // Government Partners
  {
    id: "migeprof",
    name: "Ministry of Gender and Family Promotion (MIGEPROF)",
    category: "Government",
    logoType: "custom",
    logo: <MigeprofLogo />,
  },
  {
    id: "moya",
    name: "Ministry of Youth and Arts (MOYA)",
    category: "Government",
    logoType: "custom",
    logo: <MinistryOfYouthAndArtsLogo />
  },
  {
    id: "minagri",
    name: "Ministry of Agriculture and Animal Resources (MINAGRI)",
    category: "Government",
    logoType: "custom",
    logo: <MinagriLogo />
  },
  {
    id: "minaloc",
    name: "Ministry of Local Government (MINALOC)",
    category: "Government",
    logoType: "custom",
    logo: <MinalocLogo />
  },
  {
    id: "minijust",
    name: "Ministry of Justice (MINIJUST)",
    category: "Government",
    logoType: "custom",
    logo: <MinijustLogo />
  },
  {
    id: "moh",
    name: "Ministry of Health (MoH-Rwanda)",
    category: "Government",
    logoType: "custom",
    logo: <MohRwandaLogo />
  },

  // International Organizations
  {
    id: "unicef",
    name: "UNICEF",
    category: "International",
    logoType: "image",
    logo: "/logos/UNICEF_Logo.png"
  },
  {
    id: "undp",
    name: "UNDP",
    category: "International",
    logoType: "image",
    logo: "/logos/undp logo.png"
  },
  {
    id: "un-women",
    name: "UN Women",
    category: "International",
    logoType: "image",
    logo: "/logos/UN_WOMEN_Logo.svg.png"
  },
  {
    id: "unfpa",
    name: "UNFPA",
    category: "International",
    logoType: "image",
    logo: "/logos/UNFPA_logo.svg.png"
  },
  {
    id: "unep",
    name: "UNEP",
    category: "International",
    logoType: "image",
    logo: "/logos/United_Nations_Environment_Programme_Logo.svg.png"
  },
  {
    id: "fao",
    name: "FAO",
    category: "International",
    logoType: "image",
    logo: "/logos/FAO_logo.svg.png"
  },

  // Development Banks
  {
    id: "afdb",
    name: "African Development Bank (AfDB)",
    category: "Development Bank",
    logoType: "image",
    logo: "/logos/Logo_Afrikanische_Entwicklungsbank.svg.png"
  },
  {
    id: "brd",
    name: "Development Bank of Rwanda (BRD)",
    category: "Development Bank",
    logoType: "image",
    logo: "/logos/logo-dbr.png"
  },

  // Local NGOs
  {
    id: "imbuto",
    name: "Imbuto Foundation",
    category: "Local NGO",
    logoType: "image",
    logo: "/logos/IMBUTO-FOUNDATION-LOGO-PNG-June-2017-1-e1670829251457.png",
  },
  {
    id: "rwanda-women-network",
    name: "Rwanda Women's Network",
    category: "Local NGO",
    logoType: "image",
    logo: "/logos/rwanda-women-network-logo.jpeg",
  },
  {
    id: "fawe-rwanda",
    name: "FAWE Rwanda",
    category: "Local NGO",
    logoType: "image",
    logo: "/logos/fawe-rwanda.png",
  },
  {
    id: "save-children",
    name: "Save the Children",
    category: "International NGO",
    logoType: "image",
    logo: "/logos/Logo_SavetheChildren.png",
  },
  {
    id: "plan-international",
    name: "Plan International",
    category: "International NGO",
    logoType: "image",
    logo: "/logos/planinternational-logo.png.webp",
  },
  {
    id: "care",
    name: "CARE",
    category: "International NGO",
    logoType: "image",
    logo: "/logos/care-social-image.png.webp"
  },
  {
    id: "actionaid",
    name: "ActionAid",
    category: "International NGO",
    logoType: "image",
    logo: "/logos/Actionaid_logo.svg.png"
  },

  // Private Sector
  {
    id: "mastercard-foundation",
    name: "Mastercard Foundation",
    category: "Private Foundation",
    logoType: "image",
    logo: "/logos/mastercard-foundation-logo-vector-graphics-png-favpng-UsFjRuXQtv7NUJ2MREqQTpqy2.jpg"
  },
  {
    id: "tony-elumelu",
    name: "Tony Elumelu Foundation",
    category: "Private Foundation",
    logoType: "image",
    logo: "/logos/tony-elumelu-foundation-logo.jpeg"
  },
  {
    id: "rdb",
    name: "Rwanda Development Board (RDB)",
    category: "Government Agency",
    logoType: "image",
    logo: "/logos/logo-rdb.jpg"
  },
  {
    id: "bpr-bank",
    name: "BPR Bank",
    category: "Financial Institution",
    logoType: "image",
    logo: "/logos/BPR-Bank-Logo-1.png"
  },
  {
    id: "im-bank",
    name: "I&M Bank",
    category: "Financial Institution",
    logoType: "image",
    logo: "/logos/I&M_Logo.pdf.jpg"
  },

  // Youth Organizations
  {
    id: "youthconnekt",
    name: "YouthConnekt",
    category: "Youth Organization",
    logoType: "image",
    logo: "/logos/youthconnekt-logo.png"
  },
  {
    id: "national-youth-council",
    name: "National Youth Council",
    category: "Youth Organization",
    logoType: "image",
    logo: "/logos/NYC-logo.png"
  },

  // Environmental Organizations
  {
    id: "rema",
    name: "Rwanda Environment Management Authority (REMA)",
    category: "Environmental Agency",
    logoType: "image",
    logo: "/logos/LOGO_Rema.png"
  },
  {
    id: "gggi",
    name: "Global Green Growth Institute (GGGI)",
    category: "Environmental Organization",
    logoType: "image",
    logo: "/logos/Global_Green_Growth_Institute_Logo.svg_.png"
  },

  // Education Partners
  {
    id: "nurc",
    name: "National Unity and Reconciliation Commission (NURC)",
    category: "Government Agency",
    logoType: "image",
    logo: "/logos/National-Unity-Reconciliation-Rwanda-Logo-Vector.svg-.png"
  },
  {
    id: "rgb",
    name: "Rwanda Governance Board (RGB)",
    category: "Government Agency",
    logoType: "image",
    logo: "/logos/rgb_logo.jpg"
  },
  {
    id: "never-again-rwanda",
    name: "Never Again Rwanda",
    category: "Local NGO",
    logoType: "image",
    logo: "/logos/never-again-rwanda-logo.png"
  },
  {
    id: "transparency-international",
    name: "Transparency International",
    category: "International NGO",
    logoType: "image",
    logo: "/logos/transparency-international-logo.png"
  }
];

export const partnerCategories = [
  "Government",
  "International", 
  "Development Bank",
  "Local NGO",
  "International NGO",
  "Private Foundation",
  "Government Agency",
  "Financial Institution",
  "Youth Organization",
  "Environmental Agency",
  "Environmental Organization"
];

export function getPartnersByCategory(category: string): Partner[] {
  return partners.filter(partner => partner.category === category);
}
