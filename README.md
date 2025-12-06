# African Leaders Hub (ALH) Website

A modern, responsive website for African Leaders Hub, a Rwanda-based non-profit organization dedicated to empowering youth, children, and women as ethical leaders for sustainable African development.

## 🌍 About African Leaders Hub

African Leaders Hub (ALH) is a non-profit organization based in Rwanda that focuses on:

- **Youth & Children Empowerment**: Entrepreneurship bootcamps, job readiness training, rights education
- **Environment & Climate**: Climate ambassadors program, tree planting initiatives
- **Civic Education & Leadership**: Human rights awareness, civic responsibility programs
- **Women Empowerment**: Teen mothers support, gender equality programs
- **Education**: Teacher training, scholarships for vulnerable children
- **Healthcare**: Community health insurance access

## 🚀 Features

### Website Features
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Modern UI**: Clean, professional design with ShadCN UI components
- **SEO Optimized**: Meta tags, JSON-LD structured data, sitemap, robots.txt
- **Performance**: Optimized for fast loading and accessibility
- **Accessibility**: WCAG 2.1 AA compliant with proper ARIA labels

### Pages
- **Home**: Hero section, program teasers, impact stats, partners
- **About**: Mission, vision, team, partners information
- **Programs**: Detailed program information with individual program pages
- **Get Involved**: Donation, volunteer, and partnership forms
- **Contact**: Contact form, office information, FAQ
- **News**: Latest updates and program news

### Technical Features
- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS framework
- **ShadCN UI**: Modern, accessible component library
- **Data Management**: File-based data storage in `/src/data/`
- **SEO**: Comprehensive SEO optimization

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS, ShadCN UI
- **Forms**: React Hook Form, Zod validation
- **Icons**: Lucide React
- **Development**: ESLint, Prettier

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── programs/          # Programs pages
│   │   └── [id]/         # Individual program pages
│   ├── get-involved/      # Get involved page
│   ├── contact/           # Contact page
│   ├── news/              # News pages
│   │   └── [id]/         # Individual news articles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt
├── components/            # Reusable components
│   ├── navigation.tsx     # Header navigation
│   └── footer.tsx         # Footer component
├── data/                  # Data files (acts as database)
│   ├── programs.ts        # Program data
│   ├── team.ts            # Team information
│   ├── partners.ts        # Partner organizations
│   ├── impact.ts          # Impact statistics
│   └── news.ts            # News articles
└── lib/                   # Utility functions
    ├── seo.ts             # SEO utilities
    └── utils.ts           # General utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd african-leaders-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Data Management

The website uses a file-based data system located in `/src/data/`. Each data file contains:

- **Programs**: Complete program information with objectives, activities, outcomes
- **Team**: Leadership team, board members, and advisors
- **Partners**: Government, international, and local partner organizations
- **Impact**: Statistics and impact metrics
- **News**: Articles and program updates

## 🎨 Design System

### Color Palette
- **Primary**: Black (#000000) - Text and backgrounds
- **Accent**: Brown (#8B4513) - Africa shape, buttons, highlights
- **Secondary**: 
  - Green (#228B22) - Environment/climate sections
  - Orange (#FF8C00) - Youth/empowerment sections
  - Blue (#1E90FF) - Education/rights sections
- **Neutral**: White (#FFFFFF), Light Gray (#F5F5F5)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible contrast ratios

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta descriptions and keywords
- **JSON-LD**: Structured data for organization, programs, and news
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine directives
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter sharing optimization

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Color contrast** ratios > 4.5:1
- **Alt text** for all images
- **Semantic HTML** structure

## 🌐 Deployment

The website is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **Any static hosting service**

### Environment Variables
No environment variables are required for basic functionality.

## 📞 Contact Information

- **Email**: africanleadershub@gmail.com
- **Phone**: +250 788 358 891
- **Location**: Kigali, Rwanda
- **Twitter**: @A_LeadersHub

## 📄 License

This project is proprietary to African Leaders Hub. All rights reserved.

## 🤝 Contributing

For contributions or modifications, please contact the development team.

---

**Building Africa's Future through People, Purpose, and Possibility** 🌍