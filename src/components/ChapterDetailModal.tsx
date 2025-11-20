import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, BookOpen, ArrowRight } from 'lucide-react';
import { Section } from '../data';
import clsx from 'clsx';

interface ChapterDetailModalProps {
  section: Section;
  isOpen: boolean;
  onClose: () => void;
  onJumpToSource?: (documentId: string, sectionId?: string) => void;
  onTagClick?: (tag: string) => void;
}

const getCategoryColor = (category: string) => {
  if (category.includes('观点') || category.includes('理念')) return 'blue';
  if (category.includes('故事') || category.includes('案例')) return 'purple';
  if (category.includes('方法') || category.includes('干货')) return 'green';
  if (category.includes('资讯') || category.includes('事实')) return 'orange';
  return 'slate';
};

export const ChapterDetailModal: React.FC<ChapterDetailModalProps> = ({
  section,
  isOpen,
  onClose,
  onJumpToSource,
  onTagClick,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const color = getCategoryColor(section.category);
  
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    purple: 'bg-purple-500 text-white',
    green: 'bg-green-500 text-white',
    orange: 'bg-orange-500 text-white',
    slate: 'bg-slate-500 text-white',
  };

  const handleJumpClick = () => {
    const sectionId = section.section_id || section.title;
    onJumpToSource?.(section.context.documentId, sectionId);
    onClose();
  };

  const handleTagClick = (tag: string) => {
    onTagClick?.(tag);
    onClose();
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 px-8 py-6 border-b border-slate-200">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 className="text-3xl font-bold text-slate-900 leading-tight flex-1">
              {section.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-500 hover:text-slate-900"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className={clsx(
              'px-4 py-1.5 rounded-full text-sm font-bold',
              colorClasses[color]
            )}>
              {section.category.replace(/[【】]/g, '')}
            </span>
            <span className="text-sm text-slate-500">
              {section.context.documentInterviewee}
            </span>
          </div>
        </div>

        {/* Body - Scrollable */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8">
          {/* Core Insight - Highlighted */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-xl p-6">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-3">
              💡 核心洞察
            </h3>
            <p className="text-xl font-serif text-amber-900 leading-relaxed italic">
              {section.insight}
            </p>
          </div>

          {/* Golden Quotes */}
          {section.quotes.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="text-lg">✨</span>
                金句 ({section.quotes.length})
              </h3>
              <div className="space-y-3">
                {section.quotes.map((quote, index) => (
                  <blockquote 
                    key={index}
                    className="pl-6 border-l-2 border-slate-300 text-slate-700 italic leading-relaxed"
                  >
                    "{quote}"
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {/* Key Points */}
          {section.keyPoints.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="text-lg">📌</span>
                关键要点
              </h3>
              <ul className="space-y-2">
                {section.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-blue-500 font-bold text-lg">•</span>
                    <span className="text-slate-700 leading-relaxed flex-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-8 py-6 border-t border-slate-200 space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {section.tags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagClick(tag)}
                className="px-3 py-1.5 bg-white hover:bg-blue-50 text-slate-600 hover:text-blue-700 rounded-lg text-sm font-medium transition-colors border border-slate-200 hover:border-blue-300"
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Action Button */}
          {onJumpToSource && (
            <button
              onClick={handleJumpClick}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl"
            >
              <BookOpen size={20} />
              <span>跳转至原文</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
