import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, 
  ChevronRight, 
  BookOpen, 
  X, 
  Upload, 
  Download, 
  RotateCcw, 
  FileCode, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { Topic, ScreenRoute } from '../types';
import { TopHeader } from './TopHeader';

interface TopicListScreenProps {
  topics: Topic[];
  onNavigate: (route: ScreenRoute) => void;
  onImportTopics?: (jsonString: string) => { success: boolean; count: number; error?: string };
  onResetTopics?: () => void;
  isCustomCurriculum?: boolean;
}

export const TopicListScreen: React.FC<TopicListScreenProps> = ({
  topics,
  onNavigate,
  onImportTopics,
  onResetTopics,
  isCustomCurriculum = false
}) => {
  const [query, setQuery] = useState('');
  const [showManageModal, setShowManageModal] = useState(false);
  const [pasteJson, setPasteJson] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return topics;
    return topics.filter(t => 
      t.title.toLowerCase().includes(q) ||
      t.primaryPassage.toLowerCase().includes(q) ||
      t.secondaryPassages.some(p => p.toLowerCase().includes(q)) ||
      String(t.number).includes(q)
    );
  }, [topics, query]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content && onImportTopics) {
        const result = onImportTopics(content);
        if (result.success) {
          setImportStatus({ success: true, message: `Successfully loaded ${result.count} topics!` });
          setTimeout(() => {
            setShowManageModal(false);
            setImportStatus(null);
          }, 1400);
        } else {
          setImportStatus({ success: false, message: result.error || 'Failed to parse JSON file' });
        }
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handlePasteImport = () => {
    if (!pasteJson.trim() || !onImportTopics) return;
    const result = onImportTopics(pasteJson.trim());
    if (result.success) {
      setImportStatus({ success: true, message: `Successfully imported ${result.count} topics!` });
      setPasteJson('');
      setTimeout(() => {
        setShowManageModal(false);
        setImportStatus(null);
      }, 1400);
    } else {
      setImportStatus({ success: false, message: result.error || 'Invalid JSON format' });
    }
  };

  const handleExportJson = () => {
    const data = {
      version: 1,
      topics: topics
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `table-group-topics-${topics.length}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <TopHeader 
        title="Browse Topics" 
        subtitle={`${topics.length} Discipleship studies`}
        onBack={() => onNavigate({ type: 'home' })}
      />

      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-20 flex-1 flex flex-col">
        {/* Search Bar & Manage button */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A524D]" />
            <input
              id="topic-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics or passages..."
              className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#E8E2D9] focus:border-[#C1440E] rounded-xl text-xs text-[#201A18] placeholder-[#5A524D]/60 focus:outline-none focus:ring-2 focus:ring-[#C1440E]/15 transition-all shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#5A524D] hover:text-[#201A18]"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {onImportTopics && (
            <button
              onClick={() => setShowManageModal(true)}
              className="px-2.5 py-2.5 bg-white border border-[#E8E2D9] hover:border-[#C1440E] rounded-xl text-[11px] font-bold text-[#5A524D] hover:text-[#C1440E] flex items-center gap-1 shadow-sm transition-all flex-shrink-0"
              title="Curriculum JSON Options (Import/Export)"
            >
              <Upload className="w-3.5 h-3.5 text-[#C1440E]" />
              <span>JSON</span>
            </button>
          )}
        </div>

        {/* Counter indicator */}
        <div className="flex items-center justify-between px-1 mb-2.5 text-xs text-[#5A524D]">
          <span>
            {query ? `Showing ${filteredTopics.length} of ${topics.length} topics` : `All Topics (${topics.length})`}
          </span>
          <span className="font-semibold text-[#C1440E]">
            {isCustomCurriculum ? 'Custom Curriculum' : 'T·A·B·L·E Studies'}
          </span>
        </div>

        {/* Topics List */}
        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-[#E8E2D9] my-4">
            <BookOpen className="w-10 h-10 text-[#5A524D]/40 mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#201A18]">No topics found</p>
            <p className="text-xs text-[#5A524D] mt-1">Try searching for another keyword or Scripture book.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => onNavigate({ type: 'topic_detail', topicId: topic.id })}
                className="w-full text-left bg-white border border-[#E8E2D9] hover:border-[#C1440E]/50 rounded-2xl p-4 shadow-sm transition-all hover:shadow hover:translate-y-[-1px] flex items-center justify-between group"
              >
                <div className="flex items-start gap-3 min-w-0 pr-2">
                  <div className="w-8 h-8 rounded-xl bg-[#C1440E]/10 text-[#C1440E] flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                    {topic.number}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-[#201A18] group-hover:text-[#C1440E] transition-colors truncate">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-[#5A524D] font-medium mt-0.5 truncate">
                      {topic.primaryPassage}
                    </p>
                    {topic.secondaryPassages && topic.secondaryPassages.length > 0 && (
                      <p className="text-[11px] text-[#5A524D]/75 truncate mt-0.5">
                        +{topic.secondaryPassages.length} secondary passages
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-7 h-7 rounded-full bg-[#FAF8F5] group-hover:bg-[#C1440E]/10 flex items-center justify-center flex-shrink-0 transition-colors">
                  <ChevronRight className="w-4 h-4 text-[#5A524D] group-hover:text-[#C1440E]" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* JSON Import/Export Modal */}
      {showManageModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-xl border border-[#E8E2D9] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-[#C1440E]" />
                <h3 className="text-sm font-bold text-[#201A18]">Curriculum JSON Options</h3>
              </div>
              <button 
                onClick={() => setShowManageModal(false)}
                className="p-1 text-[#5A524D] hover:text-[#201A18]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#5A524D] leading-relaxed">
              Upload or paste a custom topics JSON file (supports 28, 50, 100+ topics).
            </p>

            {importStatus && (
              <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                importStatus.success ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {importStatus.success ? <Check className="w-4 h-4 text-green-600 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
                <span>{importStatus.message}</span>
              </div>
            )}

            {/* File Upload Button */}
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept=".json" 
                className="hidden" 
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-4 bg-[#C1440E] hover:bg-[#a93b0c] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Upload topics.json file</span>
              </button>
            </div>

            {/* Paste JSON area */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-[#5A524D] uppercase tracking-wider">
                Or Paste JSON directly:
              </label>
              <textarea
                value={pasteJson}
                onChange={(e) => setPasteJson(e.target.value)}
                placeholder='{"topics": [{"id": "topic-1", "number": 1, "title": "...", ...}]}'
                rows={4}
                className="w-full p-2.5 text-[11px] font-mono bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl focus:outline-none focus:border-[#C1440E]"
              />
              <button
                onClick={handlePasteImport}
                disabled={!pasteJson.trim()}
                className="w-full py-2 bg-white border border-[#C1440E] text-[#C1440E] disabled:opacity-40 hover:bg-[#C1440E]/5 text-xs font-bold rounded-xl transition-all"
              >
                Import Pasted JSON
              </button>
            </div>

            {/* Actions: Export & Reset */}
            <div className="pt-2 border-t border-[#E8E2D9] flex items-center justify-between gap-2">
              <button
                onClick={handleExportJson}
                className="flex-1 py-2 px-3 bg-[#FAF8F5] hover:bg-[#E8E2D9]/40 border border-[#E8E2D9] text-[#5A524D] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>

              {onResetTopics && isCustomCurriculum && (
                <button
                  onClick={() => {
                    onResetTopics();
                    setImportStatus({ success: true, message: 'Reset to default curriculum' });
                    setTimeout(() => {
                      setShowManageModal(false);
                      setImportStatus(null);
                    }, 1200);
                  }}
                  className="py-2 px-3 bg-[#FAF8F5] hover:bg-red-50 border border-[#E8E2D9] text-red-600 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
