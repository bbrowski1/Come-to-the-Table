export interface Topic {
  id: string;
  number: number;
  title: string;
  primaryPassage: string;
  secondaryPassages: string[];
  icebreaker: string;
  questions: string[];
}

export interface GlobalPrompts {
  together: string;
  askHighsLows: string;
  readTheBible: string[];
  liveIt: string;
  pray: string;
  emptyChair: string;
}

export interface ProgramData {
  version: number;
  topics: Topic[];
  globalPrompts: GlobalPrompts;
}

export interface SessionNote {
  id: number;
  dateMillis: number;
  topicTitle: string;
  noteText: string;
}

export type ScreenRoute =
  | { type: 'home' }
  | { type: 'topics' }
  | { type: 'topic_detail'; topicId: string }
  | { type: 'passage_search' }
  | { type: 'session_runner'; topicId: string }
  | { type: 'add_note'; topicTitle: string }
  | { type: 'notes_list' }
  | { type: 'leader_resources' }
  | { type: 'about' }
  | { type: 'android_code' };

export enum TableStepKey {
  TOGETHER = 'TOGETHER',
  ASK = 'ASK',
  BIBLE = 'BIBLE',
  LIVE_IT = 'LIVE_IT',
  EMPTY_CHAIR = 'EMPTY_CHAIR',
}

export interface TableStepInfo {
  key: TableStepKey;
  letter: string;
  title: string;
  color: string;
  bgLight: string;
  borderLight: string;
  description: string;
}
