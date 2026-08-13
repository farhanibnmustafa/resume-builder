import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Layers, Plus, Trash2, ChevronUp, ChevronDown, GripVertical } from 'lucide-react';
import type { CustomSectionItem } from '../../types/resume';

export const CustomSectionForm: React.FC = () => {
  const {
    resumeData,
    addCustomSection,
    updateCustomSection,
    deleteCustomSection,
    reorderCustomSections,
    reorderCustomItems,
  } = useResume();
  const { customSections } = resumeData;

  const [draggedSectionIndex, setDraggedSectionIndex] = useState<number | null>(null);
  const [draggedItemState, setDraggedItemState] = useState<{ sectionId: string; itemIndex: number } | null>(null);

  const handleAddItem = (sectionId: string, currentItems: CustomSectionItem[]) => {
    const newItem: CustomSectionItem = {
      id: `csi-${Date.now()}`,
      title: 'New Custom Entry',
      subtitle: '',
      date: '',
      description: ''
    };
    updateCustomSection(sectionId, { items: [...currentItems, newItem] });
  };

  const handleUpdateItem = (
    sectionId: string,
    currentItems: CustomSectionItem[],
    itemId: string,
    field: keyof CustomSectionItem,
    value: string
  ) => {
    const updated = currentItems.map(item => item.id === itemId ? { ...item, [field]: value } : item);
    updateCustomSection(sectionId, { items: updated });
  };

  const handleDeleteItem = (sectionId: string, currentItems: CustomSectionItem[], itemId: string) => {
    const updated = currentItems.filter(item => item.id !== itemId);
    updateCustomSection(sectionId, { items: updated });
  };

  // Section Drag & Drop
  const handleSectionDragStart = (e: React.DragEvent, index: number) => {
    e.stopPropagation();
    setDraggedSectionIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSectionDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleSectionDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedSectionIndex !== null && draggedSectionIndex !== dropIndex) {
      reorderCustomSections(draggedSectionIndex, dropIndex);
    }
    setDraggedSectionIndex(null);
  };

  // Item Drag & Drop
  const handleItemDragStart = (e: React.DragEvent, sectionId: string, itemIndex: number) => {
    e.stopPropagation();
    setDraggedItemState({ sectionId, itemIndex });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleItemDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleItemDrop = (e: React.DragEvent, sectionId: string, dropIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedItemState && draggedItemState.sectionId === sectionId && draggedItemState.itemIndex !== dropIndex) {
      reorderCustomItems(sectionId, draggedItemState.itemIndex, dropIndex);
    }
    setDraggedItemState(null);
  };

  return (
    <div className="form-section">
      <div className="form-section-header between">
        <div>
          <h2 className="flex-align"><Layers className="section-icon" /> Custom Resume Sections (e.g. Soft Skills)</h2>
          <p>Add custom headings like Soft Skills, Publications, Speaking, or Awards. Drag sections and items to reorder.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={addCustomSection}>
          <Plus size={16} /> Add Custom Section
        </button>
      </div>

      {customSections.length === 0 ? (
        <div className="empty-state">
          <Layers size={36} />
          <p>No custom sections created yet.</p>
          <button className="btn btn-primary btn-sm" onClick={addCustomSection}>
            <Plus size={16} /> Create Custom Section
          </button>
        </div>
      ) : (
        <div className="accordion-list">
          {customSections.map((sec, secIndex) => (
            <div
              key={sec.id}
              className={`card-item ${draggedSectionIndex === secIndex ? 'dragging' : ''}`}
              draggable
              onDragStart={(e) => handleSectionDragStart(e, secIndex)}
              onDragOver={handleSectionDragOver}
              onDrop={(e) => handleSectionDrop(e, secIndex)}
            >
              <div className="card-item-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                  <span className="drag-handle" style={{ cursor: 'grab', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Drag section to reorder">
                    <GripVertical size={18} />
                  </span>
                  <input
                    type="text"
                    className="input-field category-name-input"
                    value={sec.sectionTitle}
                    onChange={(e) => updateCustomSection(sec.id, { sectionTitle: e.target.value })}
                    placeholder="Section Title (e.g. Soft Skills or Publications)"
                  />
                </div>

                <div className="card-item-actions">
                  {secIndex > 0 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderCustomSections(secIndex, secIndex - 1)}
                      title="Move Section Up"
                    >
                      <ChevronUp size={16} />
                    </button>
                  )}
                  {secIndex < customSections.length - 1 && (
                    <button
                      className="icon-btn"
                      onClick={() => reorderCustomSections(secIndex, secIndex + 1)}
                      title="Move Section Down"
                    >
                      <ChevronDown size={16} />
                    </button>
                  )}
                  <button
                    className="icon-btn danger"
                    onClick={() => deleteCustomSection(sec.id)}
                    title="Delete Entire Section"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="custom-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
                {sec.items.map((item, itemIndex) => (
                  <div
                    key={item.id}
                    className="custom-item-box"
                    style={{
                      background: '#0f172a',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #1e293b'
                    }}
                    draggable
                    onDragStart={(e) => handleItemDragStart(e, sec.id, itemIndex)}
                    onDragOver={handleItemDragOver}
                    onDrop={(e) => handleItemDrop(e, sec.id, itemIndex)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="drag-handle" style={{ cursor: 'grab', color: '#64748b', display: 'flex', alignItems: 'center' }} title="Drag item to reorder">
                          <GripVertical size={16} />
                        </span>
                        <strong style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>{item.title || `Item #${itemIndex + 1}`}</strong>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {itemIndex > 0 && (
                          <button
                            type="button"
                            className="icon-btn"
                            onClick={() => reorderCustomItems(sec.id, itemIndex, itemIndex - 1)}
                            title="Move Item Up"
                          >
                            <ChevronUp size={14} />
                          </button>
                        )}
                        {itemIndex < sec.items.length - 1 && (
                          <button
                            type="button"
                            className="icon-btn"
                            onClick={() => reorderCustomItems(sec.id, itemIndex, itemIndex + 1)}
                            title="Move Item Down"
                          >
                            <ChevronDown size={14} />
                          </button>
                        )}
                        <button
                          type="button"
                          className="btn btn-danger btn-xs"
                          onClick={() => handleDeleteItem(sec.id, sec.items, item.id)}
                          title="Remove Item"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="form-grid">
                      <div className="form-group">
                        <label>Item Title *</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g. Passion for Growth"
                          value={item.title}
                          onChange={(e) => handleUpdateItem(sec.id, sec.items, item.id, 'title', e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Subtitle / Organization (Optional)</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g. Core Strength"
                          value={item.subtitle || ''}
                          onChange={(e) => handleUpdateItem(sec.id, sec.items, item.id, 'subtitle', e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Date / Year (Optional)</label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="e.g. 2024"
                          value={item.date || ''}
                          onChange={(e) => handleUpdateItem(sec.id, sec.items, item.id, 'date', e.target.value)}
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Description (Optional)</label>
                        <textarea
                          className="textarea-field"
                          rows={2}
                          placeholder="Add description..."
                          value={item.description}
                          onChange={(e) => handleUpdateItem(sec.id, sec.items, item.id, 'description', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  className="btn btn-secondary btn-xs"
                  onClick={() => handleAddItem(sec.id, sec.items)}
                  style={{ marginTop: '4px' }}
                >
                  <Plus size={14} /> Add Item to {sec.sectionTitle}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
