import React from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const CompactOnePagerTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'languages', 'custom', 'references'];
  // "Compact One Pager" should default to 1 page — only go multi-page if user explicitly picks '2-page'
  const isMultiPage = pageMode === '2-page';

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  const compactHeader = (
    <header className="compact-header" style={{ backgroundColor: colorTheme.sidebarBg || '#f8fafc', borderLeftColor: colorTheme.primary }}>
      <div className="compact-header-top" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colorTheme.primary}`, flexShrink: 0 }}
          />
        )}
        <div>
          <h1 className="compact-name" style={{ color: colorTheme.primary }}>
            {personalInfo.fullName}
          </h1>
          <span className="compact-jobtitle" style={{ color: colorTheme.secondary }}>
            {personalInfo.jobTitle}
          </span>
        </div>
      </div>
      <div className="compact-contacts">{contacts.join(' | ')}</div>
    </header>
  );

  const sectionMap: Record<string, React.ReactNode> = {
    summary: personalInfo.summary ? (
      <div key="summary" className="compact-summary">
        <strong>Profile: </strong> {personalInfo.summary}
      </div>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <div key="skills" className="compact-skills-row" style={{ borderColor: colorTheme.primary }}>
        {skillCategories.map((cat) => (
          <div key={cat.id} className="compact-skill-group">
            <span className="compact-cat-label" style={{ color: colorTheme.primary }}>{cat.categoryName}:</span>{' '}
            {showSkillBars
              ? (
                <span>
                  {cat.skills.map((s, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginRight: '8px' }}>
                      {s.name}
                      <span className="skill-dots">
                        {[1,2,3,4,5].map((d) => (
                          <span
                            key={d}
                            className="skill-dot"
                            style={{ backgroundColor: d <= (s.level ?? 3) ? colorTheme.primary : `${colorTheme.primary}30` }}
                          />
                        ))}
                      </span>
                    </span>
                  ))}
                </span>
              )
              : cat.skills.map((s) => s.name).join(', ')
            }
          </div>
        ))}
      </div>
    ) : null,

    experience: experiences.length > 0 ? (
      <section key="experience" className="compact-section">
        <h3 className="compact-sec-heading" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Professional Experience
        </h3>
        {experiences.map((exp) => (
          <div key={exp.id} className="compact-exp-item">
            <div className="compact-row">
              <span className="compact-bold">
                {exp.position} <span className="compact-normal">@ {exp.company}</span>
              </span>
              <span className="compact-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <ul className="compact-bullet-list">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ) : null,

    projects: projects.length > 0 ? (
      <section key="projects" className="compact-section">
        <h3 className="compact-sec-heading" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Key Projects
        </h3>
        {projects.map((proj) => (
          <div key={proj.id} className="compact-mini-item">
            <div className="compact-bold">{proj.name} {proj.role && `(${proj.role})`}</div>
            <div>{proj.description}</div>
          </div>
        ))}
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" className="compact-section">
        <h3 className="compact-sec-heading" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Education
        </h3>
        {education.map((edu) => (
          <div key={edu.id} className="compact-mini-item">
            <div className="compact-bold">{edu.degree}</div>
            <div>{edu.institution} ({edu.startDate} – {edu.endDate})</div>
          </div>
        ))}
      </section>
    ) : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="compact-section">
        <h3 className="compact-sec-heading" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Certifications
        </h3>
        <ul className="compact-bullet-list">
          {certifications.map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong> — {c.issuer} ({c.issueDate})
            </li>
          ))}
        </ul>
      </section>
    ) : null,

    languages: languages.length > 0 ? (
      <div key="languages" className="compact-footer-row">
        <span><strong>Languages:</strong> {languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</span>
      </div>
    ) : null,

    custom: customSections.length > 0 ? (
      <React.Fragment key="custom">
        {customSections.map((cs) => (
          <section key={cs.id} className="compact-section">
            <h3 className="compact-sec-heading" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
              {cs.sectionTitle}
            </h3>
            {cs.items.map((item) => (
              <div key={item.id} className="compact-mini-item">
                <div className="compact-bold">{item.title}</div>
                <div>{item.description}</div>
              </div>
            ))}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="compact-section">
        <h3 className="compact-sec-heading" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          References
        </h3>
        {references.map((ref) => (
          <div key={ref.id} className="compact-mini-item">
            <div className="compact-bold">{ref.name}</div>
            <div>{ref.position}{ref.company && `, ${ref.company}`}</div>
            {ref.email && <div>Email: {ref.email}</div>}
            {ref.phone && <div>Phone: {ref.phone}</div>}
          </div>
        ))}
      </section>
    ) : null,
  };

  if (isMultiPage) {
    const splitCount = Math.min(3, Math.ceil(activeSectionOrder.length / 2));
    const page1Sections = activeSectionOrder.slice(0, splitCount);
    const page2Sections = activeSectionOrder.slice(splitCount);

    return (
      <div
        className="compact-one-pager-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Inter, sans-serif', color: colorTheme.text }}
      >
        <div className="resume-page-sheet page-1">
          <div className="page-badge">Page 1 of 2</div>
          {compactHeader}
          {page1Sections.map((key) => sectionMap[key])}
        </div>

        <div className="page-break-gap">
          <span className="page-break-label">--- Page 2 of 2 Sheet Below ---</span>
        </div>

        <div className="resume-page-sheet page-2">
          <div className="page-badge">Page 2 of 2</div>
          <header className="compact-header mini-header" style={{ backgroundColor: colorTheme.sidebarBg || '#f8fafc', borderLeftColor: colorTheme.primary }}>
            <h2 style={{ fontSize: '1.2rem', margin: 0 }}>
              {personalInfo.fullName} <span style={{ fontSize: '0.85rem', color: colorTheme.secondary }}>— Page 2</span>
            </h2>
          </header>
          {page2Sections.map((key) => sectionMap[key])}
        </div>
      </div>
    );
  }

  return (
    <div
      className="compact-one-pager-template single-page-layout"
      style={{ fontFamily: fontFamily || 'Inter, sans-serif', color: colorTheme.text }}
    >
      <div className="resume-page-sheet page-1">
        {compactHeader}
        {activeSectionOrder.map((key) => sectionMap[key])}
      </div>
    </div>
  );
};
