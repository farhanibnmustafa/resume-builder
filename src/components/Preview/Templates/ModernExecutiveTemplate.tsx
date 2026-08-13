import React from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Common/SocialIcons';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ModernExecutiveTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, sidebarPosition, pageMode, sectionOrder } = theme;

  const activeSectionOrder = sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom', 'references'];

  const totalItems = experiences.length + projects.length + certifications.length + customSections.length;
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);

  const sidebarContent = (
    <div className="modern-sidebar" style={{ backgroundColor: colorTheme.sidebarBg || '#f8fafc' }}>
      {showPhoto && personalInfo.photoUrl && (
        <div className="photo-wrapper">
          <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="user-photo" />
        </div>
      )}

      {/* Contact Info */}
      <div className="sidebar-section">
        <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Contact
        </h3>
        <ul className="contact-list">
          {personalInfo.email && (
            <li>
              <Mail size={14} style={{ color: colorTheme.primary }} />
              <span>{personalInfo.email}</span>
            </li>
          )}
          {personalInfo.phone && (
            <li>
              <Phone size={14} style={{ color: colorTheme.primary }} />
              <span>{personalInfo.phone}</span>
            </li>
          )}
          {personalInfo.location && (
            <li>
              <MapPin size={14} style={{ color: colorTheme.primary }} />
              <span>{personalInfo.location}</span>
            </li>
          )}
          {personalInfo.website && (
            <li>
              <Globe size={14} style={{ color: colorTheme.primary }} />
              <a href={personalInfo.website} target="_blank" rel="noreferrer">Website</a>
            </li>
          )}
          {personalInfo.linkedin && (
            <li>
              <LinkedinIcon size={14} style={{ color: colorTheme.primary }} />
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
          )}
          {personalInfo.github && (
            <li>
              <GithubIcon size={14} style={{ color: colorTheme.primary }} />
              <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
          )}
        </ul>
      </div>

      {/* Skills */}
      {skillCategories.length > 0 && (
        <div className="sidebar-section">
          <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
            Skills & Expertise
          </h3>
          {skillCategories.map((cat) => (
            <div key={cat.id} className="skill-cat-block">
              <h4 className="skill-cat-name">{cat.categoryName}</h4>
              <div className="skills-tags">
                {cat.skills.map((s, idx) => (
                  <div key={idx} className="skill-tag-item">
                    <span className="skill-name">{s.name}</span>
                    {showSkillBars && s.level && (
                      <div className="skill-bar-track">
                        <div
                          className="skill-bar-fill"
                          style={{ width: `${(s.level / 5) * 100}%`, backgroundColor: colorTheme.primary }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="sidebar-section">
          <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
            Education
          </h3>
          {education.map((edu) => (
            <div key={edu.id} className="edu-sidebar-item">
              <div className="edu-degree">{edu.degree}</div>
              <div className="edu-institution">{edu.institution}</div>
              <div className="edu-dates">
                {edu.startDate} – {edu.endDate || 'Present'}
              </div>
              {edu.gpa && <div className="edu-gpa">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="sidebar-section">
          <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
            Languages
          </h3>
          <ul className="lang-list">
            {languages.map((l) => (
              <li key={l.id}>
                <strong>{l.name}</strong> <span className="lang-prof">({l.proficiency})</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const sidebarContentPage2 = (
    <div className="modern-sidebar" style={{ backgroundColor: colorTheme.sidebarBg || '#f8fafc' }}>
      <div className="sidebar-section">
        <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Page 2 Overview
        </h3>
        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
          Key projects, professional certifications, and publications.
        </p>
      </div>
    </div>
  );

  // Section Map for Dynamic Ordering
  const sectionMap: Record<string, React.ReactNode> = {
    summary: personalInfo.summary ? (
      <section key="summary" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Executive Summary
        </h3>
        <p className="summary-text">{personalInfo.summary}</p>
      </section>
    ) : null,

    experience: experiences.length > 0 ? (
      <section key="experience" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Work Experience
        </h3>
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-item">
            <div className="exp-header">
              <div>
                <span className="exp-position">{exp.position}</span>
                <span className="exp-company"> | {exp.company}</span>
              </div>
              <span className="exp-dates">
                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            {exp.location && <div className="exp-location">{exp.location}</div>}
            <ul className="exp-highlights">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ) : null,

    projects: projects.length > 0 ? (
      <section key="projects" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Key Projects
        </h3>
        {projects.map((proj) => (
          <div key={proj.id} className="project-item">
            <div className="proj-header">
              <span className="proj-title">{proj.name}</span>
              {proj.role && <span className="proj-role"> ({proj.role})</span>}
            </div>
            <p className="proj-desc">{proj.description}</p>
            {proj.technologies && proj.technologies.length > 0 && (
              <div className="proj-tech">
                <strong>Tech Stack:</strong> {proj.technologies.join(', ')}
              </div>
            )}
            {proj.highlights && proj.highlights.length > 0 && (
              <ul className="exp-highlights">
                {proj.highlights.map((h, idx) => (
                  <li key={idx}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Skills & Technical Expertise
        </h3>
        <div className="skill-cat-blocks" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px', marginTop: '6px' }}>
          {skillCategories.map((cat) => (
            <div key={cat.id} className="skill-cat-block">
              <h4 className="skill-cat-name" style={{ fontSize: '0.85rem', fontWeight: 600, color: colorTheme.secondary, marginBottom: '4px' }}>{cat.categoryName}</h4>
              <div className="skills-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {cat.skills.map((s, idx) => (
                  <span key={idx} style={{ background: '#f1f5f9', color: '#1e293b', padding: '2px 8px', borderRadius: '4px', fontSize: '0.78rem' }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Certifications
        </h3>
        <ul className="cert-list">
          {certifications.map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong> — {c.issuer} ({c.issueDate})
            </li>
          ))}
        </ul>
      </section>
    ) : null,

    custom: customSections.length > 0 ? (
      <React.Fragment key="custom">
        {customSections.map((cs) => (
          <section key={cs.id} className="main-section">
            <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
              {cs.sectionTitle}
            </h3>
            {cs.items.map((item) => (
              <div key={item.id} className="custom-item">
                <div className="custom-header">
                  <span className="custom-item-title">{item.title}</span>
                  {item.date && <span className="custom-item-date">{item.date}</span>}
                </div>
                {item.subtitle && <div className="custom-subtitle">{item.subtitle}</div>}
                <p className="custom-desc">{item.description}</p>
              </div>
            ))}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          References
        </h3>
        <div className="references-grid">
          {references.map((ref) => (
            <div key={ref.id} className="ref-card">
              <div className="ref-name"><strong>{ref.name}</strong></div>
              <div className="ref-title">{ref.position}{ref.company && `, ${ref.company}`}</div>
              {ref.email && <div className="ref-contact">Email: {ref.email}</div>}
              {ref.phone && <div className="ref-contact">Phone: {ref.phone}</div>}
            </div>
          ))}
        </div>
      </section>
    ) : null,
  };

  if (isMultiPage) {
    const splitCount = Math.min(3, Math.ceil(activeSectionOrder.length / 2));
    const page1Sections = activeSectionOrder.slice(0, splitCount);
    const page2Sections = activeSectionOrder.slice(splitCount);

    return (
      <div
        className={`modern-executive-template multi-page-layout sidebar-${sidebarPosition}`}
        style={{ fontFamily: fontFamily, color: colorTheme.text }}
      >
        {/* PAGE 1 A4 SHEET */}
        <div className="resume-page-sheet page-1">
          <div className="page-badge">Page 1 of 2</div>
          <div className="executive-header" style={{ borderBottomColor: colorTheme.primary }}>
            <h1 className="header-name" style={{ color: colorTheme.primary }}>
              {personalInfo.fullName}
            </h1>
            <h2 className="header-title" style={{ color: colorTheme.secondary }}>
              {personalInfo.jobTitle}
            </h2>
          </div>

          <div className="template-body-grid">
            {sidebarPosition === 'left' && sidebarContent}

            <div className="main-content">
              {page1Sections.map((key) => sectionMap[key])}
            </div>

            {sidebarPosition === 'right' && sidebarContent}
          </div>
        </div>

        {/* PAGE BREAK GAP */}
        <div className="page-break-gap">
          <span className="page-break-label">--- Page 2 of 2 Sheet Below ---</span>
        </div>

        {/* PAGE 2 A4 SHEET */}
        <div className="resume-page-sheet page-2">
          <div className="page-badge">Page 2 of 2</div>
          <div className="executive-header mini-header" style={{ borderBottomColor: colorTheme.primary }}>
            <h2 className="header-name-mini" style={{ color: colorTheme.primary }}>
              {personalInfo.fullName} <span style={{ fontSize: '0.9rem', color: colorTheme.secondary }}>— Continued</span>
            </h2>
          </div>

          <div className="template-body-grid">
            {sidebarPosition === 'left' && sidebarContentPage2}

            <div className="main-content">
              {page2Sections.map((key) => sectionMap[key])}
            </div>

            {sidebarPosition === 'right' && sidebarContentPage2}
          </div>
        </div>
      </div>
    );
  }

  // Single Page View
  return (
    <div
      className={`modern-executive-template single-page-layout sidebar-${sidebarPosition}`}
      style={{ fontFamily: fontFamily, color: colorTheme.text }}
    >
      <div className="resume-page-sheet page-1">
        <div className="executive-header" style={{ borderBottomColor: colorTheme.primary }}>
          <h1 className="header-name" style={{ color: colorTheme.primary }}>
            {personalInfo.fullName}
          </h1>
          <h2 className="header-title" style={{ color: colorTheme.secondary }}>
            {personalInfo.jobTitle}
          </h2>
        </div>

        <div className="template-body-grid">
          {sidebarPosition === 'left' && sidebarContent}

          <div className="main-content">
            {activeSectionOrder.map((key) => sectionMap[key])}
          </div>

          {sidebarPosition === 'right' && sidebarContent}
        </div>
      </div>
    </div>
  );
};
