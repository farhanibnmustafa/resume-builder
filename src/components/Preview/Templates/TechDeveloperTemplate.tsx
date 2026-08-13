import React from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Terminal, Code, Cpu, ExternalLink, Mail, MapPin, BookOpen, Award, Users } from 'lucide-react';
import { GithubIcon } from '../../Common/SocialIcons';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const TechDeveloperTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = sectionOrder || ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'languages', 'custom', 'references'];
  const totalItems = experiences.length + projects.length + certifications.length + customSections.length;
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);

  const sectionMap: Record<string, React.ReactNode> = {
    summary: personalInfo.summary ? (
      <section key="summary" className="tech-section">
        <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          <Code size={16} />
          <span>About & Bio</span>
        </h3>
        <div className="tech-code-block">{personalInfo.summary}</div>
      </section>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="tech-section">
        <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          <Cpu size={16} />
          <span>Technical Stack & Tools</span>
        </h3>
        <div className="tech-skill-categories">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="tech-cat-card">
              <div className="tech-cat-name" style={{ color: colorTheme.secondary }}>
                const {cat.categoryName.replace(/\s+/g, '_')} = [
              </div>
              <div className="tech-badges-row">
                {cat.skills.map((s, idx) => (
                  <span key={idx} className="tech-badge" style={{ borderColor: colorTheme.primary }}>
                    "{s.name}"
                    {showSkillBars && (
                      <span className="skill-dots" style={{ marginLeft: '4px' }}>
                        {[1,2,3,4,5].map((d) => (
                          <span
                            key={d}
                            className="skill-dot"
                            style={{ backgroundColor: d <= (s.level ?? 3) ? '#ffffff' : 'rgba(255,255,255,0.25)' }}
                          />
                        ))}
                      </span>
                    )}
                  </span>
                ))}
              </div>
              <div className="tech-cat-close">];</div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    experience: experiences.length > 0 ? (
      <section key="experience" className="tech-section">
        <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          <Terminal size={16} />
          <span>Work Experience</span>
        </h3>
        {experiences.map((exp) => (
          <div key={exp.id} className="tech-exp-card">
            <div className="tech-exp-header">
              <div className="tech-role-company">
                <span className="tech-role">{exp.position}</span>
                <span className="tech-at" style={{ color: colorTheme.primary }}> @ </span>
                <span className="tech-company" style={{ color: colorTheme.primary }}>
                  {exp.company}
                </span>
              </div>
              <span className="tech-dates-badge">
                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            {exp.location && <div className="tech-location">{exp.location}</div>}
            <ul className="tech-bullet-list">
              {exp.highlights.map((h, idx) => (
                <li key={idx}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ) : null,

    projects: projects.length > 0 ? (
      <section key="projects" className="tech-section">
        <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          <Code size={16} />
          <span>Key Projects & Open Source</span>
        </h3>
        {projects.map((proj) => (
          <div key={proj.id} className="tech-proj-card">
            <div className="tech-exp-header">
              <span className="tech-proj-name">
                {proj.name} {proj.role && <span className="tech-proj-role">[{proj.role}]</span>}
              </span>
            </div>
            <p className="tech-proj-desc">{proj.description}</p>
            {proj.technologies && proj.technologies.length > 0 && (
              <div className="tech-proj-stack">
                <strong>Tech Stack:</strong> {proj.technologies.join(' • ')}
              </div>
            )}
            {proj.highlights && proj.highlights.length > 0 && (
              <ul className="tech-bullet-list">
                {proj.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" className="tech-section">
        <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          <BookOpen size={16} />
          <span>Education & Credentials</span>
        </h3>
        {education.map((edu) => (
          <div key={edu.id} className="tech-edu-card">
            <div className="tech-exp-header">
              <div className="tech-role-company">
                <strong>{edu.degree}</strong>
                <span className="tech-at" style={{ color: colorTheme.primary }}> @ </span>
                <span style={{ color: colorTheme.primary }}>{edu.institution}</span>
              </div>
              <span className="tech-dates-badge">{edu.startDate} – {edu.endDate}</span>
            </div>
            {edu.gpa && <div className="tech-subtext">GPA: {edu.gpa}</div>}
          </div>
        ))}
      </section>
    ) : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="tech-section">
        <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          <Award size={16} />
          <span>Certifications</span>
        </h3>
        <ul className="tech-bullet-list">
          {certifications.map((c) => (
            <li key={c.id}>
              <strong>{c.title}</strong> — {c.issuer} ({c.issueDate})
            </li>
          ))}
        </ul>
      </section>
    ) : null,

    languages: languages.length > 0 ? (
      <section key="languages" className="tech-section">
        <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          <Terminal size={16} />
          <span>Languages</span>
        </h3>
        <div className="tech-subtext">
          {languages.map((l) => `${l.name} (${l.proficiency})`).join(' • ')}
        </div>
      </section>
    ) : null,

    custom: customSections.length > 0 ? (
      <React.Fragment key="custom">
        {customSections.map((cs) => (
          <section key={cs.id} className="tech-section">
            <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
              <Code size={16} />
              <span>{cs.sectionTitle}</span>
            </h3>
            {cs.items.map((item) => (
              <div key={item.id} className="tech-exp-card">
                <div className="tech-exp-header">
                  <strong>{item.title}</strong>
                  {item.date && <span className="tech-dates-badge">{item.date}</span>}
                </div>
                {item.subtitle && <div className="tech-subtext">{item.subtitle}</div>}
                <p className="tech-proj-desc">{item.description}</p>
              </div>
            ))}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="tech-section">
        <h3 className="tech-section-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          <Users size={16} />
          <span>References</span>
        </h3>
        <div className="tech-code-block">
          {references.map((ref) => (
            <div key={ref.id} style={{ marginBottom: '8px' }}>
              <strong>{ref.name}</strong> — {ref.position}{ref.company && `, ${ref.company}`}
              {ref.email && <div>Email: {ref.email}</div>}
              {ref.phone && <div>Phone: {ref.phone}</div>}
            </div>
          ))}
        </div>
      </section>
    ) : null,
  };

  const terminalHeader = (
    <div className="tech-header-banner" style={{ backgroundColor: colorTheme.primary, color: '#ffffff' }}>
      <div className="terminal-dots">
        <span className="dot red"></span>
        <span className="dot yellow"></span>
        <span className="dot green"></span>
        <span className="terminal-path">~/dev-resume/{personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}</span>
      </div>
      <div className="tech-header-inner" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className="tech-photo"
            style={{ width: '70px', height: '70px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.6)', objectFit: 'cover', flexShrink: 0 }}
          />
        )}
        <div>
          <h1 className="tech-name">{personalInfo.fullName}</h1>
          <div className="tech-title">
            <Terminal size={16} /> <span>{personalInfo.jobTitle}</span>
          </div>
        </div>
      </div>

      <div className="tech-contacts">
        {personalInfo.email && <span><Mail size={13} /> {personalInfo.email}</span>}
        {personalInfo.phone && <span><Mail size={13} /> {personalInfo.phone}</span>}
        {personalInfo.location && <span><MapPin size={13} /> {personalInfo.location}</span>}
        {personalInfo.github && (
          <span>
            <GithubIcon size={13} /> <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
          </span>
        )}
        {personalInfo.website && (
          <span>
            <ExternalLink size={13} /> <a href={personalInfo.website} target="_blank" rel="noreferrer">Portfolio</a>
          </span>
        )}
      </div>
    </div>
  );

  if (isMultiPage) {
    const splitCount = Math.min(3, Math.ceil(activeSectionOrder.length / 2));
    const page1Sections = activeSectionOrder.slice(0, splitCount);
    const page2Sections = activeSectionOrder.slice(splitCount);

    return (
      <div
        className="tech-developer-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Fira Code, monospace', color: colorTheme.text }}
      >
        <div className="resume-page-sheet page-1">
          <div className="page-badge">Page 1 of 2</div>
          {terminalHeader}
          <div className="tech-body">
            {page1Sections.map((key) => sectionMap[key])}
          </div>
        </div>

        <div className="page-break-gap">
          <span className="page-break-label">--- Page 2 of 2 Sheet Below ---</span>
        </div>

        <div className="resume-page-sheet page-2">
          <div className="page-badge">Page 2 of 2</div>
          <div className="tech-header-banner mini-header" style={{ backgroundColor: colorTheme.primary, color: '#ffffff', padding: '12px 18px' }}>
            <h2 style={{ fontSize: '1.3rem', margin: 0 }}>
              {personalInfo.fullName} <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>— Page 2</span>
            </h2>
          </div>
          <div className="tech-body">
            {page2Sections.map((key) => sectionMap[key])}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="tech-developer-template single-page-layout"
      style={{ fontFamily: fontFamily || 'Fira Code, monospace', color: colorTheme.text }}
    >
      <div className="resume-page-sheet page-1">
        {terminalHeader}
        <div className="tech-body">{activeSectionOrder.map((key) => sectionMap[key])}</div>
      </div>
    </div>
  );
};
