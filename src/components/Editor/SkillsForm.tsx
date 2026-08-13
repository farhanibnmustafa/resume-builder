import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Cpu, Plus, Trash2, Tag, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

export const SkillsForm: React.FC = () => {
  const { resumeData, addSkillCategory, updateSkillCategory, deleteSkillCategory, reorderSkillCategories } = useResume();
  const { skillCategories } = resumeData;
  const [newSkillInput, setNewSkillInput] = useState<Record<string, string>>({});
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
      reorderSkillCategories(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  const SUGGESTED_SKILLS = [
    'React', 'TypeScript', 'Node.js', 'Next.js', 'PostgreSQL',
    'GraphQL', 'Docker', 'AWS', 'Python', 'TailwindCSS',
    'Git', 'CI/CD', 'REST APIs', 'System Architecture', 'Agile/Scrum'
  ];

  const handleAddSkillItem = (catId: string, currentSkills: { name: string; level?: number }[], skillName: string) => {
    if (!skillName.trim()) return;
    const exists = currentSkills.some(s => s.name.toLowerCase() === skillName.trim().toLowerCase());
    if (!exists) {
      const updated = [...currentSkills, { name: skillName.trim(), level: 4 }];
      const cat = skillCategories.find(c => c.id === catId);
      if (cat) {
        updateSkillCategory(catId, cat.categoryName, updated);
      }
    }
    setNewSkillInput(prev => ({ ...prev, [catId]: '' }));
  };

  const handleRemoveSkillItem = (catId: string, currentSkills: { name: string; level?: number }[], index: number) => {
    const updated = currentSkills.filter((_, i) => i !== index);
    const cat = skillCategories.find(c => c.id === catId);
    if (cat) {
      updateSkillCategory(catId, cat.categoryName, updated);
    }
  };

  const handleUpdateSkillLevel = (catId: string, currentSkills: { name: string; level?: number }[], index: number, level: number) => {
    const updated = [...currentSkills];
    updated[index] = { ...updated[index], level };
    const cat = skillCategories.find(c => c.id === catId);
    if (cat) {
      updateSkillCategory(catId, cat.categoryName, updated);
    }
  };

  return (
    <div className="form-section">
      <div className="form-section-header between">
        <div>
          <h2 className="flex-align"><Cpu className="section-icon" /> Skills & Technical Expertise</h2>
          <p>Group skills into categories (Frontend, Backend, Tools) for high ATS readability.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => addSkillCategory('Technical Skills')}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Suggested Popular Skills bar */}
      <div className="suggested-skills-banner">
        <span className="banner-title"><Tag size={14} /> Quick-Add Trending Skills:</span>
        <div className="banner-tags">
          {SUGGESTED_SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              className="badge-tag-btn"
              onClick={() => {
                if (skillCategories.length > 0) {
                  handleAddSkillItem(skillCategories[0].id, skillCategories[0].skills, skill);
                } else {
                  addSkillCategory('Technical Skills');
                }
              }}
            >
              + {skill}
            </button>
          ))}
        </div>
      </div>

      {skillCategories.length === 0 ? (
        <div className="empty-state">
          <Cpu size={36} />
          <p>No skill categories added yet.</p>
          <button className="btn btn-primary btn-sm" onClick={() => addSkillCategory('Frontend & Core')}>
            <Plus size={16} /> Add First Skill Category
          </button>
        </div>
      ) : (
        <div className="skills-categories-list">
          {skillCategories.map((cat, index) => (
            <div
              key={cat.id}
              className={`card-item ${draggedIndex === index ? 'dragging' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="card-item-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span className="drag-handle" style={{ cursor: 'grab', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Drag to reorder">
                    <GripVertical size={18} />
                  </span>
                  <input
                    type="text"
                    className="input-field category-name-input"
                    value={cat.categoryName}
                    onChange={(e) => updateSkillCategory(cat.id, e.target.value, cat.skills)}
                    placeholder="Category Name (e.g. Frontend & Frameworks)"
                  />
                </div>
                <div className="card-item-actions">
                  {index > 0 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderSkillCategories(index, index - 1)}
                      title="Move Up"
                    >
                      <ChevronUp size={16} />
                    </button>
                  )}
                  {index < skillCategories.length - 1 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderSkillCategories(index, index + 1)}
                      title="Move Down"
                    >
                      <ChevronDown size={16} />
                    </button>
                  )}
                  <button
                    className="icon-btn danger"
                    onClick={() => deleteSkillCategory(cat.id)}
                    title="Delete Category"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="skills-input-area">
                <div className="skills-chips-wrapper">
                  {cat.skills.map((s, sIdx) => (
                    <div key={sIdx} className="skill-item-chip">
                      <span className="chip-name">{s.name}</span>

                      {/* Level selector 1-5 */}
                      <select
                        className="level-select"
                        value={s.level || 4}
                        onChange={(e) => handleUpdateSkillLevel(cat.id, cat.skills, sIdx, parseInt(e.target.value))}
                        title="Skill Level (1-5)"
                      >
                        <option value={5}>Expert (5/5)</option>
                        <option value={4}>Advanced (4/5)</option>
                        <option value={3}>Proficient (3/5)</option>
                        <option value={2}>Intermediate (2/5)</option>
                        <option value={1}>Basic (1/5)</option>
                      </select>

                      <button
                        type="button"
                        className="chip-remove-btn"
                        onClick={() => handleRemoveSkillItem(cat.id, cat.skills, sIdx)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="add-skill-row">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Type skill name and press Enter (e.g. Docker)..."
                    value={newSkillInput[cat.id] || ''}
                    onChange={(e) => setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkillItem(cat.id, cat.skills, newSkillInput[cat.id] || '');
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleAddSkillItem(cat.id, cat.skills, newSkillInput[cat.id] || '')}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
