import type { ResumeData, ThemeConfig, ColorTheme } from '../types/resume';

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'corporate-navy',
    name: 'Corporate Navy',
    primary: '#1B2A8A',
    secondary: '#3b82f6',
    accent: '#60a5fa',
    background: '#ffffff',
    text: '#0f172a',
    sidebarBg: '#f8fafc',
  },
  {
    id: 'emerald-minimal',
    name: 'Emerald Minimal',
    primary: '#065f46',
    secondary: '#10b981',
    accent: '#34d399',
    background: '#ffffff',
    text: '#111827',
    sidebarBg: '#ecfdf5',
  },
  {
    id: 'slate-dark',
    name: 'Slate Tech',
    primary: '#0f172a',
    secondary: '#475569',
    accent: '#38bdf8',
    background: '#ffffff',
    text: '#1e293b',
    sidebarBg: '#0f172a',
  },
  {
    id: 'royal-violet',
    name: 'Royal Violet',
    primary: '#4c1d95',
    secondary: '#8b5cf6',
    accent: '#c084fc',
    background: '#ffffff',
    text: '#1e1b4b',
    sidebarBg: '#faf5ff',
  },
  {
    id: 'warm-amber',
    name: 'Warm Amber',
    primary: '#78350f',
    secondary: '#d97706',
    accent: '#fbbf24',
    background: '#ffffff',
    text: '#1c1917',
    sidebarBg: '#fffbeb',
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    primary: '#18181b',
    secondary: '#52525b',
    accent: '#71717a',
    background: '#ffffff',
    text: '#09090b',
    sidebarBg: '#f4f4f5',
  },
];

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  templateId: 'executive-innovator',
  colorTheme: COLOR_THEMES[0],
  fontFamily: 'Inter',
  fontSize: 'medium',
  spacing: 'comfortable',
  showPhoto: true,
  photoSize: 105,
  photoShape: 'circle',
  showSkillBars: true,
  sidebarPosition: 'left',
  pageMode: 'auto',
  sectionOrder: ['personalInfo', 'summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'languages', 'custom', 'references'],
};

