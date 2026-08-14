import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

export const MinimalClassicTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom', 'references'];
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

  const splitSectionKeys: Record<string, string[]> = {};
  const splitSection = (sectionKey: string) => {
    const section = sectionMap[sectionKey];
    if (!React.isValidElement<{ children?: React.ReactNode }>(section)) return;

    const children = React.Children.toArray(section.props.children);
    const heading = children.slice(0, 1);
    const items = children.slice(1);
    if (items.length <= 1) return;

    const keys = items.map((item, index) => {
      const chunkKey = `${sectionKey}:${index}`;
      sectionMap[chunkKey] = React.cloneElement(section, { key: chunkKey }, ...heading, item);
      return chunkKey;
    });
    splitSectionKeys[sectionKey] = keys;
  };

  splitSection('experience');
  splitSection('education');
  splitSection('projects');

  const visibleSectionKeys = useMemo(
    () => activeSectionOrder.flatMap((key) => {
      const chunks = splitSectionKeys[key];
      if (chunks?.length) return chunks;
      return sectionMap[key] ? [key] : [];
    }),
    // The map and chunks are rebuilt from the current resume data.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeSectionOrder, data]
  );

  const getSectionKey = (key: string) => key.split(':', 1)[0];

  const renderSection = (key: string, index: number, pageKeys: string[]) => {
    const section = sectionMap[key];
    const previousKey = index > 0 ? pageKeys[index - 1] : null;
    const repeatsOnPage = previousKey ? getSectionKey(previousKey) === getSectionKey(key) : false;
    if (!repeatsOnPage || !React.isValidElement<{ children?: React.ReactNode }>(section)) return section;
    return React.cloneElement(section, { key }, ...React.Children.toArray(section.props.children).slice(1));
  };

  const headerContent = (
    <header className="minimal-header">
      <div className="minimal-header-copy">
        <h1 className="minimal-name" style={{ color: colorTheme.primary }}>{personalInfo.fullName}</h1>
        <div className="minimal-jobtitle" style={{ color: colorTheme.secondary }}>{personalInfo.jobTitle}</div>
        <div className="minimal-contact-line">
          {contacts.map((contact) => <span key={contact}>{contact}</span>)}
        </div>
      </div>
      {showPhoto && personalInfo.photoUrl && (
        <img
          src={personalInfo.photoUrl}
          alt={personalInfo.fullName}
          className="minimal-photo"
          style={{ borderColor: colorTheme.primary }}
        />
      )}
    </header>
  );

  const signatureBlock = (
    <div className="minimal-signature-block" style={{ color: colorTheme.primary }}>
      <div className="minimal-signature-name">{personalInfo.fullName}</div>
      <div className="minimal-signature-line" style={{ backgroundColor: colorTheme.primary }} />
      <div className="minimal-signature-label">Applicant Signature</div>
    </div>
  );

  useLayoutEffect(() => {
    if (!isMultiPage || !measureRef.current) {
      setMeasuredPages([]);
      return;
    }

    const root = measureRef.current;
    const elements = Array.from(root.querySelectorAll<HTMLElement>('[data-measure-section]'));
    const headerHeight = root.querySelector<HTMLElement>('[data-measure-header]')?.offsetHeight || 0;
    const signatureHeight = root.querySelector<HTMLElement>('[data-minimal-measure-signature]')?.offsetHeight || 0;
    const rootStyle = window.getComputedStyle(root);
    const verticalPadding = parseFloat(rootStyle.paddingTop) + parseFloat(rootStyle.paddingBottom);
    const sheetHeight = (297 / 25.4) * 96;
    const normalCapacity = sheetHeight - verticalPadding - 4;
    const firstCapacity = Math.max(200, normalCapacity - headerHeight);
    const pages: string[][] = [[]];
    const usedHeights = [0];
    const fullHeights: Record<string, number> = {};

    elements.forEach((element) => {
      const key = element.dataset.measureSection;
      if (!key) return;

      const section = element.querySelector<HTMLElement>(':scope > .minimal-section');
      const sectionStyle = section ? window.getComputedStyle(section) : null;
      const outerMargin = (parseFloat(sectionStyle?.marginTop || '0') || 0)
        + (parseFloat(sectionStyle?.marginBottom || '0') || 0);
      const fullHeight = element.getBoundingClientRect().height + outerMargin;
      fullHeights[key] = fullHeight;
      const heading = element.querySelector<HTMLElement>('.minimal-section-title');
      const headingStyle = heading ? window.getComputedStyle(heading) : null;
      const headingHeight = heading
        ? heading.getBoundingClientRect().height
          + (parseFloat(headingStyle?.marginTop || '0') || 0)
          + (parseFloat(headingStyle?.marginBottom || '0') || 0)
        : 0;
      let pageIndex = pages.length - 1;
      const previousKey = pages[pageIndex].at(-1);
      const repeatsOnPage = previousKey ? getSectionKey(previousKey) === getSectionKey(key) : false;
      let height = repeatsOnPage ? Math.max(0, fullHeight - headingHeight) : fullHeight;
      const capacity = pageIndex === 0 ? firstCapacity : normalCapacity;

      if (pages[pageIndex].length > 0 && usedHeights[pageIndex] + height > capacity) {
        pages.push([]);
        usedHeights.push(0);
        pageIndex += 1;
        height = fullHeight;
      }
      pages[pageIndex].push(key);
      usedHeights[pageIndex] += height;
    });

    let lastPageIndex = pages.length - 1;
    const lastCapacity = lastPageIndex === 0 ? firstCapacity : normalCapacity;
    if (usedHeights[lastPageIndex] + signatureHeight > lastCapacity) {
      const movedKey = pages[lastPageIndex].length > 1 ? pages[lastPageIndex].pop() : null;
      if (movedKey) {
        usedHeights[lastPageIndex] = Math.max(0, usedHeights[lastPageIndex] - (fullHeights[movedKey] || 0));
        pages.push([movedKey]);
        usedHeights.push(fullHeights[movedKey] || 0);
        lastPageIndex += 1;
      }
      if (usedHeights[lastPageIndex] + signatureHeight > normalCapacity) {
        pages.push([]);
        usedHeights.push(0);
      }
    }

    setMeasuredPages((current) => JSON.stringify(current) === JSON.stringify(pages) ? current : pages);
  }, [isMultiPage, visibleSectionKeys, fontFamily, theme.fontSize, theme.spacing, data]);

  if (isMultiPage) {
    const pages = measuredPages.length > 0 ? measuredPages : [visibleSectionKeys];
    const totalPages = pages.length;

    return (
      <div
        className="minimal-classic-template multi-page-layout"
        style={{ fontFamily: fontFamily, color: colorTheme.text }}
      >
        <div ref={measureRef} className="resume-page-sheet exact-pagination-measurer" aria-hidden="true">
          <div data-measure-header>{headerContent}</div>
          {visibleSectionKeys.map((key) => (
            <div key={key} data-measure-section={key}>{sectionMap[key]}</div>
          ))}
          <div data-minimal-measure-signature>{signatureBlock}</div>
        </div>

        {pages.map((pageSections, pageIndex) => (
          <React.Fragment key={`page-${pageIndex + 1}`}>
            {pageIndex > 0 && (
              <div className="page-break-gap">
                <span className="page-break-label">--- Page {pageIndex + 1} of {totalPages} Sheet Below ---</span>
              </div>
            )}
            <div className={`resume-page-sheet page-${pageIndex + 1}`}>
              <div className="page-badge">Page {pageIndex + 1} of {totalPages}</div>
              {pageIndex === 0 && headerContent}
              {pageSections.map((key, index) => renderSection(key, index, pageSections))}
              {pageIndex === totalPages - 1 && signatureBlock}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div
      className="minimal-classic-template single-page-layout"
      style={{ fontFamily: fontFamily || 'Merriweather', color: colorTheme.text }}
    >
      <div className="resume-page-sheet page-1">
        {headerContent}
        {visibleSectionKeys.map((key, index) => renderSection(key, index, visibleSectionKeys))}
        {signatureBlock}
      </div>
    </div>
  );
};
