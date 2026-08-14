import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
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
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredPages, setMeasuredPages] = useState<string[][]>([]);

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

  // Dynamic SOFT SKILLS & Custom Sections handling
  const softSkillsCustomSection = customSections.find(cs => 
    cs.sectionTitle.toUpperCase().includes('SOFT') || cs.sectionTitle.toUpperCase().includes('FORCE')
  );
  const otherCustomSections = customSections.filter(cs => 
    !cs.sectionTitle.toUpperCase().includes('SOFT') && !cs.sectionTitle.toUpperCase().includes('FORCE')
  );

  const defaultSoftSkillTitles: Record<string, string> = {
    'Passion for Growth': 'Problem Solving & Critical Thinking',
    'Project Management': 'Agile & Project Management',
    'Leadership and Coordination': 'Team Leadership & Communication',
    'Creativity and Innovation': 'Creativity & Technical Innovation',
    'Technical Expertise': 'Adaptability & Continuous Growth',
  };

  const rawItems = softSkillsCustomSection && softSkillsCustomSection.items.length > 0
    ? softSkillsCustomSection.items
    : [
        { id: 'f1', title: 'Problem Solving & Critical Thinking', subtitle: '', description: '' },
        { id: 'f2', title: 'Agile & Project Management', subtitle: '', description: '' },
        { id: 'f3', title: 'Team Leadership & Communication', subtitle: '', description: '' },
        { id: 'f4', title: 'Creativity & Technical Innovation', subtitle: '', description: '' },
        { id: 'f5', title: 'Adaptability & Continuous Growth', subtitle: '', description: '' }
      ];

  const softSkillsItems = rawItems.map((item) => ({
    ...item,
    title: defaultSoftSkillTitles[item.title] || item.title
  }));

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
                <strong>{cat.categoryName}:</strong>
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
            <div className="exact-content-col">
              <div className="exact-timeline-dot" style={{ backgroundColor: primaryBlue }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                <div className="exact-exp-title">
                  <strong style={{ color: '#0f172a' }}>{exp.company}</strong>
                  {exp.position && <span className="exact-exp-role">, {exp.position}</span>}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 600, flexShrink: 0 }}>
                  {exp.startDate}{exp.startDate && (exp.endDate || exp.current) ? ' – ' : ''}{exp.current ? 'Present' : exp.endDate}
                </div>
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
            <div className="exact-content-col">
              <div className="exact-timeline-dot" style={{ backgroundColor: primaryBlue }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                <div className="exact-degree-title">
                  <strong>{edu.degree}</strong> {edu.gpa && `| CGPA : ${edu.gpa}`}
                </div>
                <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 600, flexShrink: 0 }}>
                  {edu.startDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate}
                </div>
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
                    backgroundColor: `${primaryBlue}15`,
                    color: primaryBlue,
                    border: `1px solid ${primaryBlue}35`
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
                {c.credentialUrl ? (
                  <a
                    href={c.credentialUrl.startsWith('http') ? c.credentialUrl : `https://${c.credentialUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#0f172a', fontWeight: 700, textDecoration: 'none' }}
                  >
                    {c.title} <ExternalLink size={11} style={{ color: primaryBlue, display: 'inline-block', verticalAlign: 'middle', marginLeft: '2px' }} />
                  </a>
                ) : (
                  <strong>{c.title}</strong>
                )}
                {' — '}{c.issuer} {c.issueDate ? `(${c.issueDate})` : ''}
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
            <span>{softSkillsCustomSection && softSkillsCustomSection.sectionTitle.toUpperCase() !== 'FORCES' ? softSkillsCustomSection.sectionTitle.toUpperCase() : 'SOFT SKILLS'}</span>
          </h3>
          <div className="exact-section-line" />
          <ul className="exact-bullet-list">
            {softSkillsItems.map((item) => {
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
                  <div className="exact-content-col">
                    <div className="exact-timeline-dot" style={{ backgroundColor: primaryBlue }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px' }}>
                      <div className="exact-degree-title">
                        {hasExtraInfo ? <strong>{item.title}</strong> : <span>{item.title}</span>}
                      </div>
                      {item.date && (
                        <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 600, flexShrink: 0 }}>
                          {item.date}
                        </div>
                      )}
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

  // Projects can be much taller than every other resume section. Treating the
  // whole list as one pagination unit made a single "page" grow far beyond A4.
  // Split it into small, indivisible groups while repeating the section title.
  const projectPageKeys: string[] = [];
  const projectsSection = sectionMap.projects;
  if (React.isValidElement<{ children?: React.ReactNode }>(projectsSection)) {
    const children = React.Children.toArray(projectsSection.props.children);
    const heading = children.slice(0, 2);
    const projectRows = children.slice(2);
    const PROJECTS_PER_GROUP = 1;

    for (let start = 0; start < projectRows.length; start += PROJECTS_PER_GROUP) {
      const key = `projects:${start / PROJECTS_PER_GROUP}`;
      projectPageKeys.push(key);
      sectionMap[key] = React.cloneElement(
        projectsSection,
        { key },
        ...heading,
        ...projectRows.slice(start, start + PROJECTS_PER_GROUP)
      );
    }
  }

  const experiencePageKeys: string[] = [];
  const experienceSection = sectionMap.experience;
  if (React.isValidElement<{ children?: React.ReactNode }>(experienceSection)) {
    const children = React.Children.toArray(experienceSection.props.children);
    const heading = children.slice(0, 2);
    const experienceRows = children.slice(2);

    experienceRows.forEach((row, index) => {
      const key = `experience:${index}`;
      experiencePageKeys.push(key);
      sectionMap[key] = React.cloneElement(
        experienceSection,
        { key },
        ...heading,
        row
      );
    });
  }

  const educationPageKeys: string[] = [];
  const educationSection = sectionMap.education;
  if (React.isValidElement<{ children?: React.ReactNode }>(educationSection)) {
    const children = React.Children.toArray(educationSection.props.children);
    const heading = children.slice(0, 2);
    const educationRows = children.slice(2);
    const EDUCATION_ITEMS_PER_GROUP = 1;

    for (let start = 0; start < educationRows.length; start += EDUCATION_ITEMS_PER_GROUP) {
      const key = `education:${start / EDUCATION_ITEMS_PER_GROUP}`;
      educationPageKeys.push(key);
      sectionMap[key] = React.cloneElement(
        educationSection,
        { key },
        ...heading,
        ...educationRows.slice(start, start + EDUCATION_ITEMS_PER_GROUP)
      );
    }
  }

  const signatureBlock = (
    <div className="exact-signature-block" style={{
      marginTop: '28px',
      display: 'flex',
      justifyContent: 'flex-end',
      paddingRight: '12px'
    }}>
      <div style={{ textAlign: 'center', minWidth: '195px' }}>
        <div style={{
          fontFamily: "'Dancing Script', 'Caveat', 'Great Vibes', cursive",
          fontSize: '1.45rem',
          fontWeight: 600,
          color: primaryBlue,
          lineHeight: 1.1,
          marginBottom: '4px',
          letterSpacing: '0.5px'
        }}>
          {personalInfo.fullName}
        </div>
        <div style={{
          width: '100%',
          height: '1.5px',
          backgroundColor: primaryBlue,
          marginBottom: '4px'
        }} />
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Applicant Signature
        </div>
      </div>
    </div>
  );

  const visibleSectionKeys = useMemo(
    () => activeSectionOrder.flatMap((key) => {
      if (key === 'experience' && experiencePageKeys.length > 0) return experiencePageKeys;
      if (key === 'projects' && projectPageKeys.length > 0) return projectPageKeys;
      if (key === 'education' && educationPageKeys.length > 0) return educationPageKeys;
      return sectionMap[key] ? [key] : [];
    }),
    // sectionMap is rebuilt from the resume data on every render; these values
    // capture every edit which can change a section's rendered height.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeSectionOrder, data, experiencePageKeys.join('|'), projectPageKeys.join('|'), educationPageKeys.join('|')]
  );

  const getSectionBaseKey = (key: string) => key.split(':', 1)[0];

  const renderPageSection = (key: string, index: number, pageKeys: string[]) => {
    const section = sectionMap[key];
    const previousKey = index > 0 ? pageKeys[index - 1] : null;
    const chunkIndex = Number(key.split(':')[1]);
    const isContinuationChunk = Number.isFinite(chunkIndex) && chunkIndex > 0;
    const repeatsOnSamePage = previousKey !== null
      && getSectionBaseKey(previousKey) === getSectionBaseKey(key);

    if ((!isContinuationChunk && !repeatsOnSamePage) || !React.isValidElement<{ children?: React.ReactNode }>(section)) {
      return section;
    }

    const children = React.Children.toArray(section.props.children);
    return React.cloneElement(section, { key }, ...children.slice(2));
  };

  useLayoutEffect(() => {
    if (!isMultiPage || !measureRef.current) {
      setMeasuredPages([]);
      return;
    }

    const root = measureRef.current;
    const sectionElements = Array.from(root.querySelectorAll<HTMLElement>('[data-measure-section]'));
    const headerHeight = root.querySelector<HTMLElement>('[data-measure-header]')?.offsetHeight || 0;
    const signatureHeight = root.querySelector<HTMLElement>('[data-measure-signature]')?.offsetHeight || 0;
    const styles = window.getComputedStyle(root);
    const verticalPadding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
    const sheetHeight = (297 / 25.4) * 96;
    const contentHeight = sheetHeight - verticalPadding;
    const normalCapacity = contentHeight - 4;
    const firstCapacity = Math.max(200, normalCapacity - headerHeight);
    const nextPages: string[][] = [[]];
    const usedHeights = [0];

    sectionElements.forEach((element) => {
      const key = element.dataset.measureSection;
      if (!key) return;
      const measuredSection = element.querySelector<HTMLElement>(':scope > .exact-section');
      const measuredSectionStyle = measuredSection ? window.getComputedStyle(measuredSection) : null;
      const sectionOuterMargin = measuredSectionStyle
        ? (parseFloat(measuredSectionStyle.marginTop) || 0)
          + (parseFloat(measuredSectionStyle.marginBottom) || 0)
        : 0;
      const fullHeight = element.getBoundingClientRect().height + sectionOuterMargin;
      const headingElements = Array.from(element.querySelectorAll<HTMLElement>('.exact-section-title, .exact-section-line'));
      const headingHeight = headingElements.reduce((total, heading) => {
        const headingStyle = window.getComputedStyle(heading);
        return total
          + heading.getBoundingClientRect().height
          + (parseFloat(headingStyle.marginTop) || 0)
          + (parseFloat(headingStyle.marginBottom) || 0);
      }, 0);
      let pageIndex = nextPages.length - 1;
      const capacity = pageIndex === 0 ? firstCapacity : normalCapacity;
      const previousKey = nextPages[pageIndex][nextPages[pageIndex].length - 1];
      const continuesOnPage = previousKey
        && getSectionBaseKey(previousKey) === getSectionBaseKey(key);
      const chunkIndex = Number(key.split(':')[1]);
      const isContinuationChunk = Number.isFinite(chunkIndex) && chunkIndex > 0;
      let height = (continuesOnPage || isContinuationChunk)
        ? Math.max(0, fullHeight - headingHeight)
        : fullHeight;

      if (nextPages[pageIndex].length > 0 && usedHeights[pageIndex] + height > capacity) {
        nextPages.push([]);
        usedHeights.push(0);
        pageIndex += 1;
        height = isContinuationChunk ? Math.max(0, fullHeight - headingHeight) : fullHeight;
      }
      nextPages[pageIndex].push(key);
      usedHeights[pageIndex] += height;
    });

    let last = nextPages.length - 1;
    const lastCapacity = last === 0 ? firstCapacity : normalCapacity;
    if (usedHeights[last] + signatureHeight > lastCapacity) {
      if (nextPages[last].length > 1) {
        const movedKey = nextPages[last].pop();
        const movedElement = sectionElements.find((element) => element.dataset.measureSection === movedKey);
        if (movedKey && movedElement) {
          const movedSection = movedElement.querySelector<HTMLElement>(':scope > .exact-section');
          const movedSectionStyle = movedSection ? window.getComputedStyle(movedSection) : null;
          const movedHeight = movedElement.getBoundingClientRect().height
            + (parseFloat(movedSectionStyle?.marginTop || '0') || 0)
            + (parseFloat(movedSectionStyle?.marginBottom || '0') || 0);
          usedHeights[last] = Math.max(0, usedHeights[last] - movedHeight);
          nextPages.push([movedKey]);
          usedHeights.push(movedHeight);
          last += 1;
        }
      }

      if (usedHeights[last] + signatureHeight > normalCapacity) {
        nextPages.push([]);
        usedHeights.push(0);
      }
    }

    setMeasuredPages((current) =>
      JSON.stringify(current) === JSON.stringify(nextPages) ? current : nextPages
    );
  }, [isMultiPage, visibleSectionKeys, fontFamily, theme.fontSize, theme.spacing]);

  if (isMultiPage) {
    const pages = measuredPages.length > 0 ? measuredPages : [visibleSectionKeys];
    const totalPages = pages.length;

    return (
      <div
        className="exact-pdf-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Inter, sans-serif' }}
      >
        <div ref={measureRef} className="resume-page-sheet exact-pagination-measurer" aria-hidden="true">
          <div data-measure-header>{headerContent}</div>
          <div className="exact-body">
            {visibleSectionKeys.map((key) => (
              <div key={key} data-measure-section={key}>{sectionMap[key]}</div>
            ))}
          </div>
          <div data-measure-signature>{signatureBlock}</div>
        </div>
        {pages.map((pageSections, pIndex) => (
          <React.Fragment key={pIndex}>
            {pIndex > 0 && (
              <div className="page-break-gap">
                <span className="page-break-label">--- Page {pIndex + 1} of {totalPages} Sheet Below ---</span>
              </div>
            )}
            <div className={`resume-page-sheet page-${pIndex + 1}`}>
              <div className="page-badge">Page {pIndex + 1} of {totalPages}</div>
              {pIndex === 0 && headerContent}
              <div className="exact-body">
                {pageSections.map((key, index) => renderPageSection(key, index, pageSections))}
              </div>
              {pIndex === totalPages - 1 && signatureBlock}
            </div>
          </React.Fragment>
        ))}
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
        {signatureBlock}
      </div>
    </div>
  );
};
