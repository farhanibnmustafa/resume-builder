export type TemplateId = 
  | 'modern-executive'
  | 'minimal-classic'
  | 'tech-developer'
  | 'creative-studio'
  | 'academic-formal'
  | 'compact-one-pager'
  | 'executive-innovator';

export type FontFamily = 
  | 'Inter'
  | 'Outfit'
  | 'Merriweather'
  | 'Playfair Display'
  | 'Fira Code'
  | 'Roboto';

export type FontSizeScale = 'small' | 'medium' | 'large';
export type LayoutSpacing = 'compact' | 'comfortable' | 'spacious';

export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  sidebarBg?: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  photoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: { name: string; level?: number }[]; // level 1-5 optional
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  url: string;
  githubUrl?: string;
  technologies: string[];
  description: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Elementary';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  items: CustomSectionItem[];
}

export interface ReferenceItem {
  id: string;
  name: string;
  position: string;
  company: string;
  email?: string;
  phone?: string;
}

export interface ResumeData {
  title: string;
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  customSections: CustomSection[];
  references: ReferenceItem[];
}

export interface ThemeConfig {
  templateId: TemplateId;
  colorTheme: ColorTheme;
  fontFamily: FontFamily;
  fontSize: FontSizeScale;
  spacing: LayoutSpacing;
  showPhoto: boolean;
  photoSize?: number;
  photoShape?: 'circle' | 'rounded' | 'square';
  showSkillBars: boolean;
  sidebarPosition: 'left' | 'right';
  pageMode: 'auto' | '1-page' | '2-page';
  sectionOrder: string[];
}

export interface AtsScoreBreakdown {
  score: number; // 0 - 100
  rating: 'Needs Work' | 'Good' | 'Strong' | 'Excellent';
  details: {
    category: string;
    score: number;
    maxScore: number;
    feedback: string;
    tips: string[];
  }[];
  missingKeywords: string[];
  actionVerbCount: number;
}
