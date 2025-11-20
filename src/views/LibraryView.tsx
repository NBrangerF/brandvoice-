import React from 'react';
import { useBrandAsset } from '../context/BrandAssetContext';
import { Library, Calendar, User, BookOpen, Trash2 } from 'lucide-react';
import { KnowledgeData, getInterviewees } from '../data';
import clsx from 'clsx';

interface LibraryViewProps {
  onSelectDocument: (doc: KnowledgeData) => void;
}

const getCategoryColor = (category: string) => {
  if (category.includes('观点') || category.includes('理念')) return 'blue';
  if (category.includes('故事') || category.includes('案例')) return 'purple';
  if (category.includes('方法') || category.includes('干货')) return 'green';
  if (category.includes('资讯') || category.includes('事实')) return 'orange';
  return 'slate';
};

export const LibraryView: React.FC<LibraryViewProps> = ({ onSelectDocument }) => {
  const { documents, deleteDocument } = useBrandAsset();

  if (documents.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
            <Library size={40} className="text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">资料库为空</h2>
          <p className="text-slate-500">上传您的第一份 JSON 文档开始使用。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">资料库</h1>
        <p className="text-slate-500 mt-2">
          全部归档文档（{documents.length} 份）
        </p>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc, index) => {
          // Get category distribution
          const categoryCounts = doc.sections.reduce((acc, section) => {
            acc[section.category] = (acc[section.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
          
          const topCategory = Object.keys(categoryCounts).sort(
            (a, b) => categoryCounts[b] - categoryCounts[a]
          )[0] || '';

          const color = getCategoryColor(topCategory);
          
          const colorClasses = {
            blue: 'from-blue-50 to-blue-100 border-blue-200',
            purple: 'from-purple-50 to-purple-100 border-purple-200',
            green: 'from-green-50 to-green-100 border-green-200',
            orange: 'from-orange-50 to-orange-100 border-orange-200',
            slate: 'from-slate-50 to-slate-100 border-slate-200',
          };

          return (
            <div
              key={index}
              className={clsx(
                'bg-gradient-to-br rounded-2xl p-6 border shadow-sm hover:shadow-lg transition-all group relative',
                colorClasses[color]
              )}
            >
              {/* Delete Button - Top Right */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const confirmed = window.confirm(
                    `确认要删除「${doc.document.title}」吗？此操作无法撤销。`
                  );
                  if (confirmed) {
                    deleteDocument(doc.document.id);
                  }
                }}
                className="absolute top-4 right-4 p-2 bg-white/60 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
                title="删除文档"
              >
                <Trash2 size={16} />
              </button>

              {/* Document Icon & Meta */}
              <div
                className="cursor-pointer"
                onClick={() => onSelectDocument(doc)}
              >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center shadow-sm">
                  <BookOpen size={24} className="text-slate-700" />
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-white/60 px-2 py-1 rounded-md">
                    {doc.sections.length} 章节
                </span>
              </div>

              {/* Document Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                {doc.document.title}
              </h3>

              {/* Document Summary */}
              <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                {doc.document.summary}
              </p>

              {/* Document Info */}
              <div className="flex flex-col gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{doc.document.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User size={12} />
                  <span>{getInterviewees(doc.document)}</span>
                </div>
              </div>

              {/* Read Button */}
              <div className="mt-4 pt-4 border-t border-white/50">
                <button className="w-full py-2 bg-white/80 hover:bg-white rounded-lg font-medium text-sm text-slate-700 hover:text-blue-600 transition-colors">
                  阅读文档 →
                </button>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
