import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Award, Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

export const CertificationsForm: React.FC = () => {
  const { resumeData, addCertification, updateCertification, deleteCertification, reorderCertifications } = useResume();
  const { certifications } = resumeData;
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
      reorderCertifications(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <div className="form-section">
      <div className="form-section-header between">
        <div>
          <h2 className="flex-align"><Award className="section-icon" /> Certifications & Licenses</h2>
          <p>Display official certifications (AWS, Meta, Scrum, PMP, Cisco). Drag items to reorder.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={addCertification}>
          <Plus size={16} /> Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="empty-state">
          <Award size={36} />
          <p>No certifications added yet.</p>
          <button className="btn btn-primary btn-sm" onClick={addCertification}>
            <Plus size={16} /> Add Certification
          </button>
        </div>
      ) : (
        <div className="accordion-list">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
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
                  <strong>{cert.title || 'Certification Title'}</strong>
                  <span> — {cert.issuer || 'Issuer'}</span>
                </div>
                <div className="card-item-actions">
                  {index > 0 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderCertifications(index, index - 1)}
                      title="Move Up"
                    >
                      <ChevronUp size={16} />
                    </button>
                  )}
                  {index < certifications.length - 1 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderCertifications(index, index + 1)}
                      title="Move Down"
                    >
                      <ChevronDown size={16} />
                    </button>
                  )}
                  <button
                    className="icon-btn danger"
                    onClick={() => deleteCertification(cert.id)}
                    title="Delete Certification"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor={`ctitle-${cert.id}`}>Certification Title *</label>
                  <input
                    id={`ctitle-${cert.id}`}
                    type="text"
                    className="input-field"
                    placeholder="AWS Certified Solutions Architect"
                    value={cert.title}
                    onChange={(e) => updateCertification(cert.id, { title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`cissuer-${cert.id}`}>Issuing Organization *</label>
                  <input
                    id={`cissuer-${cert.id}`}
                    type="text"
                    className="input-field"
                    placeholder="Amazon Web Services"
                    value={cert.issuer}
                    onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`cdate-${cert.id}`}>Issue Date / Year</label>
                  <input
                    id={`cdate-${cert.id}`}
                    type="text"
                    className="input-field"
                    placeholder="May 2023"
                    value={cert.issueDate}
                    onChange={(e) => updateCertification(cert.id, { issueDate: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`curl-${cert.id}`}>Credential Verification URL</label>
                  <input
                    id={`curl-${cert.id}`}
                    type="url"
                    className="input-field"
                    placeholder="https://aws.amazon.com/verification/..."
                    value={cert.credentialUrl || ''}
                    onChange={(e) => updateCertification(cert.id, { credentialUrl: e.target.value })}
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
