import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm } from './CertificationsForm';
import { LanguagesForm } from './LanguagesForm';
import { CustomSectionForm } from './CustomSectionForm';
import { ReferencesForm } from './ReferencesForm';
import { DesignCustomizer } from './DesignCustomizer';
import { AtsAnalysisPanel } from './AtsAnalysisPanel';
import { User, Briefcase, GraduationCap, Cpu, Code, Award, Languages, Layers, Users, Palette, ShieldCheck } from 'lucide-react';

export const FormEditor: React.FC = () => {
  const { activeTab, setActiveTab, atsBreakdown } = useResume();

  const TABS = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'certifications', label: 'Certs', icon: Award },
    { id: 'languages', label: 'Languages', icon: Languages },
    { id: 'custom', label: 'Custom', icon: Layers },
    { id: 'references', label: 'References', icon: Users },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'ats', label: `ATS (${atsBreakdown.score})`, icon: ShieldCheck, highlight: true },
  ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'custom':
        return <CustomSectionForm />;
      case 'references':
        return <ReferencesForm />;
      case 'design':
        return <DesignCustomizer />;
      case 'ats':
        return <AtsAnalysisPanel />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <div className="editor-container">
      {/* Scrollable Navigation Tabs Bar */}
      <div className="editor-tabs-bar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''} ${tab.highlight ? 'highlight-tab' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Editor Content Area */}
      <div className="editor-content-scroll">
        {renderActiveTabContent()}
      </div>
    </div>
  );
};
