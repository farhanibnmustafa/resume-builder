import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Users, Plus, Trash2, User, Briefcase, Building, Mail, Phone } from 'lucide-react';

export const ReferencesForm: React.FC = () => {
  const { resumeData, addReference, updateReference, deleteReference } = useResume();
  const references = resumeData.references || [];

  return (
    <div className="form-section">
      <div className="form-section-header">
        <Users className="section-icon" />
        <div>
          <h2>Professional References</h2>
          <p>Add referees, supervisors, or mentors who can vouch for your professional work.</p>
        </div>
      </div>

      {references.length === 0 ? (
        <div className="empty-form-state">
          <Users size={36} className="empty-icon" />
          <p>No references added yet.</p>
          <button type="button" className="btn btn-primary btn-sm mt-2" onClick={addReference}>
            <Plus size={15} /> Add Reference
          </button>
        </div>
      ) : (
        <div className="form-grid-list">
          {references.map((ref, index) => (
            <div key={ref.id} className="form-card">
              <div className="form-card-header">
                <span className="card-title">
                  <User size={15} /> {ref.name || `Reference #${index + 1}`}
                </span>
                <button
                  type="button"
                  className="icon-btn btn-danger"
                  onClick={() => deleteReference(ref.id)}
                  title="Delete Reference"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="flex-align"><User size={14} /> Referee Full Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Subhanul Islam"
                    value={ref.name}
                    onChange={(e) => updateReference(ref.id, { name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="flex-align"><Briefcase size={14} /> Position / Relationship *</label>
                  <input
                    type="text"
                    placeholder="e.g. Chief Operating Officer"
                    value={ref.position}
                    onChange={(e) => updateReference(ref.id, { position: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="flex-align"><Building size={14} /> Company / Organization *</label>
                  <input
                    type="text"
                    placeholder="e.g. BD ACE ENCODERS"
                    value={ref.company}
                    onChange={(e) => updateReference(ref.id, { company: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="flex-align"><Mail size={14} /> Email Address</label>
                  <input
                    type="email"
                    placeholder="subhan.bdace@gmail.com"
                    value={ref.email || ''}
                    onChange={(e) => updateReference(ref.id, { email: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="flex-align"><Phone size={14} /> Phone Number</label>
                  <input
                    type="text"
                    placeholder="+8801774991033"
                    value={ref.phone || ''}
                    onChange={(e) => updateReference(ref.id, { phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}

          <button type="button" className="btn btn-secondary btn-sm align-self-start mt-2" onClick={addReference}>
            <Plus size={15} /> Add Another Reference
          </button>
        </div>
      )}
    </div>
  );
};
