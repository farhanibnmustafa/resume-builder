import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { ShieldCheck, AlertTriangle, CheckCircle, Info, ArrowUpRight } from 'lucide-react';

export const AtsAnalysisPanel: React.FC = () => {
  const { atsBreakdown, setActiveTab } = useResume();

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#10b981'; // Green
    if (score >= 75) return '#3b82f6'; // Blue
    if (score >= 60) return '#f59e0b'; // Amber
    return '#ef4444'; // Red
  };

  return (
    <div className="form-section">
      <div className="form-section-header">
        <ShieldCheck className="section-icon" />
        <div>
          <h2>Real-Time ATS Optimization Score</h2>
          <p>Scan your resume against Applicant Tracking System (ATS) screening algorithms.</p>
        </div>
      </div>

      {/* Main Score Meter Card */}
      <div className="ats-score-hero" style={{ borderColor: getScoreColor(atsBreakdown.score) }}>
        <div className="ats-score-circle" style={{ borderColor: getScoreColor(atsBreakdown.score) }}>
          <span className="ats-number" style={{ color: getScoreColor(atsBreakdown.score) }}>
            {atsBreakdown.score}
          </span>
          <span className="ats-max">/ 100</span>
        </div>

        <div className="ats-hero-info">
          <div className="ats-rating-badge" style={{ backgroundColor: getScoreColor(atsBreakdown.score) }}>
            {atsBreakdown.rating} Readiness
          </div>
          <h3>
            {atsBreakdown.score >= 85
              ? 'Your resume is highly optimized to pass enterprise ATS screeners!'
              : 'Follow the recommendations below to boost your ATS score.'}
          </h3>
          <p>
            Detected <strong>{atsBreakdown.actionVerbCount} power action verbs</strong> across your experience bullet points.
          </p>
        </div>
      </div>

      {/* Category Breakdown list */}
      <div className="ats-category-list">
        <h3>Section Breakdown & Action Steps</h3>
        {atsBreakdown.details.map((cat, idx) => (
          <div key={idx} className="ats-cat-card">
            <div className="ats-cat-header">
              <span className="ats-cat-title">
                {cat.score === cat.maxScore ? (
                  <CheckCircle size={16} className="icon-success" />
                ) : (
                  <AlertTriangle size={16} className="icon-warning" />
                )}
                {cat.category}
              </span>
              <span className="ats-cat-score">
                {cat.score} / {cat.maxScore} pts
              </span>
            </div>

            <p className="ats-feedback">{cat.feedback}</p>

            {cat.tips.length > 0 && (
              <ul className="ats-tips-list">
                {cat.tips.map((tip, tIdx) => (
                  <li key={tIdx}>
                    <Info size={14} /> {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Recommended Keywords banner */}
      <div className="ats-keywords-box">
        <h4><ArrowUpRight size={16} /> Recommended ATS High-Value Keywords</h4>
        <p>Ensure keywords relevant to your target job title appear naturally in your Summary and Skills sections.</p>
        <div className="keyword-pills">
          {['Scalable Architecture', 'CI/CD Pipelines', 'REST APIs', 'Agile Methodologies', 'Cloud Services', 'System Design'].map((kw) => (
            <span key={kw} className="kw-pill" onClick={() => setActiveTab('skills')}>
              + {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
