import React, { useState, useEffect, useRef } from 'react';
import { useBrandAsset } from '../context/BrandAssetContext';
import { FileText, Quote, Database, Upload, Copy, Check, Calendar, User, ArrowRight, ExternalLink } from 'lucide-react';
import { KnowledgeData, getInterviewees } from '../data';

interface DashboardProps {
  onSelectDocument: (doc: KnowledgeData) => void;
  onReadDocument?: (documentId: string, sectionId?: string) => void;
  onTagClick?: (tag: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectDocument }) => {
  const { documents, addDocument, getTotalChapters, getTotalQuotes, getRandomQuote } = useBrandAsset();
  const [dailyQuote, setDailyQuote] = useState<{ text: string; speaker: string; source: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load random quote on mount
  useEffect(() => {
    const quote = getRandomQuote();
    setDailyQuote(quote);
  }, [documents.length]); // Re-run when documents change

  const handleCopy = () => {
    if (dailyQuote) {
      navigator.clipboard.writeText(`"${dailyQuote.text}" - ${dailyQuote.speaker}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const json = JSON.parse(text) as KnowledgeData;

      if (!json.document || !json.sections) {
        alert('Invalid JSON structure. File must contain "document" and "sections" fields.');
        return;
      }

      addDocument(json);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      alert(`Successfully imported: ${json.document.title}`);
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      alert('Failed to parse JSON file. Please check the file format.');
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Get 5 most recent documents
  const recentDocuments = [...documents].reverse().slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Overview of your brand knowledge assets.</p>
      </div>

      {/* Row 1: Core Stats - 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Archives */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Database size={24} />
            </div>
            <span className="text-3xl font-bold text-blue-900">{documents.length}</span>
          </div>
          <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wider">录音归档</h3>
          <p className="text-xs text-blue-700 mt-1">Uploaded documents</p>
        </div>

        {/* Total Chapters */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <FileText size={24} />
            </div>
            <span className="text-3xl font-bold text-purple-900">{getTotalChapters()}</span>
          </div>
          <h3 className="text-sm font-semibold text-purple-900 uppercase tracking-wider">知识切片</h3>
          <p className="text-xs text-purple-700 mt-1">Knowledge sections</p>
        </div>

        {/* Golden Quotes */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Quote size={24} />
            </div>
            <span className="text-3xl font-bold text-amber-900">{getTotalQuotes()}</span>
          </div>
          <h3 className="text-sm font-semibold text-amber-900 uppercase tracking-wider">金句总数</h3>
          <p className="text-xs text-amber-700 mt-1">Inspirational insights</p>
        </div>
      </div>

      {/* Row 2: Daily Inspiration & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Daily Spark */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 min-h-[280px] flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Quote size={20} className="text-blue-600" />
            每日灵感
          </h2>
          {dailyQuote ? (
            <div className="flex-1 flex flex-col">
              <blockquote className="text-xl font-serif italic text-slate-800 leading-relaxed mb-6 flex-1">
                "{dailyQuote.text}"
              </blockquote>
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{dailyQuote.speaker}</p>
                    <p className="text-xs text-slate-500">来源：{dailyQuote.source}</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-700"
                  >
                    {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div className="space-y-3">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <Quote size={32} className="text-slate-400" />
                </div>
                <p className="text-slate-500">Upload your first archive to see inspiration.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Quick Actions / Upload */}
        <div 
          className="group bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all cursor-pointer border-2 border-blue-500 hover:border-blue-400"
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Upload size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">添加新资产</h2>
          <p className="text-blue-100 text-sm max-w-xs mb-6">
            导入结构化分析文件，扩充您的知识库
          </p>
          
          {/* Step 1: Link to AI Studio */}
          <a
            href="https://ai.studio/apps/drive/1yOlFqI38GenAHjbXLaTlBGWZASx_TJ0b"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-3 bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-white/50 rounded-lg text-white font-medium text-sm transition-all backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} />
            <span>前往 AI Studio 生成分析文件</span>
          </a>
          
          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/60 text-xs">或</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>
          
          {/* Step 2: Upload Existing File */}
          <div 
            onClick={triggerUpload}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white font-medium text-sm transition-colors cursor-pointer text-center"
          >
            <div className="flex items-center justify-center gap-2">
              <Upload size={18} />
              <span>点击上传 JSON 文件</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Archives */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-900 mb-4">最近更新</h2>
        {recentDocuments.length > 0 ? (
          <div className="space-y-3">
            {recentDocuments.map((doc, index) => (
              <div 
                key={index}
                onClick={() => onSelectDocument(doc)}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group border border-slate-100 hover:border-blue-200"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {doc.document.title}
                  </h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{doc.document.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{getInterviewees(doc.document)}</span>
                    </div>
                    <span className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                      <span>{doc.sections.length} 章节</span>
                    </span>
                  </div>
                </div>
                <ArrowRight className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database size={32} className="text-slate-400" />
            </div>
            <p className="text-slate-500 mb-4">No documents uploaded yet.</p>
            <button 
              onClick={triggerUpload}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Upload Your First Document
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
