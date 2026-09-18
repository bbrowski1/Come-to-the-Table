import React, { useState } from 'react';
import { Save, Calendar, ShieldCheck, Check } from 'lucide-react';
import { ScreenRoute } from '../types';
import { TopHeader } from './TopHeader';
import { notesRepository } from '../data/notesRepository';

interface AddNoteScreenProps {
  topicTitle: string;
  onNavigate: (route: ScreenRoute) => void;
  onNoteAdded: () => void;
}

export const AddNoteScreen: React.FC<AddNoteScreenProps> = ({
  topicTitle,
  onNavigate,
  onNoteAdded
}) => {
  const [noteText, setNoteText] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());

  const handleSave = () => {
    if (!noteText.trim()) return;
    notesRepository.addNote(topicTitle || 'General Reflection', noteText);
    onNoteAdded();
    setSavedSuccess(true);
    setTimeout(() => {
      onNavigate({ type: 'notes_list' });
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <TopHeader 
        title="Add Session Note" 
        subtitle="Private Reflection"
        onBack={() => onNavigate({ type: 'home' })}
      />

      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-20 flex-1 flex flex-col space-y-4">
        {/* Topic & Date Banner */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#5A524D] mb-1">
            <span className="font-semibold uppercase tracking-wider text-[#C1440E]">
              Session Study
            </span>
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {formattedDate}
            </span>
          </div>
          <h2 className="text-lg font-bold text-[#201A18]">
            {topicTitle || 'General Discipleship Session'}
          </h2>
        </div>

        {/* Note Input */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-4 shadow-sm flex-1 flex flex-col">
          <label htmlFor="session-note-textarea" className="text-xs font-bold text-[#201A18] mb-2 block">
            Leader Reflections & Follow-up
          </label>
          <textarea
            id="session-note-textarea"
            rows={8}
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your private leader reflections, prayers, and follow-ups here… (e.g. prayer requests shared, action steps committed to, follow-ups needed this week)"
            className="w-full flex-1 p-3.5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-sm text-[#201A18] placeholder-[#5A524D]/60 focus:outline-none focus:ring-2 focus:ring-[#C1440E]/20 focus:border-[#C1440E] resize-none transition-all leading-relaxed"
          />

          <div className="mt-3 flex items-center justify-between text-[11px] text-[#5A524D]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5B8266]" />
              Saved locally on this device only
            </span>
            <span>{noteText.length} characters</span>
          </div>
        </div>

        {/* Save Button */}
        <button
          id="save-note-button"
          onClick={handleSave}
          disabled={!noteText.trim() || savedSuccess}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 transition-all ${
            savedSuccess
              ? 'bg-green-600 text-white'
              : noteText.trim()
              ? 'bg-[#C1440E] hover:bg-[#a93b0c] active:scale-[0.98] text-white'
              : 'bg-[#E8E2D9] text-[#5A524D]/60 cursor-not-allowed'
          }`}
        >
          {savedSuccess ? (
            <>
              <Check className="w-5 h-5" />
              <span>Note Saved</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Note</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
