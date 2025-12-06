export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  bannerImage: string;
  featured?: boolean;
  tags?: string[];
  readTime?: string;
}

export const newsArticles: NewsArticle[] = [];

export const sampleNewsArticles: NewsArticle[] = [
  {
    id: "know-your-rights-launch",
    slug: "know-your-rights-launch",
    title: "Launch of Know Your Rights Campaign Reaches 60,000+ Youth",
    excerpt: "ALH's comprehensive rights awareness program has successfully educated over 60,000 young people across Rwanda on their legal and digital rights.",
    content: `
      <div>
        <p>The African Leaders Hub (ALH) has achieved a remarkable milestone with its Know Your Rights Programme, successfully reaching over 60,000 young people across Rwanda with comprehensive education on legal and digital rights.</p>
        
        <h2>Program Overview</h2>
        <p>The Know Your Rights Programme represents one of ALH's most impactful initiatives, designed to address the critical gap in rights awareness among Rwanda's youth population. With 58% of young people under 25 lacking awareness of their rights and reporting mechanisms, this program fills a crucial need in the community.</p>
        
        <h3>Key Achievements</h3>
        <ul>
          <li><strong>60,000+ Youth Reached:</strong> Direct education and awareness sessions across schools and communities</li>
          <li><strong>50+ Youth Rights Clubs:</strong> Established nationwide to provide ongoing support and education</li>
          <li><strong>30+ Schools:</strong> Integrated digital safety programs into school curricula</li>
          <li><strong>Enhanced Reporting:</strong> Significant increase in rights violation reporting through established channels</li>
        </ul>
        
        <h2>Program Components</h2>
        
        <h3>Educational Workshops</h3>
        <p>The program conducts comprehensive workshops in schools and communities, utilizing interactive methods such as role-plays and storytelling to make rights education engaging and memorable. These sessions cover:</p>
        <ul>
          <li>Fundamental human rights and responsibilities</li>
          <li>Digital rights and online safety</li>
          <li>Legal protections for children and youth</li>
          <li>Reporting mechanisms and support services</li>
        </ul>
        
        <h3>Community Engagement</h3>
        <p>ALH has organized town halls with police and RIB (Rwanda Investigation Bureau) officials to build trust between youth and law enforcement agencies. These dialogues have been instrumental in:</p>
        <ul>
          <li>Demystifying law enforcement processes</li>
          <li>Building confidence in reporting mechanisms</li>
          <li>Creating safe spaces for youth to voice concerns</li>
          <li>Strengthening community-police relationships</li>
        </ul>
        
        <h3>Digital Campaigns</h3>
        <p>The program leverages digital platforms to reach a wider audience, including:</p>
        <ul>
          <li><strong>#KnowYourRightsRW:</strong> Social media campaigns on TikTok and radio</li>
          <li><strong>Digital Materials:</strong> Posters and educational content distributed online</li>
          <li><strong>Safe Internet Initiatives:</strong> Programs to protect youth from online exploitation</li>
        </ul>
        
        <h2>Impact and Outcomes</h2>
        <p>The Know Your Rights Programme has demonstrated significant impact across multiple dimensions:</p>
        
        <h3>Increased Awareness</h3>
        <p>Pre and post-program assessments show a dramatic increase in rights awareness among participants. Young people now understand their fundamental rights and know where to seek help when these rights are violated.</p>
        
        <h3>Enhanced Reporting</h3>
        <p>The program has led to a substantial increase in rights violation reporting, indicating that young people now feel more confident and equipped to seek help when needed.</p>
        
        <h3>Community Transformation</h3>
        <p>Beyond individual impact, the program has contributed to broader community transformation by:</p>
        <ul>
          <li>Creating a culture of rights awareness</li>
          <li>Strengthening protective mechanisms</li>
          <li>Building trust between youth and authorities</li>
          <li>Empowering young people as advocates for their peers</li>
        </ul>
        
        <h2>Partnerships and Collaboration</h2>
        <p>The success of the Know Your Rights Programme is largely due to strategic partnerships with:</p>
        <ul>
          <li><strong>Educational Institutions:</strong> Schools and universities providing access to students</li>
          <li><strong>Government Agencies:</strong> Rwanda Data Protection Office, National Police, MINALOC, MINIJUST</li>
          <li><strong>Local Government:</strong> District and sector-level support for community outreach</li>
        </ul>
        
        <h2>Future Plans</h2>
        <p>Building on this success, ALH plans to:</p>
        <ul>
          <li>Expand the program to reach 100,000+ youth by 2025</li>
          <li>Establish additional youth rights clubs in underserved areas</li>
          <li>Develop digital learning modules for remote education</li>
          <li>Strengthen partnerships with international organizations</li>
        </ul>
        
        <h2>Testimonials</h2>
        <blockquote>
          <p>"The Know Your Rights program changed my life. I now understand my rights and feel confident to speak up when something is wrong. I've also helped my friends understand their rights too."</p>
          <cite>- Marie, 17, Kigali</cite>
        </blockquote>
        
        <blockquote>
          <p>"As a teacher, I've seen the positive impact of this program on our students. They are more confident, aware, and better equipped to protect themselves and others."</p>
          <cite>- Jean Paul, Teacher, Huye District</cite>
        </blockquote>
        
        <h2>Conclusion</h2>
        <p>The Know Your Rights Programme exemplifies ALH's commitment to empowering Africa's future leaders through education and awareness. By equipping young people with knowledge of their rights and the confidence to exercise them, the program is building a foundation for a more just and equitable society.</p>
        
        <p>As we celebrate this milestone, we remain committed to expanding our reach and impact, ensuring that every young person in Rwanda has access to comprehensive rights education and support.</p>
      </div>
    `,
    date: "2025-06-15",
    author: "ALH Team",
    category: "Program Updates",
    image: "/background-pattern-2.jpg",
    bannerImage: "/background-pattern-2.jpg",
    featured: true,
    tags: ["Rights Education", "Youth Empowerment", "Digital Safety", "Community Engagement"],
    readTime: "8 min read"
  },
  {
    id: "climate-ambassadors-expansion",
    slug: "climate-ambassadors-expansion",
    title: "Climate Ambassadors Programme Expands to 30 Districts",
    excerpt: "ALH's environmental leadership program now operates across all 30 districts in Rwanda, training youth as climate action champions.",
    content: `
      <div >
        <p >The African Leaders Hub's Climate Ambassadors Programme has achieved a historic milestone by expanding its operations to all 30 districts across Rwanda, creating a comprehensive network of youth climate champions.</p>
        
        <h2>National Expansion Success</h2>
        <p>This expansion represents a significant achievement in ALH's mission to address climate change through youth leadership. The program now operates in every district of Rwanda, ensuring comprehensive coverage and impact across the nation.</p>
        
        <h3>Program Statistics</h3>
        <ul>
          <li><strong>150+ Climate Ambassadors:</strong> Trained across all 30 districts</li>
          <li><strong>1 Million People Reached:</strong> Through climate literacy initiatives</li>
          <li><strong>5,000 Hectares Target:</strong> Land restoration projects underway</li>
          <li><strong>30+ Water Projects:</strong> Community water management initiatives</li>
          <li><strong>50+ Eco-Enterprises:</strong> Youth-led environmental businesses</li>
        </ul>
        
        <h2>Climate Challenges in Rwanda</h2>
        <p>Rwanda faces significant climate challenges that the program addresses:</p>
        <ul>
          <li><strong>Deforestation:</strong> Loss of forest cover affecting biodiversity and water cycles</li>
          <li><strong>Flooding:</strong> Increased frequency of floods due to climate change</li>
          <li><strong>Food Insecurity:</strong> Agricultural challenges from changing weather patterns</li>
          <li><strong>Water Scarcity:</strong> Reduced water availability in some regions</li>
        </ul>
        
        <h2>Program Components</h2>
        
        <h3>Leadership Academy</h3>
        <p>The Climate Ambassadors Leadership Academy provides comprehensive training in:</p>
        <ul>
          <li>Climate science and environmental principles</li>
          <li>Community organizing and leadership skills</li>
          <li>Project management and implementation</li>
          <li>Advocacy and policy engagement</li>
          <li>Eco-entrepreneurship and green business development</li>
        </ul>
        
        <h3>Local Missions</h3>
        <p>Ambassadors lead local missions including:</p>
        <ul>
          <li><strong>Tree Planting Campaigns:</strong> Reforestation and agroforestry projects</li>
          <li><strong>Water Management:</strong> Community water conservation and management</li>
          <li><strong>Waste Management:</strong> Recycling and waste reduction initiatives</li>
          <li><strong>Renewable Energy:</strong> Solar and other clean energy projects</li>
        </ul>
        
        <h3>Digital Campaigns</h3>
        <p>The program leverages digital platforms for awareness:</p>
        <ul>
          <li><strong>#RwandaGreenLeaders:</strong> Social media campaign showcasing youth action</li>
          <li><strong>Climate Education:</strong> Online learning modules and resources</li>
          <li><strong>Innovation Challenges:</strong> Competitions for climate solutions</li>
        </ul>
        
        <h2>Impact and Achievements</h2>
        
        <h3>Environmental Impact</h3>
        <p>The program has achieved significant environmental impact:</p>
        <ul>
          <li>Restoration of degraded lands through tree planting</li>
          <li>Improved water management in communities</li>
          <li>Reduced waste through recycling initiatives</li>
          <li>Increased adoption of renewable energy solutions</li>
        </ul>
        
        <h3>Social Impact</h3>
        <p>Beyond environmental benefits, the program creates social impact:</p>
        <ul>
          <li>Youth employment through eco-enterprises</li>
          <li>Community resilience to climate shocks</li>
          <li>Enhanced food security through sustainable agriculture</li>
          <li>Strengthened community cohesion around environmental goals</li>
        </ul>
        
        <h2>Partnerships and Support</h2>
        <p>The program's success is supported by strategic partnerships:</p>
        <ul>
          <li><strong>UNDP:</strong> Technical and financial support</li>
          <li><strong>REMA:</strong> Rwanda Environment Management Authority collaboration</li>
          <li><strong>AfDB:</strong> African Development Bank funding</li>
          <li><strong>GGGI:</strong> Global Green Growth Institute partnership</li>
          <li><strong>BRD:</strong> Development bank support for eco-enterprises</li>
        </ul>
        
        <h2>Success Stories</h2>
        
        <h3>District-Level Impact</h3>
        <p>Each district has unique success stories:</p>
        <ul>
          <li><strong>Northern Province:</strong> Focus on mountain ecosystem restoration</li>
          <li><strong>Eastern Province:</strong> Agricultural adaptation and water management</li>
          <li><strong>Southern Province:</strong> Forest conservation and biodiversity protection</li>
          <li><strong>Western Province:</strong> Lake and wetland conservation</li>
        </ul>
        
        <h2>Future Vision</h2>
        <p>Building on this national expansion, ALH envisions:</p>
        <ul>
          <li>Regional expansion to other East African countries</li>
          <li>International climate leadership programs</li>
          <li>Policy influence at national and regional levels</li>
          <li>Innovation hubs for climate technology</li>
        </ul>
        
        <h2>Testimonials</h2>
        <blockquote>
          <p>"Being a Climate Ambassador has given me the opportunity to make a real difference in my community. I've led tree planting projects that have restored our local ecosystem and created jobs for young people."</p>
          <cite>- Eric, Climate Ambassador, Musanze District</cite>
        </blockquote>
        
        <blockquote>
          <p>"The Climate Ambassadors Programme has transformed our district. We now have better water management, more trees, and a community that understands the importance of environmental protection."</p>
          <cite>- District Mayor, Nyagatare</cite>
        </blockquote>
        
        <h2>Conclusion</h2>
        <p>The expansion of the Climate Ambassadors Programme to all 30 districts represents a significant milestone in Rwanda's climate action efforts. By empowering youth as climate leaders, ALH is building a sustainable future for Rwanda and setting an example for the region.</p>
        
        <p>This comprehensive approach to climate action through youth leadership demonstrates that meaningful environmental change is possible when communities are empowered and equipped with the right knowledge and resources.</p>
      </div>
    `,
    date: "2025-06-10",
    author: "ALH Team", 
    category: "Environment",
    image: "/background-pattern-2.jpg",
    bannerImage: "/background-pattern-2.jpg",
    featured: true,
    tags: ["Climate Action", "Youth Leadership", "Environmental Protection", "Community Development"],
    readTime: "10 min read"
  },
  {
    id: "teen-mothers-empowerment-success",
    slug: "teen-mothers-empowerment-success",
    title: "Teen Mothers Empowerment Program Shows Positive Results",
    excerpt: "ALH's comprehensive support program for teen mothers is helping restore educational access and economic opportunities.",
    content: `
      <div >
        <p >The African Leaders Hub's Teen Mothers Restoration and Empowerment Program has demonstrated remarkable success in transforming the lives of young mothers across Rwanda, providing them with educational opportunities, economic empowerment, and comprehensive support services.</p>
        
        <h2>Program Overview</h2>
        <p>With over 22,000 teenage pregnancies occurring annually in Rwanda, the Teen Mothers Empowerment Program addresses a critical need in the community. The program specifically targets young mothers aged 14-19, providing them with comprehensive support to break cycles of poverty and stigma.</p>
        
        <h3>Key Statistics</h3>
        <ul>
          <li><strong>22,000+ Annual Cases:</strong> Teenage pregnancies addressed through the program</li>
          <li><strong>38% Child Stunting:</strong> Reduced through improved nutrition and care</li>
          <li><strong>High-Prevalence Districts:</strong> Focus on areas like Gatsibo with concentrated efforts</li>
          <li><strong>Comprehensive Support:</strong> Education, economic, health, and psychosocial services</li>
        </ul>
        
        <h2>Program Components</h2>
        
        <h3>Educational Support</h3>
        <p>The program provides comprehensive educational support including:</p>
        <ul>
          <li><strong>Scholarships:</strong> Full tuition coverage for school re-entry</li>
          <li><strong>TVET Programs:</strong> Technical and vocational education opportunities</li>
          <li><strong>Flexible Learning:</strong> Accommodations for young mothers' schedules</li>
          <li><strong>Academic Support:</strong> Tutoring and mentoring services</li>
        </ul>
        
        <h3>Economic Empowerment</h3>
        <p>Economic empowerment is a core component of the program:</p>
        <ul>
          <li><strong>Business Training:</strong> Entrepreneurship and business skills development</li>
          <li><strong>Micro-Loans:</strong> Access to startup capital for small businesses</li>
          <li><strong>Market Access:</strong> Support in connecting with markets and customers</li>
          <li><strong>Financial Literacy:</strong> Money management and savings education</li>
        </ul>
        
        <h2>Impact and Results</h2>
        
        <h3>Educational Outcomes</h3>
        <p>The program has achieved significant educational impact:</p>
        <ul>
          <li>Increased school enrollment among teen mothers</li>
          <li>Higher completion rates in TVET programs</li>
          <li>Improved academic performance</li>
          <li>Enhanced career prospects</li>
        </ul>
        
        <h3>Economic Impact</h3>
        <p>Economic empowerment results include:</p>
        <ul>
          <li>Successful business startups by program participants</li>
          <li>Increased household income</li>
          <li>Reduced dependency on family support</li>
          <li>Enhanced financial independence</li>
        </ul>
        
        <h2>Testimonials</h2>
        <blockquote>
          <p>"The Teen Mothers Program gave me a second chance at life. I was able to return to school, start my own business, and provide a better future for my child. I'm now studying at university and running a successful tailoring business."</p>
          <cite>- Grace, 19, Program Graduate</cite>
        </blockquote>
        
        <h2>Conclusion</h2>
        <p>The Teen Mothers Empowerment Program represents ALH's commitment to addressing complex social challenges through comprehensive, holistic approaches. By providing education, economic opportunities, health support, and psychosocial care, the program is breaking cycles of poverty and stigma while empowering young mothers to build better futures for themselves and their children.</p>
      </div>
    `,
    date: "2025-06-05",
    author: "ALH Team",
    category: "Women Empowerment",
    image: "/background-pattern-2.jpg",
    bannerImage: "/background-pattern-2.jpg",
    featured: false,
    tags: ["Teen Mothers", "Women Empowerment", "Education", "Economic Development"],
    readTime: "9 min read"
  },
  {
    id: "bategure-job-readiness",
    slug: "bategure-job-readiness",
    title: "Bategure Program Bridges Skills Gap for 2,000+ Graduates",
    excerpt: "ALH's job readiness initiative has successfully trained over 2,000 university graduates in essential workplace skills.",
    content: `
      <div >
        <p >The African Leaders Hub's Bategure Program has successfully addressed the critical skills gap among university graduates, training over 2,000 young people in essential workplace competencies and connecting them with meaningful employment opportunities.</p>
        
        <h2>Program Overview</h2>
        <p>The Bategure Program (Job Readiness, Career Coaching & Employment) was designed to bridge the gap between university education and workplace requirements. With graduate unemployment being a significant challenge in Rwanda, this program provides comprehensive training in essential skills that employers value.</p>
        
        <h3>Program Statistics</h3>
        <ul>
          <li><strong>2,000+ Graduates Trained:</strong> Direct skills development participants</li>
          <li><strong>100,000+ Reached:</strong> Through online resources and digital outreach</li>
          <li><strong>10+ Universities:</strong> Partner institutions providing access</li>
          <li><strong>20+ Schools:</strong> Secondary schools engaged in career guidance</li>
          <li><strong>100+ Employers:</strong> Partner companies offering internships and jobs</li>
        </ul>
        
        <h2>Skills Gap Analysis</h2>
        <p>The program addresses critical skills gaps identified through comprehensive employer research:</p>
        
        <h3>Communication Skills</h3>
        <ul>
          <li>Professional writing and presentation skills</li>
          <li>Public speaking and confidence building</li>
          <li>Cross-cultural communication</li>
          <li>Digital communication etiquette</li>
        </ul>
        
        <h3>Digital Literacy</h3>
        <ul>
          <li>Microsoft Office proficiency</li>
          <li>Digital marketing and social media</li>
          <li>Data analysis and visualization</li>
          <li>Online collaboration tools</li>
        </ul>
        
        <h2>Program Components</h2>
        
        <h3>Comprehensive Training Workshops</h3>
        <p>Intensive training sessions cover essential workplace skills:</p>
        <ul>
          <li><strong>Soft Skills Development:</strong> Communication, teamwork, leadership</li>
          <li><strong>Technical Skills:</strong> Industry-specific competencies</li>
          <li><strong>Digital Skills:</strong> Technology proficiency and digital tools</li>
          <li><strong>Career Development:</strong> Job search strategies and career planning</li>
        </ul>
        
        <h3>CV Coaching and Interview Preparation</h3>
        <p>Individualized support includes:</p>
        <ul>
          <li>Professional CV development</li>
          <li>Interview skills training</li>
          <li>Portfolio development</li>
          <li>LinkedIn profile optimization</li>
        </ul>
        
        <h2>Impact and Outcomes</h2>
        
        <h3>Employment Outcomes</h3>
        <p>The program has achieved significant employment results:</p>
        <ul>
          <li>85% of participants secure employment within 6 months</li>
          <li>Average salary increase of 40% compared to non-participants</li>
          <li>High job satisfaction and retention rates</li>
          <li>Career advancement opportunities</li>
        </ul>
        
        <h2>Testimonials</h2>
        <blockquote>
          <p>"The Bategure Program transformed my career prospects. The skills I learned helped me secure a great job and advance quickly. I'm now leading a team and mentoring other young professionals."</p>
          <cite>- David, Program Graduate, Kigali</cite>
        </blockquote>
        
        <h2>Conclusion</h2>
        <p>The Bategure Program exemplifies ALH's commitment to addressing youth unemployment through comprehensive skills development and industry engagement. By bridging the gap between education and employment, the program is creating pathways to meaningful careers and economic empowerment for Rwanda's young people.</p>
      </div>
    `,
    date: "2025-05-28",
    author: "ALH Team",
    category: "Youth Empowerment",
    image: "/background-pattern-2.jpg",
    bannerImage: "/background-pattern-2.jpg",
    featured: false,
    tags: ["Job Readiness", "Skills Development", "Youth Employment", "Career Development"],
    readTime: "11 min read"
  },
  {
    id: "one-tree-program-milestone",
    slug: "one-tree-program-milestone",
    title: "One Tree Program Reaches Major Milestone in Tree Planting",
    excerpt: "ALH's household tree planting initiative is making significant progress toward the 3 million trees target.",
    content: `
      <div >
        <p >The African Leaders Hub's One Tree / African Family Program has achieved a remarkable milestone in its ambitious mission to plant 3 million trees across Rwanda, transforming landscapes and improving livelihoods through household tree planting initiatives.</p>
        
        <h2>Program Overview</h2>
        <p>The One Tree Program addresses critical environmental and social challenges in Rwanda, where 70% of the population relies on agriculture and faces increasing climate variability. The program promotes household tree planting for nutrition, income generation, and environmental resilience.</p>
        
        <h3>Program Statistics</h3>
        <ul>
          <li><strong>3 Million Trees Target:</strong> Ambitious goal for nationwide tree planting</li>
          <li><strong>15 Million People Benefiting:</strong> Improved nutrition through fruit access</li>
          <li><strong>Household Focus:</strong> Rural and urban family participation</li>
          <li><strong>Multi-Purpose Approach:</strong> Nutrition, income, and environmental benefits</li>
        </ul>
        
        <h2>Environmental Challenges Addressed</h2>
        <p>The program tackles several critical environmental issues:</p>
        
        <h3>Deforestation</h3>
        <ul>
          <li>Loss of forest cover affecting biodiversity</li>
          <li>Soil erosion and degradation</li>
          <li>Reduced water retention capacity</li>
          <li>Climate change acceleration</li>
        </ul>
        
        <h3>Malnutrition</h3>
        <ul>
          <li>Limited access to nutritious fruits</li>
          <li>Seasonal food insecurity</li>
          <li>Nutritional deficiencies in rural areas</li>
          <li>High child stunting rates</li>
        </ul>
        
        <h2>Program Components</h2>
        
        <h3>Tree Distribution</h3>
        <p>The program provides various types of trees to households:</p>
        <ul>
          <li><strong>Fruit Trees:</strong> Mango, avocado, papaya, citrus varieties</li>
          <li><strong>Nut Trees:</strong> Macadamia, cashew, and other nut varieties</li>
          <li><strong>Timber Trees:</strong> Fast-growing species for construction</li>
          <li><strong>Bamboo:</strong> Alternative materials and erosion control</li>
        </ul>
        
        <h3>Community Campaigns</h3>
        <p>Engagement campaigns include:</p>
        <ul>
          <li><strong>#OneTreeRW:</strong> Social media awareness campaign</li>
          <li><strong>Community Events:</strong> Tree planting festivals and competitions</li>
          <li><strong>School Programs:</strong> Student engagement and education</li>
          <li><strong>Religious Partnerships:</strong> Faith-based community mobilization</li>
        </ul>
        
        <h2>Impact and Achievements</h2>
        
        <h3>Environmental Impact</h3>
        <p>The program has achieved significant environmental benefits:</p>
        <ul>
          <li>Restored degraded lands and improved soil quality</li>
          <li>Enhanced biodiversity and ecosystem services</li>
          <li>Improved water retention and reduced erosion</li>
          <li>Increased carbon sequestration and climate resilience</li>
        </ul>
        
        <h3>Nutritional Impact</h3>
        <p>Nutrition outcomes include:</p>
        <ul>
          <li>Improved access to fresh fruits year-round</li>
          <li>Enhanced dietary diversity and nutrition</li>
          <li>Reduced child malnutrition and stunting</li>
          <li>Better maternal and child health outcomes</li>
        </ul>
        
        <h2>Testimonials</h2>
        <blockquote>
          <p>"The One Tree Program has transformed our family's life. We now have fresh fruits year-round, additional income from selling mangoes, and our children are healthier. Our land is also more productive and beautiful."</p>
          <cite>- Jean Baptiste, Farmer, Eastern Province</cite>
        </blockquote>
        
        <h2>Conclusion</h2>
        <p>The One Tree Program represents ALH's holistic approach to addressing environmental, nutritional, and economic challenges through simple yet powerful solutions. By empowering households to plant and care for trees, the program creates multiple benefits that ripple through communities and generations.</p>
      </div>
    `,
    date: "2025-05-20",
    author: "ALH Team",
    category: "Environment",
    image: "/background-pattern-2.jpg",
    bannerImage: "/background-pattern-2.jpg",
    featured: false,
    tags: ["Tree Planting", "Environmental Conservation", "Food Security", "Community Development"],
    readTime: "12 min read"
  },
  {
    id: "teacher-empowerment-progress",
    slug: "teacher-empowerment-progress",
    title: "Teacher Empowerment Program Upgrades 5,000 Educators",
    excerpt: "ALH's teacher development initiative continues to improve education quality through professional development.",
    content: `
      <div >
        <p >The African Leaders Hub's Teacher Empowerment and Child Support Program has achieved a significant milestone by successfully upgrading 5,000 primary school teachers to bachelor's degree level, dramatically improving education quality across Rwanda.</p>
        
        <h2>Program Overview</h2>
        <p>The Teacher Empowerment Program addresses a critical need in Rwanda's education system, where many primary school teachers lack the necessary qualifications to provide quality education. The program focuses on upgrading teachers from high school level to bachelor's degree qualifications while supporting vulnerable children in their educational journey.</p>
        
        <h3>Program Statistics</h3>
        <ul>
          <li><strong>5,000 Teachers Upgraded:</strong> From high school to bachelor's degree level</li>
          <li><strong>Vulnerable Children Supported:</strong> Scholarships, uniforms, and materials</li>
          <li><strong>Rural Focus:</strong> Targeting underserved rural communities</li>
          <li><strong>Refugee Support:</strong> Including displaced and refugee children</li>
          <li><strong>Disabled Children:</strong> Special support for children with disabilities</li>
        </ul>
        
        <h2>Education Challenges Addressed</h2>
        <p>The program tackles several critical education challenges:</p>
        
        <h3>Teacher Qualifications</h3>
        <ul>
          <li>Many primary teachers lack bachelor's degrees</li>
          <li>Limited access to professional development</li>
          <li>Outdated teaching methodologies</li>
          <li>Insufficient subject matter expertise</li>
        </ul>
        
        <h3>Student Access</h3>
        <ul>
          <li>Vulnerable children face barriers to education</li>
          <li>Rural students lack resources and support</li>
          <li>Refugee children need specialized assistance</li>
          <li>Disabled children require inclusive education</li>
        </ul>
        
        <h2>Program Components</h2>
        
        <h3>Teacher Development</h3>
        <p>Comprehensive teacher upgrading includes:</p>
        <ul>
          <li><strong>University Partnerships:</strong> Collaboration with higher education institutions</li>
          <li><strong>Scholarship Programs:</strong> Full tuition coverage for teachers</li>
          <li><strong>Flexible Learning:</strong> Evening and weekend classes</li>
          <li><strong>Distance Learning:</strong> Online and hybrid options</li>
        </ul>
        
        <h3>Child Support Services</h3>
        <p>Comprehensive child support includes:</p>
        <ul>
          <li><strong>Scholarships:</strong> Tuition and fee coverage</li>
          <li><strong>Educational Materials:</strong> Books, supplies, and resources</li>
          <li><strong>School Uniforms:</strong> Clothing and accessories</li>
          <li><strong>Transportation:</strong> School bus and transport support</li>
        </ul>
        
        <h2>Impact and Outcomes</h2>
        
        <h3>Teacher Performance</h3>
        <p>The program has achieved significant teacher improvements:</p>
        <ul>
          <li>Enhanced teaching quality and effectiveness</li>
          <li>Improved student engagement and learning outcomes</li>
          <li>Increased teacher confidence and job satisfaction</li>
          <li>Better classroom management and discipline</li>
        </ul>
        
        <h3>Student Achievement</h3>
        <p>Student outcomes demonstrate program success:</p>
        <ul>
          <li>Higher test scores and academic performance</li>
          <li>Improved attendance and retention rates</li>
          <li>Enhanced critical thinking and problem-solving skills</li>
          <li>Better preparation for secondary education</li>
        </ul>
        
        <h2>Testimonials</h2>
        <blockquote>
          <p>"The Teacher Empowerment Program transformed my career. I now have a bachelor's degree, use modern teaching methods, and my students are performing much better. I'm proud to be a qualified educator."</p>
          <cite>- Teacher, Northern Province</cite>
        </blockquote>
        
        <h2>Conclusion</h2>
        <p>The Teacher Empowerment and Child Support Program exemplifies ALH's commitment to improving education quality through comprehensive teacher development and student support. By upgrading teacher qualifications and supporting vulnerable children, the program is building a stronger foundation for Rwanda's education system.</p>
      </div>
    `,
    date: "2025-05-15",
    author: "ALH Team",
    category: "Education",
    image: "/background-pattern-2.jpg",
    bannerImage: "/background-pattern-2.jpg",
    featured: false,
    tags: ["Teacher Development", "Education Quality", "Child Support", "Professional Development"],
    readTime: "13 min read"
  }
];

export const newsCategories = [
  "Program Updates",
  "Environment",
  "Women Empowerment", 
  "Youth Empowerment",
  "Education",
  "Partnerships",
  "Events"
];

export function getNewsByCategory(category: string): NewsArticle[] {
  return newsArticles.filter(article => article.category === category);
}

export function getFeaturedNews(): NewsArticle[] {
  return newsArticles.filter(article => article.featured);
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find(article => article.slug === slug);
}

export function getLatestNews(limit: number = 3): NewsArticle[] {
  return newsArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}