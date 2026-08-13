import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Languages, Plus, Trash2 } from 'lucide-react';
import type { LanguageItem } from '../../types/resume';

export const LanguagesForm: React.FC = () => {
  const { resumeData, addLanguage, updateLanguage, deleteLanguage } = useResume();
  const { languages } = resumeData;

  const PROFICIENCY_OPTIONS: LanguageItem['proficiency'][] = [
    'Native',
    'Fluent',
    'Professional',
    'Intermediate',
    'Elementary',
  ];

  return (
    <div className="form-section">
      <div className="form-section-header between">
        <div>
          <h2 className="flex-align"><Languages className="section-icon" /> Languages Spoken</h2>
          <p>Add languages and your proficiency levels.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={addLanguage}>
          <Plus size={16} /> Add Language
        </button>
      </div>

      {languages.length === 0 ? (
        <div className="empty-state">
          <Languages size={36} />
          <p>No languages added yet.</p>
          <button className="btn btn-primary btn-sm" onClick={addLanguage}>
            <Plus size={16} /> Add Language
          </button>
        </div>
      ) : (
        <div className="languages-grid">
          {languages.map((lang) => (
            <div key={lang.id} className="card-item inline-card">
              <div className="form-group inline-grow">
                <label htmlFor={`lname-${lang.id}`}>Language Name</label>
                <input
                  id={`lname-${lang.id}`}
                  type="text"
                  className="input-field"
                  placeholder="e.g. English, Spanish, German"
                  value={lang.name}
                  onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                />
              </div>

              <div className="form-group inline-grow">
                <label htmlFor={`lprof-${lang.id}`}>Proficiency Level</label>
                <select
                  id={`lprof-${lang.id}`}
                  className="select-field"
                  value={lang.proficiency}
                  onChange={(e) =>
                    updateLanguage(lang.id, {
                      proficiency: e.target.value as LanguageItem['proficiency'],
                    })
                  }
                >
                  {PROFICIENCY_OPTIONS.map((prof) => (
                    <option key={prof} value={prof}>
                      {prof}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="icon-btn danger self-end"
                onClick={() => deleteLanguage(lang.id)}
                title="Remove Language"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
