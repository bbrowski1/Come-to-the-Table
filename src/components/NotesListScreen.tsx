import React, { useState } from 'react';
import { 
  FileText, 
  Trash2, 
  Calendar, 
  Plus, 
  AlertCircle,
  Share2,
  Check
} from 'lucide-react';
import { SessionNote, ScreenRoute } from '../types';
import { TopHeader } from './TopHeader';
import { notesRepository } from '../data/notesRepository';

interface NotesListScreenProps {
  notes: SessionNote[];
  onNavigate: (route: ScreenRoute) => void;
  onRefreshNotes: () => void;
}

export const NotesListScreen: React.FC<NotesListScreenProps> = ({
  notes,
  onNavigate,
  onRefreshNotes
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const formatDate = (millis: number) => {
    try {
      const date = new Date(millis);
      return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return '';
    }
  };

  const handleDelete = (id: number) => {
    notesRepository.deleteNote(id);
    onRefreshNotes();
    setDeleteConfirmId(null);
  };

  const handleCopyNote = (note: SessionNote) => {
    const text = `${note.topicTitle} (${formatDate(note.dateMillis)})\n\n${note.noteText}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <TopHeader 
        title="My Notes" 
        subtitle={`${notes.length} saved reflections`}
        onBack={() => onNavigate({ type: 'home' })}
        action={
          <button
            id="new-note-action"
            onClick={() => onNavigate({ type: 'add_note', topicTitle: '' })}
            className="p-2 rounded-full text-[#C1440E] hover:bg-[#C1440E]/10"
            title="Write new note"
          >
            <Plus className="w-5 h-5" />
          </button>
        }
      />

      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-20 flex-1 flex flex-col">
        {notes.length === 0 ? (
          <div className="bg-white border border-[#E8E2D9] rounded-2xl p-8 text-center my-auto shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-[#5B8266]/10 text-[#5B8266] flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7" />
            </div>
            <h2 className="text-base font-bold text-[#201A18] mb-1">
              No Notes Saved Yet
            </h2>
            <p className="text-xs text-[#5A524D] leading-relaxed max-w-xs mx-auto mb-6">
              When you finish leading a Table Group session, tap "Add Session Note" to record private reflections, prayer requests, and follow-ups.
            </p>
            <button
              id="empty-create-note-button"
              onClick={() => onNavigate({ type: 'add_note', topicTitle: 'General Discipleship Note' })}
              className="inline-flex items-center gap-2 bg-[#C1440E] hover:bg-[#a93b0c] text-white font-bold text-xs py-3 px-5 rounded-xl shadow-md transition-all active:scale-98"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Note</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                id={`note-card-${note.id}`}
                className="bg-white border border-[#E8E2D9] rounded-2xl p-4 shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#201A18] leading-snug">
                      {note.topicTitle}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#5A524D] mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(note.dateMillis)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleCopyNote(note)}
                      className="p-1.5 rounded-lg text-[#5A524D] hover:text-[#201A18] hover:bg-[#FAF8F5]"
                      title="Copy note text"
                    >
                      {copiedId === note.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(note.id)}
                      className="p-1.5 rounded-lg text-[#5A524D] hover:text-red-600 hover:bg-red-50"
                      title="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#201A18] leading-relaxed whitespace-pre-wrap bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9]/60">
                  {note.noteText}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xs w-full p-5 shadow-xl border border-[#E8E2D9]">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#201A18] mb-1">
              Delete this note?
            </h3>
            <p className="text-xs text-[#5A524D] mb-5 leading-relaxed">
              This action cannot be undone. The note will be permanently removed from this device.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 text-xs font-bold text-[#5A524D] hover:bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
