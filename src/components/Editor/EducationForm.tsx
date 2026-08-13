import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { GraduationCap, Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { resumeData, addEducation, updateEducation, deleteEducation, reorderEducation } = useResume();
  const { education } = resumeData;
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
      reorderEducation(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <div className="form-section">
      <div className="form-section-header between">
        <div>
          <h2 className="flex-align"><GraduationCap className="section-icon" /> Education & Academic Credentials</h2>
          <p>Add your degrees, universities, honors, GPAs, or relevant coursework. Drag items to reorder.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={addEducation}>
          <Plus size={16} /> Add Degree
        </button>
      </div>

      {education.length === 0 ? (
        <div className="empty-state">
          <GraduationCap size={36} />
          <p>No education details added yet.</p>
          <button className="btn btn-primary btn-sm" onClick={addEducation}>
            <Plus size={16} /> Add Education
          </button>
        </div>
      ) : (
        <div className="accordion-list">
          {education.map((edu, index) => (
            <div
              key={edu.id}
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
                  <strong>{edu.degree || 'Degree'}</strong>
                  <span> — {edu.institution || 'University'}</span>
                </div>
                <div className="card-item-actions">
                  {index > 0 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderEducation(index, index - 1)}
                      title="Move Up"
                    >
                      <ChevronUp size={16} />
                    </button>
                  )}
                  {index < education.length - 1 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderEducation(index, index + 1)}
                      title="Move Down"
                    >
                      <ChevronDown size={16} />
                    </button>
                  )}
                  <button
                    className="icon-btn danger"
                    onClick={() => deleteEducation(edu.id)}
                    title="Delete Entry"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor={`deg-${edu.id}`}>Degree / Field of Study *</label>
                  <input
                    id={`deg-${edu.id}`}
                    type="text"
                    className="input-field"
                    placeholder="B.S. in Computer Science"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`inst-${edu.id}`}>University / Institution *</label>
                  <input
                    id={`inst-${edu.id}`}
                    type="text"
                    className="input-field"
                    placeholder="UC Berkeley"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`loc-${edu.id}`}>Location</label>
                  <input
                    id={`loc-${edu.id}`}
                    type="text"
                    className="input-field"
                    placeholder="Berkeley, CA"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`sdate-${edu.id}`}>Start Date</label>
                  <input
                    id={`sdate-${edu.id}`}
                    type="text"
                    className="input-field"
                    placeholder="2018"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`edate-${edu.id}`}>Graduation Date</label>
                  <input
                    id={`edate-${edu.id}`}
                    type="text"
                    className="input-field"
                    placeholder="2022"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`gpa-${edu.id}`}>GPA / Honors (Optional)</label>
                  <input
                    id={`gpa-${edu.id}`}
                    type="text"
                    className="input-field"
                    placeholder="3.88 / 4.0 (Magna Cum Laude)"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor={`desc-${edu.id}`}>Relevant Coursework / Details</label>
                  <textarea
                    id={`desc-${edu.id}`}
                    className="textarea-field"
                    rows={2}
                    placeholder="Relevant Coursework: Algorithms & Data Structures, Distributed Systems, Software Engineering."
                    value={edu.description || ''}
                    onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
