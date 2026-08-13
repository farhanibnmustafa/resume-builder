import React from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Header } from './components/Header';
import { FormEditor } from './components/Editor/FormEditor';
import { ResumePreview } from './components/Preview/ResumePreview';
import { ResizableSplitWorkspace } from './components/ResizableSplitWorkspace';

const MainWorkspace: React.FC = () => {
  const { viewMode } = useResume();

  return (
    <main className="studio-workspace">
      {viewMode === 'split' && <ResizableSplitWorkspace />}

      {viewMode === 'edit' && (
        <div className="workspace-edit-only">
          <FormEditor />
        </div>
      )}

      {viewMode === 'preview' && (
        <div className="workspace-preview-only">
          <ResumePreview />
        </div>
      )}
    </main>
  );
};

export function App() {
  return (
    <ResumeProvider>
      <div className="app-container">
        <Header />
        <MainWorkspace />
      </div>
    </ResumeProvider>
  );
}

export default App;
