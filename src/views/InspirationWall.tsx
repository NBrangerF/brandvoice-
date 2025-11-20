import React, { useState } from 'react';
import { useBrandAsset } from '../context/BrandAssetContext';
import { Section, getInterviewees } from '../data';
import { ChapterDetailModal } from '../components/ChapterDetailModal';
import { Waves, LayoutGrid } from 'lucide-react';
import clsx from 'clsx';

interface QuoteWithSource {
  text: string;
  section: Section;
  speaker: string;
}

interface InspirationWallProps {
  onReadDocument?: (documentId: string, sectionId?: string) => void;
  onTagClick?: (tag: string) => void;
}

export const InspirationWall: React.FC<InspirationWallProps> = ({ onReadDocument, onTagClick }) => {
  const { documents } = useBrandAsset();
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [viewMode, setViewMode] = useState<'flow' | 'grid'>('flow');

  // Flatten all quotes with their full source section
  const allQuotes: QuoteWithSource[] = documents.flatMap(doc => 
    doc.sections.flatMap(section => 
      section.quotes.map((quote: string) => ({
        text: quote,
        section: section,
        speaker: getInterviewees(doc.document)
      }))
    )
  );

  if (allQuotes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-4xl">💭</span>
          </div>
          <h2 className="text-xl font-semibold text-slate-700">暂无灵感</h2>
          <p className="text-slate-500">上传文档后，金句将汇聚于此。</p>
        </div>
      </div>
    );
  }

  // Split quotes into 3 rows for marquee effect
  const rowCount = 3;
  const rows = Array.from({ length: rowCount }, (_, i) => 
    allQuotes.filter((_, index) => index % rowCount === i)
  );

  // Minimalist Quote Card Component (reused in both modes)
  const QuoteCard: React.FC<{ quote: QuoteWithSource }> = ({ quote }) => (
    <div
      onClick={() => setSelectedSection(quote.section)}
      className="flex-shrink-0 w-96 bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-200 transition-all cursor-pointer group"
    >
      {/* Quote Text - Large Serif */}
      <blockquote className="text-2xl font-serif italic text-slate-800 leading-relaxed mb-6 line-clamp-4">
        "{quote.text}"
      </blockquote>

      {/* Speaker - Small & Subtle */}
      <p className="text-sm font-medium text-slate-500 text-right group-hover:text-blue-600 transition-colors">
        — {quote.speaker}
      </p>
    </div>
  );

  return (
    <>
      <div className="space-y-4 overflow-hidden">
        {/* Header with View Mode Toggle */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">灵感墙</h1>
            <p className="text-slate-500 mt-2">
              汇聚品牌核心金句与灵感，共 {allQuotes.length} 条
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('flow')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium',
                viewMode === 'flow'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
              title="流动模式"
            >
              <Waves size={18} />
              <span className="text-sm">流动</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-md transition-all font-medium',
                viewMode === 'grid'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              )}
              title="网格模式"
            >
              <LayoutGrid size={18} />
              <span className="text-sm">网格</span>
            </button>
          </div>
        </div>

        {/* Flow Mode - Marquee Rows */}
        {viewMode === 'flow' && (
          <div className="space-y-6 animate-fade-in">
            {rows.map((rowQuotes, rowIndex) => {
              // Duplicate quotes for seamless infinite scroll
              const duplicatedQuotes = [...rowQuotes, ...rowQuotes];
              const direction = rowIndex % 2 === 0 ? 'left-to-right' : 'right-to-left';
              const duration = rowIndex === 1 ? 45 : 60; // Middle row faster
              
              return (
                <div 
                  key={rowIndex}
                  className="relative overflow-hidden"
                  style={{ 
                    maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
                  }}
                >
                  <div 
                    className={`flex gap-6 ${direction === 'left-to-right' ? 'animate-scroll-left' : 'animate-scroll-right'} hover:pause-animation`}
                    style={{
                      animationDuration: `${duration}s`,
                    }}
                  >
                    {duplicatedQuotes.map((quote, index) => (
                      <QuoteCard key={`${rowIndex}-${index}`} quote={quote} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Grid Mode - Masonry Grid */}
        {viewMode === 'grid' && (
          <div className="px-6 animate-fade-in">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {allQuotes.map((quote, index) => (
                <div key={index} className="break-inside-avoid">
                  <QuoteCard quote={quote} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <ChapterDetailModal
        section={selectedSection!}
        isOpen={selectedSection !== null}
        onClose={() => setSelectedSection(null)}
        onJumpToSource={onReadDocument}
        onTagClick={onTagClick}
      />
    </>
  );
};