export const SAMPLE_SOFTWARE_ENGINEER: ResumeData = {
  title: 'Farhan Ibn Mustafa - Tech Innovator CV',
  personalInfo: {
    fullName: 'Farhan Ibn Mustafa',
    jobTitle: 'Developer | Tech Innovator | Web Content Management',
    email: 'farhanibnmustafa@gmail.com',
    phone: '+8801645662120',
    location: 'Sector-12, Uttara, Dhaka',
    website: '',
    linkedin: 'https://linkedin.com/in/farhanibnmustafa',
    github: 'https://github.com/farhanibnmustafa',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    summary: 'Frontend Developer Designer with several years of experience across all major CSS frameworks. Passionate about technology, with strong skills in programming, content management, Canva design, and documentation. Known for turning ideas into clear, functional solutions. Eager to contribute to innovative projects that drive creativity and success.'
  },
  experiences: [
    {
      id: 'exp-1',
      position: 'TRAINER, Social Worker',
      company: 'Bangladesh Youth Leadership Center',
      location: 'Dhaka, Bangladesh',
      startDate: 'March 2020',
      endDate: 'November 2020',
      current: false,
      highlights: [
        'Works for development of a nation without discrimination',
        'Works for Human-rights',
        'Content Writer for the BYLC Organization'
      ]
    },
    {
      id: 'exp-2',
      position: 'Head of Coordination Team',
      company: 'HULT PRIZE, Event',
      location: '',
      startDate: 'October 2024',
      endDate: 'October 2024',
      current: false,
      highlights: [
        'Directed event planning, team management, and effective task delegation',
        'Successfully coordinated social media campaigns, graphic design, and caption writing',
        'Maintained clear communication with team members to streamline workflows and enhance productivity',
        'Oversaw key teams, including Sponsorship, Logistics, Event Management, and Judge Coordination, ensuring seamless execution of all responsibilities'
      ]
    },
    {
      id: 'exp-3',
      position: 'Web Product Pages Uploading, INTERN',
      company: 'GAOTEK',
      location: '',
      startDate: 'October 2024',
      endDate: 'January 2025',
      current: false,
      highlights: [
        'Managed and uploaded web content accurately across platforms',
        'Adhered to company guidelines and optimized workflows',
        'Optimized workflows by adhering to company guidelines and utilizing WordPress effectively'
      ]
    },
    {
      id: 'exp-4',
      position: 'AI Pages Uploading Squad, ASSISTANT SQUAD LEADER',
      company: 'GAOTEK',
      location: '',
      startDate: 'December 2024',
      endDate: 'December 2024',
      current: false,
      highlights: [
        'Led and coordinated a team to ensure efficient and accurate content uploading',
        'Streamlined processes while maintaining strict compliance with organizational standards',
        'Mentored and supported team members, fostering a collaborative and productive work environment'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Software Engineering',
      institution: 'Daffodil International University- Faculty from the University of Science and Information Technology(FSIT)',
      location: 'Dhaka, Bangladesh',
      startDate: '2022',
      endDate: '2026',
      gpa: '3.83 (out of 4.00)',
      description: 'Expected Graduation : 2026'
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary Certificate (H.S.C)',
      institution: 'Armed Police Battalion Public School and College,Bogura',
      location: 'Bogura, Bangladesh',
      startDate: '2018',
      endDate: '2020',
      gpa: '5.00 (out of 5.00)',
      description: 'Science Background'
    },
    {
      id: 'edu-3',
      degree: 'Secondary School Certificate (S.S.C)',
      institution: 'Santahar Harvey Govt. High School, Santahar, Bogura',
      location: 'Santahar, Bogura',
      startDate: '2016',
      endDate: '2018',
      gpa: '5.00 (out of 5.00)',
      description: 'Science Background'
    },
    {
      id: 'edu-4',
      degree: 'Junior School Certificate (J.S.C)',
      institution: 'Santahar Harvey Govt. High School, Santahar, Bogura',
      location: 'Santahar, Bogura',
      startDate: '2014',
      endDate: '2016',
      gpa: '5.00 (out of 5.00)',
      description: 'Science Background'
    }
  ],
  skillCategories: [
    {
      id: 'sk-1',
      categoryName: 'Programming Languages',
      skills: [
        { name: 'C', level: 4 },
        { name: 'CSS', level: 5 },
        { name: 'HTML', level: 5 },
        { name: 'Python', level: 4 },
        { name: 'Java', level: 4 }
      ]
    },
    {
      id: 'sk-2',
      categoryName: 'Frameworks',
      skills: [
        { name: 'Bootstrap', level: 4 },
        { name: 'Tailwind CSS', level: 5 }
      ]
    },
    {
      id: 'sk-3',
      categoryName: 'Development tools',
      skills: [
        { name: 'Tinkercad', level: 4 },
        { name: 'Arduino Uno', level: 4 },
        { name: 'IntelliJ IDEA', level: 4 },
        { name: 'Pycharm', level: 4 },
        { name: 'Visual Studio Code', level: 5 },
        { name: 'git', level: 4 }
      ]
    },
    {
      id: 'sk-4',
      categoryName: 'Design & Prototyping Tools',
      skills: [
        { name: 'Figma', level: 4 },
        { name: 'Canva', level: 5 },
        { name: 'Capcut', level: 4 }
      ]
    },
    {
      id: 'sk-5',
      categoryName: 'Operating Systems',
      skills: [
        { name: 'Mac OS X', level: 5 },
        { name: 'Windows', level: 5 },
        { name: 'Linux', level: 4 }
      ]
    },
    {
      id: 'sk-6',
      categoryName: 'Others',
      skills: [
        { name: 'Microsoft Word', level: 5 },
        { name: 'Microsoft Powerpoint', level: 5 },
        { name: 'Microsoft Excel', level: 4 }
      ]
    }
  ],
  projects: [
    {
      id: 'proj-0',
      name: 'AI-ASSISTED PENETRATION TESTING & SECURITY ASSESSMENT REPORT',
      role: '2026',
      url: 'https://github.com/farhanibnmustafa/AI-Assisted-Penetration-Testing-Security-Assessment-Report',
      githubUrl: 'https://github.com/farhanibnmustafa/AI-Assisted-Penetration-Testing-Security-Assessment-Report',
      technologies: ['KALI LINUX', 'SHELL-GPT', 'METASPLOIT', 'OPENVAS', 'NESSUS', 'NMAP'],
      description: 'Executed an authorized AI-assisted pentesting assessment using Shell-GPT, Nmap, Nessus, OpenVAS, and Metasploit to analyze vulnerabilities and remediation strategies.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-1',
      name: 'RESUME BUILDER — ATS-OPTIMIZED CV BUILDER PLATFORM',
      role: '2026',
      url: 'https://github.com/farhanibnmustafa/ResumeBuilder',
      githubUrl: 'https://github.com/farhanibnmustafa/ResumeBuilder',
      technologies: ['REACT 19', 'TYPESCRIPT', 'VITE', 'HTML2PDF', 'LUCIDE REACT'],
      description: 'Architected a dynamic ATS-optimized resume builder platform featuring live multi-template rendering, drag-and-drop reordering, custom section binding, and PDF export.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-2',
      name: 'CUSTOMCARIFY — AUTOMOTIVE CUSTOMIZATION PLATFORM',
      role: '2024',
      url: 'https://github.com/farhanibnmustafa/CustomCarify_Landing_page',
      githubUrl: 'https://github.com/farhanibnmustafa/CustomCarify_Landing_page',
      technologies: ['REACT', 'THREE.JS', 'TYPESCRIPT', 'TAILWINDCSS', 'FRAMER MOTION'],
      description: 'Architected an automotive customization web platform featuring interactive 3D vehicle wrap previews, service booking workflows, and responsive animations.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-3',
      name: 'QUICKCOPY2 — ENTERPRISE E-COMMERCE & PRINT PLATFORM',
      role: '2025',
      url: 'https://github.com/farhanibnmustafa/QuickCopy2',
      githubUrl: 'https://github.com/farhanibnmustafa/QuickCopy2',
      technologies: ['NEXT.JS 15', 'REACT 19', 'SUPABASE', 'PAYPAL', 'STRIPE', 'ZUSTAND'],
      description: 'Architected a multi-tenant print-on-demand platform supporting 4 distinct storefronts, custom design studio engines, sales tax engine, and PayPal checkout.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-4',
      name: 'MEMORIAL — AI-POWERED OBITUARY & MEMORIAL PLATFORM',
      role: '2025',
      url: 'https://github.com/farhanibnmustafa/MemorialPlatform',
      githubUrl: 'https://github.com/farhanibnmustafa/MemorialPlatform',
      technologies: ['NEXT.JS 16', 'FASTAPI', 'PYTHON', 'SUPABASE', 'STRIPE CONNECT'],
      description: 'Architected an AI-powered SaaS platform with Next.js 16 RSC, Python FastAPI microservices, Supabase RLS DB, 3D flipbooks, and Stripe Connect ledger.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-5',
      name: 'HALL OF FAME PLATFORM — MULTI-TENANT HONORS ECOSYSTEM',
      role: '2025',
      url: 'https://www.elitelevelsteppershalloffame.com/',
      githubUrl: 'https://github.com/farhanibnmustafa/HallOfFamePlatform',
      technologies: ['NEXT.JS 16', 'TURBOREPO', 'REACT 19', 'SUPABASE RLS', 'STRIPE'],
      description: 'Architected a multi-tenant monorepo platform featuring Next.js 16 RSC, Supabase RLS isolation, Stripe ticketing/merch e-commerce, voting ballots, and live check-in.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-6',
      name: 'DARK STAR — BOOK PUBLISHING & MERCH PLATFORM',
      role: '2025',
      url: 'https://github.com/farhanibnmustafa/DarkStarPlatform',
      githubUrl: 'https://github.com/farhanibnmustafa/DarkStarPlatform',
      technologies: ['NEXT.JS 16', 'REACT 19', 'TYPESCRIPT', 'SUPABASE', 'STRIPE'],
      description: 'Architected a full-stack Next.js 16 e-commerce & publishing platform with dual Stripe/PayPal checkout, Supabase RLS DB, print studio, and admin CRM suite.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-7',
      name: 'BANGLACERT — CYBER INCIDENT PORTAL',
      role: '2025',
      url: 'https://github.com/farhanibnmustafa/BanglaCERT',
      githubUrl: 'https://github.com/farhanibnmustafa/BanglaCERT',
      technologies: ['PYTHON', 'DJANGO', 'REACT', 'POSTGRESQL', 'S3'],
      description: 'Architected a full-stack cyber incident reporting platform with Django 6 REST API backend, React/Vite SPA, evidence vault, and analytics dashboard.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-8',
      name: 'PYTHON PROJECTS (Coffee Machine, Games, Pass Gen & Ticket Systems)',
      role: '2024',
      url: 'https://github.com/farhanibnmustafa/PythonProjects',
      githubUrl: 'https://github.com/farhanibnmustafa/PythonProjects',
      technologies: ['PYTHON', 'OOP'],
      description: 'Developed a suite of 9+ Python applications showcasing OOP principles, data structures, game logic, and automated workflow logic.',
      highlights: ['Real Life Project']
    },
    {
      id: 'proj-9',
      name: 'PSYCHOLOGICAL SUPPORT SYSTEM',
      role: '2025',
      url: 'https://github.com/farhanibnmustafa/PsychologicalSupportSystem',
      githubUrl: 'https://github.com/farhanibnmustafa/PsychologicalSupportSystem',
      technologies: ['PYTHON', 'JAVA', 'SYSTEM DESIGN'],
      description: 'Designed a digital mental health platform featuring AI chat assistance, therapist scheduling, self-assessments, and UML workflow modeling.',
      highlights: ['Project Documentation']
    },
    {
      id: 'proj-10',
      name: 'CITY WATER MANAGEMENT SYSTEM',
      role: '2025',
      url: 'https://github.com/farhanibnmustafa/CityWaterManagementSystem',
      githubUrl: 'https://github.com/farhanibnmustafa/CityWaterManagementSystem',
      technologies: ['JAVA', 'PYTHON', 'SYSTEM DESIGN'],
      description: 'Architected a municipal water distribution platform with real-time smart meter tracking, automated billing, and role-based access control.',
      highlights: ['Project Documentation']
    }
  ],
  certifications: [],
  languages: [
    { id: 'lang-1', name: 'Bengali', proficiency: 'Native' },
    { id: 'lang-2', name: 'English', proficiency: 'Fluent' },
    { id: 'lang-3', name: 'Hindi', proficiency: 'Intermediate' }
  ],
  customSections: [
    {
      id: 'cs-forces',
      sectionTitle: 'FORCES',
      items: [
        {
          id: 'csi-f1',
          title: 'Passion for Growth',
          description: 'Continuous learning and skill enhancement in modern tech stack.'
        },
        {
          id: 'csi-f2',
          title: 'Project Management',
          description: 'Planning, executing, and delivering tech projects smoothly.'
        },
        {
          id: 'csi-f3',
          title: 'Leadership and Coordination',
          description: 'Leading teams and delegating tasks effectively.'
        },
        {
          id: 'csi-f4',
          title: 'Creativity and Innovation',
          description: 'Bringing fresh design and functional concepts into practice.'
        },
        {
          id: 'csi-f5',
          title: 'Technical Expertise',
          description: 'Strong foundation in software engineering and web development.'
        }
      ]
    }
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Subhanul Islam',
      position: 'Chief Operating Officer',
      company: 'BD ACE ENCODERS',
      email: 'subhan.bdace@gmail.com',
      phone: '+8801774991033'
    }
  ]
};

