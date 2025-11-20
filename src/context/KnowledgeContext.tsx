import React, { createContext, useContext, useState, ReactNode } from 'react';
import { KnowledgeData, initialData, Section } from '../data';

interface KnowledgeContextType {
  data: KnowledgeData;
  sections: Section[];
  getSection: (index: number) => Section | undefined;
}

const KnowledgeContext = createContext<KnowledgeContextType | undefined>(undefined);

export const KnowledgeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data] = useState<KnowledgeData>(initialData);

  const value = {
    data,
    sections: data.sections,
    getSection: (index: number) => data.sections[index],
  };

  return (
    <KnowledgeContext.Provider value={value}>
      {children}
    </KnowledgeContext.Provider>
  );
};

export const useKnowledge = () => {
  const context = useContext(KnowledgeContext);
  if (context === undefined) {
    throw new Error('useKnowledge must be used within a KnowledgeProvider');
  }
  return context;
};
