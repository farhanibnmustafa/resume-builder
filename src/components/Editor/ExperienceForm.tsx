import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Briefcase, Plus, Trash2, ChevronUp, ChevronDown, CheckCircle, Sparkles, GripVertical, Wand2 } from 'lucide-react';
import { generateSmartBulletsForExperience } from '../../utils/aiBulletGenerator';

export const ExperienceForm: React.FC = () => {
  const { resumeData, addExperience, updateExperience, deleteExperience, reorderExperience } = useResume();
  const { experiences } = resumeData;
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderExperience(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const STRONG_ACTION_VERBS = [
    'Architected', 'Engineered', 'Developed', 'Spearheaded', 'Optimized',
    'Scaled', 'Automated', 'Pioneered', 'Delivered', 'Transformed'
  ];

  const handleAddHighlight = (expId: string, currentHighlights: string[], customText?: string) => {
    const textToAdd = customText || 'Engineered scalable web applications reducing system latency by 35%.';
    updateExperience(expId, {
      highlights: [...currentHighlights, textToAdd]
    });
  };

  const handleAddVerbBullet = (expId: string, currentHighlights: string[], verb: string, position: string, company: string) => {
    const smartList = generateSmartBulletsForExperience(position, company, resumeData);
    const matched = smartList.find((s) => s.verb === verb);
    const textToAdd = matched ? matched.text : `${verb} scalable solutions boosting system throughput by 30%.`;
    handleAddHighlight(expId, currentHighlights, textToAdd);
  };

  const handleUpdateHighlight = (expId: string, currentHighlights: string[], index: number, value: string) => {
    const updated = [...currentHighlights];
    updated[index] = value;
    updateExperience(expId, { highlights: updated });
  };

  const handleDeleteHighlight = (expId: string, currentHighlights: string[], index: number) => {
    const updated = currentHighlights.filter((_, i) => i !== index);
    updateExperience(expId, { highlights: updated });
  };

  return (
    <div className="form-section">
      <div className="form-section-header between">
        <div>
          <h2 className="flex-align"><Briefcase className="section-icon" /> Work Experience</h2>
          <p>Highlight your achievements, leadership roles, and measurable metrics.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={addExperience}>
          <Plus size={16} /> Add Position
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="empty-state">
          <Briefcase size={36} />
          <p>No work experiences added yet.</p>
          <button className="btn btn-primary btn-sm" onClick={addExperience}>
            <Plus size={16} /> Add Work Experience
          </button>
        </div>
      ) : (
        <div className="accordion-list">
          {experiences.map((exp, index) => {
            const smartBullets = generateSmartBulletsForExperience(exp.position, exp.company, resumeData);

            return (
              <div
                key={exp.id}
                className={`card-item ${draggedIndex === index ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <div className="card-item-header">
                  <div className="card-item-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="drag-handle" style={{ cursor: 'grab', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Drag to reorder">
                      <GripVertical size={18} />
                    </span>
                    <strong>{exp.position || 'Position Title'}</strong>
                    <span> @ {exp.company || 'Company'}</span>
                  </div>
                  <div className="card-item-actions">
                    {index > 0 && (
                      <button
                        className="icon-btn"
                        onClick={() => reorderExperience(index, index - 1)}
                        title="Move Up"
                      >
                        <ChevronUp size={16} />
                      </button>
                    )}
                    {index < experiences.length - 1 && (
                      <button
                        className="icon-btn"
                        onClick={() => reorderExperience(index, index + 1)}
                        title="Move Down"
                      >
                        <ChevronDown size={16} />
                      </button>
                    )}
                    <button
                      className="icon-btn danger"
                      onClick={() => deleteExperience(exp.id)}
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor={`pos-${exp.id}`}>Job Position Title *</label>
                    <input
                      id={`pos-${exp.id}`}
                      type="text"
                      className="input-field"
                      placeholder="e.g. Senior Software Engineer"
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`comp-${exp.id}`}>Company Name *</label>
                    <input
                      id={`comp-${exp.id}`}
                      type="text"
                      className="input-field"
                      placeholder="e.g. Apex Cloud Solutions"
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`loc-${exp.id}`}>Location</label>
                    <input
                      id={`loc-${exp.id}`}
                      type="text"
                      className="input-field"
                      placeholder="San Francisco, CA"
                      value={exp.location}
                      onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`sdate-${exp.id}`}>Start Date</label>
                    <input
                      id={`sdate-${exp.id}`}
                      type="text"
                      className="input-field"
                      placeholder="e.g. Mar 2022"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor={`edate-${exp.id}`}>End Date</label>
                    <input
                      id={`edate-${exp.id}`}
                      type="text"
                      className="input-field"
                      placeholder={exp.current ? 'Present' : 'e.g. Feb 2024'}
                      value={exp.current ? 'Present' : exp.endDate}
                      disabled={exp.current}
                      onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                    />
                  </div>

                  <div className="form-group full-width checkbox-row">
                    <input
                      type="checkbox"
                      id={`curr-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, { current: e.target.checked })}
                    />
                    <label htmlFor={`curr-${exp.id}`} className="checkbox-label">
                      I currently work in this role
                    </label>
                  </div>

                  {/* Highlights / Bullet Points */}
                  <div className="form-group full-width">
                    <div className="label-with-badge">
                      <label>Key Accomplishments & Bullet Points</label>
                      <span className="badge badge-accent">
                        <Sparkles size={12} /> Pro Tip: Include metrics (%)
                      </span>
                    </div>

                    <div className="bullets-editor">
                      {exp.highlights.map((bullet, bIdx) => (
                        <div key={bIdx} className="bullet-input-row">
                          <CheckCircle size={16} className="bullet-icon" />
                          <input
                            type="text"
                            className="input-field"
                            placeholder="e.g. Reduced database latency by 45% using Redis caching..."
                            value={bullet}
                            onChange={(e) => handleUpdateHighlight(exp.id, exp.highlights, bIdx, e.target.value)}
                          />
                          <button
                            type="button"
                            className="icon-btn danger"
                            onClick={() => handleDeleteHighlight(exp.id, exp.highlights, bIdx)}
                            title="Remove Bullet"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}

                      <div className="bullet-actions">
                        <button
                          type="button"
                          className="btn btn-secondary btn-xs"
                          onClick={() => handleAddHighlight(exp.id, exp.highlights)}
                        >
                          <Plus size={14} /> Add Bullet Point
                        </button>

                        <div className="verb-suggestions">
                          <span className="verb-label">Power Action Verbs:</span>
                          {STRONG_ACTION_VERBS.slice(0, 5).map((verb) => (
                            <span
                              key={verb}
                              className="verb-chip"
                              onClick={() => handleAddVerbBullet(exp.id, exp.highlights, verb, exp.position, exp.company)}
                              title={`Click to add ATS bullet starting with ${verb}`}
                            >
                              + {verb}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* AI Tailored Smart Bullet Suggestions Box */}
                      <div 
                        className="ai-suggestions-box" 
                        style={{ 
                          marginTop: '14px', 
                          background: 'rgba(99, 102, 241, 0.04)', 
                          padding: '12px 14px', 
                          borderRadius: '8px', 
                          border: '1px solid rgba(99, 102, 241, 0.2)' 
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: '#6366f1', fontSize: '0.82rem', fontWeight: 600 }}>
                          <Wand2 size={14} /> AI Tailored Bullet Points (Based on your Position, Skills & Projects):
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {smartBullets.map((sug, sIdx) => (
                            <div 
                              key={sIdx}
                              style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center', 
                                padding: '8px 12px', 
                                background: '#ffffff', 
                                borderRadius: '6px', 
                                fontSize: '0.82rem',
                                border: '1px solid #e2e8f0',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, paddingRight: '8px' }}>
                                <span className="badge badge-accent" style={{ fontSize: '0.68rem', textTransform: 'uppercase', padding: '2px 6px', whiteSpace: 'nowrap' }}>
                                  {sug.category}
                                </span>
                                <span style={{ color: '#1e293b', lineHeight: 1.4 }}>{sug.text}</span>
                              </div>
                              <button 
                                type="button" 
                                className="btn btn-secondary btn-xs" 
                                style={{ whiteSpace: 'nowrap', flexShrink: 0 }}
                                onClick={() => handleAddHighlight(exp.id, exp.highlights, sug.text)}
                              >
                                + Add Bullet
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
