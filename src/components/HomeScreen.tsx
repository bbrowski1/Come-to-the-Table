import React from 'react';
import { 
  BookOpen, 
  Search, 
  FileText, 
  Sparkles, 
  Info, 
  ChevronRight, 
  Play, 
  Code2
} from 'lucide-react';
import { ScreenRoute } from '../types';

interface HomeScreenProps {
  onNavigate: (route: ScreenRoute) => void;
  topicCount: number;
  notesCount: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  topicCount,
  notesCount
}) => {
  return (
    <div className="flex-1 flex flex-col pb-12">
      {/* Top Header Bar with RedshieldSM Logo on Top Left */}
      <div className="bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] px-4 py-2.5 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <img
            id="home-redshield-logo"
            src="/RedshieldSM.png"
            alt="The Salvation Army"
            className="w-6 h-7 object-contain drop-shadow-sm"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="text-xs font-bold text-[#201A18] tracking-tight block leading-tight">
              The Salvation Army
            </span>
            <span className="text-[10px] font-semibold text-[#C1440E] uppercase tracking-wider block">
              Central Division (SAT)
            </span>
          </div>
        </div>

        <button
          id="home-about-button"
          onClick={() => onNavigate({ type: 'about' })}
          className="p-1.5 rounded-full text-[#5A524D] hover:text-[#201A18] hover:bg-[#E8E2D9]/50 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-medium"
          title="About & Play Store Icon"
          aria-label="About screen"
        >
          <Info className="w-4 h-4" />
          <span className="hidden sm:inline">About</span>
        </button>
      </div>

      {/* Division & Header Hero */}
      <div className="bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-[#F2EDE4] px-6 pt-7 pb-8 border-b border-[#E8E2D9]">
        <div className="max-w-md mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8E2D9]/70 text-[#5A524D] text-[11px] font-semibold tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D3202A]" />
            Table Discipleship • 1 Thess 5:11
          </div>

          <h1 className="text-3xl font-extrabold text-[#201A18] tracking-tight leading-none mb-1">
            Come to the Table
          </h1>
          <p className="text-base font-semibold text-[#C1440E] tracking-wide mb-6">
            Leader Guide
          </p>

          {/* Primary Action Button */}
          <button
            id="start-session-button"
            onClick={() => onNavigate({ type: 'session_runner', topicId: 'prayer' })}
            className="w-full bg-[#C1440E] hover:bg-[#a93b0c] active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-[#C1440E]/20 transition-all flex items-center justify-center gap-3 group"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
            </div>
            <span className="text-lg">Start a Session</span>
          </button>

          <p className="text-xs text-[#5A524D] mt-2.5">
            Launches Topic 1 or choose any from Browse Topics
          </p>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <div className="max-w-md mx-auto w-full px-4 pt-6 space-y-3">
        {/* Browse Topics */}
        <button
          id="nav-browse-topics"
          onClick={() => onNavigate({ type: 'topics' })}
          className="w-full text-left bg-white border border-[#E8E2D9] hover:border-[#C1440E]/40 hover:bg-[#FAF8F5] p-4 rounded-2xl transition-all shadow-sm flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C1440E]/10 flex items-center justify-center text-[#C1440E] group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#201A18] group-hover:text-[#C1440E] transition-colors">
                Browse Topics
              </h2>
              <p className="text-xs text-[#5A524D]">
                {topicCount} Discipleship studies with questions
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5A524D]/60 group-hover:text-[#C1440E] transition-colors" />
        </button>

        {/* Browse Passages */}
        <button
          id="nav-browse-passages"
          onClick={() => onNavigate({ type: 'passage_search' })}
          className="w-full text-left bg-white border border-[#E8E2D9] hover:border-[#D9822B]/40 hover:bg-[#FAF8F5] p-4 rounded-2xl transition-all shadow-sm flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#D9822B]/10 flex items-center justify-center text-[#D9822B] group-hover:scale-105 transition-transform">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#201A18] group-hover:text-[#D9822B] transition-colors">
                Browse Passages
              </h2>
              <p className="text-xs text-[#5A524D]">
                Search any topic by Scripture reference
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5A524D]/60 group-hover:text-[#D9822B] transition-colors" />
        </button>

        {/* My Notes */}
        <button
          id="nav-my-notes"
          onClick={() => onNavigate({ type: 'notes_list' })}
          className="w-full text-left bg-white border border-[#E8E2D9] hover:border-[#5B8266]/40 hover:bg-[#FAF8F5] p-4 rounded-2xl transition-all shadow-sm flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#5B8266]/10 flex items-center justify-center text-[#5B8266] group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#201A18] group-hover:text-[#5B8266] transition-colors">
                  My Notes
                </h2>
                {notesCount > 0 && (
                  <span className="px-2 py-0.5 text-[11px] font-bold bg-[#5B8266] text-white rounded-full">
                    {notesCount}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#5A524D]">
                Private leader notes saved on device
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5A524D]/60 group-hover:text-[#5B8266] transition-colors" />
        </button>

        {/* Leader Resources */}
        <button
          id="nav-leader-resources"
          onClick={() => onNavigate({ type: 'leader_resources' })}
          className="w-full text-left bg-white border border-[#E8E2D9] hover:border-[#2E7D7E]/40 hover:bg-[#FAF8F5] p-4 rounded-2xl transition-all shadow-sm flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#2E7D7E]/10 flex items-center justify-center text-[#2E7D7E] group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#201A18] group-hover:text-[#2E7D7E] transition-colors">
                Leader Resources
              </h2>
              <p className="text-xs text-[#5A524D]">
                Discipleship guide, facilitation tips & coach questions
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5A524D]/60 group-hover:text-[#2E7D7E] transition-colors" />
        </button>

        {/* About & Privacy */}
        <button
          id="nav-about"
          onClick={() => onNavigate({ type: 'about' })}
          className="w-full text-left bg-white border border-[#E8E2D9] hover:border-[#7A4A87]/40 hover:bg-[#FAF8F5] p-4 rounded-2xl transition-all shadow-sm flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#7A4A87]/10 flex items-center justify-center text-[#7A4A87] group-hover:scale-105 transition-transform">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#201A18] group-hover:text-[#7A4A87] transition-colors">
                About & Privacy
              </h2>
              <p className="text-xs text-[#5A524D]">
                Privacy notice, app version & feedback
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5A524D]/60 group-hover:text-[#7A4A87] transition-colors" />
        </button>

        {/* Android Project Source Code Card */}
        <button
          id="nav-android-code"
          onClick={() => onNavigate({ type: 'android_code' })}
          className="w-full text-left bg-[#FAF8F5] border border-dashed border-[#C1440E]/40 hover:border-[#C1440E] p-4 rounded-2xl transition-all flex items-center justify-between group active:scale-[0.99]"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#C1440E]/15 flex items-center justify-center text-[#C1440E] group-hover:scale-105 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#201A18] group-hover:text-[#C1440E] transition-colors">
                  Android Project Code
                </h2>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-[#C1440E]/20 text-[#C1440E] rounded-md">
                  Kotlin / Compose
                </span>
              </div>
              <p className="text-xs text-[#5A524D]">
                Inspect & copy native Android source files
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-[#5A524D]/60 group-hover:text-[#C1440E] transition-colors" />
        </button>
      </div>

      {/* Footer Quote / Theme */}
      <div className="mt-8 text-center px-6">
        <p className="text-xs italic text-[#5A524D]/80">
          "They broke bread in their homes and ate together with glad and sincere hearts."
        </p>
        <p className="text-[11px] font-medium text-[#C1440E] mt-1">
          Acts 2:46
        </p>
      </div>
    </div>
  );
};
