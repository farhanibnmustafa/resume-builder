import React from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Briefcase, GraduationCap, Code, Cpu, Award, Plus, Info, Quote, ExternalLink, ChevronRight } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Common/SocialIcons';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ExecutiveInnovatorTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, photoSize = 105, photoShape = 'circle', pageMode, sectionOrder } = theme;

  const primaryBlue = colorTheme.primary || '#1B2A8A';
  const activeSectionOrder = sectionOrder || ['summary', 'skills', 'experience', 'education', 'projects', 'certifications', 'languages', 'custom', 'references'];
  const totalItems = experiences.length + projects.length + certifications.length + customSections.length;
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);

  const headerContent = (
    <header className="exact-innovator-header">
      <div className="exact-header-top-row">
        <div className="exact-header-left">
          <h1 className="exact-name">{personalInfo.fullName}</h1>
          <div className="exact-subtitle" style={{ color: primaryBlue }}>
            {personalInfo.jobTitle}
          </div>

          <div className="exact-contacts-row">
            {personalInfo.linkedin && (
              <span className="exact-contact-item">
                <span className="exact-contact-icon-bg" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                  <LinkedinIcon size={12} />
                </span>
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span className="exact-contact-item">
                <span className="exact-contact-icon-bg" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                  <GithubIcon size={12} />
                </span>
                <a href={personalInfo.github} target="_blank" rel="noreferrer">
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </span>
            )}
            {personalInfo.phone && (
              <span className="exact-contact-item">
                <span className="exact-contact-icon-bg" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                  <Phone size={12} />
                </span>
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.email && (
              <span className="exact-contact-item">
                <span className="exact-contact-icon-bg" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                  <Mail size={12} />
                </span>
                <span>{personalInfo.email}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="exact-contact-item">
                <span className="exact-contact-icon-bg" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                  <MapPin size={12} />
                </span>
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="exact-contact-item">
                <span className="exact-contact-icon-bg" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                  <Globe size={12} />
                </span>
                <a href={personalInfo.website} target="_blank" rel="noreferrer">
                  {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                </a>
              </span>
            )}
          </div>
        </div>

        {showPhoto && personalInfo.photoUrl && (
          <div className="exact-photo-wrapper">
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName} 
              className={`exact-photo shape-${photoShape}`}
              style={{
                width: `${photoSize}px`,
                height: `${photoSize}px`,
                borderRadius: photoShape === 'circle' ? '50%' : photoShape === 'rounded' ? '12px' : '4px'
              }}
            />
          </div>
        )}
      </div>
    </header>
  );

  // Dynamic FORCES & Custom Sections handling
  const forcesCustomSection = customSections.find(cs => cs.sectionTitle.toUpperCase().includes('FORCE'));
  const otherCustomSections = customSections.filter(cs => !cs.sectionTitle.toUpperCase().includes('FORCE'));

  const forcesItems = forcesCustomSection && forcesCustomSection.items.length > 0
    ? forcesCustomSection.items
    : [
        { id: 'f1', title: 'Passion for Growth', subtitle: '', description: '' },
        { id: 'f2', title: 'Project Management', subtitle: '', description: '' },
        { id: 'f3', title: 'Leadership and Coordination', subtitle: '', description: '' },
        { id: 'f4', title: 'Creativity and Innovation', subtitle: '', description: '' },
        { id: 'f5', title: 'Technical Expertise', subtitle: '', description: '' }
      ];

  const sectionMap: Record<string, React.ReactNode> = {
    summary: personalInfo.summary ? (
      <section key="summary" className="exact-section">
        <p className="exact-summary-paragraph" style={{ marginTop: 0 }}>{personalInfo.summary}</p>
      </section>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="exact-section">
        <h3 className="exact-section-title" style={{ color: primaryBlue }}>
          <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
            <Cpu size={15} />
          </span>
          <span>SKILLS</span>
        </h3>
        <div className="exact-section-line" />
        <div className="exact-skills-table">
          {skillCategories.map((cat) => (
            <div key={cat.id} className="exact-skill-row">
              <div className="exact-skill-label">
                <strong>{cat.categoryName}</strong> :
              </div>
              <div className="exact-skill-value">
                {cat.skills.map((s) => s.name).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    experience: experiences.length > 0 ? (
      <section key="experience" className="exact-section">
        <h3 className="exact-section-title" style={{ color: primaryBlue }}>
          <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
            <Briefcase size={15} />
          </span>
          <span>PROFESSIONAL EXPERIENCE</span>
        </h3>
        <div className="exact-section-line" />
        {experiences.map((exp) => (
          <div key={exp.id} className="exact-timeline-entry">
            <div className="exact-date-col">
              <div>{exp.startDate}</div>
              <div>{exp.current ? 'Present' : exp.endDate}</div>
            </div>
            <div className="exact-content-col">
              <div className="exact-timeline-dot" style={{ backgroundColor: primaryBlue }} />
              <div className="exact-exp-title">
                <strong style={{ color: '#0f172a' }}>{exp.company}</strong>
                {exp.position && <span className="exact-exp-role">, {exp.position}</span>}
              </div>
              {exp.location && <div className="exact-exp-loc">{exp.location}</div>}
              <ul className="exact-bullet-list">
                {exp.highlights.map((h, i) => (
                  <li key={i}>
                    <ChevronRight size={13} style={{ color: primaryBlue, flexShrink: 0, marginTop: '3px' }} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" className="exact-section">
        <h3 className="exact-section-title" style={{ color: primaryBlue }}>
          <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
            <GraduationCap size={15} />
          </span>
          <span>EDUCATION</span>
        </h3>
        <div className="exact-section-line" />
        {education.map((edu) => (
          <div key={edu.id} className="exact-timeline-entry">
            <div className="exact-date-col">
              <div>Graduated :</div>
              <div>{edu.endDate}</div>
            </div>
            <div className="exact-content-col">
              <div className="exact-timeline-dot" style={{ backgroundColor: primaryBlue }} />
              <div className="exact-degree-title">
                <strong>{edu.degree}</strong> {edu.gpa && `| CGPA : ${edu.gpa}`}
              </div>
              <div className="exact-institution">{edu.institution}</div>
              {edu.description && <div className="exact-subtext">{edu.description}</div>}
            </div>
          </div>
        ))}
      </section>
    ) : null,

    projects: projects.length > 0 ? (
      <section key="projects" className="exact-section">
        <h3 className="exact-section-title" style={{ color: primaryBlue }}>
          <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
            <Code size={15} />
          </span>
          <span>PROJECTS</span>
        </h3>
        <div className="exact-section-line" />
        {projects.map((proj) => (
          <div key={proj.id} className="exact-project-item">
            <div className="exact-proj-header">
              <span className="exact-proj-name" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <strong style={{ color: '#0f172a' }}>{proj.name.toUpperCase()}</strong>
                {proj.highlights && proj.highlights.length > 0 && (
                  <span style={{
                    fontSize: '0.65rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    letterSpacing: '0.2px',
                    textTransform: 'uppercase',
                    backgroundColor: proj.highlights[0].toLowerCase().includes('doc') ? '#e0f2fe' : '#dcfce7',
                    color: proj.highlights[0].toLowerCase().includes('doc') ? '#0369a1' : '#15803d',
                    border: `1px solid ${proj.highlights[0].toLowerCase().includes('doc') ? '#bae6fd' : '#bbf7d0'}`
                  }}>
                    {proj.highlights[0]}
                  </span>
                )}
              </span>
              <span className="exact-proj-year">{proj.role || '2024'}</span>
            </div>
            {(proj.url || proj.githubUrl) && (
              <div className="exact-proj-links" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1px', marginBottom: '2px' }}>
                {proj.githubUrl && (
                  <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="exact-proj-link">
                    <GithubIcon size={12} /> GitHub: <span style={{ fontWeight: 500 }}>{proj.githubUrl.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
                {proj.url && (
                  <a href={proj.url} target="_blank" rel="noreferrer" className="exact-proj-link">
                    <ExternalLink size={12} /> Live Demo: <span style={{ fontWeight: 500 }}>{proj.url.replace(/^https?:\/\//, '')}</span>
                  </a>
                )}
              </div>
            )}
            {proj.description && <p className="exact-proj-desc">{proj.description}</p>}
            {proj.technologies && proj.technologies.length > 0 && (
              <div className="exact-tag-row">
                {proj.technologies.map((t, idx) => (
                  <span key={idx} className="exact-tag-pill">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </section>
    ) : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="exact-section exact-section-certifications">
        <h3 className="exact-section-title" style={{ color: primaryBlue }}>
          <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
            <Award size={15} />
          </span>
          <span>CERTIFICATIONS</span>
        </h3>
        <div className="exact-section-line" />
        <ul className="exact-bullet-list">
          {certifications.map((c) => (
            <li key={c.id}>
              <ChevronRight size={13} style={{ color: primaryBlue, flexShrink: 0, marginTop: '3px' }} />
              <span>
                <strong>{c.title}</strong> — {c.issuer} ({c.issueDate})
              </span>
            </li>
          ))}
        </ul>
      </section>
    ) : null,

    languages: (
      <div key="lang-forces" className="exact-two-col-grid">
        <section className="exact-section">
          <h3 className="exact-section-title" style={{ color: primaryBlue }}>
            <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
              <Plus size={15} />
            </span>
            <span>{forcesCustomSection ? forcesCustomSection.sectionTitle.toUpperCase() : 'FORCES'}</span>
          </h3>
          <div className="exact-section-line" />
          <ul className="exact-bullet-list">
            {forcesItems.map((item) => {
              const hasExtraInfo = Boolean(item.subtitle || item.description || item.date);
              return (
                <li key={item.id}>
                  <ChevronRight size={13} style={{ color: primaryBlue, flexShrink: 0, marginTop: '3px' }} />
                  <div style={{ display: 'inline-block' }}>
                    {hasExtraInfo ? <strong>{item.title}</strong> : <span>{item.title}</span>}
                    {item.subtitle && <div className="exact-subtext" style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.subtitle}</div>}
                    {item.description && <div className="exact-proj-desc" style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>{item.description}</div>}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        {languages.length > 0 && (
          <section className="exact-section">
            <h3 className="exact-section-title" style={{ color: primaryBlue }}>
              <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                <Globe size={15} />
              </span>
              <span>LANGUAGES</span>
            </h3>
            <div className="exact-section-line" />
            <div className="exact-lang-list">
              {languages.map((l) => (
                <div key={l.id} className="exact-lang-row">
                  <span className="exact-lang-name">{l.name}</span>
                  <div className="exact-rating-dots">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <span
                        key={dot}
                        className={`rating-dot ${dot <= (l.proficiency === 'Native' ? 5 : l.proficiency === 'Fluent' ? 4 : 3) ? 'filled' : ''}`}
                        style={{ backgroundColor: dot <= (l.proficiency === 'Native' ? 5 : l.proficiency === 'Fluent' ? 4 : 3) ? primaryBlue : 'transparent', borderColor: primaryBlue }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    ),

    custom: otherCustomSections.length > 0 ? (
      <React.Fragment key="custom">
        {otherCustomSections.map((cs) => (
          <section key={cs.id} className="exact-section">
            <h3 className="exact-section-title" style={{ color: primaryBlue }}>
              <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                <Info size={15} />
              </span>
              <span>{cs.sectionTitle.toUpperCase()}</span>
            </h3>
            <div className="exact-section-line" />
            {cs.items.map((item) => {
              const hasExtraInfo = Boolean(item.subtitle || item.description || item.date);
              return (
                <div key={item.id} className="exact-timeline-entry">
                  <div className="exact-date-col">
                    <div>{item.date}</div>
                  </div>
                  <div className="exact-content-col">
                    <div className="exact-timeline-dot" style={{ backgroundColor: primaryBlue }} />
                    <div className="exact-degree-title">
                      {hasExtraInfo ? <strong>{item.title}</strong> : <span>{item.title}</span>}
                    </div>
                    {item.subtitle && <div className="exact-subtext">{item.subtitle}</div>}
                    {item.description && <p className="exact-proj-desc">{item.description}</p>}
                  </div>
                </div>
              );
            })}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="exact-section">
        <h3 className="exact-section-title" style={{ color: primaryBlue }}>
          <span className="exact-icon-badge" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
            <Quote size={15} />
          </span>
          <span>REFERENCES</span>
        </h3>
        <div className="exact-section-line" />
        <div className="exact-references-grid">
          {references.map((ref) => (
            <div key={ref.id} className="exact-ref-card" style={{ borderLeftColor: primaryBlue }}>
              <div className="exact-ref-header">
                <strong className="exact-ref-name">{ref.name}</strong>
              </div>
              {(ref.position || ref.company) && (
                <div className="exact-ref-position">
                  {ref.position}{ref.company && `, ${ref.company}`}
                </div>
              )}
              <div className="exact-ref-contacts">
                {ref.email && (
                  <div className="exact-ref-contact-item">
                    <span className="exact-ref-icon-bg" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                      <Mail size={11} />
                    </span>
                    <a href={`mailto:${ref.email}`} className="exact-ref-link">{ref.email}</a>
                  </div>
                )}
                {ref.phone && (
                  <div className="exact-ref-contact-item">
                    <span className="exact-ref-icon-bg" style={{ backgroundColor: `${primaryBlue}15`, color: primaryBlue }}>
                      <Phone size={11} />
                    </span>
                    <a href={`tel:${ref.phone}`} className="exact-ref-link">{ref.phone}</a>
                  </div>
                )}
              </div>
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
        className="exact-pdf-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Inter, sans-serif' }}
      >
        <div className="resume-page-sheet page-1">
          <div className="page-badge">Page 1 of 2</div>
          {headerContent}
          <div className="exact-body">
            {page1Sections.map((key) => sectionMap[key])}
          </div>
        </div>

        <div className="page-break-gap">
          <span className="page-break-label">--- Page 2 of 2 Sheet Below ---</span>
        </div>

        <div className="resume-page-sheet page-2">
          <div className="page-badge">Page 2 of 2</div>
          <div className="exact-body">
            {page2Sections.map((key) => sectionMap[key])}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="exact-pdf-template single-page-layout"
      style={{ fontFamily: fontFamily || 'Inter, sans-serif' }}
    >
      <div className="resume-page-sheet page-1">
        {headerContent}
        <div className="exact-body">
          {activeSectionOrder.map((key) => sectionMap[key])}
        </div>
      </div>
    </div>
  );
};
