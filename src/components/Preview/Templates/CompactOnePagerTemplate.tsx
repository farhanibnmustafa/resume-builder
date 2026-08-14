import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { ExternalLink } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

const COMPACT_DEFAULT_SECTION_ORDER = ['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'languages', 'custom', 'references'];

export const CompactOnePagerTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = useMemo(() => {
    const merged = sectionOrder
      ? [...sectionOrder, ...COMPACT_DEFAULT_SECTION_ORDER.filter((key) => !sectionOrder.includes(key))]
      : [...COMPACT_DEFAULT_SECTION_ORDER];
    return [...merged.filter((key) => key !== 'references'), 'references'];
  }, [sectionOrder]);
  // Auto mode must be based on rendered A4 height, not an arbitrary item count.
  // Only an explicit 1-page choice disables pagination and allows a forced fit.
  const isMultiPage = pageMode !== '1-page';
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredPages, setMeasuredPages] = useState<string[][]>([]);

  const contacts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.github,
  ].filter(Boolean);

  const compactHeader = (
    <header className="compact-header" style={{ backgroundColor: colorTheme.sidebarBg || '#f8fafc', borderLeftColor: colorTheme.primary }}>
      <div className="compact-header-top">
        <div className="compact-header-copy">
          <h1 className="compact-name" style={{ color: colorTheme.primary }}>
            {personalInfo.fullName}
          </h1>
          <div className="compact-jobtitle" style={{ color: colorTheme.secondary }}>
            {personalInfo.jobTitle}
          </div>
          <div className="compact-contacts">
            {contacts.map((contact) => <span key={contact}>{contact}</span>)}
          </div>
        </div>
        {showPhoto && personalInfo.photoUrl && (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            className="compact-photo"
            style={{ borderColor: colorTheme.primary }}
          />
        )}
      </div>
    </header>
  );

  const signatureBlock = (
    <div className="compact-signature-block" style={{ color: colorTheme.primary }}>
      <div className="compact-signature-name">{personalInfo.fullName}</div>
      <div className="compact-signature-line" style={{ backgroundColor: colorTheme.primary }} />
      <div className="compact-signature-label">Applicant Signature</div>
    </div>
  );

  const sectionMap: Record<string, React.ReactNode> = {
    summary: personalInfo.summary ? (
      <div key="summary" className="compact-summary">
        <strong>Profile: </strong> {personalInfo.summary}
      </div>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="compact-section">
        <h3 className="compact-sec-heading" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Skills & Expertise
        </h3>
        <div className="compact-skills-row" style={{ borderColor: colorTheme.primary }}>
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
      </section>
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
      <section key="languages" className="compact-section">
        <h3 className="compact-sec-heading" style={{ color: colorTheme.primary, borderColor: colorTheme.primary }}>
          Languages
        </h3>
        <div className="compact-footer-row">
          <span>{languages.map((l) => `${l.name} (${l.proficiency})`).join(', ')}</span>
        </div>
      </section>
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
      tokenMap[key] = React.cloneElement(section, { key }, ...heading, item);
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
      tokenMap[key] = React.cloneElement(section, { key }, ...heading, tokenList);
      return key;
    });
  };

  splitDirectChildren('experience');
  splitDirectChildren('projects');
  splitDirectChildren('education');
  splitNestedList('certifications');
  splitDirectChildren('references');

  const customSection = sectionMap.custom;
  if (React.isValidElement<{ children?: React.ReactNode }>(customSection)) {
    const customNodes = React.Children.toArray(customSection.props.children);
    sectionTokenKeys.custom = customNodes.map((node, index) => {
      // Each custom section owns its heading; do not treat adjacent custom
      // sections as continuations of one another.
      const key = `custom-${index}:whole`;
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
  const getTokenSectionKey = (key: string) => key.split(':', 1)[0];

  const renderPageToken = (key: string, index: number, pageKeys: string[]) => {
    const token = tokenMap[key];
    const previousKey = index > 0 ? pageKeys[index - 1] : null;
    const isSameSectionContinuation = previousKey
      ? getTokenSectionKey(previousKey) === getTokenSectionKey(key)
      : false;

    if (!isSameSectionContinuation || !React.isValidElement<{ children?: React.ReactNode }>(token)) {
      return token;
    }

    const children = React.Children.toArray(token.props.children);
    return React.cloneElement(token, { key }, ...children.slice(1));
  };

  useLayoutEffect(() => {
    if (!isMultiPage || !measureRef.current) {
      setMeasuredPages([]);
      return;
    }

    const root = measureRef.current;
    const rootStyle = window.getComputedStyle(root);
    const verticalPadding = parseFloat(rootStyle.paddingTop) + parseFloat(rootStyle.paddingBottom);
    const pageContentHeight = (297 / 25.4) * 96 - verticalPadding;
    const headerHeight = root.querySelector<HTMLElement>('[data-compact-measure-header]')?.offsetHeight || 0;
    const signatureHeight = root.querySelector<HTMLElement>('[data-compact-measure-signature]')?.offsetHeight || 0;
    const firstPageCapacity = Math.max(180, pageContentHeight - headerHeight);
    const nextPageCapacity = pageContentHeight;
    const pages: string[][] = [[]];
    const used = [0];
    const fullTokenHeights: Record<string, number> = {};

    visibleTokenKeys.forEach((key) => {
      const element = root.querySelector<HTMLElement>(`[data-compact-key="${CSS.escape(key)}"]`);
      if (!element) return;
      const section = element.querySelector<HTMLElement>(':scope > .compact-section');
      const sectionStyle = section ? window.getComputedStyle(section) : null;
      const fullHeight = element.getBoundingClientRect().height
        + (parseFloat(sectionStyle?.marginTop || '0') || 0)
        + (parseFloat(sectionStyle?.marginBottom || '0') || 0);
      fullTokenHeights[key] = fullHeight;
      let pageIndex = pages.length - 1;
      const previousKey = pages[pageIndex].at(-1);
      const repeatsSectionOnPage = previousKey
        ? getTokenSectionKey(previousKey) === getTokenSectionKey(key)
        : false;
      const heading = section?.querySelector<HTMLElement>(':scope > .compact-sec-heading');
      const headingStyle = heading ? window.getComputedStyle(heading) : null;
      const headingHeight = heading
        ? heading.getBoundingClientRect().height
          + (parseFloat(headingStyle?.marginTop || '0') || 0)
          + (parseFloat(headingStyle?.marginBottom || '0') || 0)
        : 0;
      let height = repeatsSectionOnPage ? Math.max(0, fullHeight - headingHeight) : fullHeight;
      const capacity = pageIndex === 0 ? firstPageCapacity : nextPageCapacity;
      if (pages[pageIndex].length > 0 && used[pageIndex] + height > capacity) {
        pages.push([]);
        used.push(0);
        pageIndex += 1;
        // A continuation starts with its section heading on a fresh page.
        height = fullHeight;
      }
      pages[pageIndex].push(key);
      used[pageIndex] += height;
    });

    let lastPageIndex = pages.length - 1;
    const lastPageCapacity = lastPageIndex === 0 ? firstPageCapacity : nextPageCapacity;
    if (used[lastPageIndex] + signatureHeight > lastPageCapacity) {
      const movedKey = pages[lastPageIndex].length > 1 ? pages[lastPageIndex].pop() : null;
      if (movedKey) {
        const previousKey = pages[lastPageIndex].at(-1);
        const wasContinuation = previousKey
          ? getTokenSectionKey(previousKey) === getTokenSectionKey(movedKey)
          : false;
        const movedMeasuredHeight = wasContinuation
          ? Math.max(0, (fullTokenHeights[movedKey] || 0) - (() => {
            const movedElement = root.querySelector<HTMLElement>(`[data-compact-key="${CSS.escape(movedKey)}"]`);
            const movedHeading = movedElement?.querySelector<HTMLElement>('.compact-sec-heading');
            if (!movedHeading) return 0;
            const movedHeadingStyle = window.getComputedStyle(movedHeading);
            return movedHeading.getBoundingClientRect().height
              + (parseFloat(movedHeadingStyle.marginTop) || 0)
              + (parseFloat(movedHeadingStyle.marginBottom) || 0);
          })())
          : (fullTokenHeights[movedKey] || 0);
        used[lastPageIndex] = Math.max(0, used[lastPageIndex] - movedMeasuredHeight);
        pages.push([movedKey]);
        used.push(fullTokenHeights[movedKey] || 0);
        lastPageIndex += 1;
      }
      if (used[lastPageIndex] + signatureHeight > nextPageCapacity) {
        pages.push([]);
        used.push(0);
      }
    }

    setMeasuredPages((current) => JSON.stringify(current) === JSON.stringify(pages) ? current : pages);
    // tokenMap is rebuilt with current React nodes; the signature tracks order.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMultiPage, visibleTokenSignature, fontFamily, theme.fontSize, theme.spacing, data]);

  if (isMultiPage) {
    const pages = measuredPages.length ? measuredPages : [visibleTokenKeys];
    const totalPages = pages.length;

    return (
      <div
        className="compact-one-pager-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Inter, sans-serif', color: colorTheme.text }}
      >
        <div ref={measureRef} className="resume-page-sheet exact-pagination-measurer" aria-hidden="true">
          <div data-compact-measure-header>{compactHeader}</div>
          {visibleTokenKeys.map((key) => (
            <div key={key} data-compact-key={key}>{tokenMap[key]}</div>
          ))}
          <div data-compact-measure-signature>{signatureBlock}</div>
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
              {pageIndex === 0 && compactHeader}
              {pageKeys.map((key, index) => renderPageToken(key, index, pageKeys))}
              {pageIndex === totalPages - 1 && signatureBlock}
            </div>
          </React.Fragment>
        ))}
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
        {visibleTokenKeys.map((key, index) => renderPageToken(key, index, visibleTokenKeys))}
        {signatureBlock}
      </div>
    </div>
  );
};
