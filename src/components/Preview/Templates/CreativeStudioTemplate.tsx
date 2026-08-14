import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ResumeData, ThemeConfig } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Code, ExternalLink } from 'lucide-react';
import { LinkedinIcon } from '../../Common/SocialIcons';

interface TemplateProps {
  data: ResumeData;
  theme: ThemeConfig;
}

const CREATIVE_DEFAULT_SECTION_ORDER = ['experience', 'projects', 'education', 'skills', 'certifications', 'languages', 'custom', 'references'];

export const CreativeStudioTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experiences, education, skillCategories, projects, certifications, languages, customSections, references } = data;
  const { colorTheme, fontFamily, showPhoto, showSkillBars, pageMode, sectionOrder } = theme;

  const activeSectionOrder = useMemo(
    () => {
      const merged = sectionOrder
        ? [...sectionOrder, ...CREATIVE_DEFAULT_SECTION_ORDER.filter((key) => !sectionOrder.includes(key))]
        : [...CREATIVE_DEFAULT_SECTION_ORDER];
      return [...merged.filter((key) => key !== 'references'), 'references'];
    },
    [sectionOrder]
  );
  const totalItems = experiences.length + projects.length + certifications.length + customSections.length;
  const isMultiPage = pageMode === '2-page' || (pageMode === 'auto' && totalItems >= 5);
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredColumns, setMeasuredColumns] = useState<{ main: string[][]; sidebar: string[][] }>({ main: [], sidebar: [] });

  const creativeHeader = (
    <header
      className="creative-header-banner"
      style={{
        background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.secondary} 100%)`,
        color: '#ffffff',
      }}
    >
      <div className="creative-header-content">
        {showPhoto && personalInfo.photoUrl && (
          <div className="creative-photo-ring">
            <img src={personalInfo.photoUrl} alt={personalInfo.fullName} />
          </div>
        )}
        <div className="creative-header-text">
          <h1 className="creative-name">{personalInfo.fullName}</h1>
          <h2 className="creative-jobtitle">{personalInfo.jobTitle}</h2>
          {personalInfo.summary && <p className="creative-tagline">{personalInfo.summary}</p>}
        </div>
      </div>

      <div className="creative-contact-pills">
        {personalInfo.email && <span><Mail size={13} /> {personalInfo.email}</span>}
        {personalInfo.phone && <span><Phone size={13} /> {personalInfo.phone}</span>}
        {personalInfo.location && <span><MapPin size={13} /> {personalInfo.location}</span>}
        {personalInfo.website && (
          <span>
            <Globe size={13} /> <a href={personalInfo.website} target="_blank" rel="noreferrer">Website</a>
          </span>
        )}
        {personalInfo.linkedin && (
          <span>
            <LinkedinIcon size={13} /> <a href={personalInfo.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </span>
        )}
      </div>
    </header>
  );

  const signatureBlock = (
    <div
      className="creative-signature-block"
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
    experience: experiences.length > 0 ? (
      <section key="experience" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>
          <Briefcase className="sec-icon" style={{ backgroundColor: colorTheme.sidebarBg || '#f0fdf4' }} />
          Work Experience
        </h3>
        <div className="timeline-container">
          {experiences.map((exp) => (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot" style={{ backgroundColor: colorTheme.primary }} />
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <span className="timeline-role">{exp.position}</span>
                    <span className="timeline-company" style={{ color: colorTheme.secondary }}> @ {exp.company}</span>
                  </div>
                  <span className="timeline-date">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <ul className="creative-bullet-list">
                  {exp.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    ) : null,

    projects: projects.length > 0 ? (
      <section key="projects" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>
          <Code className="sec-icon" style={{ backgroundColor: colorTheme.sidebarBg || '#f0fdf4' }} />
          Featured Projects
        </h3>
        <div className="creative-projects-grid">
          {projects.map((proj) => (
            <div key={proj.id} className="creative-proj-card" style={{ borderColor: colorTheme.primary }}>
              <div className="proj-card-title">{proj.name}</div>
              <p className="proj-card-desc">{proj.description}</p>
              {proj.technologies && (
                <div className="proj-card-tags">
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="creative-chip" style={{ backgroundColor: colorTheme.sidebarBg || '#f1f5f9' }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null,

    education: education.length > 0 ? (
      <section key="education" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>
          <GraduationCap className="sec-icon" style={{ backgroundColor: colorTheme.sidebarBg || '#f0fdf4' }} />
          Education
        </h3>
        {education.map((edu) => (
          <div key={edu.id} className="creative-edu-block">
            <div className="edu-title">{edu.degree}</div>
            <div className="edu-institution">{edu.institution} ({edu.startDate} – {edu.endDate})</div>
          </div>
        ))}
      </section>
    ) : null,

    skills: skillCategories.length > 0 ? (
      <section key="skills" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>Skills</h3>
        {skillCategories.map((cat) => (
          <div key={cat.id} className="creative-skill-cat">
            <div className="cat-label">{cat.categoryName}</div>
            <div className="cat-chips">
              {cat.skills.map((s, i) => (
                <span key={i} className="creative-chip-badge" style={{ borderColor: colorTheme.primary }}>
                  {s.name}
                  {showSkillBars && (
                    <span className="skill-dots" style={{ marginLeft: '5px' }}>
                      {[1,2,3,4,5].map((d) => (
                        <span
                          key={d}
                          className="skill-dot"
                          style={{ backgroundColor: d <= (s.level ?? 3) ? colorTheme.primary : `${colorTheme.primary}30` }}
                        />
                      ))}
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>
    ) : null,

    certifications: certifications.length > 0 ? (
      <section key="certifications" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>
          <Award className="sec-icon" style={{ backgroundColor: colorTheme.sidebarBg || '#f0fdf4' }} />
          Certifications
        </h3>
        <ul className="creative-bullet-list">
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
      <section key="languages" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>Languages</h3>
        <ul className="creative-bullet-list">
          {languages.map((l) => (
            <li key={l.id}>{l.name} ({l.proficiency})</li>
          ))}
        </ul>
      </section>
    ) : null,

    custom: customSections.length > 0 ? (
      <React.Fragment key="custom">
        {customSections.map((cs) => (
          <section key={cs.id} className="creative-section">
            <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>{cs.sectionTitle}</h3>
            {cs.items.map((item) => (
              <div key={item.id} className="creative-edu-block">
                <div className="edu-title">{item.title}</div>
                <p className="proj-card-desc">{item.description}</p>
              </div>
            ))}
          </section>
        ))}
      </React.Fragment>
    ) : null,

    references: references && references.length > 0 ? (
      <section key="references" className="creative-section">
        <h3 className="creative-section-title" style={{ color: colorTheme.primary }}>References</h3>
        <div className="references-grid">
          {references.map((ref) => (
            <div key={ref.id} className="ref-card" style={{ borderLeftColor: colorTheme.primary }}>
              <div className="ref-name">{ref.name}</div>
              <div className="ref-title">{ref.position}{ref.company && `, ${ref.company}`}</div>
              <div className="ref-contacts-container">
                {ref.email && (
                  <div className="ref-contact-item">
                    <Mail size={12} style={{ color: colorTheme.primary, flexShrink: 0 }} />
                    <span>{ref.email}</span>
                  </div>
                )}
                {ref.phone && (
                  <div className="ref-contact-item">
                    <Phone size={12} style={{ color: colorTheme.primary, flexShrink: 0 }} />
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
      const tokenKey = `${sectionKey}:${index}`;
      tokenMap[tokenKey] = React.cloneElement(section, { key: tokenKey }, ...(index === 0 ? heading : []), item);
      return tokenKey;
    });
  };

  const splitNestedChildren = (sectionKey: string, itemsPerToken = 1) => {
    const section = sectionMap[sectionKey];
    if (!React.isValidElement<{ children?: React.ReactNode }>(section)) return;
    const sectionChildren = React.Children.toArray(section.props.children);
    const heading = sectionChildren.slice(0, 1);
    const container = sectionChildren[1];
    if (!React.isValidElement<{ children?: React.ReactNode }>(container)) return;
    const items = React.Children.toArray(container.props.children);
    if (items.length === 0) return;

    const keys: string[] = [];
    for (let start = 0; start < items.length; start += itemsPerToken) {
      const tokenKey = `${sectionKey}:${start / itemsPerToken}`;
      const tokenContainer = React.cloneElement(
        container,
        { key: `${tokenKey}-items` },
        ...items.slice(start, start + itemsPerToken)
      );
      tokenMap[tokenKey] = React.cloneElement(
        section,
        { key: tokenKey },
        ...(start === 0 ? heading : []),
        tokenContainer
      );
      keys.push(tokenKey);
    }
    sectionTokenKeys[sectionKey] = keys;
  };

  splitNestedChildren('experience');
  splitNestedChildren('projects', 2);
  splitDirectChildren('education');
  splitDirectChildren('skills');
  splitNestedChildren('certifications');
  splitNestedChildren('languages');
  splitNestedChildren('references', 2);

  const mainKeys = ['experience', 'projects', 'custom', 'references'];
  const orderedTokens = useMemo(() => {
    const main: string[] = [];
    const sidebar: string[] = [];
    activeSectionOrder.forEach((sectionKey) => {
      const keys = sectionTokenKeys[sectionKey]
        || (sectionMap[sectionKey] ? [`${sectionKey}:whole`] : []);
      if (keys[0]?.endsWith(':whole')) tokenMap[keys[0]] = sectionMap[sectionKey];
      (mainKeys.includes(sectionKey) ? main : sidebar).push(...keys);
    });
    return { main, sidebar };
    // Token nodes are rebuilt from the latest resume data on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSectionOrder, data]);

  useLayoutEffect(() => {
    if (!isMultiPage || !measureRef.current) {
      setMeasuredColumns({ main: [], sidebar: [] });
      return;
    }

    const root = measureRef.current;
    const rootStyle = window.getComputedStyle(root);
    const verticalPadding = parseFloat(rootStyle.paddingTop) + parseFloat(rootStyle.paddingBottom);
    const pageContentHeight = (297 / 25.4) * 96 - verticalPadding;
    const headerHeight = root.querySelector<HTMLElement>('[data-creative-measure-header]')?.offsetHeight || 0;
    const signatureHeight = root.querySelector<HTMLElement>('[data-creative-measure-signature]')?.offsetHeight || 0;
    const firstPageCapacity = Math.max(160, pageContentHeight - headerHeight - 16);
    const nextPageCapacity = pageContentHeight;

    const packColumn = (column: 'main' | 'sidebar', keys: string[]) => {
      const pages: string[][] = [[]];
      const used = [0];
      const heights: Record<string, number> = {};
      keys.forEach((key) => {
        const element = root.querySelector<HTMLElement>(`[data-creative-${column}-key="${CSS.escape(key)}"]`);
        if (!element) return;
        const section = element.querySelector<HTMLElement>(':scope > .creative-section');
        const sectionStyle = section ? window.getComputedStyle(section) : null;
        const height = element.getBoundingClientRect().height
          + (parseFloat(sectionStyle?.marginTop || '0') || 0)
          + (parseFloat(sectionStyle?.marginBottom || '0') || 0);
        heights[key] = height;
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
      return { pages, used, heights };
    };

    const packedMain = packColumn('main', orderedTokens.main);
    const packedSidebar = packColumn('sidebar', orderedTokens.sidebar);

    // On continuation pages, use an empty area in the wider main column before
    // creating a mostly blank page for sidebar overflow. A token measured in
    // the narrower sidebar can only become the same height or shorter in main.
    const candidatePageCount = Math.max(packedMain.pages.length, packedSidebar.pages.length);
    for (let targetPage = 1; targetPage < candidatePageCount; targetPage += 1) {
      const sourcePage = targetPage + 1;
      if (!packedSidebar.pages[sourcePage]?.length) continue;
      if (!packedMain.pages[targetPage]) {
        packedMain.pages[targetPage] = [];
        packedMain.used[targetPage] = 0;
      }

      while (packedSidebar.pages[sourcePage].length > 0) {
        const key = packedSidebar.pages[sourcePage][0];
        const height = packedSidebar.heights[key] || 0;
        if (packedMain.used[targetPage] + height > nextPageCapacity) break;
        packedSidebar.pages[sourcePage].shift();
        packedSidebar.used[sourcePage] = Math.max(0, (packedSidebar.used[sourcePage] || 0) - height);
        packedMain.pages[targetPage].push(key);
        packedMain.used[targetPage] += height;
      }
    }

    // References are always the final content section, regardless of a saved
    // drag-and-drop order or which column produced more continuation pages.
    const referenceKeys = orderedTokens.main.filter((key) => key.startsWith('references:'));
    referenceKeys.forEach((key) => {
      packedMain.pages.forEach((page, pageIndex) => {
        if (!page.includes(key)) return;
        packedMain.pages[pageIndex] = page.filter((pageKey) => pageKey !== key);
        packedMain.used[pageIndex] = Math.max(0, (packedMain.used[pageIndex] || 0) - (packedMain.heights[key] || 0));
      });
    });

    let referencePageIndex = Math.max(packedMain.pages.length, packedSidebar.pages.length) - 1;
    referenceKeys.forEach((key) => {
      const height = packedMain.heights[key] || 0;
      while (packedMain.pages.length <= referencePageIndex) {
        packedMain.pages.push([]);
        packedMain.used.push(0);
      }
      const capacity = referencePageIndex === 0 ? firstPageCapacity : nextPageCapacity;
      if (packedMain.used[referencePageIndex] + height > capacity) {
        referencePageIndex += 1;
        while (packedMain.pages.length <= referencePageIndex) {
          packedMain.pages.push([]);
          packedMain.used.push(0);
        }
      }
      packedMain.pages[referencePageIndex].push(key);
      packedMain.used[referencePageIndex] += height;
    });

    while (packedMain.pages.length > 1 && packedMain.pages[packedMain.pages.length - 1].length === 0) packedMain.pages.pop();
    while (packedSidebar.pages.length > 1 && packedSidebar.pages[packedSidebar.pages.length - 1].length === 0) packedSidebar.pages.pop();

    const finalPageIndex = Math.max(packedMain.pages.length, packedSidebar.pages.length) - 1;
    const finalPageCapacity = finalPageIndex === 0 ? firstPageCapacity : nextPageCapacity;
    const finalSidebarUsed = packedSidebar.used[finalPageIndex] || 0;
    if (finalSidebarUsed + signatureHeight > finalPageCapacity) {
      while (packedSidebar.pages.length <= finalPageIndex + 1) packedSidebar.pages.push([]);
      packedSidebar.used[finalPageIndex + 1] = 0;
    }

    const nextColumns = {
      main: packedMain.pages,
      sidebar: packedSidebar.pages,
    };
    setMeasuredColumns((current) =>
      JSON.stringify(current) === JSON.stringify(nextColumns) ? current : nextColumns
    );
  }, [isMultiPage, orderedTokens, fontFamily, theme.fontSize, theme.spacing, data]);

  if (isMultiPage) {
    const mainPages = measuredColumns.main.length ? measuredColumns.main : [orderedTokens.main];
    const sidebarPages = measuredColumns.sidebar.length ? measuredColumns.sidebar : [orderedTokens.sidebar];
    const totalPages = Math.max(mainPages.length, sidebarPages.length);

    return (
      <div
        className="creative-studio-template multi-page-layout"
        style={{ fontFamily: fontFamily || 'Outfit, sans-serif', color: colorTheme.text }}
      >
        <div ref={measureRef} className="resume-page-sheet exact-pagination-measurer" aria-hidden="true">
          <div data-creative-measure-header>{creativeHeader}</div>
          <div className="creative-grid-layout" style={{ marginTop: '16px' }}>
            <div className="creative-main-col">
              {orderedTokens.main.map((key) => (
                <div key={key} data-creative-main-key={key}>{tokenMap[key]}</div>
              ))}
            </div>
            <div className="creative-sidebar-col">
              {orderedTokens.sidebar.map((key) => (
                <div key={key} data-creative-sidebar-key={key}>{tokenMap[key]}</div>
              ))}
            </div>
          </div>
          <div data-creative-measure-signature style={{ width: '210px' }}>
            {React.cloneElement(signatureBlock, {
              style: { ...signatureBlock.props.style, position: 'static', right: 'auto', bottom: 'auto' },
            })}
          </div>
        </div>

        {Array.from({ length: totalPages }, (_, pageIndex) => (
          <React.Fragment key={`page-${pageIndex + 1}`}>
            {pageIndex > 0 && (
              <div className="page-break-gap">
                <span className="page-break-label">--- Page {pageIndex + 1} of {totalPages} Sheet Below ---</span>
              </div>
            )}
            <div className={`resume-page-sheet page-${pageIndex + 1}`}>
              <div className="page-badge">Page {pageIndex + 1} of {totalPages}</div>
              {pageIndex === 0 && creativeHeader}
              <div className="creative-grid-layout" style={{ marginTop: pageIndex === 0 ? '16px' : 0 }}>
                <div className="creative-main-col">
                  {(mainPages[pageIndex] || []).map((key) => tokenMap[key])}
                </div>
                <div className="creative-sidebar-col">
                  {(sidebarPages[pageIndex] || []).map((key) => tokenMap[key])}
                </div>
              </div>
              {pageIndex === totalPages - 1 && signatureBlock}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <div
      className="creative-studio-template single-page-layout"
      style={{ fontFamily: fontFamily || 'Outfit, sans-serif', color: colorTheme.text }}
    >
      <div className="resume-page-sheet page-1">
        {creativeHeader}
        <div className="creative-grid-layout" style={{ marginTop: '16px' }}>
          <div className="creative-main-col">
            {activeSectionOrder
              .filter((key) => key === 'experience' || key === 'projects' || key === 'custom')
              .map((key) => sectionMap[key])}
          </div>

          <div className="creative-sidebar-col">
            {activeSectionOrder
              .filter((key) => key !== 'experience' && key !== 'projects' && key !== 'custom')
              .map((key) => sectionMap[key])}
          </div>
        </div>
      </div>
    </div>
  );
};
