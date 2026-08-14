import React, { useRef, useLayoutEffect, useMemo, useState } from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, ExternalLink, Award } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../Common/SocialIcons';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const ModernExecutiveTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const {
    colorTheme,
    fontFamily,
    showPhoto,
    photoSize = 105,
    photoShape = 'circle',
    sidebarPosition,
    pageMode,
    sectionOrder,
  } = theme;

  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredPages, setMeasuredPages] = useState<string[][]>([]);

  const activeSectionOrder = sectionOrder || ['summary', 'skills', 'experience', 'projects', 'certifications', 'custom', 'references'];
  const renderSkillsInMain = activeSectionOrder.includes('skills');

  const SIDEBAR_EDUCATION_PER_PAGE = 2;
  const totalItems = experiences.length + projects.length + certifications.length + customSections.length + Math.max(0, education.length - SIDEBAR_EDUCATION_PER_PAGE);
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);

  const sidebarContent = (
    <div className="modern-sidebar" style={{ backgroundColor: colorTheme.sidebarBg || '#f8fafc' }}>
      {showPhoto && personalInfo.photoUrl && (
        <div className="photo-wrapper">
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className={`user-photo shape-${photoShape}`}
            style={{
              width: `${photoSize}px`,
              height: `${photoSize}px`,
              borderRadius: photoShape === 'circle' ? '50%' : photoShape === 'rounded' ? '12px' : '4px',
              borderColor: colorTheme.primary || '#1e3a8a',
            }}
          />
        </div>
      )}

      {/* Contact Info */}
      <div className="sidebar-section">
        <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Contact Info
        </h3>
        <ul className="contact-list">
          {personalInfo.email && (
            <li>
              <span className="contact-icon-bg" style={{ backgroundColor: `${colorTheme.primary}15`, color: colorTheme.primary }}>
                <Mail size={13} />
              </span>
              <span>{personalInfo.email}</span>
            </li>
          )}
          {personalInfo.phone && (
            <li>
              <span className="contact-icon-bg" style={{ backgroundColor: `${colorTheme.primary}15`, color: colorTheme.primary }}>
                <Phone size={13} />
              </span>
              <span>{personalInfo.phone}</span>
            </li>
          )}
          {personalInfo.location && (
            <li>
              <span className="contact-icon-bg" style={{ backgroundColor: `${colorTheme.primary}15`, color: colorTheme.primary }}>
                <MapPin size={13} />
              </span>
              <span>{personalInfo.location}</span>
            </li>
          )}
          {personalInfo.website && (
            <li>
              <span className="contact-icon-bg" style={{ backgroundColor: `${colorTheme.primary}15`, color: colorTheme.primary }}>
                <Globe size={13} />
              </span>
              <a href={personalInfo.website} target="_blank" rel="noreferrer">
                {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
              </a>
            </li>
          )}
          {personalInfo.linkedin && (
            <li>
              <span className="contact-icon-bg" style={{ backgroundColor: `${colorTheme.primary}15`, color: colorTheme.primary }}>
                <LinkedinIcon size={13} />
              </span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
          )}
          {personalInfo.github && (
            <li>
              <span className="contact-icon-bg" style={{ backgroundColor: `${colorTheme.primary}15`, color: colorTheme.primary }}>
                <GithubIcon size={13} />
              </span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer">GitHub</a>
            </li>
          )}
        </ul>
      </div>

      {/* Skills in Sidebar ONLY if NOT in main column */}
      {!renderSkillsInMain && skillCategories.length > 0 && (
        <div className="sidebar-section">
          <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
            Skills & Expertise
          </h3>
          {skillCategories.map((cat) => (
            <div key={cat.id} className="skill-cat-block">
              <h4 className="skill-cat-name" style={{ color: colorTheme.secondary || '#334155' }}>
                {cat.categoryName}
              </h4>
              <div className="skills-tags-compact" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {cat.skills.map((s, idx) => (
                  <span key={idx} className="skill-tag-pill" style={{ backgroundColor: `${colorTheme.primary}12`, color: colorTheme.primary, padding: '2px 7px', borderRadius: '4px', fontSize: '0.76rem', fontWeight: 600 }}>
                    {s.name}
                  </span>
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
          {education.slice(0, isMultiPage ? SIDEBAR_EDUCATION_PER_PAGE : education.length).map((edu) => (
            <div key={edu.id} className="edu-sidebar-item">
              <div className="edu-degree" style={{ color: '#0f172a' }}>{edu.degree}</div>
              <div className="edu-institution" style={{ color: colorTheme.secondary }}>{edu.institution}</div>
              <div className="edu-dates">
                {edu.startDate} – {edu.endDate || 'Present'}
              </div>
              {edu.gpa && <div className="edu-gpa">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (!isMultiPage || education.length <= SIDEBAR_EDUCATION_PER_PAGE) && (
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

  const renderContinuationSidebar = (pageIndex: number, sidebarPageCount: number) => {
    const start = pageIndex * SIDEBAR_EDUCATION_PER_PAGE;
    const pageEducation = education.slice(start, start + SIDEBAR_EDUCATION_PER_PAGE);
    const isLastSidebarPage = pageIndex === sidebarPageCount - 1;

    return (
      <div className="modern-sidebar" style={{ backgroundColor: colorTheme.sidebarBg || '#f8fafc' }}>
        {pageEducation.length > 0 && (
          <div className="sidebar-section">
            <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
              Education
            </h3>
            {pageEducation.map((edu) => (
              <div key={edu.id} className="edu-sidebar-item">
                <div className="edu-degree" style={{ color: '#0f172a' }}>{edu.degree}</div>
                <div className="edu-institution" style={{ color: colorTheme.secondary }}>{edu.institution}</div>
                <div className="edu-dates">{edu.startDate} – {edu.endDate || 'Present'}</div>
                {edu.gpa && <div className="edu-gpa">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        )}

        {languages.length > 0 && isLastSidebarPage && (
          <div className="sidebar-section">
            <h3 className="sidebar-title" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
              Languages
            </h3>
            <ul className="lang-list">
              {languages.map((language) => (
                <li key={language.id}>
                  <strong>{language.name}</strong> <span className="lang-prof">({language.proficiency})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  // Helper renderer for Projects
  const renderProjects = (projectItems: typeof projects, keyPrefix = 'proj') => (
    <section key={keyPrefix} className="main-section">
      <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
        Key Projects
      </h3>
      {projectItems.map((proj) => (
        <div key={proj.id} className="project-item" style={{ marginBottom: '10px' }}>
          <div className="proj-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span className="proj-title" style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.94rem' }}>
              {proj.name}
            </span>
            {proj.role && <span className="proj-role" style={{ color: colorTheme.secondary, fontSize: '0.85rem' }}> ({proj.role})</span>}
          </div>
          <p className="proj-desc" style={{ fontSize: '0.86rem', color: '#334155', margin: '3px 0 5px', lineHeight: 1.4 }}>{proj.description}</p>
          {proj.technologies && proj.technologies.length > 0 && (
            <div className="proj-tech" style={{ fontSize: '0.79rem', color: '#475569', marginBottom: '3px' }}>
              <strong style={{ color: colorTheme.primary }}>Tech Stack:</strong> {proj.technologies.join(', ')}
            </div>
          )}
          {proj.highlights && proj.highlights.length > 0 && (
            <ul className="exp-highlights" style={{ paddingLeft: '16px', margin: '3px 0' }}>
              {proj.highlights.map((h, idx) => (
                <li key={idx} style={{ fontSize: '0.84rem', color: '#334155', marginBottom: '2px' }}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </section>
  );

  const signatureBlock = (
    <div
      className="executive-signature-block"
      style={{
        marginTop: '24px',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: '8px',
      }}
    >
      <div style={{ textAlign: 'center', minWidth: '185px' }}>
        <div
          style={{
            fontFamily: "'Dancing Script', 'Caveat', 'Great Vibes', 'Brush Script MT', cursive",
            fontSize: '1.45rem',
            fontWeight: 700,
            color: colorTheme.primary,
            lineHeight: 1.1,
            marginBottom: '3px',
            letterSpacing: '0.5px',
          }}
        >
          {personalInfo.fullName}
        </div>
        <div
          style={{
            width: '100%',
            height: '1.5px',
            backgroundColor: colorTheme.primary,
            marginBottom: '4px',
          }}
        />
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#0f172a',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Applicant Signature
        </div>
      </div>
    </div>
  );

  // Section Map for Dynamic Ordering based on Drag & Drop sectionOrder
  const sectionMap: Record<string, React.ReactNode> = {
    summary: personalInfo.summary ? (
      <section key="summary" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Executive Summary
        </h3>
        <p className="summary-text">{personalInfo.summary}</p>
      </section>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Skills & Technical Expertise
        </h3>
        <div className="skill-cat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px', marginTop: '4px' }}>
          {skillCategories.map((cat) => (
            <div key={cat.id} className="skill-cat-card" style={{ backgroundColor: `${colorTheme.primary}06`, padding: '6px 10px', borderRadius: '5px', border: `1px solid ${colorTheme.primary}18` }}>
              <h4 className="skill-cat-name" style={{ fontSize: '0.8rem', fontWeight: 700, color: colorTheme.primary, marginBottom: '4px' }}>
                {cat.categoryName}
              </h4>
              <div className="skills-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                {cat.skills.map((s, idx) => (
                  <span key={idx} className="skill-pill-item" style={{ backgroundColor: '#ffffff', color: '#1e293b', border: '1px solid #cbd5e1', padding: '1px 6px', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 600 }}>
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    experience: experiences.length > 0 ? (
      <section key="experience" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Work Experience
        </h3>
        {experiences.map((exp) => (
          <div key={exp.id} className="experience-item" style={{ marginBottom: '10px' }}>
            <div className="exp-header">
              <div>
                <span className="exp-position">{exp.position}</span>
                <span className="exp-company" style={{ color: colorTheme.secondary }}> | {exp.company}</span>
              </div>
              <span className="exp-dates" style={{ color: colorTheme.primary }}>
                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            {exp.location && (
              <div className="exp-location" style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '3px' }}>
                <MapPin size={11} style={{ display: 'inline', marginRight: '3px', verticalAlign: 'middle' }} />
                {exp.location}
              </div>
            )}
            <ul className="exp-highlights" style={{ paddingLeft: '16px', margin: '3px 0' }}>
              {exp.highlights.map((h, i) => (
                <li key={i} style={{ fontSize: '0.84rem', color: '#334155', marginBottom: '2px' }}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    ) : null,

    projects: projects.length > 0 ? renderProjects(projects, 'projects') : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Certifications & Credentials
        </h3>
        <ul className="cert-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {certifications.map((c) => (
            <li key={c.id} style={{ fontSize: '0.86rem', color: '#334155' }}>
              <Award size={13} style={{ display: 'inline', marginRight: '5px', color: colorTheme.primary, verticalAlign: 'middle' }} />
              {c.credentialUrl ? (
                <a
                  href={c.credentialUrl.startsWith('http') ? c.credentialUrl : `https://${c.credentialUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: colorTheme.primary, fontWeight: 700, textDecoration: 'none' }}
                >
                  {c.title} <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
              ) : (
                <strong style={{ fontWeight: 700, color: '#0f172a' }}>{c.title}</strong>
              )}
              {' — '}<span style={{ color: colorTheme.secondary }}>{c.issuer}</span> ({c.issueDate})
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
              <div key={item.id} className="custom-item" style={{ marginBottom: '10px' }}>
                <div className="custom-header" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <span className="custom-item-title">{item.title}</span>
                  {item.date && <span className="custom-item-date" style={{ color: colorTheme.primary, fontSize: '0.81rem' }}>{item.date}</span>}
                </div>
                {item.subtitle && <div className="custom-subtitle" style={{ fontSize: '0.83rem', color: colorTheme.secondary, fontStyle: 'italic' }}>{item.subtitle}</div>}
                <p className="custom-desc" style={{ fontSize: '0.86rem', color: '#334155', marginTop: '3px' }}>{item.description}</p>
              </div>
            ))}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="main-section">
        <h3 className="section-heading" style={{ color: colorTheme.primary, borderBottomColor: colorTheme.primary }}>
          Professional References
        </h3>
        <div className="references-grid">
          {references.map((ref) => (
            <div key={ref.id} className="ref-card" style={{ borderLeftColor: colorTheme.primary }}>
              <div className="ref-name" style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.9rem' }}>{ref.name}</div>
              <div className="ref-title" style={{ color: colorTheme.secondary, fontSize: '0.82rem' }}>{ref.position}{ref.company && `, ${ref.company}`}</div>
              <div className="ref-contacts-container" style={{ marginTop: '4px', fontSize: '0.79rem', color: '#475569' }}>
                {ref.email && (
                  <div className="ref-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={11} style={{ color: colorTheme.primary, flexShrink: 0 }} />
                    <span>{ref.email}</span>
                  </div>
                )}
                {ref.phone && (
                  <div className="ref-contact-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={11} style={{ color: colorTheme.primary, flexShrink: 0 }} />
                    <span>{ref.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,
  };

  // Large repeatable sections should not be treated as one indivisible block.
  // Splitting them into small groups lets the paginator use the remaining space
  // on a page while still keeping each individual entry intact.
  const splitSectionKeys: Record<string, string[]> = {};
  const splitSection = (sectionKey: string, itemsPerGroup: number) => {
    const section = sectionMap[sectionKey];
    if (!React.isValidElement<{ children?: React.ReactNode }>(section)) return;

    const children = React.Children.toArray(section.props.children);
    const heading = children.slice(0, 1);
    const items = children.slice(1);
    if (items.length <= itemsPerGroup) return;

    const keys: string[] = [];
    for (let start = 0; start < items.length; start += itemsPerGroup) {
      const chunkKey = `${sectionKey}:${start / itemsPerGroup}`;
      keys.push(chunkKey);
      sectionMap[chunkKey] = React.cloneElement(
        section,
        { key: chunkKey },
        ...heading,
        ...items.slice(start, start + itemsPerGroup)
      );
    }
    splitSectionKeys[sectionKey] = keys;
  };

  splitSection('experience', 1);
  splitSection('projects', 1);

  const getSectionBaseKey = (key: string) => key.split(':', 1)[0];

  const renderPageSection = (key: string, index: number, pageKeys: string[]) => {
    const section = sectionMap[key];
    const previousKey = index > 0 ? pageKeys[index - 1] : null;
    const repeatsOnSamePage = previousKey !== null
      && getSectionBaseKey(previousKey) === getSectionBaseKey(key);

    if (!repeatsOnSamePage || !React.isValidElement<{ children?: React.ReactNode }>(section)) {
      return section;
    }

    const children = React.Children.toArray(section.props.children);
    return React.cloneElement(section, { key }, ...children.slice(1));
  };

  const mainSectionKeys = useMemo(
    () => activeSectionOrder.filter(
      (key) => key !== 'languages' && (key !== 'skills' || renderSkillsInMain) && key !== 'education'
    ),
    [activeSectionOrder, renderSkillsInMain]
  );

  const validKeys = useMemo(
    () => mainSectionKeys.flatMap((key) => {
      const chunks = splitSectionKeys[key];
      if (chunks?.length) return chunks;
      return sectionMap[key] !== null ? [key] : [];
    }),
    // sectionMap and its chunks are rebuilt from the current resume data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mainSectionKeys, data]
  );

  useLayoutEffect(() => {
    if (!isMultiPage || !measureRef.current) {
      setMeasuredPages([]);
      return;
    }

    const root = measureRef.current;
    const sectionElements = Array.from(root.querySelectorAll<HTMLElement>('[data-measure-section]'));
    const headerHeight = root.querySelector<HTMLElement>('[data-measure-header]')?.offsetHeight || 0;
    const signatureHeight = root.querySelector<HTMLElement>('[data-measure-signature]')?.offsetHeight || 0;
    const mainContent = root.querySelector<HTMLElement>('.main-content');
    const sectionGap = mainContent ? parseFloat(window.getComputedStyle(mainContent).rowGap) || 0 : 0;

    const styles = window.getComputedStyle(root);
    const verticalPadding = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom) || 120;
    const sheetHeight = (297 / 25.4) * 96; // ~1122.5px A4 height
    const availableContentHeight = sheetHeight - verticalPadding - 4;

    const firstPageCapacity = Math.max(200, availableContentHeight - headerHeight);
    const nextPageCapacity = availableContentHeight;

    const nextPages: string[][] = [[]];
    const usedHeights = [0];

    sectionElements.forEach((element) => {
      const key = element.dataset.measureSection;
      if (!key) return;

      const fullHeight = element.getBoundingClientRect().height;
      const heading = element.querySelector<HTMLElement>('.section-heading');
      const headingStyle = heading ? window.getComputedStyle(heading) : null;
      const headingHeight = heading
        ? heading.getBoundingClientRect().height
          + (parseFloat(headingStyle?.marginTop || '0') || 0)
          + (parseFloat(headingStyle?.marginBottom || '0') || 0)
        : 0;
      let pageIndex = nextPages.length - 1;
      const capacity = pageIndex === 0 ? firstPageCapacity : nextPageCapacity;
      const previousKey = nextPages[pageIndex][nextPages[pageIndex].length - 1];
      const continuesOnPage = previousKey
        && getSectionBaseKey(previousKey) === getSectionBaseKey(key);
      let height = continuesOnPage ? Math.max(0, fullHeight - headingHeight) : fullHeight;
      if (nextPages[pageIndex].length > 0) height += sectionGap;

      if (nextPages[pageIndex].length > 0 && usedHeights[pageIndex] + height > capacity) {
        nextPages.push([]);
        usedHeights.push(0);
        pageIndex += 1;
        // A section continuing on a new page needs its heading again.
        height = fullHeight;
      }

      nextPages[pageIndex].push(key);
      usedHeights[pageIndex] += height;
    });

    let last = nextPages.length - 1;
    let lastPageCap = last === 0 ? firstPageCapacity : nextPageCapacity;
    if (usedHeights[last] + sectionGap + signatureHeight > lastPageCap) {
      if (nextPages[last].length > 1) {
        const movedKey = nextPages[last].pop();
        const movedElement = sectionElements.find((el) => el.dataset.measureSection === movedKey);
        if (movedKey && movedElement) {
          const movedHeight = movedElement.getBoundingClientRect().height;
          usedHeights[last] = Math.max(0, usedHeights[last] - movedHeight - sectionGap);
          nextPages.push([movedKey]);
          usedHeights.push(movedHeight);
          last += 1;
          lastPageCap = nextPageCapacity;
        }
      }

      if (usedHeights[last] + sectionGap + signatureHeight > lastPageCap) {
        nextPages.push([]);
        usedHeights.push(0);
      }
    }

    setMeasuredPages((current) =>
      JSON.stringify(current) === JSON.stringify(nextPages) ? current : nextPages
    );
  }, [isMultiPage, validKeys, fontFamily, theme.fontSize, theme.spacing, data]);

  const headerContent = (
    <div className="executive-header" style={{ borderBottomColor: colorTheme.primary }}>
      <div className="header-text-container">
        <h1 className="header-name" style={{ color: colorTheme.primary }}>
          {personalInfo.fullName}
        </h1>
        <h2 className="header-title" style={{ color: colorTheme.secondary }}>
          {personalInfo.jobTitle}
        </h2>
      </div>
    </div>
  );

  if (isMultiPage) {
    const pages = (measuredPages.length > 0 ? measuredPages : [validKeys]).map((page) => [...page]);
    const sidebarPageCount = Math.max(1, Math.ceil(education.length / SIDEBAR_EDUCATION_PER_PAGE));
    while (pages.length < sidebarPageCount) pages.push([]);
    const totalPages = pages.length;

    return (
      <div
        className={`modern-executive-template multi-page-layout sidebar-${sidebarPosition}`}
        style={{ fontFamily: fontFamily, color: colorTheme.text }}
      >
        {/* OFF-SCREEN MEASUREMENT CONTAINER */}
        <div ref={measureRef} className="resume-page-sheet exact-pagination-measurer" aria-hidden="true">
          <div data-measure-header>{headerContent}</div>
          <div className="template-body-grid">
            {sidebarPosition === 'left' && sidebarContent}
            <div className="main-content">
              {validKeys.map((key) => (
                <div key={key} data-measure-section={key}>
                  {sectionMap[key]}
                </div>
              ))}
            </div>
            {sidebarPosition === 'right' && sidebarContent}
          </div>
          <div data-measure-signature>{signatureBlock}</div>
        </div>

        {/* RENDERED A4 PAGES */}
        {pages.map((pageSections, pIndex) => {
          const pageNum = pIndex + 1;
          const isLastPage = pIndex === totalPages - 1;

          return (
            <React.Fragment key={`page-${pageNum}`}>
              {pIndex > 0 && (
                <div className="page-break-gap">
                  <span className="page-break-label">--- Page {pageNum} of {totalPages} Sheet Below ---</span>
                </div>
              )}

              <div className={`resume-page-sheet page-${pageNum}`}>
                <div className="page-badge">Page {pageNum} of {totalPages}</div>

                {pIndex === 0 && headerContent}

                <div className="template-body-grid">
                  {sidebarPosition === 'left' && (pIndex === 0
                    ? sidebarContent
                    : renderContinuationSidebar(pIndex, sidebarPageCount))}

                  <div className="main-content">
                    {pageSections.map((key, index) => renderPageSection(key, index, pageSections))}
                    {isLastPage && signatureBlock}
                  </div>

                  {sidebarPosition === 'right' && (pIndex === 0
                    ? sidebarContent
                    : renderContinuationSidebar(pIndex, sidebarPageCount))}
                </div>
              </div>
            </React.Fragment>
          );
        })}
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
        {headerContent}

        <div className="template-body-grid">
          {sidebarPosition === 'left' && sidebarContent}

          <div className="main-content">
            {validKeys.map((key, index) => renderPageSection(key, index, validKeys))}
            {signatureBlock}
          </div>

          {sidebarPosition === 'right' && sidebarContent}
        </div>
      </div>
    </div>
  );
};
