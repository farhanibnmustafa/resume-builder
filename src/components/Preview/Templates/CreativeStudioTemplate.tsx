import React from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Code } from 'lucide-react';
import { LinkedinIcon } from '../../Common/SocialIcons';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const CreativeStudioTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = sectionOrder || ['experience', 'projects', 'education', 'skills', 'certifications', 'languages', 'custom', 'references'];
  const totalItems = experiences.length + projects.length + certifications.length + customSections.length;
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);

  const creativeHeader = (
    <header
      className="creative-header-banner"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 100%)`,
        color: '#ffffff',
      }}
    >
      <div className="creative-header-content">
        {showPhoto && personalInfo.photoUrl && (
          <div className="creative-photo-ring">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          </div>
        )}
        <div className="creative-header-text">
          <h1 className="creative-name">{personalInfo.fullName}</h1>
          <h2 className="creative-jobtitle">{personalInfo.jobTitle}</h2>
          {personalInfo.summary && <p className="creative-tagline">{personalInfo.summary}</p>}
        </div>
      </div>

      <div className="creative-contact-pills">
        {personalInfo.email && <span><Mail size={13} /> {personalInfo.email}</span>}
        {personalInfo.phone && <span><Phone size={13} /> {personalInfo.phone}</span>}
        {personalInfo.location && <span><MapPin size={13} /> {personalInfo.location}</span>}
        {personalInfo.website && (
          <span>
            <Globe size={13} /> <a href={personalInfo.website} target="_blank" rel="noreferrer">Website</a>
          </span>
        )}
        {personalInfo.linkedin && (
          <span>
            <LinkedinIcon size={13} /> <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </span>
        )}
      </div>
    </header>
  );

  const sectionMap: Record<string, React.ReactNode> = {
    experience: experiences.length > 0 ? (
      <section key="experience" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>
          <Briefcase className="sec-icon" style={{ backgroundColor: colorTheme.sidebarBg || '#f0fdf4' }} />
          Work Experience
        </h3>
        <div className="timeline-container">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot" style={{ backgroundColor: colorTheme.primary }} />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-role">{exp.position}</span>
                    <span className="timeline-company" style={{ color: colorTheme.secondary }}> @ {exp.company}</span>
                  </div>
                  <span className="timeline-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul className="creative-bullet-list">
                  {exp.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: projects.length > 0 ? (
      <section key="projects" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>
          <Code className="sec-icon" style={{ backgroundColor: colorTheme.sidebarBg || '#f0fdf4' }} />
          Featured Projects
        </h3>
        <div className="creative-projects-grid">
          {projects.map((proj) => (
            <div key={proj.id} className="creative-proj-card" style={{ borderColor: colorTheme.primary }}>
              <div className="proj-card-title">{proj.name}</div>
              <p className="proj-card-desc">{proj.description}</p>
              {proj.technologies && (
                <div className="proj-card-tags">
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="creative-chip" style={{ backgroundColor: colorTheme.sidebarBg || '#f1f5f9' }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>
          <GraduationCap className="sec-icon" style={{ backgroundColor: colorTheme.sidebarBg || '#f0fdf4' }} />
          Education
        </h3>
        {education.map((edu) => (
          <div key={edu.id} className="creative-edu-block">
            <div className="edu-title">{edu.degree}</div>
            <div className="edu-institution">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
          </div>
        ))}
      </section>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>Skills</h3>
        {skillCategories.map((cat) => (
          <div key={cat.id} className="creative-skill-cat">
            <div className="cat-label">{cat.categoryName}</div>
            <div className="cat-chips">
              {cat.skills.map((s, i) => (
                <span key={i} className="creative-chip-badge" style={{ borderColor: colorTheme.primary }}>
                  {s.name}
                  {showSkillBars && (
                    <span className="skill-dots" style={{ marginLeft: '5px' }}>
                      {[1,2,3,4,5].map((d) => (
                        <span
                          key={d}
                          className="skill-dot"
                          style={{ backgroundColor: d <= (s.level ?? 3) ? colorTheme.primary : `${colorTheme.primary}30` }}
                        />
                      ))}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    ) : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>
          <Award className="sec-icon" style={{ backgroundColor: colorTheme.sidebarBg || '#f0fdf4' }} />
          Certifications
        </h3>
        <ul className="creative-bullet-list">
          {certifications.map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong> — {c.issuer} ({c.issueDate})
            </li>
          ))}
        </ul>
      </section>
    ) : null,

    languages: languages.length > 0 ? (
      <section key="languages" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>Languages</h3>
        <ul className="creative-bullet-list">
          {languages.map((l) => (
            <li key={l.id}>{l.name} ({l.proficiency})</li>
          ))}
        </ul>
      </section>
    ) : null,

    custom: customSections.length > 0 ? (
      <React.Fragment key="custom">
        {customSections.map((cs) => (
          <section key={cs.id} className="creative-section">
            <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>{cs.sectionTitle}</h3>
            {cs.items.map((item) => (
              <div key={item.id} className="creative-edu-block">
                <div className="edu-title">{item.title}</div>
                <p className="proj-card-desc">{item.description}</p>
              </div>
            ))}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>References</h3>
        {references.map((ref) => (
          <div key={ref.id} className="creative-edu-block" style={{ marginBottom: '10px' }}>
            <div className="edu-title">{ref.name}</div>
            <div className="edu-school">{ref.position}{ref.company && `, ${ref.company}`}</div>
            {ref.email && <div className="edu-date">Email: {ref.email}</div>}
            {ref.phone && <div className="edu-date">Phone: {ref.phone}</div>}
          </div>
        ))}
      </section>
    ) : null,
  };

  if (isMultiPage) {
    const splitCount = Math.min(4, Math.ceil(activeSectionOrder.length / 2));
    const page1Sections = activeSectionOrder.slice(0, splitCount);
    const page2Sections = activeSectionOrder.slice(splitCount);

    const mainKeys = ['experience', 'projects', 'summary', 'custom', 'references'];

    return (
      <div
        className="creative-studio-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Outfit, sans-serif', color: colorTheme.text }}
      >
        <div className="resume-page-sheet page-1">
          <div className="page-badge">Page 1 of 2</div>
          {creativeHeader}
          <div className="creative-grid-layout" style={{ marginTop: '16px' }}>
            <div className="creative-main-col">
              {page1Sections
                .filter((key) => mainKeys.includes(key))
                .map((key) => sectionMap[key])}
            </div>
            <div className="creative-sidebar-col">
              {page1Sections
                .filter((key) => !mainKeys.includes(key))
                .map((key) => sectionMap[key])}
            </div>
          </div>
        </div>

        <div className="page-break-gap">
          <span className="page-break-label">--- Page 2 of 2 Sheet Below ---</span>
        </div>

        <div className="resume-page-sheet page-2">
          <div className="page-badge">Page 2 of 2</div>
          <header className="creative-header-banner mini-header" style={{ background: colorTheme.primary, color: '#ffffff', padding: '12px 18px' }}>
            <h2 style={{ fontSize: '1.3rem', margin: 0 }}>
              {personalInfo.fullName} <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>— Portfolio Page 2</span>
            </h2>
          </header>

          <div className="creative-grid-layout" style={{ marginTop: '16px' }}>
            <div className="creative-main-col">
              {page2Sections
                .filter((key) => mainKeys.includes(key))
                .map((key) => sectionMap[key])}
            </div>
            <div className="creative-sidebar-col">
              {page2Sections
                .filter((key) => !mainKeys.includes(key))
                .map((key) => sectionMap[key])}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="creative-studio-template single-page-layout"
      style={{ fontFamily: fontFamily || 'Outfit, sans-serif', color: colorTheme.text }}
    >
      <div className="resume-page-sheet page-1">
        {creativeHeader}
        <div className="creative-grid-layout" style={{ marginTop: '16px' }}>
          <div className="creative-main-col">
            {activeSectionOrder
              .filter((key) => key === 'experience' || key === 'projects' || key === 'custom')
              .map((key) => sectionMap[key])}
          </div>

          <div className="creative-sidebar-col">
            {activeSectionOrder
              .filter((key) => key !== 'experience' && key !== 'projects' && key !== 'custom')
              .map((key) => sectionMap[key])}
          </div>
        </div>
      </div>
    </div>
  );
};
