import { ProgramData, Topic, GlobalPrompts } from '../types';
import { defaultProgramData } from './topicsData';

const TOPICS_STORAGE_KEY = 'come_to_the_table_custom_program_data';

export const topicsRepository = {
  getProgramData(): ProgramData {
    try {
      const stored = localStorage.getItem(TOPICS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && Array.isArray(parsed.topics) && parsed.topics.length > 0) {
          return {
            version: parsed.version || 1,
            topics: parsed.topics,
            globalPrompts: parsed.globalPrompts || defaultProgramData.globalPrompts
          };
        }
      }
    } catch (e) {
      console.error('Failed to parse custom program data from localStorage', e);
    }
    return defaultProgramData;
  },

  setProgramData(data: ProgramData): void {
    try {
      localStorage.setItem(TOPICS_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save program data to localStorage', e);
    }
  },

  resetToDefault(): ProgramData {
    try {
      localStorage.removeItem(TOPICS_STORAGE_KEY);
    } catch (e) {
      console.error('Failed to clear custom program data', e);
    }
    return defaultProgramData;
  },

  isCustom(): boolean {
    try {
      return !!localStorage.getItem(TOPICS_STORAGE_KEY);
    } catch {
      return false;
    }
  },

  importFromJson(jsonString: string): { success: boolean; count: number; error?: string } {
    try {
      const parsed = JSON.parse(jsonString);
      let topics: Topic[] = [];
      let globalPrompts: GlobalPrompts = defaultProgramData.globalPrompts;

      if (Array.isArray(parsed)) {
        topics = parsed;
      } else if (parsed && Array.isArray(parsed.topics)) {
        topics = parsed.topics;
        if (parsed.globalPrompts) {
          globalPrompts = {
            ...defaultProgramData.globalPrompts,
            ...parsed.globalPrompts
          };
        }
      } else {
        return { success: false, count: 0, error: 'JSON must contain a "topics" array or be an array of topic objects.' };
      }

      if (topics.length === 0) {
        return { success: false, count: 0, error: 'No topics found in the provided JSON.' };
      }

      // Validate & normalize topics
      const normalizedTopics: Topic[] = topics.map((t, idx) => ({
        id: t.id || `topic-${idx + 1}`,
        number: typeof t.number === 'number' ? t.number : idx + 1,
        title: t.title || `Topic ${idx + 1}`,
        primaryPassage: t.primaryPassage || '',
        secondaryPassages: Array.isArray(t.secondaryPassages) ? t.secondaryPassages : [],
        icebreaker: t.icebreaker || 'Share what stood out to you this week.',
        questions: Array.isArray(t.questions) && t.questions.length > 0 
          ? t.questions 
          : ['What stands out to you from this passage?']
      }));

      const newProgramData: ProgramData = {
        version: parsed.version || 1,
        topics: normalizedTopics,
        globalPrompts
      };

      this.setProgramData(newProgramData);
      return { success: true, count: normalizedTopics.length };
    } catch (err: any) {
      return { success: false, count: 0, error: err.message || 'Invalid JSON format' };
    }
  }
};
