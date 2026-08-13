import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type {
  ResumeData,
  ThemeConfig,
  PersonalInfo,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  LanguageItem,
  CustomSection,
  ReferenceItem,
  AtsScoreBreakdown,
  TemplateId,
  ColorTheme,
  FontFamily,
  FontSizeScale,
  LayoutSpacing,
} from '../types/resume';
import { SAMPLE_SOFTWARE_ENGINEER, SAMPLE_PRODUCT_MANAGER, DEFAULT_THEME_CONFIG, COLOR_THEMES } from '../data/sampleResumes';
import { analyzeAtsScore } from '../utils/atsAnalyzer';

const STORAGE_KEY_DATA = 'farhan_cv_resume_data_v17';
const STORAGE_KEY_THEME = 'farhan_cv_theme_config_v17';

interface ResumeContextType {
  resumeData: ResumeData;
  themeConfig: ThemeConfig;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: 'split' | 'edit' | 'preview';
  setViewMode: (mode: 'split' | 'edit' | 'preview') => void;
  atsBreakdown: AtsScoreBreakdown;
  zoomLevel: number;
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>;

  // Data updater actions
  updateTitle: (title: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  // Experience
  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;

  // Skills
  addSkillCategory: (categoryName?: string) => void;
  updateSkillCategory: (id: string, categoryName: string, skills: { name: string; level?: number }[]) => void;
  deleteSkillCategory: (id: string) => void;
  reorderSkillCategories: (startIndex: number, endIndex: number) => void;

  // Projects
  addProject: () => void;
  updateProject: (id: string, proj: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, cert: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;
  reorderCertifications: (startIndex: number, endIndex: number) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, lang: Partial<LanguageItem>) => void;
  deleteLanguage: (id: string) => void;

  // Custom Sections
  addCustomSection: () => void;
  updateCustomSection: (id: string, sec: Partial<CustomSection>) => void;
  deleteCustomSection: (id: string) => void;
  reorderCustomSections: (startIndex: number, endIndex: number) => void;
  reorderCustomItems: (sectionId: string, startIndex: number, endIndex: number) => void;

  // References
  addReference: () => void;
  updateReference: (id: string, ref: Partial<ReferenceItem>) => void;
  deleteReference: (id: string) => void;

  // Theme & Preset Actions
  setTemplateId: (templateId: TemplateId) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  setFontFamily: (fontFamily: FontFamily) => void;
  setFontSize: (fontSize: FontSizeScale) => void;
  setSpacing: (spacing: LayoutSpacing) => void;
  setShowPhoto: (showPhoto: boolean) => void;
  setPhotoSize: (photoSize: number) => void;
  setPhotoShape: (shape: 'circle' | 'rounded' | 'square') => void;
  setShowSkillBars: (showSkillBars: boolean) => void;
  setSidebarPosition: (pos: 'left' | 'right') => void;
  setPageMode: (mode: 'auto' | '1-page' | '2-page') => void;
  reorderSections: (startIndex: number, endIndex: number) => void;
  updateSectionOrder: (newOrder: string[]) => void;

  // Presets & Storage
  loadPreset: (presetKey: 'software' | 'product' | 'blank') => void;
  importJson: (jsonString: string) => boolean;
  exportJson: () => void;
  resetResume: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load saved state from LocalStorage if available
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved resume data:', e);
    }
    return SAMPLE_SOFTWARE_ENGINEER;
  });

  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved theme config:', e);
    }
    return DEFAULT_THEME_CONFIG;
  });

  const [activeTab, setActiveTab] = useState<string>('personal');
  const [viewMode, setViewMode] = useState<'split' | 'edit' | 'preview'>('split');
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Auto-save effect
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(resumeData));
    } catch (e) {
      console.warn('Failed to save resume data:', e);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(themeConfig));
    } catch (e) {
      console.warn('Failed to save theme config:', e);
    }
  }, [themeConfig]);

  // Real-time ATS Breakdown
  const atsBreakdown = useMemo(() => {
    return analyzeAtsScore(resumeData);
  }, [resumeData]);

  // Data update handlers
  const updateTitle = (title: string) => setResumeData(prev => ({ ...prev, title }));

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...info }
    }));
  };

  // Experience handlers
  const addExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      position: 'Job Title',
      company: 'Company Name',
      location: 'City, Country',
      startDate: '',
      endDate: '',
      current: false,
      highlights: ['Key achievement or responsibility using action verb and metric.'],
    };
    setResumeData(prev => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
  };

  const updateExperience = (id: string, exp: Partial<ExperienceItem>) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(item => item.id === id ? { ...item, ...exp } : item)
    }));
  };

  const deleteExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(item => item.id !== id)
    }));
  };

  const reorderExperience = (startIndex: number, endIndex: number) => {
    setResumeData(prev => {
      const result = Array.from(prev.experiences);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, experiences: result };
    });
  };

  // Education handlers
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University Name',
      location: 'City, State',
      startDate: '',
      endDate: '',
    };
    setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const updateEducation = (id: string, edu: Partial<EducationItem>) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(item => item.id === id ? { ...item, ...edu } : item)
    }));
  };

  const deleteEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(item => item.id !== id)
    }));
  };

  const reorderEducation = (startIndex: number, endIndex: number) => {
    setResumeData(prev => {
      const result = Array.from(prev.education);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, education: result };
    });
  };

  // Skills handlers
  const addSkillCategory = (categoryName: string = 'Technical Skills') => {
    const newCat: SkillCategory = {
      id: `sk-${Date.now()}`,
      categoryName,
      skills: [{ name: 'React', level: 5 }, { name: 'TypeScript', level: 4 }],
    };
    setResumeData(prev => ({ ...prev, skillCategories: [...prev.skillCategories, newCat] }));
  };

  const updateSkillCategory = (id: string, categoryName: string, skills: { name: string; level?: number }[]) => {
    setResumeData(prev => ({
      ...prev,
      skillCategories: prev.skillCategories.map(cat => cat.id === id ? { ...cat, categoryName, skills } : cat)
    }));
  };

  const deleteSkillCategory = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skillCategories: prev.skillCategories.filter(cat => cat.id !== id)
    }));
  };

  const reorderSkillCategories = (startIndex: number, endIndex: number) => {
    setResumeData(prev => {
      const result = Array.from(prev.skillCategories);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, skillCategories: result };
    });
  };

  // Projects handlers
  const addProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: 'Project Title',
      role: 'Lead Developer',
      url: 'https://example.com',
      technologies: ['React', 'TypeScript'],
      description: 'Brief project description explaining problem solved and key outcomes.',
      highlights: ['Achieved 40% performance improvement and 5k users.']
    };
    setResumeData(prev => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const updateProject = (id: string, proj: Partial<ProjectItem>) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...proj } : p)
    }));
  };

  const deleteProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    setResumeData(prev => {
      const result = Array.from(prev.projects);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, projects: result };
    });
  };

  // Certification handlers
  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2023',
    };
    setResumeData(prev => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const updateCertification = (id: string, cert: Partial<CertificationItem>) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map(c => c.id === id ? { ...c, ...cert } : c)
    }));
  };

  const deleteCertification = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c.id !== id)
    }));
  };

  const reorderCertifications = (startIndex: number, endIndex: number) => {
    setResumeData(prev => {
      const result = Array.from(prev.certifications);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, certifications: result };
    });
  };

  // Language handlers
  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      name: 'Spanish',
      proficiency: 'Professional',
    };
    setResumeData(prev => ({ ...prev, languages: [...prev.languages, newLang] }));
  };

  const updateLanguage = (id: string, lang: Partial<LanguageItem>) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map(l => l.id === id ? { ...l, ...lang } : l)
    }));
  };

  const deleteLanguage = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l.id !== id)
    }));
  };

  // Custom Sections handlers
  const addCustomSection = () => {
    const newSec: CustomSection = {
      id: `cs-${Date.now()}`,
      sectionTitle: 'Publications & Speaking',
      items: [
        {
          id: `csi-${Date.now()}`,
          title: 'Keynote Speaker at Tech Summit',
          subtitle: 'Tech Conf 2023',
          date: '2023',
          description: 'Presented insights on web application performance and architecture.'
        }
      ]
    };
    setResumeData(prev => ({ ...prev, customSections: [...prev.customSections, newSec] }));
  };

  const updateCustomSection = (id: string, sec: Partial<CustomSection>) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.map(s => s.id === id ? { ...s, ...sec } : s)
    }));
  };

  const deleteCustomSection = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(s => s.id !== id)
    }));
  };

  const reorderCustomSections = (startIndex: number, endIndex: number) => {
    setResumeData(prev => {
      const result = Array.from(prev.customSections);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { ...prev, customSections: result };
    });
  };

  const reorderCustomItems = (sectionId: string, startIndex: number, endIndex: number) => {
    setResumeData(prev => {
      const updatedSections = prev.customSections.map(sec => {
        if (sec.id !== sectionId) return sec;
        const result = Array.from(sec.items);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { ...sec, items: result };
      });
      return { ...prev, customSections: updatedSections };
    });
  };

  // Reference Actions
  const addReference = () => {
    const newRef: ReferenceItem = {
      id: `ref-${Date.now()}`,
      name: '',
      position: '',
      company: '',
      email: '',
      phone: '',
    };
    setResumeData(prev => ({
      ...prev,
      references: [...(prev.references || []), newRef],
    }));
  };

  const updateReference = (id: string, updated: Partial<ReferenceItem>) => {
    setResumeData(prev => ({
      ...prev,
      references: (prev.references || []).map(r => (r.id === id ? { ...r, ...updated } : r)),
    }));
  };

  const deleteReference = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      references: (prev.references || []).filter(r => r.id !== id),
    }));
  };

  // Theme settings
  const setTemplateId = (templateId: TemplateId) => setThemeConfig(prev => ({ ...prev, templateId }));
  const setColorTheme = (colorTheme: ColorTheme) => setThemeConfig(prev => ({ ...prev, colorTheme }));
  const setFontFamily = (fontFamily: FontFamily) => setThemeConfig(prev => ({ ...prev, fontFamily }));
  const setFontSize = (fontSize: FontSizeScale) => setThemeConfig(prev => ({ ...prev, fontSize }));
  const setSpacing = (spacing: LayoutSpacing) => setThemeConfig(prev => ({ ...prev, spacing }));
  const setShowPhoto = (showPhoto: boolean) => setThemeConfig(prev => ({ ...prev, showPhoto }));
  const setPhotoSize = (photoSize: number) => setThemeConfig(prev => ({ ...prev, photoSize }));
  const setPhotoShape = (photoShape: 'circle' | 'rounded' | 'square') => setThemeConfig(prev => ({ ...prev, photoShape }));
  const setShowSkillBars = (showSkillBars: boolean) => setThemeConfig(prev => ({ ...prev, showSkillBars }));
  const setSidebarPosition = (sidebarPosition: 'left' | 'right') => setThemeConfig(prev => ({ ...prev, sidebarPosition }));
  const setPageMode = (pageMode: 'auto' | '1-page' | '2-page') => setThemeConfig(prev => ({ ...prev, pageMode }));

  const reorderSections = (startIndex: number, endIndex: number) => {
    setThemeConfig(prev => {
      const currentOrder = prev.sectionOrder ? [...prev.sectionOrder] : ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom'];
      const [removed] = currentOrder.splice(startIndex, 1);
      currentOrder.splice(endIndex, 0, removed);
      return { ...prev, sectionOrder: currentOrder };
    });
  };

  const updateSectionOrder = (newOrder: string[]) => setThemeConfig(prev => ({ ...prev, sectionOrder: newOrder }));

  // Presets & Import/Export
  const loadPreset = (presetKey: 'software' | 'product' | 'blank') => {
    if (presetKey === 'software') {
      setResumeData(SAMPLE_SOFTWARE_ENGINEER);
      setThemeConfig({ ...DEFAULT_THEME_CONFIG, templateId: 'executive-innovator', colorTheme: COLOR_THEMES[0] });
    } else if (presetKey === 'product') {
      setResumeData(SAMPLE_PRODUCT_MANAGER);
      setThemeConfig({ ...DEFAULT_THEME_CONFIG, templateId: 'minimal-classic', colorTheme: COLOR_THEMES[1] });
    } else {
      setResumeData({
        title: 'New Resume',
        personalInfo: {
          fullName: 'Your Name',
          jobTitle: 'Your Professional Title',
          email: 'email@example.com',
          phone: '+1 (555) 000-0000',
          location: 'City, Country',
          website: '',
          linkedin: '',
          github: '',
          summary: 'Write a brief 2-3 sentence overview of your background, experience, and top skills.'
        },
        experiences: [],
        education: [],
        skillCategories: [{ id: 'sk-blank', categoryName: 'Core Skills', skills: [{ name: 'Skill 1', level: 4 }] }],
        projects: [],
        certifications: [],
        languages: [],
        customSections: [],
        references: []
      });
    }
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personalInfo && Array.isArray(parsed.experiences)) {
        setResumeData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid resume JSON file:', e);
    }
    return false;
  };

  const exportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const resetResume = () => {
    if (window.confirm('Are you sure you want to reset all resume data?')) {
      loadPreset('blank');
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        themeConfig,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        atsBreakdown,
        zoomLevel,
        setZoomLevel,

        updateTitle,
        updatePersonalInfo,

        addExperience,
        updateExperience,
        deleteExperience,
        reorderExperience,

        addEducation,
        updateEducation,
        deleteEducation,
        reorderEducation,

        addSkillCategory,
        updateSkillCategory,
        deleteSkillCategory,
        reorderSkillCategories,

        addProject,
        updateProject,
        deleteProject,
        reorderProjects,

        addCertification,
        updateCertification,
        deleteCertification,
        reorderCertifications,

        addLanguage,
        updateLanguage,
        deleteLanguage,

        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        reorderCustomSections,
        reorderCustomItems,

        addReference,
        updateReference,
        deleteReference,

        setTemplateId,
        setColorTheme,
        setFontFamily,
        setFontSize,
        setSpacing,
        setShowPhoto,
        setPhotoSize,
        setPhotoShape,
        setShowSkillBars,
        setSidebarPosition,
        setPageMode,
        reorderSections,
        updateSectionOrder,

        loadPreset,
        importJson,
        exportJson,
        resetResume,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
