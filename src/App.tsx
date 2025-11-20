import { useState } from 'react';
import { BrandAssetProvider, useBrandAsset } from './context/BrandAssetContext';
import { Layout } from './components/Layout';
import { View } from './components/Sidebar';
import { Dashboard } from './views/Dashboard';
import { InspirationWall } from './views/InspirationWall';
import { SmartSearch } from './views/SmartSearch';
import { LibraryView } from './views/LibraryView';
import { DocumentReader } from './views/DocumentReader';
import { KnowledgeData } from './data';

function AppContent() {
  const { documents } = useBrandAsset();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedDocument, setSelectedDocument] = useState<KnowledgeData | null>(null);
  const [targetSectionId, setTargetSectionId] = useState<string | null>(null);
  const [searchTag, setSearchTag] = useState<string | null>(null);

  const handleSelectDocument = (doc: KnowledgeData) => {
    setSelectedDocument(doc);
    setTargetSectionId(null);
  };

  const handleReadDocument = (documentId: string, sectionId?: string) => {
    const doc = documents.find(d => d.document.id === documentId);
    if (doc) {
      setSelectedDocument(doc);
      setTargetSectionId(sectionId || null);
    }
  };

  const handleTagSearch = (tag: string) => {
    setSearchTag(tag);
    setCurrentView('search');
  };

  const handleBackToDashboard = () => {
    setSelectedDocument(null);
    setTargetSectionId(null);
    setCurrentView('dashboard');
  };

  // If a document is selected, show the reader
  if (selectedDocument) {
    return (
      <DocumentReader 
        document={selectedDocument} 
        onBack={handleBackToDashboard}
        initialSectionId={targetSectionId}
      />
    );
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard 
            onSelectDocument={handleSelectDocument}
            onReadDocument={handleReadDocument}
            onTagClick={handleTagSearch}
          />
        );
      case 'library':
        return <LibraryView onSelectDocument={handleSelectDocument} />;
      case 'inspiration':
        return (
          <InspirationWall 
            onReadDocument={handleReadDocument}
            onTagClick={handleTagSearch}
          />
        );
      case 'search':
        return (
          <SmartSearch 
            initialTag={searchTag}
            onTagCleared={() => setSearchTag(null)}
            onReadDocument={handleReadDocument}
          />
        );
      default:
        return (
          <Dashboard 
            onSelectDocument={handleSelectDocument}
            onReadDocument={handleReadDocument}
            onTagClick={handleTagSearch}
          />
        );
    }
  };

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView}>
      {renderView()}
    </Layout>
  );
}

function App() {
  return (
    <BrandAssetProvider>
      <AppContent />
    </BrandAssetProvider>
  );
}

export default App;
