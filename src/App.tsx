/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenRoute, SessionNote, ProgramData } from './types';
import { topicsRepository } from './data/topicsRepository';
import { notesRepository } from './data/notesRepository';
import { HomeScreen } from './components/HomeScreen';
import { TopicListScreen } from './components/TopicListScreen';
import { TopicDetailScreen } from './components/TopicDetailScreen';
import { PassageSearchScreen } from './components/PassageSearchScreen';
import { SessionRunnerScreen } from './components/SessionRunnerScreen';
import { AddNoteScreen } from './components/AddNoteScreen';
import { NotesListScreen } from './components/NotesListScreen';
import { LeaderResourcesScreen } from './components/LeaderResourcesScreen';
import { AboutScreen } from './components/AboutScreen';
import { AndroidCodeScreen } from './components/AndroidCodeScreen';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [routeHistory, setRouteHistory] = useState<ScreenRoute[]>([{ type: 'home' }]);
  const [notes, setNotes] = useState<SessionNote[]>([]);
  const [programData, setProgramData] = useState<ProgramData>(() => topicsRepository.getProgramData());

  // Current route is the last item in the history stack
  const currentRoute = routeHistory[routeHistory.length - 1] || { type: 'home' };

  // Load saved notes on mount
  useEffect(() => {
    refreshNotes();
  }, []);

  const refreshNotes = () => {
    setNotes(notesRepository.getNotes());
  };

  const handleNavigate = (newRoute: ScreenRoute) => {
    setRouteHistory((prev) => [...prev, newRoute]);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBack = () => {
    setRouteHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleImportTopics = (jsonString: string) => {
    const res = topicsRepository.importFromJson(jsonString);
    if (res.success) {
      setProgramData(topicsRepository.getProgramData());
    }
    return res;
  };

  const handleResetTopics = () => {
    const defaultData = topicsRepository.resetToDefault();
    setProgramData(defaultData);
  };

  // Find topic if needed
  const getTopic = (topicId?: string) => {
    if (!topicId) return programData.topics[0];
    return programData.topics.find((t) => t.id === topicId) || programData.topics[0];
  };

  return (
    <div className="min-h-screen bg-[#F0EBE1] text-[#201A18] flex justify-center selection:bg-[#C1440E]/20">
      {/* Startup Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* App Container */}
      <div className="w-full max-w-md min-h-screen bg-[#FAF8F5] flex flex-col shadow-2xl relative border-x border-[#E8E2D9]">
        {(() => {
          switch (currentRoute.type) {
            case 'home':
              return (
                <HomeScreen
                  onNavigate={handleNavigate}
                  topicCount={programData.topics.length}
                  notesCount={notes.length}
                />
              );

            case 'topics':
              return (
                <TopicListScreen
                  topics={programData.topics}
                  onNavigate={(route) => {
                    if (route.type === 'home') handleBack();
                    else handleNavigate(route);
                  }}
                  onImportTopics={handleImportTopics}
                  onResetTopics={handleResetTopics}
                  isCustomCurriculum={topicsRepository.isCustom()}
                />
              );

            case 'topic_detail': {
              const topic = getTopic(currentRoute.topicId);
              return (
                <TopicDetailScreen
                  topic={topic}
                  onNavigate={(route) => {
                    if (route.type === 'topics') handleBack();
                    else handleNavigate(route);
                  }}
                />
              );
            }

            case 'passage_search':
              return (
                <PassageSearchScreen
                  topics={programData.topics}
                  onNavigate={(route) => {
                    if (route.type === 'home') handleBack();
                    else handleNavigate(route);
                  }}
                />
              );

            case 'session_runner': {
              const topic = getTopic(currentRoute.topicId);
              return (
                <SessionRunnerScreen
                  topic={topic}
                  globalPrompts={programData.globalPrompts}
                  onNavigate={(route) => {
                    if (route.type === 'home') {
                      setRouteHistory([{ type: 'home' }]);
                    } else {
                      handleNavigate(route);
                    }
                  }}
                />
              );
            }

            case 'add_note':
              return (
                <AddNoteScreen
                  topicTitle={currentRoute.topicTitle}
                  onNavigate={(route) => {
                    if (route.type === 'home') {
                      setRouteHistory([{ type: 'home' }]);
                    } else if (route.type === 'notes_list') {
                      setRouteHistory([{ type: 'home' }, { type: 'notes_list' }]);
                    } else {
                      handleNavigate(route);
                    }
                  }}
                  onNoteAdded={refreshNotes}
                />
              );

            case 'notes_list':
              return (
                <NotesListScreen
                  notes={notes}
                  onNavigate={(route) => {
                    if (route.type === 'home') handleBack();
                    else handleNavigate(route);
                  }}
                  onRefreshNotes={refreshNotes}
                />
              );

            case 'leader_resources':
              return (
                <LeaderResourcesScreen
                  onNavigate={(route) => {
                    if (route.type === 'home') handleBack();
                    else handleNavigate(route);
                  }}
                />
              );

            case 'about':
              return (
                <AboutScreen
                  onNavigate={(route) => {
                    if (route.type === 'home') handleBack();
                    else handleNavigate(route);
                  }}
                  onPreviewSplash={() => setShowSplash(true)}
                />
              );

            case 'android_code':
              return (
                <AndroidCodeScreen
                  onNavigate={(route) => {
                    if (route.type === 'home') handleBack();
                    else handleNavigate(route);
                  }}
                />
              );

            default:
              return (
                <HomeScreen
                  onNavigate={handleNavigate}
                  topicCount={programData.topics.length}
                  notesCount={notes.length}
                />
              );
          }
        })()}
      </div>
    </div>
  );
}