export const SAMPLE_PRODUCT_MANAGER: ResumeData = {
  title: 'Product Manager Resume',
  personalInfo: {
    fullName: 'Sarah Jenkins',
    jobTitle: 'Principal Product Manager',
    email: 'sarah.jenkins@example.com',
    phone: '+1 (555) 987-6543',
    location: 'New York, NY',
    website: 'https://sarahjenkins.pm',
    linkedin: 'https://linkedin.in/in/sarah-jenkins-pm',
    github: '',
    summary: 'Strategic Product Leader with 8+ years of experience scaling SaaS products from zero to $15M ARR. Expert in product strategy, customer discovery, data analytics, and cross-functional leadership across UX design, engineering, and growth marketing.'
  },
  experiences: [
    {
      id: 'exp-pm-1',
      position: 'Principal Product Manager',
      company: 'ScaleVibe SaaS Inc.',
      location: 'New York, NY',
      startDate: '2021-04',
      endDate: 'Present',
      current: true,
      highlights: [
        'Owned core monetization roadmap driving 42% YoY growth in Enterprise ARR across 3,000+ business accounts.',
        'Launched AI-powered automated onboarding flows that increased trial conversion rates from 14% to 28%.',
        'Led team of 14 cross-functional members across product designers, frontend/backend developers, and QA engineers.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-pm-1',
      degree: 'M.B.A. in Product Management & Technology Strategy',
      institution: 'Columbia Business School',
      location: 'New York, NY',
      startDate: '2017-09',
      endDate: '2019-05'
    }
  ],
  skillCategories: [
    {
      id: 'sk-pm-1',
      categoryName: 'Product Strategy & Growth',
      skills: [
        { name: 'Roadmap & PRDs', level: 5 },
        { name: 'User Research & Discovery', level: 5 },
        { name: 'A/B Testing & Funnel Analytics', level: 5 },
        { name: 'Pricing & Packaging Strategy', level: 4 }
      ]
    }
  ],
  projects: [],
  certifications: [
    {
      id: 'cert-pm-1',
      title: 'Certified Scrum Product Owner (CSPO)',
      issuer: 'Scrum Alliance',
      issueDate: '2020-02'
    }
  ],
  languages: [
    { id: 'lang-pm-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-pm-2', name: 'French', proficiency: 'Fluent' }
  ],
  customSections: [],
  references: []
};
