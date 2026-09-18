import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Coffee, 
  MessageSquare, 
  BookOpen, 
  Compass, 
  Heart, 
  Users, 
  FileEdit, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { Topic, ScreenRoute, GlobalPrompts } from '../types';

interface SessionRunnerScreenProps {
  topic: Topic;
  globalPrompts: GlobalPrompts;
  onNavigate: (route: ScreenRoute) => void;
}

interface StepDefinition {
  stepNumber: number;
  letter: string;
  name: string;
  tagline: string;
  color: string;
  badgeBg: string;
  icon: React.ReactNode;
}

export const SessionRunnerScreen: React.FC<SessionRunnerScreenProps> = ({
  topic,
  globalPrompts,
  onNavigate
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});

  const steps: StepDefinition[] = [
    {
      stepNumber: 1,
      letter: 'T',
      name: 'Together',
      tagline: 'Welcome & Connect',
      color: '#C1440E',
      badgeBg: 'bg-[#C1440E]',
      icon: <Coffee className="w-5 h-5 text-white" />
    },
    {
      stepNumber: 2,
      letter: 'A',
      name: 'Ask',
      tagline: 'Check-in & Icebreaker',
      color: '#D9822B',
      badgeBg: 'bg-[#D9822B]',
      icon: <MessageSquare className="w-5 h-5 text-white" />
    },
    {
      stepNumber: 3,
      letter: 'B',
      name: 'Bible',
      tagline: 'Scripture & Discussion',
      color: '#5B8266',
      badgeBg: 'bg-[#5B8266]',
      icon: <BookOpen className="w-5 h-5 text-white" />
    },
    {
      stepNumber: 4,
      letter: 'L',
      name: 'Live it',
      tagline: 'Application & Prayer',
      color: '#2E7D7E',
      badgeBg: 'bg-[#2E7D7E]',
      icon: <Compass className="w-5 h-5 text-white" />
    },
    {
      stepNumber: 5,
      letter: 'E',
      name: 'Empty Chair',
      tagline: 'Mission & Multiplication',
      color: '#C1440E',
      badgeBg: 'bg-[#C1440E]',
      icon: <Users className="w-5 h-5 text-white" />
    }
  ];

  const currentStep = steps[currentStepIndex];

  const toggleQuestionCheck = (idx: number) => {
    setCheckedQuestions(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      {/* Top Session Bar */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E8E2D9] px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              id="exit-session-button"
              onClick={() => setShowExitConfirm(true)}
              className="p-1.5 -ml-1.5 rounded-full text-[#5A524D] hover:text-[#201A18] hover:bg-[#E8E2D9]/50"
              aria-label="Exit session"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#C1440E]">
                Topic {topic.number}: {topic.title}
              </div>
              <div className="text-xs text-[#5A524D] font-semibold">
                Step {currentStep.stepNumber} of {steps.length} • {currentStep.name}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {steps.map((s, idx) => (
              <button
                key={s.letter + idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center transition-all ${
                  idx === currentStepIndex
                    ? 'bg-[#201A18] text-white scale-110 shadow-sm'
                    : idx < currentStepIndex
                    ? 'bg-[#E8E2D9] text-[#201A18]'
                    : 'bg-[#FAF8F5] text-[#5A524D]/60 border border-[#E8E2D9]'
                }`}
                title={`Jump to ${s.name}`}
              >
                {s.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto w-full bg-[#E8E2D9] h-1 rounded-full mt-2 overflow-hidden">
          <div 
            className="h-full transition-all duration-300 rounded-full"
            style={{ 
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
              backgroundColor: currentStep.color
            }}
          />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-md mx-auto w-full px-4 pt-5 pb-28 flex-1 flex flex-col">
        {/* Step Banner */}
        <div 
          className="rounded-2xl p-5 text-white shadow-md mb-4 transition-colors"
          style={{ backgroundColor: currentStep.color }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/80 mb-0.5">
                Rhythm Step {currentStep.stepNumber}
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight">
                {currentStep.letter} — {currentStep.name}
              </h2>
              <p className="text-sm text-white/90 font-medium mt-0.5">
                {currentStep.tagline}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              {currentStep.icon}
            </div>
          </div>
        </div>

        {/* Step-Specific Cards */}
        {currentStepIndex === 0 && (
          /* Step 1: TOGETHER */
          <div className="space-y-4">
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C1440E] mb-2">
                Leader Guidance
              </h3>
              <p className="text-base text-[#201A18] font-semibold leading-relaxed">
                "{globalPrompts.together}"
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#201A18]">
                Hospitality & Fellowship Tips
              </h3>
              <ul className="text-xs text-[#5A524D] space-y-2.5 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C1440E] mt-1.5 flex-shrink-0" />
                  <span>Start with genuine warmth. Give everyone time to arrive, breathe, and settle in.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C1440E] mt-1.5 flex-shrink-0" />
                  <span>Sharing food or simple hot drinks breaks barriers faster than formal agendas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C1440E] mt-1.5 flex-shrink-0" />
                  <span>Check that everyone feels welcomed by name, especially any newcomers.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {currentStepIndex === 1 && (
          /* Step 2: ASK */
          <div className="space-y-4">
            {/* Highs and Lows */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#D9822B] mb-2">
                Weekly Check-In
              </h3>
              <p className="text-base text-[#201A18] font-semibold leading-relaxed mb-3">
                "{globalPrompts.askHighsLows}"
              </p>
              <p className="text-xs text-[#5A524D] italic">
                Give each person a turn to share briefly. Celebrate the highs and hold space for the lows.
              </p>
            </div>

            {/* Icebreaker for this topic */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D9822B]">
                  Topic Icebreaker
                </span>
              </div>
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D9]">
                <p className="text-base font-bold text-[#201A18] leading-snug">
                  "{topic.icebreaker}"
                </p>
              </div>
              <p className="text-[11px] text-[#5A524D] mt-2.5">
                The icebreaker bridges everyday life into today's theme: <strong>{topic.title}</strong>.
              </p>
            </div>
          </div>
        )}

        {currentStepIndex === 2 && (
          /* Step 3: BIBLE */
          <div className="space-y-4">
            {/* Scripture Header Card */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B8266]">
                  Scripture Reading
                </span>
                <span className="text-xs text-[#5A524D] font-medium">Topic {topic.number}</span>
              </div>

              <div className="bg-[#5B8266]/10 border border-[#5B8266]/30 p-3.5 rounded-xl mb-3">
                <div className="text-[11px] font-bold text-[#5B8266] uppercase">Primary Passage</div>
                <div className="text-xl font-extrabold text-[#201A18] mt-0.5">
                  {topic.primaryPassage}
                </div>
              </div>

              {topic.secondaryPassages.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-[#5A524D] uppercase mb-1">
                    Supporting Passages
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topic.secondaryPassages.map((passage, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E8E2D9] rounded-md text-xs font-semibold text-[#201A18]"
                      >
                        {passage}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Read the Bible Core Prompts */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-[#201A18] mb-1">
                Core Discovery Questions
              </h3>
              <p className="text-xs text-[#5A524D] mb-3">
                Ask someone to read the passage out loud. Then guide the group through:
              </p>
              <div className="space-y-2">
                {globalPrompts.readTheBible.map((prompt, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs font-semibold text-[#201A18] flex items-center gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#5B8266] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span>{prompt}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Specific Discussion Questions */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#201A18]">
                  Topic Discussion Questions
                </h3>
                <span className="text-[11px] font-semibold text-[#5B8266]">
                  Tap to mark discussed
                </span>
              </div>
              <div className="space-y-2.5">
                {topic.questions.map((q, idx) => {
                  const isChecked = !!checkedQuestions[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleQuestionCheck(idx)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-[#5B8266]/10 border-[#5B8266]/40 text-[#201A18]'
                          : 'bg-white border-[#E8E2D9] text-[#201A18] hover:border-[#5B8266]/40'
                      }`}
                    >
                      <div className="mt-0.5 flex-shrink-0">
                        {isChecked ? (
                          <CheckCircle2 className="w-4 h-4 text-[#5B8266]" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-[#5A524D]/40 text-[10px] font-bold flex items-center justify-center text-[#5A524D]">
                            {idx + 1}
                          </div>
                        )}
                      </div>
                      <span className={`text-xs leading-relaxed ${isChecked ? 'line-through opacity-70' : 'font-medium'}`}>
                        {q}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {currentStepIndex === 3 && (
          /* Step 4: LIVE IT & PRAY */
          <div className="space-y-4">
            {/* Part 1: Personal Application */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#2E7D7E] mb-2">
                Part 1: Personal Application
              </h3>
              <p className="text-base text-[#201A18] font-semibold leading-relaxed">
                "{globalPrompts.liveIt}"
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#201A18]">
                Facilitation Guidance
              </h3>
              <p className="text-xs text-[#5A524D] leading-relaxed">
                Following Jesus is about active obedience and transformation.
                Encourage group members to name one realistic, concrete action for their upcoming week:
              </p>
              <div className="p-3.5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs text-[#201A18] space-y-1.5">
                <p className="font-semibold text-[#2E7D7E]">Examples of actionable obedience:</p>
                <p>• "I will call my colleague tomorrow and apologize for my tone."</p>
                <p>• "I will set an alarm 15 minutes earlier to read Scripture before work."</p>
                <p>• "I will forgive my sibling and initiate contact this weekend."</p>
              </div>
            </div>

            {/* Part 2: Praying Together */}
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-[#7A4A87]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#7A4A87]">
                  Part 2: Praying Together
                </h3>
              </div>
              <p className="text-base text-[#201A18] font-semibold leading-relaxed mb-3">
                "{globalPrompts.pray}"
              </p>
              <p className="text-xs text-[#5A524D] mb-3">
                Pray for the highs and lows shared earlier, and cover each person's obedience commitment in prayer.
              </p>

              <div className="space-y-2 pt-1 border-t border-[#E8E2D9]/60">
                <div className="flex items-start gap-2 text-xs text-[#5A524D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A4A87] mt-1.5 flex-shrink-0" />
                  <span><strong>Pairs:</strong> Pair up members to pray directly for each other.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#5A524D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A4A87] mt-1.5 flex-shrink-0" />
                  <span><strong>Circle Prayer:</strong> Go around the table for short sentence-prayers.</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#5A524D]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A4A87] mt-1.5 flex-shrink-0" />
                  <span><strong>Leader Blessing:</strong> Conclude with a word of blessing over the group.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStepIndex === 4 && (
          /* Step 5: EMPTY CHAIR */
          <div className="space-y-4">
            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#C1440E] mb-2">
                Mission & Multiplication
              </h3>
              <p className="text-base text-[#201A18] font-semibold leading-relaxed">
                "{globalPrompts.emptyChair}"
              </p>
            </div>

            <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-[#201A18]">
                Why The Empty Chair Matters
              </h3>
              <p className="text-xs text-[#5A524D] leading-relaxed">
                The Table Group is never an exclusive club. The empty chair is a physical and spiritual reminder that Jesus constantly calls us to seek the lost, invite neighbours, and disciple new believers.
              </p>
              <div className="p-3 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs text-[#201A18]">
                <strong>Leader Question:</strong> Who can each person invite to our next gathering?
              </div>
            </div>

            {/* Session Complete Notice */}
            <div className="bg-[#C1440E]/10 border border-[#C1440E]/30 rounded-2xl p-4 text-center">
              <p className="text-xs font-bold text-[#C1440E]">
                Session complete! Record your reflections while they are fresh.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Controls */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md border-t border-[#E8E2D9] p-3.5 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            id="session-prev-button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm border flex items-center justify-center gap-1.5 transition-all ${
              currentStepIndex === 0
                ? 'opacity-40 border-[#E8E2D9] text-[#5A524D] cursor-not-allowed'
                : 'border-[#E8E2D9] text-[#201A18] hover:bg-[#FAF8F5] active:scale-98'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {currentStepIndex < steps.length - 1 ? (
            <button
              id="session-next-button"
              onClick={handleNext}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white shadow-md flex items-center justify-center gap-1.5 active:scale-98 transition-all"
              style={{ backgroundColor: currentStep.color }}
            >
              <span>Next Step</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="session-add-note-button"
              onClick={() => onNavigate({ type: 'add_note', topicTitle: topic.title })}
              className="flex-1 py-3 px-4 rounded-xl font-bold text-sm bg-[#C1440E] hover:bg-[#a93b0c] text-white shadow-md flex items-center justify-center gap-1.5 active:scale-98 transition-all"
            >
              <FileEdit className="w-4 h-4" />
              <span>Add Session Note</span>
            </button>
          )}
        </div>
      </footer>

      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-xl border border-[#E8E2D9]">
            <div className="w-10 h-10 rounded-full bg-[#C1440E]/10 text-[#C1440E] flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#201A18] mb-1">
              Exit this session?
            </h3>
            <p className="text-xs text-[#5A524D] mb-5 leading-relaxed">
              Are you sure you want to exit the session guide? Your checked questions won't be saved unless you record a note.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExitConfirm(false)}
                className="flex-1 py-2.5 text-xs font-bold text-[#5A524D] hover:bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl"
              >
                Continue Session
              </button>
              <button
                onClick={() => onNavigate({ type: 'home' })}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-[#C1440E] hover:bg-[#a93b0c] rounded-xl"
              >
                Exit to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
