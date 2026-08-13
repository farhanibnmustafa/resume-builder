import React, { useRef, useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';
import { Download, Upload, FileText, Sparkles, RefreshCw, ShieldCheck, Edit3, Eye, Split } from 'lucide-react';
import { downloadResumePdf } from '../utils/pdfExport';

export const Header: React.FC = () => {
  const {
    resumeData,
    updateTitle,
    viewMode,
    setViewMode,
    atsBreakdown,
    loadPreset,
    exportJson,
    importJson,
    resetResume,
    setActiveTab,
  } = useResume();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDemoOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = importJson(content);
        if (success) {
          alert('Resume JSON imported successfully!');
        } else {
          alert('Invalid Resume JSON file format.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleExportPdf = () => {
    downloadResumePdf('resume-document-paper', `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_CV`);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo-brand">
          <div className="logo-icon">
            <FileText size={20} />
          </div>
          <span className="logo-text">CV Builder <span className="logo-badge">PRO</span></span>
        </div>

        <div className="title-input-wrapper">
          <input
            type="text"
            className="title-input"
            value={resumeData.title}
            onChange={(e) => updateTitle(e.target.value)}
            placeholder="Resume Document Title"
          />
        </div>
      </div>

      <div className="header-center">
        {/* View Mode Toggles */}
        <div className="view-mode-segmented">
          <button
            className={`view-btn ${viewMode === 'split' ? 'active' : ''}`}
            onClick={() => setViewMode('split')}
            title="Split Editor & Preview"
          >
            <Split size={15} /> <span>Split</span>
          </button>
          <button
            className={`view-btn ${viewMode === 'edit' ? 'active' : ''}`}
            onClick={() => setViewMode('edit')}
            title="Full Editor Only"
          >
            <Edit3 size={15} /> <span>Edit</span>
          </button>
          <button
            className={`view-btn ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => setViewMode('preview')}
            title="Full Preview Only"
          >
            <Eye size={15} /> <span>Preview</span>
          </button>
        </div>

        {/* ATS Score Indicator Widget */}
        <button
          className="header-ats-pill"
          onClick={() => setActiveTab('ats')}
          title="Click to view ATS Score recommendations"
        >
          <ShieldCheck size={16} className="ats-pill-icon" />
          <span>ATS Score: <strong>{atsBreakdown.score}/100</strong></span>
        </button>
      </div>

      <div className="header-right">
        {/* Sample Datasets Dropdown */}
        <div className="dropdown" ref={dropdownRef}>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setIsDemoOpen((prev) => !prev)}
          >
            <Sparkles size={15} /> Demo Presets
          </button>
          <div className={`dropdown-menu ${isDemoOpen ? 'show' : ''}`}>
            <button 
              className="dropdown-item" 
              onClick={() => {
                loadPreset('software');
                setIsDemoOpen(false);
              }}
            >
              💻 Senior Software Engineer
            </button>
            <button 
              className="dropdown-item" 
              onClick={() => {
                loadPreset('product');
                setIsDemoOpen(false);
              }}
            >
              📊 Principal Product Manager
            </button>
            <button 
              className="dropdown-item danger" 
              onClick={() => {
                resetResume();
                setIsDemoOpen(false);
              }}
            >
              <RefreshCw size={14} /> Clear / Blank Resume
            </button>
          </div>
        </div>

        {/* JSON Export/Import */}
        <button className="btn btn-ghost btn-sm" onClick={exportJson} title="Export Resume Data as JSON">
          <Download size={15} /> Backup
        </button>

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => fileInputRef.current?.click()}
          title="Import Resume JSON"
        >
          <Upload size={15} /> Restore
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          accept=".json"
          onChange={handleFileUpload}
        />

        {/* Primary Download PDF Button */}
        <button className="btn btn-primary btn-sm btn-glow" onClick={handleExportPdf}>
          <FileText size={15} /> Download PDF
        </button>
      </div>
    </header>
  );
};
