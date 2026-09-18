import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  HelpCircle, 
  Rocket, 
  ChevronDown, 
  ChevronUp, 
  HeartHandshake, 
  Compass, 
  Sparkles 
} from 'lucide-react';
import { ScreenRoute } from '../types';
import { TopHeader } from './TopHeader';

interface LeaderResourcesScreenProps {
  onNavigate: (route: ScreenRoute) => void;
}

export const LeaderResourcesScreen: React.FC<LeaderResourcesScreenProps> = ({
  onNavigate
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    discipleship: true,
    facilitation: true,
    coaching: true,
    launch: false
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <TopHeader 
        title="Leader Resources" 
        subtitle="Discipleship Guide & Tips"
        onBack={() => onNavigate({ type: 'home' })}
      />

      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-20 flex-1 space-y-4">
        {/* Pathway Banner */}
        <div className="bg-[#2E7D7E] text-white rounded-2xl p-5 shadow-sm">
          <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">
            Central Division Discipleship Pathway
          </div>
          <h2 className="text-xl font-extrabold tracking-tight mb-3">
            PRAY → GATHER → GROW → MULTIPLY
          </h2>
          <p className="text-xs text-white/90 leading-relaxed">
            The Table Group is designed as a relational greenhouse where disciples are formed around Scripture, prayer, and missional hospitality.
          </p>
        </div>

        {/* 1. What is Discipleship? */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('discipleship')}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#C1440E]/10 text-[#C1440E] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#201A18]">
                  1. What is Discipleship?
                </h3>
                <p className="text-[11px] text-[#5A524D]">
                  Following, becoming, and joining Jesus
                </p>
              </div>
            </div>
            {openSections.discipleship ? (
              <ChevronUp className="w-4 h-4 text-[#5A524D]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#5A524D]" />
            )}
          </button>

          {openSections.discipleship && (
            <div className="px-5 pb-5 pt-1 text-xs text-[#5A524D] space-y-3 border-t border-[#E8E2D9]/60">
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]/60">
                <p className="font-bold text-[#201A18] mb-0.5">Following Jesus (Head)</p>
                <p>Trusting Him with your life and committing to learn His ways (Mark 1:17).</p>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]/60">
                <p className="font-bold text-[#201A18] mb-0.5">Becoming like Jesus (Heart)</p>
                <p>Allowing the Holy Spirit to transform your character and affections (Romans 8:29).</p>
              </div>
              <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]/60">
                <p className="font-bold text-[#201A18] mb-0.5">Joining Jesus in Mission (Hands)</p>
                <p>Serving the poor, loving neighbors, and proclaiming the Gospel (John 20:21).</p>
              </div>
            </div>
          )}
        </div>

        {/* 2. How to Facilitate a Table */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('facilitation')}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#5B8266]/10 text-[#5B8266] flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#201A18]">
                  2. The T·A·B·L·E Rhythm
                </h3>
                <p className="text-[11px] text-[#5A524D]">
                  How to guide the group without preaching
                </p>
              </div>
            </div>
            {openSections.facilitation ? (
              <ChevronUp className="w-4 h-4 text-[#5A524D]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#5A524D]" />
            )}
          </button>

          {openSections.facilitation && (
            <div className="px-5 pb-5 pt-1 text-xs text-[#5A524D] space-y-2.5 border-t border-[#E8E2D9]/60">
              <p className="italic text-[#201A18]">
                A facilitator is not a lecturer or teacher; you are an attentive guide creating space for the Holy Spirit to speak through the Word.
              </p>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9]/60">
                  <span className="font-bold text-[#C1440E]">T — Together:</span> Warm hospitality, sharing a cup of tea, building trust.
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9]/60">
                  <span className="font-bold text-[#D9822B]">A — Ask:</span> Highs and lows check-in plus an approachable icebreaker.
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9]/60">
                  <span className="font-bold text-[#5B8266]">B — Bible:</span> Read Scripture aloud; ask the 4 discovery questions; discuss topic questions.
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9]/60">
                  <span className="font-bold text-[#2E7D7E]">L — Live it:</span> Personal application, naming concrete obedience steps, and praying together for each other.
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9]/60">
                  <span className="font-bold text-[#C1440E]">E — Empty Chair:</span> Keeping our eyes on who we can invite and mentor next.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Table Coach Questions */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('coaching')}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#7A4A87]/10 text-[#7A4A87] flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#201A18]">
                  3. Table Coach Check-In
                </h3>
                <p className="text-[11px] text-[#5A524D]">
                  5 health questions for every leader
                </p>
              </div>
            </div>
            {openSections.coaching ? (
              <ChevronUp className="w-4 h-4 text-[#5A524D]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#5A524D]" />
            )}
          </button>

          {openSections.coaching && (
            <div className="px-5 pb-5 pt-1 text-xs text-[#5A524D] space-y-2 border-t border-[#E8E2D9]/60">
              <p className="text-[11px] text-[#201A18] font-semibold mb-2">
                Use these 5 questions during periodic check-ins with your Corps Officer or Table Coach:
              </p>
              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]/60">
                <strong>1. Spiritual Life:</strong> Are group members growing in their personal prayer and Bible reading?
              </div>
              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]/60">
                <strong>2. Vulnerability:</strong> Are participants comfortable being authentic about struggles?
              </div>
              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]/60">
                <strong>3. Obedience:</strong> Are individuals taking concrete steps to live out what they study?
              </div>
              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]/60">
                <strong>4. Apprentice Leader:</strong> Who are you intentionally identifying to co-facilitate or host?
              </div>
              <div className="p-2.5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]/60">
                <strong>5. Empty Chair:</strong> Is the group looking outward to welcome neighbors and seekers?
              </div>
            </div>
          )}
        </div>

        {/* 4. Launch & Learn */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={() => toggleSection('launch')}
            className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#D9822B]/10 text-[#D9822B] flex items-center justify-center">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#201A18]">
                  4. Launch & Multiplication
                </h3>
                <p className="text-[11px] text-[#5A524D]">
                  Starting, pacing, and multiplying tables
                </p>
              </div>
            </div>
            {openSections.launch ? (
              <ChevronUp className="w-4 h-4 text-[#5A524D]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#5A524D]" />
            )}
          </button>

          {openSections.launch && (
            <div className="px-5 pb-5 pt-1 text-xs text-[#5A524D] space-y-2.5 border-t border-[#E8E2D9]/60 leading-relaxed">
              <p>
                <strong>Group Size:</strong> Ideal table size is 4 to 8 people. If your table grows beyond 10, conversations become spectatorships. Plan to multiply into two tables!
              </p>
              <p>
                <strong>Time Window:</strong> 60 to 75 minutes is usually optimal:
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>15 mins: Together & Ask (tea + highs/lows)</li>
                <li>30 mins: Bible & Discussion</li>
                <li>15 mins: Live it, Pray & Empty Chair</li>
              </ul>
              <p>
                <strong>Location:</strong> Kitchen tables, living rooms, corps halls, or even park benches. The table is anywhere disciples gather.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
