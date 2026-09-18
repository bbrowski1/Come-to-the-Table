import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, BookMarked, X, Sparkles } from 'lucide-react';
import { Topic, ScreenRoute } from '../types';
import { TopHeader } from './TopHeader';

interface PassageSearchScreenProps {
  topics: Topic[];
  onNavigate: (route: ScreenRoute) => void;
}

export const PassageSearchScreen: React.FC<PassageSearchScreenProps> = ({
  topics,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  const quickFilters = ['Matthew', 'John', 'Romans', 'Ephesians', 'James', 'Psalms', 'Corinthians'];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return topics.filter(t => 
      t.primaryPassage.toLowerCase().includes(q) ||
      t.secondaryPassages.some(p => p.toLowerCase().includes(q))
    );
  }, [topics, query]);

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <TopHeader 
        title="Browse Passages" 
        subtitle="Scripture Reference Search"
        onBack={() => onNavigate({ type: 'home' })}
      />

      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-20 flex-1 flex flex-col">
        {/* Search Input */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A524D]" />
          <input
            id="passage-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a book or verse (e.g. Matthew, Romans)..."
            className="w-full pl-10 pr-10 py-3 bg-white border border-[#E8E2D9] focus:border-[#D9822B] rounded-xl text-sm text-[#201A18] placeholder-[#5A524D]/60 focus:outline-none focus:ring-2 focus:ring-[#D9822B]/15 transition-all shadow-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5A524D] hover:text-[#201A18]"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-3">
          <span className="text-[11px] text-[#5A524D] font-medium flex items-center gap-1 flex-shrink-0 mr-1">
            <Sparkles className="w-3 h-3 text-[#D9822B]" /> Quick:
          </span>
          {quickFilters.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 transition-colors ${
                query.toLowerCase() === tag.toLowerCase()
                  ? 'bg-[#D9822B] text-white'
                  : 'bg-white text-[#5A524D] border border-[#E8E2D9] hover:border-[#D9822B]'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results / Guidance */}
        {!query.trim() ? (
          <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 text-center mt-2 shadow-sm">
            <BookMarked className="w-12 h-12 text-[#D9822B]/60 mx-auto mb-3" />
            <h2 className="text-base font-bold text-[#201A18] mb-1">
              Search by Scripture
            </h2>
            <p className="text-xs text-[#5A524D] leading-relaxed max-w-xs mx-auto">
              Find which Table Group topic discusses your favorite Scripture passages from the Gospels, Epistles, and Old Testament.
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 text-center mt-2 shadow-sm">
            <p className="text-sm font-bold text-[#201A18] mb-1">
              No topics found for "{query}"
            </p>
            <p className="text-xs text-[#5A524D]">
              Try searching by book name such as "Romans", "Luke", "James", or "Peter".
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#5A524D] px-1">
              Found {results.length} {results.length === 1 ? 'study' : 'studies'} matching "{query}"
            </div>
            {results.map((topic) => (
              <button
                key={topic.id}
                id={`passage-result-${topic.id}`}
                onClick={() => onNavigate({ type: 'topic_detail', topicId: topic.id })}
                className="w-full text-left bg-white border border-[#E8E2D9] hover:border-[#D9822B]/60 active:scale-[0.99] p-4 rounded-2xl transition-all shadow-sm group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#D9822B]/10 text-[#D9822B] text-xs font-bold">
                        Topic {topic.number}
                      </span>
                      <h2 className="text-sm font-bold text-[#201A18] group-hover:text-[#D9822B] transition-colors">
                        {topic.title}
                      </h2>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs text-[#5A524D]">
                        <span className="font-semibold text-[#C1440E]">Primary:</span>{' '}
                        <span className="font-medium text-[#201A18] bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E8E2D9]/80">
                          {topic.primaryPassage}
                        </span>
                      </div>
                      {topic.secondaryPassages.length > 0 && (
                        <div className="text-xs text-[#5A524D]">
                          <span className="font-semibold text-[#5B8266]">Secondary:</span>{' '}
                          <span>{topic.secondaryPassages.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#5A524D]/40 group-hover:text-[#D9822B] transition-colors mt-1" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
