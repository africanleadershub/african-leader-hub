export interface Organization {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  logo: string;
  address: {
    "@type": string;
    addressCountry: string;
    addressLocality: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
    email: string;
  };
  sameAs: string[];
  foundingDate: string;
  nonprofitStatus: string;
}

export interface Program {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
  };
  audience: {
    "@type": string;
    audienceType: string;
  };
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
}

export interface NewsArticle {
  "@context": string;
  "@type": string;
  headline: string;
  description: string;
  author: {
    "@type": string;
    name: string;
  };
  datePublished: string;
  publisher: {
    "@type": string;
    name: string;
    logo: {
      "@type": string;
      url: string;
    };
  };
}

export function generateOrganizationSchema(): Organization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "African Leaders Hub",
    description: "Empowering youth, children, and women as ethical leaders for sustainable African development through education, rights awareness, entrepreneurship, and environmental action.",
    url: "https://africanleadershub.org",
    logo: "https://africanleadershub.org/logo.png",
    address: {
      "@type": "PostalAddress",
      addressCountry: "RW",
      addressLocality: "Kigali"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+250788358891",
      contactType: "customer service",
      email: "africanleadershub@gmail.com"
    },
    sameAs: [
      "https://twitter.com/A_LeadersHub"
    ],
    foundingDate: "2020",
    nonprofitStatus: "NonProfit"
  };
}

export function generateProgramSchema(programName: string, description: string): Program {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalProgram",
    name: programName,
    description: description,
    provider: {
      "@type": "Organization",
      name: "African Leaders Hub"
    },
    audience: {
      "@type": "Audience",
      audienceType: "Youth, Children, Women"
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

export function generateNewsArticleSchema(
  headline: string, 
  description: string, 
  author: string, 
  datePublished: string
): NewsArticle {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: headline,
    description: description,
    author: {
      "@type": "Person",
      name: author
    },
    datePublished: datePublished,
    publisher: {
      "@type": "Organization",
      name: "African Leaders Hub",
      logo: {
        "@type": "ImageObject",
        url: "https://africanleadershub.org/logo.png"
      }
    }
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "African Leaders Hub",
    description: "Empowering Africa's future leaders through education, rights awareness, entrepreneurship, and environmental action.",
    url: "https://africanleadershub.org",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://africanleadershub.org/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}
