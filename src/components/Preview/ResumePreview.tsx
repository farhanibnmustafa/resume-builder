import React, { useRef, useEffect, useCallback } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ModernExecutiveTemplate } from './Templates/ModernExecutiveTemplate';
import { MinimalClassicTemplate } from './Templates/MinimalClassicTemplate';
import { TechDeveloperTemplate } from './Templates/TechDeveloperTemplate';
import { CreativeStudioTemplate } from './Templates/CreativeStudioTemplate';
import { AcademicFormalTemplate } from './Templates/AcademicFormalTemplate';
import { CompactOnePagerTemplate } from './Templates/CompactOnePagerTemplate';
import { ExecutiveInnovatorTemplate } from './Templates/ExecutiveInnovatorTemplate';
import { ZoomIn, ZoomOut, RotateCcw, Download, Printer, LayoutTemplate, Maximize2 } from 'lucide-react';
import { downloadResumePdf, triggerPrint } from '../../utils/pdfExport';
import type { TemplateId } from '../../types/resume';

const TEMPLATE_NAMES: Record<TemplateId, string> = {
  'modern-executive': 'Modern Executive',
  'minimal-classic': 'Minimal Classic',
  'tech-developer': 'Tech Developer',
  'creative-studio': 'Creative Studio',
  'academic-formal': 'Academic Formal CV',
  'compact-one-pager': 'Compact One-Pager',
  'executive-innovator': 'Tech Innovator (Farhan Style)',
};

export const ResumePreview: React.FC = () => {
  const { resumeData, themeConfig, setTemplateId, zoomLevel, setZoomLevel } = useResume();
  const printRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleFitToScreen = useCallback(() => {
    if (viewportRef.current) {
      const vp = viewportRef.current;
      const containerWidth  = vp.clientWidth  - 48;
      const containerHeight = vp.clientHeight - 48;
      const A4_W = 794;
      const A4_H = 1123;
      if (containerWidth > 0 && containerHeight > 0) {
        const zoomByWidth  = Math.floor((containerWidth  / A4_W) * 100);
        const zoomByHeight = Math.floor((containerHeight / A4_H) * 100);
        const calculatedZoom = Math.min(zoomByWidth, zoomByHeight, 150);
        setZoomLevel(Math.max(10, calculatedZoom));
      }
    }
  }, [setZoomLevel]);

  // Auto-fit only once on initial mount
  useEffect(() => {
    const timer = setTimeout(handleFitToScreen, 150);
    return () => clearTimeout(timer);
  }, [handleFitToScreen]);


  const renderTemplate = () => {
    switch (themeConfig.templateId) {
      case 'modern-executive':
        return <ModernExecutiveTemplate data={resumeData} theme={themeConfig} />;
      case 'minimal-classic':
        return <MinimalClassicTemplate data={resumeData} theme={themeConfig} />;
      case 'tech-developer':
        return <TechDeveloperTemplate data={resumeData} theme={themeConfig} />;
      case 'creative-studio':
        return <CreativeStudioTemplate data={resumeData} theme={themeConfig} />;
      case 'academic-formal':
        return <AcademicFormalTemplate data={resumeData} theme={themeConfig} />;
      case 'compact-one-pager':
        return <CompactOnePagerTemplate data={resumeData} theme={themeConfig} />;
      case 'executive-innovator':
        return <ExecutiveInnovatorTemplate data={resumeData} theme={themeConfig} />;
      default:
        return <ModernExecutiveTemplate data={resumeData} theme={themeConfig} />;
    }
  };

  const handleDownloadPdf = () => {
    downloadResumePdf('resume-document-paper', `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_CV`);
  };

  return (
    <div className="preview-container">
      {/* Control Bar */}
      <div className="preview-toolbar">
        {/* Template Quick Selector dropdown */}
        <div className="toolbar-group">
          <LayoutTemplate size={16} className="toolbar-icon" />
          <select
            className="template-select"
            value={themeConfig.templateId}
            onChange={(e) => setTemplateId(e.target.value as TemplateId)}
          >
            {Object.entries(TEMPLATE_NAMES).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Zoom & Fit Screen controls */}
        <div className="toolbar-group zoom-controls">
          <button
            className="icon-btn"
            onClick={() => setZoomLevel((prev) => Math.max(10, prev - 10))}
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="zoom-text">{zoomLevel}%</span>
          <button
            className="icon-btn"
            onClick={() => setZoomLevel((prev) => Math.min(150, prev + 10))}
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          
          <button
            className="icon-btn"
            onClick={handleFitToScreen}
            title="Fit Screen (Auto Scale)"
          >
            <Maximize2 size={14} />
          </button>

          <button
            className="icon-btn"
            onClick={() => setZoomLevel(100)}
            title="Reset Zoom to 100%"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Action buttons */}
        <div className="toolbar-group action-buttons">
          <button className="btn btn-secondary btn-sm" onClick={triggerPrint}>
            <Printer size={15} /> Print
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleDownloadPdf}>
            <Download size={15} /> Export PDF
          </button>
        </div>
      </div>

      {/* Paper viewport */}
      <div className="paper-viewport" ref={viewportRef}>
        <div
          id="resume-document-paper"
          ref={printRef}
          className={`resume-paper font-scale-${themeConfig.fontSize} spacing-${themeConfig.spacing}`}
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            // Collapse extra layout space when zooming out so scrollHeight is accurate
            marginBottom: zoomLevel < 100
              ? `${-297 * (1 - zoomLevel / 100)}mm`
              : '40px',
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
