import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { KnowledgeData, getInterviewees } from '../data';

interface BrandAssetContextType {
  documents: KnowledgeData[];
  addDocument: (document: KnowledgeData) => void;
  deleteDocument: (documentId: string) => void;
  exportBackup: () => void;
  restoreBackup: (data: KnowledgeData | KnowledgeData[]) => void;
  getTotalChapters: () => number;
  getTotalQuotes: () => number;
  getAllSections: () => any[];
  getRandomQuote: () => { text: string; speaker: string; source: string } | null;
}

const BrandAssetContext = createContext<BrandAssetContextType | undefined>(undefined);

const STORAGE_KEY = 'brand_asset_documents';

export const BrandAssetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<KnowledgeData[]>(() => {
    // Load from localStorage on init
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
    return [];
  });

  // Persist to localStorage whenever documents change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [documents]);

  const addDocument = (document: KnowledgeData) => {
    // Validate the document structure
    if (!document.document || !document.sections) {
      throw new Error('Invalid document structure: must have "document" and "sections" fields');
    }
    setDocuments(prev => [...prev, document]);
  };

  const deleteDocument = (documentId: string) => {
    setDocuments(prev => prev.filter(doc => doc.document.id !== documentId));
  };

  const getTotalChapters = () => {
    return documents.reduce((sum, doc) => sum + doc.sections.length, 0);
  };

  const getTotalQuotes = () => {
    return documents.reduce((sum, doc) => {
      return sum + doc.sections.reduce((quoteSum, section) => quoteSum + section.quotes.length, 0);
    }, 0);
  };

  const getAllSections = () => {
    return documents.flatMap(doc => doc.sections);
  };

  const getRandomQuote = () => {
    const allQuotes: { text: string; speaker: string; source: string }[] = [];
    
    documents.forEach(doc => {
      doc.sections.forEach(section => {
        section.quotes.forEach(quote => {
          allQuotes.push({
            text: quote,
            speaker: getInterviewees(doc.document),
            source: doc.document.title
          });
        });
      });
    });

    if (allQuotes.length === 0) return null;
    return allQuotes[Math.floor(Math.random() * allQuotes.length)];
  };

  const exportBackup = () => {
    const dataStr = JSON.stringify(documents, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    // Format: BrandVoice_Backup_YYYY-MM-DD.json
    const date = new Date();
    const filename = `BrandVoice_Backup_${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}.json`;
    
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const restoreBackup = (data: KnowledgeData | KnowledgeData[]) => {
    // Check if it's a backup array or single document
    if (Array.isArray(data)) {
      // It's a backup - restore entire array
      setDocuments(data);
      alert(`备份已成功恢复！已加载 ${data.length} 份文档。`);
    } else {
      // It's a single document - add to existing
      addDocument(data);
    }
  };

  const value = {
    documents,
    addDocument,
    deleteDocument,
    exportBackup,
    restoreBackup,
    getTotalChapters,
    getTotalQuotes,
    getAllSections,
    getRandomQuote,
  };

  return (
    <BrandAssetContext.Provider value={value}>
      {children}
    </BrandAssetContext.Provider>
  );
};

export const useBrandAsset = () => {
  const context = useContext(BrandAssetContext);
  if (context === undefined) {
    throw new Error('useBrandAsset must be used within a BrandAssetProvider');
  }
  return context;
};
