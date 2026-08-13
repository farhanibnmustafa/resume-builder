import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Code, Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';

export const ProjectsForm: React.FC = () => {
  const { resumeData, addProject, updateProject, deleteProject, reorderProjects } = useResume();
  const { projects } = resumeData;
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleTechChange = (projId: string, value: string) => {
    const techs = value.split(',').map((t) => t.trim()).filter(Boolean);
    updateProject(projId, { technologies: techs });
  };

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
      reorderProjects(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <div className="form-section">
      <div className="form-section-header between">
        <div>
          <h2 className="flex-align"><Code className="section-icon" /> Portfolio & Projects</h2>
          <p>Display notable software applications, open source repos, or side projects. Drag items to reorder.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={addProject}>
          <Plus size={16} /> Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <Code size={36} />
          <p>No projects added yet.</p>
          <button className="btn btn-primary btn-sm" onClick={addProject}>
            <Plus size={16} /> Add First Project
          </button>
        </div>
      ) : (
        <div className="accordion-list">
          {projects.map((proj, index) => (
            <div
              key={proj.id}
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
                  <strong>{proj.name || 'Project Name'}</strong>
                  {proj.role && <span> ({proj.role})</span>}
                </div>
                <div className="card-item-actions">
                  {index > 0 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderProjects(index, index - 1)}
                      title="Move Up"
                    >
                      <ChevronUp size={16} />
                    </button>
                  )}
                  {index < projects.length - 1 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderProjects(index, index + 1)}
                      title="Move Down"
                    >
                      <ChevronDown size={16} />
                    </button>
                  )}
                  <button
                    className="icon-btn danger"
                    onClick={() => deleteProject(proj.id)}
                    title="Delete Project"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor={`pname-${proj.id}`}>Project Title *</label>
                  <input
                    id={`pname-${proj.id}`}
                    type="text"
                    className="input-field"
                    placeholder="e.g. OmniFlow - AI Builder"
                    value={proj.name}
                    onChange={(e) => updateProject(proj.id, { name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`ptype-${proj.id}`}>Project Category / Type</label>
                  <select
                    id={`ptype-${proj.id}`}
                    className="input-field"
                    value={proj.highlights && proj.highlights[0] ? proj.highlights[0] : 'Real Life Project'}
                    onChange={(e) => updateProject(proj.id, { highlights: [e.target.value] })}
                  >
                    <option value="Real Life Project">Real Life Project</option>
                    <option value="Dummy Project">Dummy Project</option>
                    <option value="Project Documentation">Project Documentation</option>
                    <option value="Academic / Practice Project">Academic / Practice Project</option>
                    <option value="Open Source Contribution">Open Source Contribution</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor={`prole-${proj.id}`}>Year / Role Tag</label>
                  <input
                    id={`prole-${proj.id}`}
                    type="text"
                    className="input-field"
                    placeholder="e.g. 2024 / Lead Architect"
                    value={proj.role}
                    onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`purl-${proj.id}`}>Live URL / Demo Link</label>
                  <input
                    id={`purl-${proj.id}`}
                    type="url"
                    className="input-field"
                    placeholder="https://myproject.com"
                    value={proj.url}
                    onChange={(e) => updateProject(proj.id, { url: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor={`pgh-${proj.id}`}>GitHub Repository URL</label>
                  <input
                    id={`pgh-${proj.id}`}
                    type="url"
                    className="input-field"
                    placeholder="https://github.com/user/repo"
                    value={proj.githubUrl || ''}
                    onChange={(e) => updateProject(proj.id, { githubUrl: e.target.value })}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor={`ptech-${proj.id}`}>Technologies Used (Comma Separated)</label>
                  <input
                    id={`ptech-${proj.id}`}
                    type="text"
                    className="input-field"
                    placeholder="React, TypeScript, Node.js, PostgreSQL, TailwindCSS"
                    value={proj.technologies ? proj.technologies.join(', ') : ''}
                    onChange={(e) => handleTechChange(proj.id, e.target.value)}
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor={`pdesc-${proj.id}`}>Project Overview & Key Impact</label>
                  <textarea
                    id={`pdesc-${proj.id}`}
                    className="textarea-field"
                    rows={3}
                    placeholder="Describe what the project does, key features, and impact (e.g., 3,500+ GitHub Stars, 100k requests/mo)."
                    value={proj.description}
                    onChange={(e) => updateProject(proj.id, { description: e.target.value })}
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
