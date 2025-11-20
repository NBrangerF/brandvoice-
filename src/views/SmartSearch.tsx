import React, { useState, useMemo, useEffect } from 'react';
import { useBrandAsset } from '../context/BrandAssetContext';
import { Search, Sparkles, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { Section } from '../data';
import { InsightCard } from '../components/InsightCard';

// Category definitions with colors
const CATEGORIES = [
  { id: '【观点/理念】', label: 'Theory', icon: '💡', color: 'blue' },
  { id: '【故事/案例】', label: 'Story', icon: '📖', color: 'purple' },
  { id: '【方法/干货】', label: 'Method', icon: '🛠️', color: 'green' },
  { id: '【资讯/事实】', label: 'Fact', icon: '📊', color: 'orange' },
] as const;

interface SearchResult {
  section: Section;
  priority: number;
  matchType: 'tag' | 'quote' | 'content';
}

interface SmartSearchProps {
  initialTag?: string | null;
  onTagCleared?: () => void;
  onReadDocument?: (documentId: string, sectionId?: string) => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ initialTag, onReadDocument }) => {
  const { getAllSections } = useBrandAsset();
  const sections = getAllSections();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Auto-execute search if initialTag is provided
  useEffect(() => {
    if (initialTag) {
      setSearchQuery(initialTag);
    }
  }, [initialTag]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    sections.forEach(section => section.tags.forEach((tag: string) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [sections]);

  // Smart tag suggestions based on search query
  const suggestedTags = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allTags.filter((tag: string) => tag.toLowerCase().includes(query));
  }, [searchQuery, allTags]);

  // Priority-based search
  const searchResults = useMemo((): SearchResult[] => {
    if (!searchQuery.trim() && !selectedCategory) return [];

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    sections.forEach(section => {
      // Category filter
      if (selectedCategory && section.category !== selectedCategory) {
        return;
      }

      if (!searchQuery.trim()) {
        // If only category is selected, show all sections in that category
        results.push({ section, priority: 0, matchType: 'content' });
        return;
      }

      // Priority 1: Tag match
      const tagMatch = section.tags.some((tag: string) => tag.toLowerCase().includes(query));
      if (tagMatch) {
        results.push({ section, priority: 3, matchType: 'tag' });
        return;
      }

      // Priority 2: Quote match
      const quoteMatch = section.quotes.some((quote: string) => quote.toLowerCase().includes(query));
      if (quoteMatch) {
        results.push({ section, priority: 2, matchType: 'quote' });
        return;
      }

      // Priority 3: Content/Insight match
      const contentMatch = 
        section.title.toLowerCase().includes(query) ||
        section.content.toLowerCase().includes(query) ||
        section.insight.toLowerCase().includes(query);
      
      if (contentMatch) {
        results.push({ section, priority: 1, matchType: 'content' });
      }
    });

    // Sort by priority (highest first)
    return results.sort((a, b) => b.priority - a.priority);
  }, [searchQuery, selectedCategory, sections]);

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  const isSearchActive = searchQuery.trim() !== '' || selectedCategory !== null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Smart Search</h1>
        <p className="text-slate-500 mt-2">Intelligent knowledge retrieval with priority-based filtering.</p>
      </div>

      {/* Large Omni-Search Bar */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
          <input 
            type="text"
            placeholder="搜索标签、金句或内容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-16 pr-6 py-5 text-lg bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        {/* Smart Tag Suggestions */}
        {suggestedTags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-blue-200/50">
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-blue-900">
              <Sparkles size={16} />
              <span>相关标签推荐</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-white hover:bg-blue-600 text-blue-700 hover:text-white rounded-lg text-sm font-medium transition-all border border-blue-200 hover:border-blue-600 shadow-sm"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Category Preview (Default View) */}
      {!isSearchActive && (
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">按类别浏览</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => {
              const count = sections.filter(s => s.category === cat.id).length;
              const colors = {
                blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
                purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
                green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
                orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
              };
              
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={clsx(
                    'p-6 rounded-xl text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-left group',
                    `bg-gradient-to-br ${colors[cat.color]}`
                  )}
                >
                  <div className="text-4xl mb-3">{cat.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{cat.label}</h3>
                  <p className="text-white/80 text-sm mb-3">{cat.id.replace(/[【】]/g, '')}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{count} 章</span>
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Results */}
      {isSearchActive && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">
              {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} Found
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Clear Category Filter
              </button>
            )}
          </div>

          {/* Result Cards - Using InsightCard component */}
          <div className="space-y-4">
            {searchResults.map((result, index) => (
              <InsightCard
                key={index}
                section={result.section}
                onReadDocument={onReadDocument}
                onTagClick={handleTagClick}
                showExcerpt={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
