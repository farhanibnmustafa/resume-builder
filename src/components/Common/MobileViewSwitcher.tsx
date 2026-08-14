import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Edit3, Eye, ShieldCheck } from 'lucide-react';

export const MobileViewSwitcher: React.FC = () => {
  const { viewMode, setViewMode, atsBreakdown, setActiveTab } = useResume();

  return (
    <div className="mobile-view-switcher" role="navigation" aria-label="Mobile Navigation">
      <div className="mobile-pill-container">
        <button
          className={`mobile-pill-btn ${viewMode === 'edit' || viewMode === 'split' ? 'active' : ''}`}
          onClick={() => setViewMode('edit')}
          title="Switch to Editor"
        >
          <Edit3 size={16} />
          <span>Editor</span>
        </button>

        <button
          className={`mobile-pill-btn ${viewMode === 'preview' ? 'active' : ''}`}
          onClick={() => setViewMode('preview')}
          title="Switch to Resume Preview"
        >
          <Eye size={16} />
          <span>Preview</span>
        </button>

        <button
          className="mobile-pill-btn ats-badge-btn"
          onClick={() => {
            setViewMode('edit');
            setActiveTab('ats');
          }}
          title="ATS Score Recommendations"
        >
          <ShieldCheck size={15} className="ats-icon" />
          <span>{atsBreakdown.score}</span>
        </button>
      </div>
    </div>
  );
};
