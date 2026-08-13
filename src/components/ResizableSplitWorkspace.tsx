import React, { useState, useRef, useCallback, useEffect } from 'react';
import { FormEditor } from './Editor/FormEditor';
import { ResumePreview } from './Preview/ResumePreview';
import { GripVertical } from 'lucide-react';

export const ResizableSplitWorkspace: React.FC = () => {
  // Saved width percentage in localStorage or default to 48%
  const [leftWidth, setLeftWidth] = useState<number>(() => {
    const saved = localStorage.getItem('farhan_cv_split_width');
    return saved ? parseFloat(saved) : 48;
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - containerRect.left;
      const percentage = (relativeX / containerRect.width) * 100;

      // Clamp between 25% and 75%
      const clampedPercentage = Math.min(Math.max(percentage, 25), 75);
      setLeftWidth(clampedPercentage);
      localStorage.setItem('farhan_cv_split_width', clampedPercentage.toString());
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleResetSplit = () => {
    setLeftWidth(48);
    localStorage.setItem('farhan_cv_split_width', '48');
  };

  return (
    <div ref={containerRef} className={`workspace-split resizable ${isDragging ? 'is-resizing' : ''}`}>
      {/* Left Form Panel */}
      <div className="split-panel left-panel" style={{ width: `${leftWidth}%` }}>
        <FormEditor />
      </div>

      {/* Partition Resizer Divider Bar */}
      <div
        className="split-resizer"
        onMouseDown={handleMouseDown}
        onDoubleClick={handleResetSplit}
        title="Drag to resize panels | Double-click to reset 50/50"
      >
        <div className="resizer-handle">
          <GripVertical size={14} className="resizer-icon" />
        </div>
      </div>

      {/* Right Preview Panel */}
      <div className="split-panel right-panel" style={{ width: `${100 - leftWidth}%` }}>
        <ResumePreview />
      </div>
    </div>
  );
};
