import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Palette, Type, Sliders, Layout, FileText, GripVertical, ChevronUp, ChevronDown } from 'lucide-react';
import { COLOR_THEMES } from '../../data/sampleResumes';
import type { FontFamily, FontSizeScale, LayoutSpacing } from '../../types/resume';

const SECTION_LABELS: Record<string, string> = {
  summary: 'Executive Summary',
  experience: 'Work Experience',
  education: 'Education & Academic',
  skills: 'Skills & Technical Expertise',
  projects: 'Key Projects & Portfolio',
  certifications: 'Certifications & Licenses',
  languages: 'Languages',
  custom: 'Custom Sections',
  references: 'Professional References',
};

export const DesignCustomizer: React.FC = () => {
  const {
    themeConfig,
    setColorTheme,
    setFontFamily,
    setFontSize,
    setSpacing,
    setShowPhoto,
    setShowSkillBars,
    setSidebarPosition,
    setPageMode,
    reorderSections,
    updateSectionOrder,
  } = useResume();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const sectionOrder = themeConfig.sectionOrder || ['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom'];

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    reorderSections(draggedIndex, index);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const FONTS: { id: FontFamily; label: string; preview: string }[] = [
    { id: 'Inter', label: 'Inter (Modern Clean)', preview: 'Inter, sans-serif' },
    { id: 'Outfit', label: 'Outfit (Sleek Geometric)', preview: 'Outfit, sans-serif' },
    { id: 'Merriweather', label: 'Merriweather (Classic Serif)', preview: 'Merriweather, serif' },
    { id: 'Playfair Display', label: 'Playfair Display (Executive Serif)', preview: 'Playfair Display, serif' },
    { id: 'Fira Code', label: 'Fira Code (Developer Monospace)', preview: 'Fira Code, monospace' },
    { id: 'Roboto', label: 'Roboto (Standard Sans)', preview: 'Roboto, sans-serif' },
  ];

  return (
    <div className="form-section">
      <div className="form-section-header">
        <Palette className="section-icon" />
        <div>
          <h2>Design & Styling Customizer</h2>
          <p>Customize colors, fonts, spacing, layout presentation, and section order in real time.</p>
        </div>
      </div>

      {/* Section Drag & Drop Reorder Manager */}
      <div className="design-block">
        <h3 className="design-subheading flex-align">
          <GripVertical size={16} /> Drag & Drop Section Reordering
        </h3>
        <p className="design-desc">Drag any section or use the up/down arrows to reorder how sections appear in your CV preview.</p>

        <div className="section-reorder-list">
          {sectionOrder.map((secKey, index) => (
            <div
              key={secKey}
              className={`reorder-item-card ${draggedIndex === index ? 'dragging' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div className="reorder-left">
                <GripVertical size={16} className="drag-handle-icon" />
                <span className="reorder-num">{index + 1}.</span>
                <span className="reorder-title">{SECTION_LABELS[secKey] || secKey}</span>
              </div>

              <div className="reorder-actions">
                {index > 0 && (
                  <button
                    type="button"
                    className="icon-btn btn-xs"
                    onClick={() => reorderSections(index, index - 1)}
                    title="Move Up"
                  >
                    <ChevronUp size={14} />
                  </button>
                )}
                {index < sectionOrder.length - 1 && (
                  <button
                    type="button"
                    className="icon-btn btn-xs"
                    onClick={() => reorderSections(index, index + 1)}
                    title="Move Down"
                  >
                    <ChevronDown size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-xs mt-2 self-start"
          onClick={() =>
            updateSectionOrder(['summary', 'experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'custom'])
          }
        >
          Reset Default Section Order
        </button>
      </div>

      {/* Color Themes & Custom Color Picker */}
      <div className="design-block">
        <h3 className="design-subheading flex-align"><Palette size={16} /> Color Palettes & Custom Primary Color</h3>
        <div className="color-presets-grid">
          {COLOR_THEMES.map((ct) => (
            <button
              key={ct.id}
              type="button"
              className={`color-preset-card ${themeConfig.colorTheme.id === ct.id ? 'active' : ''}`}
              onClick={() => setColorTheme(ct)}
            >
              <div className="color-swatches">
                <span className="swatch" style={{ backgroundColor: ct.primary }} />
                <span className="swatch" style={{ backgroundColor: ct.secondary }} />
                <span className="swatch" style={{ backgroundColor: ct.accent }} />
              </div>
              <span className="color-preset-name">{ct.name}</span>
            </button>
          ))}
        </div>

        <div className="custom-color-picker-box">
          <label htmlFor="custom-primary-color" className="custom-color-label">
            <span>Choose Any Custom Accent Color:</span>
            <input
              id="custom-primary-color"
              type="color"
              value={themeConfig.colorTheme.primary}
              onChange={(e) => {
                const hex = e.target.value;
                setColorTheme({
                  id: 'custom-accent',
                  name: 'Custom Accent',
                  primary: hex,
                  secondary: '#0f172a',
                  accent: hex,
                  background: '#ffffff',
                  text: '#0f172a',
                });
              }}
              className="color-picker-input"
            />
            <span className="color-hex-badge">{themeConfig.colorTheme.primary.toUpperCase()}</span>
          </label>
        </div>
      </div>

      {/* Typography */}
      <div className="design-block">
        <h3 className="design-subheading flex-align"><Type size={16} /> Typography Font Family</h3>
        <div className="font-options-grid">
          {FONTS.map((font) => (
            <button
              key={font.id}
              type="button"
              className={`font-option-card ${themeConfig.fontFamily === font.id ? 'active' : ''}`}
              onClick={() => setFontFamily(font.id)}
            >
              <span className="font-preview-text" style={{ fontFamily: font.preview }}>
                {font.id}
              </span>
              <span className="font-label">{font.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Size Scale & Spacing */}
      <div className="design-block">
        <h3 className="design-subheading flex-align"><Sliders size={16} /> Font Scale & Spacing</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Font Size Scale</label>
            <div className="segmented-control">
              {(['small', 'medium', 'large'] as FontSizeScale[]).map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`segment-btn ${themeConfig.fontSize === size ? 'active' : ''}`}
                  onClick={() => setFontSize(size)}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Layout Spacing Density</label>
            <div className="segmented-control">
              {(['compact', 'comfortable', 'spacious'] as LayoutSpacing[]).map((space) => (
                <button
                  key={space}
                  type="button"
                  className={`segment-btn ${themeConfig.spacing === space ? 'active' : ''}`}
                  onClick={() => setSpacing(space)}
                >
                  {space.charAt(0).toUpperCase() + space.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Page Layout Mode */}
      <div className="design-block">
        <h3 className="design-subheading flex-align"><FileText size={16} /> Page Count & Sheet Layout</h3>
        <div className="form-group">
          <label>Page Format Mode</label>
          <div className="segmented-control">
            <button
              type="button"
              className={`segment-btn ${themeConfig.pageMode === 'auto' ? 'active' : ''}`}
              onClick={() => setPageMode('auto')}
            >
              Auto Multi-Page
            </button>
            <button
              type="button"
              className={`segment-btn ${themeConfig.pageMode === '1-page' ? 'active' : ''}`}
              onClick={() => {
                setPageMode('1-page');
                setFontSize('small');
                setSpacing('compact');
              }}
            >
              Fit 1 Page Compact
            </button>
            <button
              type="button"
              className={`segment-btn ${themeConfig.pageMode === '2-page' ? 'active' : ''}`}
              onClick={() => setPageMode('2-page')}
            >
              2 Pages (A4 Sheets)
            </button>
          </div>
        </div>
      </div>

      {/* Layout Options */}
      <div className="design-block">
        <h3 className="design-subheading flex-align"><Layout size={16} /> Sidebar & Element Toggles</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Sidebar Position (Multi-column Templates)</label>
            <div className="segmented-control">
              <button
                type="button"
                className={`segment-btn ${themeConfig.sidebarPosition === 'left' ? 'active' : ''}`}
                onClick={() => setSidebarPosition('left')}
              >
                Left Sidebar
              </button>
              <button
                type="button"
                className={`segment-btn ${themeConfig.sidebarPosition === 'right' ? 'active' : ''}`}
                onClick={() => setSidebarPosition('right')}
              >
                Right Sidebar
              </button>
            </div>
          </div>

          <div className="form-group checkbox-row mt-4">
            <input
              type="checkbox"
              id="toggle-photo"
              checked={themeConfig.showPhoto}
              onChange={(e) => setShowPhoto(e.target.checked)}
            />
            <label htmlFor="toggle-photo">Show Profile Photo</label>
          </div>

          <div className="form-group checkbox-row mt-4">
            <input
              type="checkbox"
              id="toggle-skill-bars"
              checked={themeConfig.showSkillBars}
              onChange={(e) => setShowSkillBars(e.target.checked)}
            />
            <label htmlFor="toggle-skill-bars">Show Skill Progress Bars</label>
          </div>
        </div>
      </div>
    </div>
  );
};
