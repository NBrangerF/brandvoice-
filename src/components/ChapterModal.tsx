import React from 'react';
import { X, Calendar, User, Tag } from 'lucide-react';
import { Section } from '../data';
import ReactMarkdown from 'react-markdown';

interface ChapterModalProps {
  section: Section;
  isOpen: boolean;
  onClose: () => void;
}

export const ChapterModal: React.FC<ChapterModalProps> = ({ section, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                {section.category.replace(/[【】]/g, '')}
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                {section.title}
              </h2>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{section.context.documentDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{section.context.documentInterviewee}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {/* Core Insight */}
          <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
            <h3 className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-2">
              Core Insight
            </h3>
            <p className="text-amber-900 leading-relaxed">
              {section.insight}
            </p>
          </div>

          {/* Key Points */}
          {section.keyPoints && section.keyPoints.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                Key Points
              </h3>
              <ul className="space-y-2">
                {section.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Content */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
              Full Content
            </h3>
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown>{section.content}</ReactMarkdown>
            </div>
          </div>

          {/* Quotes */}
          {section.quotes && section.quotes.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                Golden Quotes
              </h3>
              <div className="space-y-3">
                {section.quotes.map((quote, idx) => (
                  <blockquote key={idx} className="border-l-4 border-blue-300 pl-4 italic text-slate-700 bg-blue-50/50 py-3 rounded-r">
                    "{quote}"
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Tag size={16} />
              Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {section.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 rounded-full text-sm font-medium transition-colors cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
