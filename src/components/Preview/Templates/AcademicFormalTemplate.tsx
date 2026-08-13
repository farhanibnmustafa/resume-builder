import React from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const AcademicFormalTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = sectionOrder || ['education', 'experience', 'summary', 'projects', 'skills', 'certifications', 'languages', 'custom', 'references'];
  const totalItems = experiences.length + projects.length + certifications.length + customSections.length;
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
  ].filter(Boolean);

  const academicHeader = (
    <header className="academic-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colorTheme.primary}`, flexShrink: 0 }}
          />
        )}
        <div>
          <h1 className="academic-name">{personalInfo.fullName}</h1>
          <div className="academic-title">{personalInfo.jobTitle}</div>
          <div className="academic-contacts">{contacts.join(' | ')}</div>
        </div>
      </div>
      <hr className="academic-divider" style={{ borderColor: colorTheme.primary }} />
    </header>
  );

  const sectionMap: Record<string, React.ReactNode> = {
    summary: personalInfo.summary ? (
      <section key="summary" className="academic-section">
        <h2 className="academic-heading" style={{ color: colorTheme.primary }}>Curriculum Vitae Overview</h2>
        <p className="academic-summary">{personalInfo.summary}</p>
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" className="academic-section">
        <h2 className="academic-heading" style={{ color: colorTheme.primary }}>Education & Academic Qualifications</h2>
        {education.map((edu) => (
          <div key={edu.id} className="academic-item">
            <div className="academic-row">
              <span className="academic-bold">{edu.degree}</span>
              <span className="academic-date">{edu.startDate} – {edu.endDate}</span>
            </div>
            <div className="academic-italic">{edu.institution}, {edu.location}</div>
            {edu.gpa && <div className="academic-detail">GPA / Honors: {edu.gpa}</div>}
            {edu.description && <div className="academic-detail">{edu.description}</div>}
          </div>
        ))}
      </section>
    ) : null,

    experience: experiences.length > 0 ? (
      <section key="experience" className="academic-section">
        <h2 className="academic-heading" style={{ color: colorTheme.primary }}>Professional Appointments & Experience</h2>
        {experiences.map((exp) => (
          <div key={exp.id} className="academic-item">
            <div className="academic-row">
              <span className="academic-bold">{exp.position}</span>
              <span className="academic-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <div className="academic-italic">{exp.company}, {exp.location}</div>
            <ul className="academic-bullet-list">
              {exp.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ) : null,

    projects: projects.length > 0 ? (
      <section key="projects" className="academic-section">
        <h2 className="academic-heading" style={{ color: colorTheme.primary }}>Research Projects & Grant Work</h2>
        {projects.map((proj) => (
          <div key={proj.id} className="academic-item">
            <div className="academic-bold">{proj.name} ({proj.role})</div>
            <p className="academic-detail">{proj.description}</p>
          </div>
        ))}
      </section>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="academic-section">
        <h2 className="academic-heading" style={{ color: colorTheme.primary }}>Scholarly & Technical Skills</h2>
        {skillCategories.map((cat) => (
          <div key={cat.id} className="academic-skill-line">
            <span className="academic-bold">{cat.categoryName}:</span>{' '}
            {showSkillBars
              ? (
                <span className="academic-skill-bars-row">
                  {cat.skills.map((s, i) => (
                    <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginRight: '10px' }}>
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
      </section>
    ) : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="academic-section">
        <h2 className="academic-heading" style={{ color: colorTheme.primary }}>Certifications & Fellowships</h2>
        <ul className="academic-bullet-list">
          {certifications.map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong> — {c.issuer} ({c.issueDate})
            </li>
          ))}
        </ul>
      </section>
    ) : null,

    languages: languages.length > 0 ? (
      <section key="languages" className="academic-section">
        <h2 className="academic-heading" style={{ color: colorTheme.primary }}>Languages</h2>
        <div className="academic-detail">{languages.map((l) => `${l.name} (${l.proficiency})`).join('; ')}</div>
      </section>
    ) : null,

    custom: customSections.length > 0 ? (
      <React.Fragment key="custom">
        {customSections.map((cs) => (
          <section key={cs.id} className="academic-section">
            <h2 className="academic-heading" style={{ color: colorTheme.primary }}>{cs.sectionTitle}</h2>
            {cs.items.map((item) => (
              <div key={item.id} className="academic-item">
                <div className="academic-row">
                  <span className="academic-bold">{item.title}</span>
                  {item.date && <span className="academic-date">{item.date}</span>}
                </div>
                {item.subtitle && <div className="academic-italic">{item.subtitle}</div>}
                <p className="academic-detail">{item.description}</p>
              </div>
            ))}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="academic-section">
        <h2 className="academic-heading" style={{ color: colorTheme.primary }}>References</h2>
        {references.map((ref) => (
          <div key={ref.id} className="academic-item">
            <span className="academic-bold">{ref.name}</span>
            <div className="academic-italic">{ref.position}{ref.company && `, ${ref.company}`}</div>
            {ref.email && <div className="academic-date">Email: {ref.email}</div>}
            {ref.phone && <div className="academic-date">Phone: {ref.phone}</div>}
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
        className="academic-formal-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Georgia, serif', color: colorTheme.text }}
      >
        <div className="resume-page-sheet page-1">
          <div className="page-badge">Page 1 of 2</div>
          {academicHeader}
          {page1Sections.map((key) => sectionMap[key])}
        </div>

        <div className="page-break-gap">
          <span className="page-break-label">--- Page 2 of 2 Sheet Below ---</span>
        </div>

        <div className="resume-page-sheet page-2">
          <div className="page-badge">Page 2 of 2</div>
          <header className="academic-header mini-header">
            <h2 style={{ fontSize: '1.3rem', margin: 0 }}>
              {personalInfo.fullName} <span style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>— CV Page 2</span>
            </h2>
            <hr className="academic-divider" style={{ borderColor: colorTheme.primary, margin: '8px 0 14px 0' }} />
          </header>

          {page2Sections.map((key) => sectionMap[key])}
        </div>
      </div>
    );
  }

  return (
    <div
      className="academic-formal-template single-page-layout"
      style={{ fontFamily: fontFamily || 'Georgia, serif', color: colorTheme.text }}
    >
      <div className="resume-page-sheet page-1">
        {academicHeader}
        {activeSectionOrder.map((key) => sectionMap[key])}
      </div>
    </div>
  );
};
