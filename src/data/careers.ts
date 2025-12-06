export interface Career {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  description: string;
  detailsHtml: string; // HTML content for responsibilities, requirements, benefits, etc.
  applicationDeadline?: string;
  postedDate: string;
  featured?: boolean;
}

export const careers: Career[] = [];
export const currentCareers: Career[] = [
  {
    id: "program-coordinator",
    slug: "program-coordinator",
    title: "Program Coordinator",
    department: "Programs",
    location: "Kigali, Rwanda",
    type: "full-time",
    description:
      "We are seeking a dedicated Program Coordinator to oversee the implementation of our youth empowerment and education programs. The ideal candidate will have experience in program management, community engagement, and working with diverse stakeholders.",
    detailsHtml: `
        <p>
        We are seeking a dedicated Program Coordinator to oversee the implementation of our youth empowerment and education programs. The ideal candidate will have experience in program management, community engagement, and working with diverse stakeholders.</p>
          <h3 >Key Responsibilities</h3>
          <ul>
            <li>
              Coordinate program activities and ensure timely implementation
            </li>
            <li>
              Manage relationships with program partners and stakeholders
            </li>
            <li>
              Monitor and evaluate program outcomes
            </li>
            <li>
              Prepare program reports and documentation
            </li>
            <li>
              Support program participants and address their needs
            </li>
            <li>
              Organize training sessions and workshops
            </li>
          </ul>
          <h3 >Requirements</h3>
          <ul>
            <li>
              Bachelor's degree in Social Sciences, Education, or related field
            </li>
            <li>
              Minimum 3 years of experience in program coordination
            </li>
            <li>
              Strong organizational and project management skills
            </li>
            <li>
              Excellent communication and interpersonal skills
            </li>
            <li>
              Ability to work with diverse communities
            </li>
            <li>
              Proficiency in English and Kinyarwanda
            </li>
          </ul>
          <h3 >Preferred Qualifications</h3>
          <ul>
            <li>Master's degree in relevant field</li>
            <li>Experience in youth development programs</li>
            <li>Knowledge of monitoring and evaluation frameworks</li>
          </ul>
          <h3 >Benefits</h3>
          <ul>
            <li>Competitive salary package</li>
            <li>
              Health insurance coverage
            </li>
            <li>
              Professional development opportunities
            </li>
            <li>
              Flexible working arrangements
            </li>
            <li>
              Opportunity to make a meaningful impact
            </li>
          </ul>
    `,
    postedDate: "2025-01-15",
    featured: true,
  },
  {
    id: "communications-officer",
    slug: "communications-officer",
    title: "Communications Officer",
    department: "Communications",
    location: "Kigali, Rwanda",
    type: "full-time",
    description:
      "Join our team as a Communications Officer to help tell the story of African Leaders Hub. You will be responsible for developing and implementing communication strategies, managing social media, and creating engaging content.",
    detailsHtml: `
        <p>
        Join our team as a Communications Officer to help tell the story of African Leaders Hub. You will be responsible for developing and implementing communication strategies, managing social media, and creating engaging content.</p>
          <h3 >Key Responsibilities</h3>
          <ul>
            <li>
              Develop and implement communication strategies
            </li>
            <li>
              Manage social media accounts and online presence
            </li>
            <li>
              Create content for website, newsletters, and marketing materials
            </li>
            <li>
              Write press releases and media communications
            </li>
            <li>
              Coordinate with media partners
            </li>
            <li>
              Track and analyze communication metrics
            </li>
          </ul>
          <h3 >Requirements</h3>
          <ul>
            <li>
              Bachelor's degree in Communications, Journalism, or related field
            </li>
            <li>
              Minimum 2 years of experience in communications or marketing
            </li>
            <li>
              Strong writing and editing skills
            </li>
            <li>              
              Experience with social media management
            </li>
            <li>
              Proficiency in design software (Canva, Adobe Creative Suite)
            </li>
            <li>
              Excellent English writing skills
            </li>
          </ul>
          <h3 >Preferred Qualifications</h3>
          <ul>
            <li>
              Experience in non-profit communications
            </li>
            <li>
              Video editing and photography skills
            </li>
            <li>
              Knowledge of digital marketing tools
            </li>
          </ul>
          <h3 >Benefits</h3>
          <ul>
            <li>
              Competitive salary
            </li>
            <li>
              Health insurance
            </li>
            <li>
              Creative work environment
            </li>
            <li>
              Professional growth opportunities
            </li>
          </ul>
    `,
    postedDate: "2025-01-20",
    featured: true,
  },
  {
    id: "monitoring-evaluation-officer",
    slug: "monitoring-evaluation-officer",
    title: "Monitoring & Evaluation Officer",
    department: "Programs",
    location: "Kigali, Rwanda",
    type: "full-time",
    description:
      "We are looking for a Monitoring & Evaluation Officer to strengthen our data collection, analysis, and reporting systems. This role is critical for measuring program impact and informing strategic decisions.",
    detailsHtml: `
        <p>
        We are looking for a Monitoring & Evaluation Officer to strengthen our data collection, analysis, and reporting systems. This role is critical for measuring program impact and informing strategic decisions.</p>
          <h3>Key Responsibilities</h3>
          <ul>
            <li>
              Design and implement M&E frameworks for programs
            </li>
            <li>
              Collect and analyze program data
            </li>
            <li>
              Prepare impact reports and presentations
            </li>
            <li>
              Conduct field visits and data collection
            </li>
            <li>
              Train staff on M&E tools and processes
            </li>
            <li>
              Support program teams in data-driven decision making
            </li>
          </ul>
          <h3 >Requirements</h3>
          <ul>
            <li>
            Bachelor's degree in Statistics, Economics, Social Sciences, or related field
            </li>
            <li>
            Minimum 3 years of experience in M&E
            </li>
            <li>
            Strong analytical and data management skills
            </li>
            <li>
            Proficiency in data analysis software (Excel, SPSS, or similar)
            </li>
            <li>
            Experience with survey design and data collection
            </li>
            <li>
            Excellent report writing skills
            </li>
          </ul>
          <h3 >Preferred Qualifications</h3>
          <ul>
            <li>
            Master's degree in relevant field
            </li>
            <li>
            Experience with database management
            </li>
            <li>
            Knowledge of impact evaluation methodologies
            </li>
          </ul>
          <h3 >Benefits</h3>
          <ul>
            <li>
            Competitive salary package
            </li>
            <li>
            Health insurance
            </li>
            <li>
            Professional development support
            </li>
            <li>
            Opportunity to work with diverse programs
            </li>
          </ul>
        </div>
      </div>
    `,
    postedDate: "2025-01-18",
  },
  {
    id: "field-officer",
    slug: "field-officer",
    title: "Field Officer",
    department: "Programs",
    location: "Kigali, Rwanda (with field travel)",
    type: "full-time",
    description:
      "Join our field team to directly engage with communities and implement programs on the ground. This role involves working closely with program participants, community leaders, and local partners.",
    detailsHtml: `
        <p>
        Join our field team to directly engage with communities and implement programs on the ground. This role involves working closely with program participants, community leaders, and local partners.
        </p>
        <h3 >Key Responsibilities</h3>
          <ul>
            <li>
              Implement program activities in communities
            </li>
            <li>
              Conduct community outreach and mobilization
            </li>
            <li>
              Facilitate training sessions and workshops
            </li>
            <li>
              Collect field data and participant feedback
            </li>
            <li>
              Build relationships with community stakeholders
            </li>
            <li>
              Support program participants throughout their journey
            </li>
          </ul>
          <h3 >Requirements</h3>
          <ul>
            <li>
              Diploma or Bachelor's degree in relevant field
            </li>
            <li>
              Minimum 2 years of field experience
            </li>
            <li>
              Strong community engagement skills
            </li>
            <li>
              Ability to work in rural and urban settings
            </li>
            <li>
              Excellent communication skills in Kinyarwanda and English
            </li>
            <li>
              Willingness to travel frequently
            </li>
          </ul>
          <h3 >Preferred Qualifications</h3>
          <ul>
            <li>
              Experience in youth or women empowerment programs
            </li>
            <li>
              Motorcycle license
            </li>
            <li>
              Experience with community-based organizations
            </li>
          </ul>
          <h3 >Benefits</h3>
          <ul>
            <li>
              Competitive salary
            </li>
            <li>
              Transportation allowance
            </li>
            <li>
              Field allowances
            </li>
            <li>
              Health insurance
            </li>
            <li>
              Meaningful community impact
            </li>
          </ul>
    `,
    postedDate: "2025-01-22",
  },
  {
    id: "finance-officer",
    slug: "finance-officer",
    title: "Finance Officer",
    department: "Finance & Administration",
    location: "Kigali, Rwanda",
    type: "full-time",
    description:
      "We are seeking a Finance Officer to manage our financial operations, budgeting, and reporting. The ideal candidate will ensure financial compliance and support program financial management.",
    detailsHtml: `
        <p>
        We are seeking a Finance Officer to manage our financial operations, budgeting, and reporting. The ideal candidate will ensure financial compliance and support program financial management.</p>
          <h3 >Key Responsibilities</h3>
          <ul>
            <li>
              Manage day-to-day financial operations
            </li>
            <li>
            Prepare budgets and financial reports
            </li>
            <li>
            Process payments and manage accounts
            </li>
            <li>
            Maintain accurate financial records
            </li>
            <li>
            Support grant financial reporting
            </li>
            <li>
            Ensure compliance with financial policies
            </li>
          </ul>
          <h3 >Requirements</h3>
          <ul>
            <li>
            Bachelor's degree in Accounting, Finance, or related field
            </li>
            <li>
            Minimum 3 years of experience in finance
            </li>
            <li>
            Professional accounting qualification (CPA or equivalent)
            </li>
            <li>
            Proficiency in accounting software
            </li>
            <li>
            Strong attention to detail
            </li>
            <li>
            Excellent organizational skills
            </li>
          </ul>
          <h3 >Preferred Qualifications</h3>
          <ul>
            <li>
              Experience in non-profit finance
            </li>
            <li>
            Knowledge of grant management
            </li>
            <li>
            Experience with QuickBooks or similar software
            </li>
          </ul>
          <h3 >Benefits</h3>
          <ul>
            <li>
            Competitive salary
            </li>
            <li>
            Health insurance
            </li>
            <li>
            Professional development
            </li>
            <li>
            Stable work environment
            </li>
          </ul>
    `,
    postedDate: "2025-01-19",
  },
];

export function getCareerBySlug(slug: string): Career | undefined {
  return careers.find((career) => career.slug === slug);
}

export function getFeaturedCareers(): Career[] {
  return careers.filter((career) => career.featured);
}

export function getCareersByDepartment(department: string): Career[] {
  return careers.filter((career) => career.department === department);
}

export function getCareersByType(type: Career["type"]): Career[] {
  return careers.filter((career) => career.type === type);
}
