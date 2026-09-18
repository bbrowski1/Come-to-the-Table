import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Check, 
  Copy 
} from 'lucide-react';
import { Topic, ScreenRoute } from '../types';
import { TopHeader } from './TopHeader';

interface TopicDetailScreenProps {
  topic: Topic;
  onNavigate: (route: ScreenRoute) => void;
}

export const TopicDetailScreen: React.FC<TopicDetailScreenProps> = ({
  topic,
  onNavigate
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPassage = () => {
    const text = `${topic.primaryPassage}${topic.secondaryPassages.length ? ', ' + topic.secondaryPassages.join(', ') : ''}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <TopHeader 
        title={`Topic ${topic.number}`} 
        subtitle="Study Overview"
        onBack={() => onNavigate({ type: 'topics' })}
      />

      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-28 flex-1 space-y-4">
        {/* Title Header Card */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C1440E]/10 text-[#C1440E] text-xs font-bold mb-2">
            <span>Study #{topic.number}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#201A18] leading-snug">
            {topic.title}
          </h1>
        </div>

        {/* Scriptural Passages Card */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#201A18]">
              <BookOpen className="w-4 h-4 text-[#5B8266]" />
              <span>Scriptural Passages</span>
            </div>
            <button
              onClick={handleCopyPassage}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5A524D] hover:text-[#201A18] px-2 py-1 rounded-md bg-[#FAF8F5] border border-[#E8E2D9]"
              title="Copy scripture references"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-green-600" />
                  <span className="text-green-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl mb-3">
            <div className="text-[11px] font-semibold text-[#5A524D] uppercase tracking-wider mb-1">
              Primary Passage
            </div>
            <div className="text-lg font-bold text-[#C1440E]">
              {topic.primaryPassage}
            </div>
          </div>

          {topic.secondaryPassages.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold text-[#5A524D] uppercase tracking-wider mb-2">
                Secondary Passages
              </div>
              <div className="flex flex-wrap gap-2">
                {topic.secondaryPassages.map((passage, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-white border border-[#E8E2D9] rounded-lg text-xs font-semibold text-[#201A18]"
                  >
                    {passage}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Preview: Icebreaker */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-[#201A18] mb-2">
            <Sparkles className="w-4 h-4 text-[#D9822B]" />
            <span>Table Icebreaker</span>
          </div>
          <p className="text-sm text-[#5A524D] leading-relaxed italic bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E8E2D9]">
            "{topic.icebreaker}"
          </p>
        </div>

        {/* Preview: Discussion Sample */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-bold text-[#201A18] mb-2">
            <HelpCircle className="w-4 h-4 text-[#2E7D7E]" />
            <span>Discussion Questions ({topic.questions.length})</span>
          </div>
          <p className="text-xs text-[#5A524D] mb-3">
            5 guided facilitator questions ready for your session:
          </p>
          <div className="space-y-2">
            {topic.questions.map((q, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-2.5 text-xs text-[#201A18] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E8E2D9]/60"
              >
                <span className="font-bold text-[#C1440E] mt-0.5">{idx + 1}.</span>
                <span className="leading-snug">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-[#E8E2D9] p-4 shadow-lg">
        <div className="max-w-md mx-auto">
          <button
            id="start-session-from-detail"
            onClick={() => onNavigate({ type: 'session_runner', topicId: topic.id })}
            className="w-full bg-[#C1440E] hover:bg-[#a93b0c] active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl shadow-md flex items-center justify-center gap-2.5 transition-all"
          >
            <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
            <span>Start Session with Topic {topic.number}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
