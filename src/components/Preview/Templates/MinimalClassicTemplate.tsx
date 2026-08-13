import React from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const MinimalClassicTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom', 'references'];
  const totalItems = experiences.length + projects.length + certifications.length + customSections.length;
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  const sectionMap: Record<string, React.ReactNode> = {
    summary: personalInfo.summary ? (
      <section key="summary" className="minimal-section">
        <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Professional Summary
        </h2>
        <p className="minimal-summary">{personalInfo.summary}</p>
      </section>
    ) : null,

    experience: experiences.length > 0 ? (
      <section key="experience" className="minimal-section">
        <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Work Experience
        </h2>
        {experiences.map((exp) => (
          <div key={exp.id} className="minimal-exp-item">
            <div className="minimal-exp-row">
              <span className="minimal-exp-title">
                <strong>{exp.position}</strong> — {exp.company}
              </span>
              <span className="minimal-exp-dates">
                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            {exp.location && <div className="minimal-exp-loc">{exp.location}</div>}
            <ul className="minimal-bullet-list">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" className="minimal-section">
        <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Education
        </h2>
        {education.map((edu) => (
          <div key={edu.id} className="minimal-edu-item">
            <div className="minimal-exp-row">
              <span>
                <strong>{edu.degree}</strong>, {edu.institution}
              </span>
              <span className="minimal-exp-dates">
                {edu.startDate} – {edu.endDate}
              </span>
            </div>
            {edu.gpa && <div className="minimal-subtext">GPA: {edu.gpa}</div>}
            {edu.description && <div className="minimal-subtext">{edu.description}</div>}
          </div>
        ))}
      </section>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="minimal-section">
        <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Skills & Expertise
        </h2>
        <div className="minimal-skills-grid">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="minimal-skill-row">
              <span className="minimal-skill-cat"><strong>{cat.categoryName}:</strong></span>{' '}
              {showSkillBars
                ? (
                  <span className="minimal-skill-bars-row">
                    {cat.skills.map((s, i) => (
                      <span key={i} className="minimal-skill-bar-item">
                        <span className="minimal-skill-name">{s.name}</span>
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
                : <span className="minimal-skill-list">{cat.skills.map((s) => s.name).join(', ')}</span>
              }
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: projects.length > 0 ? (
      <section key="projects" className="minimal-section">
        <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Key Projects
        </h2>
        {projects.map((proj) => (
          <div key={proj.id} className="minimal-exp-item">
            <div className="minimal-exp-row">
              <span className="minimal-exp-title">
                <strong>{proj.name}</strong> {proj.role && `(${proj.role})`}
              </span>
            </div>
            <p className="minimal-summary">{proj.description}</p>
            {proj.technologies && proj.technologies.length > 0 && (
              <div className="minimal-subtext">
                <strong>Tech Stack:</strong> {proj.technologies.join(', ')}
              </div>
            )}
            {proj.highlights && proj.highlights.length > 0 && (
              <ul className="minimal-bullet-list">
                {proj.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    ) : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="minimal-section">
        <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Certifications
        </h2>
        <ul className="minimal-bullet-list">
          {certifications.map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong> — {c.issuer} ({c.issueDate})
            </li>
          ))}
        </ul>
      </section>
    ) : null,

    languages: languages.length > 0 ? (
      <section key="languages" className="minimal-section">
        <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Languages
        </h2>
        <div className="minimal-subtext">
          {languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')}
        </div>
      </section>
    ) : null,

    custom: customSections.length > 0 ? (
      <React.Fragment key="custom">
        {customSections.map((cs) => (
          <section key={cs.id} className="minimal-section">
            <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
              {cs.sectionTitle}
            </h2>
            {cs.items.map((item) => (
              <div key={item.id} className="minimal-exp-item">
                <div className="minimal-exp-row">
                  <strong className="minimal-exp-title">{item.title}</strong>
                  {item.date && <span className="minimal-exp-dates">{item.date}</span>}
                </div>
                {item.subtitle && <div className="minimal-subtext">{item.subtitle}</div>}
                <p className="minimal-summary">{item.description}</p>
              </div>
            ))}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="minimal-section">
        <h2 className="minimal-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          References
        </h2>
        <div className="references-grid">
          {references.map((ref) => (
            <div key={ref.id} className="minimal-exp-item">
              <strong className="minimal-exp-title">{ref.name}</strong>
              <div className="minimal-subtext">{ref.position}{ref.company && `, ${ref.company}`}</div>
              {ref.email && <div className="minimal-subtext">Email: {ref.email}</div>}
              {ref.phone && <div className="minimal-subtext">Phone: {ref.phone}</div>}
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
        className="minimal-classic-template multi-page-layout"
        style={{ fontFamily: fontFamily, color: colorTheme.text }}
      >
        <div className="resume-page-sheet page-1">
          <div className="page-badge">Page 1 of 2</div>
          <header className="minimal-header">
            <h1 className="minimal-name" style={{ color: colorTheme.primary }}>
              {personalInfo.fullName}
            </h1>
            <div className="minimal-jobtitle" style={{ color: colorTheme.secondary }}>
              {personalInfo.jobTitle}
            </div>
            <div className="minimal-contact-line">{contacts.join(' • ')}</div>
          </header>

          {page1Sections.map((key) => sectionMap[key])}
        </div>

        <div className="page-break-gap">
          <span className="page-break-label">--- Page 2 of 2 Sheet Below ---</span>
        </div>

        <div className="resume-page-sheet page-2">
          <div className="page-badge">Page 2 of 2</div>
          <header className="minimal-header mini-header">
            <h2 className="minimal-name" style={{ color: colorTheme.primary, fontSize: '1.4rem' }}>
              {personalInfo.fullName} <span style={{ fontSize: '0.85rem', color: colorTheme.secondary }}>— Continued</span>
            </h2>
          </header>

          {page2Sections.map((key) => sectionMap[key])}
        </div>
      </div>
    );
  }

  return (
    <div
      className="minimal-classic-template single-page-layout"
      style={{ fontFamily: fontFamily || 'Merriweather', color: colorTheme.text }}
    >
      <div className="resume-page-sheet page-1">
        <header className="minimal-header">
          {showPhoto && personalInfo.photoUrl && (
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} className="minimal-photo" />
          )}
          <h1 className="minimal-name" style={{ color: colorTheme.primary }}>
            {personalInfo.fullName}
          </h1>
          <div className="minimal-jobtitle" style={{ color: colorTheme.secondary }}>
            {personalInfo.jobTitle}
          </div>
          <div className="minimal-contact-line">{contacts.join(' • ')}</div>
        </header>

        {activeSectionOrder.map((key) => sectionMap[key])}
      </div>
    </div>
  );
};
