export type CertificateCategory =
  | 'Analytics & AI'
  | 'Blockchain & Web3'
  | 'Networking & Enterprise'
  | 'Conferences & Workshops';

export type CertificateStatus = 'Verified' | 'Pending Upload';

export interface CertificateItem {
  id: string;
  title: string;
  subtitle?: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  status: CertificateStatus;
  /**
   * Drop your certificate image (.png, .jpg, .webp) or PDF (.pdf) inside `public/certificates/`
   * and set `certificateUrl: '/certificates/your-file.pdf'`, then change `status` to `'Verified'`.
   */
  certificateUrl: string | null;
  previewImageUrl?: string;
  credentialId?: string;
  verifyUrl?: string;
  notes?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  context: string;
  client: string;
  summary: string;
  roles: string[];
  techStack: string[];
  repoUrl: string;
  highlights: string[];
  caseStudy: {
    problem: string;
    approach: string;
    deliverables: string[];
    impact: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  program: string;
  organization: string;
  location: string;
  period: string;
  summary: string;
  responsibilities: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  specialization?: string;
  institution: string;
  location: string;
  period: string;
  status: string;
  highlights?: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface AchievementItem {
  id: string;
  placement: string;
  title: string;
  venue: string;
  date: string;
}

export interface OrganizationItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  details?: string;
}

export const profile = {
  name: 'Reymark A. Levita',
  shortName: 'R. Levita',
  headline: '4th-Year BS Information Technology Student (Major in Business Analytics)',
  positioning: 'Aspiring Data Analyst, Systems Analyst, & Web Development OJT Intern',
  availabilityBadge: 'Available for OJT / Internship · 2026–2027',
  location: 'Lipa City, Batangas, Philippines',
  email: 'levitareymark11@gmail.com',
  phone: '0926 397 1342',
  phoneHref: '+639263971342',
  githubUrl: 'https://github.com/elliwinx',
  githubHandle: 'github.com/elliwinx',
  linkedinUrl: 'https://linkedin.com/in/reymark-levita',
  linkedinHandle: 'linkedin.com/in/reymark-levita',
  avatarUrl: '/reymark-profile.jpg',
  /**
   * Optional: Drop a PDF resume into `public/` (e.g. `public/Reymark_Levita_Resume.pdf`)
   * and set `resumeUrl: '/Reymark_Levita_Resume.pdf'`.
   * Leave as `null` to use the built-in interactive Resume Summary / Print view.
   */
  resumeUrl: '/Reymark_Levita_Resume.pdf' as string | null,
  resumePages: ['/resume-page-1.png', '/resume-page-2.png'] as string[],
  heroSummary:
    'Bridging data workflows, business requirements, and modern web delivery. Experienced in data & systems analysis, geospatial BI, web application development, and municipal database operations.',
  aboutParagraphs: [
    'I am a 4th-year Bachelor of Science in Information Technology student majoring in Business Analytics at Batangas State University – The National Engineering University (Lipa Campus). My academic and project work focuses on translating operational challenges into clear system architectures, well-documented requirements, and reliable software.',
    'Across capstone and municipal initiatives, I have worked across the software lifecycle—from requirements gathering, process mapping, and technical documentation to hands-on development and QA testing using React.js, Flutter, Python, and SQL. Through the Special Program for Employment of Students (SPES) at PESO Lipa City Hall, I also gained practical experience in high-accuracy data encoding, record verification, and administrative workflow indexing.',
  ],
};

export const education: EducationItem[] = [
  {
    id: 'bsu-bsit',
    degree: 'Bachelor of Science in Information Technology',
    specialization: 'Major in Business Analytics',
    institution: 'Batangas State University – The National Engineering University',
    location: 'Lipa Campus, Batangas',
    period: '2023 – 2027 (Expected)',
    status: '4th-Year Standing',
    highlights: [
      'Focus areas: Data & Business Intelligence, Systems Analysis & Design, Database Management, Web Application Development',
    ],
  },
  {
    id: 'mabini-stem',
    degree: 'Senior High School — STEM Strand',
    specialization: 'Science, Technology, Engineering, and Mathematics',
    institution: 'The Mabini Academy',
    location: 'Lipa City, Batangas',
    period: '2021 – 2023',
    status: 'Completed',
  },
];

export const experience: ExperienceItem[] = [
  {
    id: 'peso-spes-2025',
    role: 'Administrative Data Encoder',
    program: 'SPES Program (Special Program for Employment of Students)',
    organization: 'Public Employment Service Office (PESO) – Lipa City Hall',
    location: 'Lipa City, Batangas',
    period: 'July – August 2025',
    summary:
      'Supported municipal employment services by maintaining accurate digital records, validating applicant submissions, and streamlining administrative indexing workflows.',
    responsibilities: [
      'Performed municipal employment record data entry and multi-field verification to ensure clean, audit-ready records.',
      'Managed structured database records and digital filing systems for applicant and employer tracking.',
      'Analyzed existing administrative encoding workflows to identify bottlenecks and improve record retrieval consistency.',
      'Prepared systematic record indexing and concise digital summaries for office reporting.',
    ],
  },
];

export const projects: ProjectItem[] = [
  {
    id: 'revela',
    title: 'REVELA',
    subtitle: 'Geospatial Business Intelligence System',
    timeframe: 'Jan 2026',
    context: 'Capstone Project',
    client: 'Business Permits and Licensing Office (BPLO) — Mataasnakahoy, Batangas',
    summary:
      'Compliance monitoring and non-registered business detection platform combining geospatial visualization with structured permit data to support municipal revenue and regulatory oversight.',
    roles: ['Requirements Analysis', 'Documentation Lead', 'QA Tester', 'Developer'],
    techStack: ['Python', 'JavaScript', 'SQL', 'Dart'],
    repoUrl: 'https://github.com/RalphWreckeri2/REVELA-dev',
    highlights: [
      'Designed compliance monitoring workflows to flag potentially unregistered commercial establishments against BPLO permit records.',
      'Authored system requirements specifications, process diagrams, and technical documentation.',
      'Executed structured QA test cases across data ingestion, geospatial mapping, and reporting modules.',
    ],
    caseStudy: {
      problem:
        'Local Business Permits and Licensing Offices often rely on manual field sweeps and fragmented spreadsheets to spot unregistered businesses and track permit renewals across barangays.',
      approach:
        'Collaborated with BPLO stakeholders in Mataasnakahoy to map existing inspection workflows, define system requirements, and build a unified geospatial business intelligence interface backed by structured SQL records.',
      deliverables: [
        'System Requirements Specification (SRS), process flowcharts, and entity-relationship architecture',
        'Geospatial compliance dashboard and field-ready monitoring views across Python, JavaScript, SQL, and Dart',
        'End-to-end QA test plans verifying permit matching accuracy and exception reporting',
      ],
      impact:
        'Provided BPLO Mataasnakahoy with a structured, map-driven workflow to prioritize field inspections and monitor municipal business compliance.',
    },
  },
  {
    id: 'peso-smarthire',
    title: 'PESO SmartHire',
    subtitle: 'Recruitment and Applicant Management System',
    timeframe: '2025',
    context: 'Systems & Web Development Project',
    client: 'Public Employment Service Office (PESO) — Lipa City',
    summary:
      'Web-based recruitment and applicant management platform connecting job seekers, partner employers, and PESO administrators in a centralized hiring workflow.',
    roles: ['Requirements Analysis Lead', 'Documentation Lead', 'QA Tester', 'Developer'],
    techStack: ['Python', 'MySQL', 'JavaScript'],
    repoUrl: 'https://github.com/elliwinx/PesoSnartHire',
    highlights: [
      'Led requirements analysis and technical documentation across three user portals: Applicants, Employers, and PESO Administrators.',
      'Designed relational MySQL schemas for job postings, applicant profiles, and referral tracking.',
      'Contributed to backend/frontend implementation and conducted functional QA validation.',
    ],
    caseStudy: {
      problem:
        'Municipal employment matching involves coordinating walk-in applicants, employer vacancies, and endorsement records—processes that create delays when handled across disconnected forms and manual logs.',
      approach:
        'Leveraged first-hand understanding of PESO operations to formalize user roles, application states, and administrative verification rules before implementing a centralized web platform.',
      deliverables: [
        'Complete requirements analysis, use-case specifications, and user role matrix',
        'Normalized MySQL database design for employer listings, candidate submissions, and status tracking',
        'Multi-role web workflows in Python and JavaScript with QA verification prior to deployment',
      ],
      impact:
        'Streamlined coordination between applicants, local employers, and PESO staff through unified digital tracking.',
    },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming & Frameworks',
    items: [
      'Python',
      'JavaScript',
      'React.js (Frontend)',
      'Flutter (Dart)',
      'SQL / MySQL',
      'R (RStudio)',
    ],
  },
  {
    category: 'Design & Documentation Tools',
    items: ['Figma', 'Draw.io', 'Mermaid.js'],
  },
  {
    category: 'Core Competencies',
    items: [
      'Requirements Analysis',
      'System Architecture',
      'UI/UX Prototyping',
      'Technical Documentation',
      'Process Mapping',
      'Database Management',
    ],
  },
  {
    category: 'Professional Skills',
    items: ['Analytical Thinking', 'Problem Solving', 'Teamwork', 'Adaptability'],
  },
];

export const achievements: AchievementItem[] = [
  {
    id: 'uiux-2025',
    placement: '2nd Place',
    title: 'UI/UX Design Challenge',
    venue: 'Batangas State University – TNEU, Lipa Campus',
    date: 'Nov 2025',
  },
  {
    id: 'sdg-2024',
    placement: '3rd Place',
    title: 'SDG Innovator Pitching Competition',
    venue: 'Batangas State University – TNEU, Lipa Campus',
    date: 'Nov 2024',
  },
];

export const organizations: OrganizationItem[] = [
  {
    id: 'jpcs-lipa',
    role: 'Active Member',
    organization: 'Junior Philippine Computer Society (JPCS) – Lipa Chapter',
    period: 'Aug 2023 – Present',
  },
  {
    id: 'tis-bsu',
    role: 'Active Member',
    organization: 'Tech Innovators Society – BSU-TNEU Lipa Campus',
    period: 'Aug 2023 – Present',
  },
  {
    id: 'lipa-youth-2026',
    role: 'Participant (Barangay Pusil)',
    organization: 'Lipa Youth Empowerment Workshop – Office of the City Mayor',
    period: 'Aug 16, 2026',
  },
];

export const certificateCategories: ('All' | CertificateCategory)[] = [
  'All',
  'Analytics & AI',
  'Blockchain & Web3',
  'Networking & Enterprise',
  'Conferences & Workshops',
];

/**
 * Structured Certificates & Trainings Registry
 *
 * To verify and attach a certificate file:
 * 1. Drop the file (e.g. `convergeit-2026.pdf` or `databiz-2025.png`) into `public/certificates/`.
 * 2. Update `certificateUrl` to `'/certificates/your-file.pdf'`.
 * 3. Change `status` from `'Pending Upload'` to `'Verified'`.
 * 4. Optionally add `credentialId` or `notes`.
 */
export const certificates: CertificateItem[] = [
  {
    id: 'convergeit-2026',
    title: 'ConvergeIT 2026 Technology Conference',
    subtitle: 'Converging Technologies for a Responsible, Secure, and Sustainable Digital Future',
    issuer: 'Batangas Information Technology Society',
    date: 'Oct 17, 2026',
    category: 'Conferences & Workshops',
    status: 'Verified',
    certificateUrl: '/certificates/convergeit-2026.jpg',
    notes: 'Held at Lipa Academy for Sports, Culture, and Arts Convention Center, Lipa City.',
  },
  {
    id: 'b4y-sem2-2026',
    title: 'Blockchain4Youth Learning Hub Semester 2 Program',
    subtitle: 'Foundational Blockchain and Real-World Asset (RWA) Knowledge',
    issuer: 'Bitget × Blockchain4Youth',
    date: 'Oct 6, 2026',
    category: 'Blockchain & Web3',
    status: 'Verified',
    certificateUrl: '/certificates/blockchain4youth-sem2-rwa-2026.jpg',
    credentialId: 'B4Y-2026CEM-000135',
  },
  {
    id: 'b4y-rwa-2026',
    title: 'Blockchain and Real-World Assets (RWA)',
    issuer: 'Bitget × Blockchain4Youth',
    date: 'Oct 6, 2026',
    category: 'Blockchain & Web3',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'b4y-web3-2026',
    title: 'Blockchain4Youth Learning Hub Program: Blockchain and Web3',
    issuer: 'Bitget × Blockchain4Youth',
    date: 'Oct 6, 2026',
    category: 'Blockchain & Web3',
    status: 'Verified',
    certificateUrl: '/certificates/blockchain4youth-web3-2026.jpg',
    credentialId: 'B4Y-2026-010149',
  },
  {
    id: 'blockchain-crypto-sept-2026',
    title: 'Blockchain & Cryptocurrency Seminar',
    issuer: 'Seminar / Training Program',
    date: 'Sept 2026',
    category: 'Blockchain & Web3',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'cryptita-plays-2026',
    title: 'Cryptita Plays',
    issuer: 'Cryptita Plays',
    date: '2026',
    category: 'Blockchain & Web3',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'lipa-youth-empowerment-2026',
    title: 'Lipa Youth Empowerment Workshop',
    subtitle: 'Participant (Barangay Pusil) — Held at Lipa Convention Center',
    issuer: 'City of Lipa – Office of the City Mayor',
    date: 'Aug 16, 2026',
    category: 'Conferences & Workshops',
    status: 'Verified',
    certificateUrl: '/certificates/lipa-youth-empowerment-2026.jpg',
  },
  {
    id: 'redhat-javaee-2026',
    title: 'Red Hat Application Development I: Programming in Java EE',
    subtitle: 'AD183 - RHA · Ver. 7.0 (32 Credit Hours)',
    issuer: 'Red Hat Academy',
    date: 'July 16, 2026',
    category: 'Networking & Enterprise',
    status: 'Verified',
    certificateUrl: '/certificates/redhat-javaee-ad183-2026.pdf',
    previewImageUrl: '/certificates/redhat-javaee-ad183-2026.png',
    verifyUrl: 'https://www.credly.com/badges/291a8980-9006-4e4e-9921-df00a5dbae76',
  },
  {
    id: 'cyber-censorship-forum-2026',
    title: 'Virtual Forum on Cyber Censorship and Data Protection',
    subtitle:
      'Safeguarding Digital Freedom and Resilience (World Day Against Cyber Censorship & World Backup Day)',
    issuer: 'BSU-TNEU Lipa Campus',
    date: 'March 31, 2026',
    category: 'Conferences & Workshops',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'ai-blockchain-smart-cities-2026',
    title: 'AI and Blockchain for Smart Cities, Smart Business, and Smart Governance',
    issuer: 'Technology Seminar',
    date: 'March 28, 2026',
    category: 'Analytics & AI',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'databiz-2025',
    title: 'DataBiz 2025: Data Science, Artificial Intelligence, and Business Analytics',
    subtitle: 'Future-Proof Skills: Empowering Students with Data, AI, and Analytics',
    issuer: 'DataBiz Conference',
    date: 'Oct 25, 2025',
    category: 'Analytics & AI',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'bitcon-2025',
    title: 'Batangas Information Technology Conference (BITCON) 2025',
    subtitle: 'Building a Connected Tomorrow: IoT Innovations and Beyond',
    issuer: 'Batangas Information Technology Society',
    date: 'April 26, 2025',
    category: 'Conferences & Workshops',
    status: 'Verified',
    certificateUrl: '/certificates/bitcon-2025.jpg',
    notes: 'Held at Lipa Academy for Sports, Culture and Arts Convention Center, Dagatan, Lipa City.',
  },
  {
    id: 'databiz-2024',
    title: 'DataBiz Conference 2024',
    subtitle: "Equipping Tomorrow's Innovators with Data Science, AI and Business Analytics",
    issuer: 'DataBiz Conference',
    date: 'Nov 9, 2024',
    category: 'Analytics & AI',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'cisco-networking-2024',
    title: 'Cisco Networking Training',
    issuer: 'Cisco',
    date: 'Nov 2024',
    category: 'Networking & Enterprise',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'bitcon-2024',
    title: 'Batangas Information Technology Conference (BITCON) 2024',
    subtitle: 'Navigating the Future of Technology: Integration, Innovation, and Security',
    issuer: 'BITCON',
    date: 'April 6, 2024',
    category: 'Conferences & Workshops',
    status: 'Pending Upload',
    certificateUrl: null,
  },
  {
    id: 'techsynergy-2023',
    title: 'TechSynergy: Navigating the Digital Landscape 2023',
    subtitle: 'Connecting Concepts, Bridging Technologies',
    issuer: 'JPCS – Lipa Chapter, BSU-TNEU Lipa Campus',
    date: 'Dec 4, 2023',
    category: 'Conferences & Workshops',
    status: 'Verified',
    certificateUrl: '/certificates/techsynergy-2023.jpg',
  },
];
