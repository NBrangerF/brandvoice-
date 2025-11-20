import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Calendar, User, MapPin } from 'lucide-react';
import { KnowledgeData, getInterviewees } from '../data';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';
import { ChapterDetailModal } from '../components/ChapterDetailModal';

interface DocumentReaderProps {
  document: KnowledgeData;
  onBack: () => void;
  initialSectionId?: string | null;
}

// Category color mapping
const getCategoryColor = (category: string) => {
  if (category.includes('观点') || category.includes('理念')) return 'blue';
  if (category.includes('故事') || category.includes('案例')) return 'purple';
  if (category.includes('方法') || category.includes('干货')) return 'green';
  if (category.includes('资讯') || category.includes('事实')) return 'orange';
  return 'slate';
};

// Fuzzy match function to compare H2 text with section titles
const fuzzyMatch = (h2Text: string, sectionTitle: string): boolean => {
  const normalize = (str: string) => str.toLowerCase().trim().replace(/\s+/g, ' ');
  const normalizedH2 = normalize(h2Text);
  const normalizedTitle = normalize(sectionTitle);
  
  // Exact match or contains
  return normalizedH2 === normalizedTitle || 
         normalizedH2.includes(normalizedTitle) || 
         normalizedTitle.includes(normalizedH2);
};

export const DocumentReader: React.FC<DocumentReaderProps> = ({ document, onBack, initialSectionId }) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<any | null>(null);
  const readerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to initial section if provided
  useEffect(() => {
    if (initialSectionId) {
      setTimeout(() => {
        scrollToSection(initialSectionId);
      }, 100);
    }
  }, [initialSectionId]);

  const scrollToSection = (sectionId: string) => {
    const element = window.document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveSectionId(sectionId);
    }
  };

  // Generate section IDs if not present
  const sectionsWithIds = document.sections.map((section, index) => ({
    ...section,
    section_id: section.section_id || `sec_${String(index + 1).padStart(3, '0')}`,
  }));

  // Custom H2 renderer with fuzzy matching and ID assignment
  const CustomH2: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
    const h2Text = typeof children === 'string' ? children : 
                   React.Children.toArray(children).join('');
    
    // Find matching section
    const matchedSection = sectionsWithIds.find(section => 
      fuzzyMatch(h2Text, section.title)
    );

    const isActive = matchedSection && activeSectionId === matchedSection.section_id;

    return (
      <h2 
        id={matchedSection?.section_id}
        className={clsx(
          'text-3xl font-bold font-serif mb-6',
          isActive 
            ? 'text-blue-600 bg-yellow-100 inline-block px-3 py-1 rounded' 
            : 'text-slate-900'
        )}
      >
        {children}
      </h2>
    );
  };

  // Determine content source
  const contentToRender = document.document.fullCorrectedContent || 
    document.sections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n');

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Top Header */}
      <div className="border-b border-slate-200 p-4 flex items-center justify-between bg-white">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>
        <div className="text-sm text-slate-500">
          {document.sections.length} 章节
        </div>
      </div>

      {/* Split-Pane Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: The Reader (65%) */}
        <div ref={readerRef} className="w-[65%] overflow-y-auto bg-white">
          <div className="max-w-4xl mx-auto px-12 py-8">
            <ReactMarkdown
              components={{
                h2: CustomH2,
              }}
              className="prose prose-slate prose-lg max-w-none"
            >
              {contentToRender}
            </ReactMarkdown>
          </div>
        </div>

        {/* Right Panel: Insight Navigator (35%) */}
        <div className="w-[35%] bg-slate-50 border-l border-slate-200 overflow-y-auto">
          <div className="sticky top-0 bg-slate-50 border-b border-slate-200 p-6 z-10">
            <h1 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
              {document.document.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{document.document.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User size={14} />
                <span>{getInterviewees(document.document)}</span>
              </div>
            </div>
          </div>

          {/* Insight Cards Stack */}
          <div className="p-4 space-y-4">
            {sectionsWithIds.map((section, index) => {
              const color = getCategoryColor(section.category);
              const isActive = activeSectionId === section.section_id;
              
              const colorClasses = {
                blue: 'border-blue-200 bg-blue-50 text-blue-900',
                purple: 'border-purple-200 bg-purple-50 text-purple-900',
                green: 'border-green-200 bg-green-50 text-green-900',
                orange: 'border-orange-200 bg-orange-50 text-orange-900',
                slate: 'border-slate-200 bg-slate-50 text-slate-900',
              };

              return (
                <div
                  key={section.section_id}
                  onClick={() => setSelectedSection(section)}
                  className={clsx(
                    'p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-0.5',
                    isActive ? 'shadow-lg ring-2 ring-blue-500 border-blue-500' : 'bg-white border-slate-200 hover:border-slate-300'
                  )}
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-2">
                    <span className={clsx(
                      'text-xs font-bold px-2.5 py-0.5 rounded-full',
                      colorClasses[color]
                    )}>
                      {section.category.replace(/[【】]/g, '')}
                    </span>
                    <div className="flex items-center gap-1">
                      {/* Locate Icon - Secondary Action */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToSection(section.section_id!);
                        }}
                        className="p-1 hover:bg-blue-100 rounded text-slate-400 hover:text-blue-600 transition-colors"
                        title="Scroll to section"
                      >
                        <MapPin size={14} />
                      </button>
                      <span className="text-xs text-slate-400 font-medium">
                        {index + 1}/{sectionsWithIds.length}
                      </span>
                    </div>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-tight">
                    {section.title}
                  </h3>

                  {/* Card Body - Excerpt or Insight */}
                  <p className="text-xs text-slate-600 mb-2 line-clamp-2 leading-relaxed">
                    {section.excerpt || section.insight}
                  </p>

                  {/* Card Footer - Tags */}
                  <div className="flex flex-wrap gap-1">
                    {section.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                        #{tag}
                      </span>
                    ))}
                    {section.tags.length > 2 && (
                      <span className="text-xs px-2 py-0.5 text-slate-400">
                        +{section.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chapter Detail Modal */}
      <ChapterDetailModal
        section={selectedSection!}
        isOpen={selectedSection !== null}
        onClose={() => setSelectedSection(null)}
        onJumpToSource={(_docId, secId) => {
          // Already in the doc, just scroll
          if (secId) scrollToSection(secId);
          setSelectedSection(null);
        }}
      />
    </div>
  );
};
