import React from 'react';
import { LayoutDashboard, Quote, Search, BookOpen, Library, Download } from 'lucide-react';
import clsx from 'clsx';
import { FileUpload } from './FileUpload';
import { useBrandAsset } from '../context/BrandAssetContext';

export type View = 'dashboard' | 'inspiration' | 'search' | 'library';

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { exportBackup, documents } = useBrandAsset();
  const navItems = [
    { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
    { id: 'library', label: '资料库', icon: Library },
    { id: 'inspiration', label: '灵感墙', icon: Quote },
    { id: 'search', label: '智能检索', icon: Search },
  ] as const;

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-200">
          <BookOpen size={20} />
        </div>
        <span className="font-bold text-lg text-slate-800 tracking-tight">BrandVoice</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-blue-50 text-blue-600 font-semibold shadow-sm" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon size={20} className={clsx("transition-colors", isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 space-y-3 border-t border-slate-100">
        <FileUpload />
        
        {/* Spacer */}
        <div className="h-px bg-slate-200 my-3"></div>
        
        {/* Backup Button */}
        <button
          onClick={exportBackup}
          disabled={documents.length === 0}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-600 hover:bg-green-50 hover:text-green-600 font-medium border border-slate-200 hover:border-green-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-600 disabled:hover:border-slate-200"
          title={documents.length === 0 ? '暂无数据可备份' : '下载全部文档备份'}
        >
          <Download size={20} />
          <span>数据备份</span>
        </button>
        
        <div className="text-xs text-slate-400 text-center font-medium pt-2">
          v1.2.0 • Brand Knowledge Asset
        </div>
      </div>
    </div>
  );
};
