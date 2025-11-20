import React from 'react';
import { BookOpen } from 'lucide-react';
import { Section } from '../data';
import clsx from 'clsx';

interface InsightCardProps {
  section: Section;
  onReadDocument?: (documentId: string, sectionId?: string) => void;
  onTagClick?: (tag: string) => void;
  showExcerpt?: boolean;
}

const getCategoryColor = (category: string) => {
  if (category.includes('观点') || category.includes('理念')) return 'blue';
  if (category.includes('故事') || category.includes('案例')) return 'purple';
  if (category.includes('方法') || category.includes('干货')) return 'green';
  if (category.includes('资讯') || category.includes('事实')) return 'orange';
  return 'slate';
};

export const InsightCard: React.FC<InsightCardProps> = ({ 
  section, 
  onReadDocument,
  onTagClick,
  showExcerpt = true 
}) => {
  const color = getCategoryColor(section.category);
  
  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50 text-blue-900',
    purple: 'border-purple-200 bg-purple-50 text-purple-900',
    green: 'border-green-200 bg-green-50 text-green-900',
    orange: 'border-orange-200 bg-orange-50 text-orange-900',
    slate: 'border-slate-200 bg-slate-50 text-slate-900',
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    onTagClick?.(tag);
  };

  const handleReadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const sectionId = section.section_id || section.title;
    onReadDocument?.(section.context.documentId, sectionId);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all">
      {/* Header with Category Badge and Read Button */}
      <div className="flex items-start justify-between mb-3">
        <span className={clsx(
          'text-xs font-bold px-3 py-1 rounded-full border',
          colorClasses[color]
        )}>
          {section.category.replace(/[【】]/g, '')}
        </span>
        
        {onReadDocument && (
          <button
            onClick={handleReadClick}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-slate-400 hover:text-blue-600 group"
            title="Read Full Context"
          >
            <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        )}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-2">
        {section.title}
      </h3>

      {/* Excerpt or Insight */}
      {showExcerpt && (
        <p className="text-slate-600 mb-4 line-clamp-2">
          {section.excerpt || section.insight}
        </p>
      )}

      {/* Tags - Clickable */}
      <div className="flex flex-wrap gap-2">
        {section.tags.map(tag => (
          <span
            key={tag}
            onClick={(e) => onTagClick ? handleTagClick(e, tag) : undefined}
            className={clsx(
              'text-xs px-2 py-1 rounded-md',
              onTagClick 
                ? 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-colors'
                : 'bg-slate-50 text-slate-500'
            )}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
