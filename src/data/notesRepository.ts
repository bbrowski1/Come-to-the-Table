import { SessionNote } from '../types';

const STORAGE_KEY = 'come_to_the_table_session_notes';

export const notesRepository = {
  getNotes(): SessionNote[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Initial sample or empty
        return [];
      }
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => b.dateMillis - a.dateMillis);
      }
      return [];
    } catch (e) {
      console.error('Failed to load notes from localStorage', e);
      return [];
    }
  },

  addNote(topicTitle: string, noteText: string): SessionNote {
    const notes = this.getNotes();
    const newNote: SessionNote = {
      id: Date.now(),
      dateMillis: Date.now(),
      topicTitle,
      noteText: noteText.trim()
    };
    const updated = [newNote, ...notes];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save note to localStorage', e);
    }
    return newNote;
  },

  deleteNote(id: number): void {
    const notes = this.getNotes();
    const updated = notes.filter(n => n.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete note from localStorage', e);
    }
  }
};
