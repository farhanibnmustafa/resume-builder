import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

const ACADEMIC_DEFAULT_SECTION_ORDER = ['education', 'experience', 'summary', 'projects', 'skills', 'certifications', 'languages', 'custom', 'references'];

export const AcademicFormalTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = useMemo(() => {
    const merged = sectionOrder
      ? [...sectionOrder, ...ACADEMIC_DEFAULT_SECTION_ORDER.filter((key) => !sectionOrder.includes(key))]
      : [...ACADEMIC_DEFAULT_SECTION_ORDER];
    return [...merged.filter((key) => key !== 'references'), 'references'];
  }, [sectionOrder]);
  const totalItems = experiences.length + education.length + projects.length + certifications.length + customSections.length;
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredPages, setMeasuredPages] = useState<string[][]>([]);

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.website,
    personalInfo.linkedin,
  ].filter(Boolean);

  const academicHeader = (
    <header className="academic-header">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', width: '100%' }}>
        <div style={{ textAlign: 'left', minWidth: 0 }}>
          <h1 className="academic-name" style={{ fontSize: '2rem' }}>{personalInfo.fullName}</h1>
          <div className="academic-title" style={{ fontSize: '1rem' }}>{personalInfo.jobTitle}</div>
          <div className="academic-contacts">{contacts.join(' | ')}</div>
        </div>
        {showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            style={{ width: '108px', height: '108px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${colorTheme.primary}`, flexShrink: 0 }}
          />
        )}
      </div>
      <hr className="academic-divider" style={{ borderColor: colorTheme.primary }} />
    </header>
  );

  const signatureBlock = (
    <div
      className="academic-signature-block"
      style={{
        position: 'absolute',
        right: '16mm',
        bottom: '16mm',
        width: '210px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: "'Dancing Script', 'Brush Script MT', cursive", fontSize: '1.4rem', fontWeight: 600, color: colorTheme.primary }}>
        {personalInfo.fullName}
      </div>
      <div style={{ height: '1.5px', backgroundColor: colorTheme.primary, margin: '3px 0 5px' }} />
      <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
        Applicant Signature
      </div>
    </div>
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
              {c.credentialUrl ? (
                <a
                  href={c.credentialUrl.startsWith('http') ? c.credentialUrl : `https://${c.credentialUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: 'inherit', fontWeight: 700, textDecoration: 'none' }}
                >
                  {c.title} <ExternalLink size={11} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
              ) : (
                <strong>{c.title}</strong>
              )}
              {' — '}{c.issuer} ({c.issueDate})
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
            {cs.sectionTitle.trim().toUpperCase() === 'SOFT SKILLS' ? (
              <ul className="academic-bullet-list">
                {cs.items.map((item) => (
                  <li key={item.id}>
                    <span>{item.title}</span>
                    {item.subtitle && <span className="academic-italic"> — {item.subtitle}</span>}
                    {item.description && <span className="academic-detail"> — {item.description}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              cs.items.map((item) => (
                <div key={item.id} className="academic-item">
                  <div className="academic-row">
                    <span className="academic-bold">{item.title}</span>
                    {item.date && <span className="academic-date">{item.date}</span>}
                  </div>
                  {item.subtitle && <div className="academic-italic">{item.subtitle}</div>}
                  <p className="academic-detail">{item.description}</p>
                </div>
              ))
            )}
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

  const tokenMap: Record<string, React.ReactNode> = {};
  const sectionTokenKeys: Record<string, string[]> = {};

  const splitDirectChildren = (sectionKey: string) => {
    const section = sectionMap[sectionKey];
    if (!React.isValidElement<{ children?: React.ReactNode }>(section)) return;
    const children = React.Children.toArray(section.props.children);
    const heading = children.slice(0, 1);
    const items = children.slice(1);
    if (items.length === 0) return;
    sectionTokenKeys[sectionKey] = items.map((item, index) => {
      const key = `${sectionKey}:${index}`;
      tokenMap[key] = React.cloneElement(section, { key }, ...(index === 0 ? heading : []), item);
      return key;
    });
  };

  const splitNestedList = (sectionKey: string) => {
    const section = sectionMap[sectionKey];
    if (!React.isValidElement<{ children?: React.ReactNode }>(section)) return;
    const sectionChildren = React.Children.toArray(section.props.children);
    const heading = sectionChildren.slice(0, 1);
    const list = sectionChildren[1];
    if (!React.isValidElement<{ children?: React.ReactNode }>(list)) return;
    const items = React.Children.toArray(list.props.children);
    sectionTokenKeys[sectionKey] = items.map((item, index) => {
      const key = `${sectionKey}:${index}`;
      const tokenList = React.cloneElement(list, { key: `${key}-list` }, item);
      tokenMap[key] = React.cloneElement(section, { key }, ...(index === 0 ? heading : []), tokenList);
      return key;
    });
  };

  splitDirectChildren('education');
  splitDirectChildren('experience');
  splitDirectChildren('projects');
  splitDirectChildren('skills');
  splitNestedList('certifications');
  splitDirectChildren('references');

  const customSection = sectionMap.custom;
  if (React.isValidElement<{ children?: React.ReactNode }>(customSection)) {
    const customNodes = React.Children.toArray(customSection.props.children);
    sectionTokenKeys.custom = customNodes.map((node, index) => {
      const key = `custom:${index}`;
      tokenMap[key] = node;
      return key;
    });
  }

  const visibleTokenKeys = activeSectionOrder.flatMap((sectionKey) => {
    const keys = sectionTokenKeys[sectionKey];
    if (keys?.length) return keys;
    if (!sectionMap[sectionKey]) return [];
    const key = `${sectionKey}:whole`;
    tokenMap[key] = sectionMap[sectionKey];
    return [key];
  });
  const visibleTokenSignature = visibleTokenKeys.join('|');

  useLayoutEffect(() => {
    if (!isMultiPage || !measureRef.current) {
      setMeasuredPages([]);
      return;
    }

    const root = measureRef.current;
    const rootStyle = window.getComputedStyle(root);
    const verticalPadding = parseFloat(rootStyle.paddingTop) + parseFloat(rootStyle.paddingBottom);
    const pageContentHeight = (297 / 25.4) * 96 - verticalPadding;
    const headerHeight = root.querySelector<HTMLElement>('[data-academic-measure-header]')?.offsetHeight || 0;
    const signatureHeight = root.querySelector<HTMLElement>('[data-academic-measure-signature]')?.offsetHeight || 0;
    const firstPageCapacity = Math.max(180, pageContentHeight - headerHeight);
    const nextPageCapacity = pageContentHeight;
    const pages: string[][] = [[]];
    const used = [0];
    const tokenHeights: Record<string, number> = {};

    visibleTokenKeys.forEach((key) => {
      const element = root.querySelector<HTMLElement>(`[data-academic-key="${CSS.escape(key)}"]`);
      if (!element) return;
      const section = element.querySelector<HTMLElement>(':scope > .academic-section');
      const sectionStyle = section ? window.getComputedStyle(section) : null;
      const height = element.getBoundingClientRect().height
        + (parseFloat(sectionStyle?.marginTop || '0') || 0)
        + (parseFloat(sectionStyle?.marginBottom || '0') || 0);
      tokenHeights[key] = height;
      let pageIndex = pages.length - 1;
      const capacity = pageIndex === 0 ? firstPageCapacity : nextPageCapacity;
      if (pages[pageIndex].length > 0 && used[pageIndex] + height > capacity) {
        pages.push([]);
        used.push(0);
        pageIndex += 1;
      }
      pages[pageIndex].push(key);
      used[pageIndex] += height;
    });

    let lastPageIndex = pages.length - 1;
    let lastPageCapacity = lastPageIndex === 0 ? firstPageCapacity : nextPageCapacity;
    if (used[lastPageIndex] + signatureHeight > lastPageCapacity) {
      if (pages[lastPageIndex].length > 1) {
        const movedKey = pages[lastPageIndex].pop();
        if (movedKey) {
          const movedHeight = tokenHeights[movedKey] || 0;
          used[lastPageIndex] = Math.max(0, used[lastPageIndex] - movedHeight);
          pages.push([movedKey]);
          used.push(movedHeight);
          lastPageIndex += 1;
          lastPageCapacity = nextPageCapacity;
        }
      }
      if (used[lastPageIndex] + signatureHeight > lastPageCapacity) {
        pages.push([]);
        used.push(0);
      }
    }

    setMeasuredPages((current) => JSON.stringify(current) === JSON.stringify(pages) ? current : pages);
    // tokenMap is deliberately rebuilt with the latest React nodes each render;
    // this stable signature tracks ordering without memoizing stale nodes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMultiPage, visibleTokenSignature, fontFamily, theme.fontSize, theme.spacing, data]);

  if (isMultiPage) {
    const pages = measuredPages.length ? measuredPages : [visibleTokenKeys];
    const totalPages = pages.length;

    return (
      <div
        className="academic-formal-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Georgia, serif', color: colorTheme.text }}
      >
        <div ref={measureRef} className="resume-page-sheet exact-pagination-measurer" aria-hidden="true">
          <div data-academic-measure-header>{academicHeader}</div>
          {visibleTokenKeys.map((key) => (
            <div key={key} data-academic-key={key}>{tokenMap[key]}</div>
          ))}
          <div data-academic-measure-signature style={{ width: '210px' }}>
            {React.cloneElement(signatureBlock, {
              style: { ...signatureBlock.props.style, position: 'static', right: 'auto', bottom: 'auto' },
            })}
          </div>
        </div>

        {pages.map((pageKeys, pageIndex) => (
          <React.Fragment key={`page-${pageIndex + 1}`}>
            {pageIndex > 0 && (
              <div className="page-break-gap">
                <span className="page-break-label">--- Page {pageIndex + 1} of {totalPages} Sheet Below ---</span>
              </div>
            )}
            <div className={`resume-page-sheet page-${pageIndex + 1}`}>
              <div className="page-badge">Page {pageIndex + 1} of {totalPages}</div>
              {pageIndex === 0 && academicHeader}
              {pageKeys.map((key) => tokenMap[key])}
              {pageIndex === totalPages - 1 && signatureBlock}
            </div>
          </React.Fragment>
        ))}
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
        {visibleTokenKeys.map((key) => tokenMap[key])}
        {signatureBlock}
      </div>
    </div>
  );
};
