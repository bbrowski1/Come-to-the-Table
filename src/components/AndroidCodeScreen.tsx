import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  ChevronRight, 
  Download,
  FolderOpen
} from 'lucide-react';
import { ScreenRoute } from '../types';
import { TopHeader } from './TopHeader';
import { ANDROID_FILES, AndroidProjectFile } from '../data/androidProjectSource';

interface AndroidCodeScreenProps {
  onNavigate: (route: ScreenRoute) => void;
}

export const AndroidCodeScreen: React.FC<AndroidCodeScreenProps> = ({
  onNavigate
}) => {
  const [selectedFile, setSelectedFile] = useState<AndroidProjectFile>(ANDROID_FILES[2]); // app/build.gradle.kts or MainActivity.kt
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const blob = new Blob([selectedFile.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = selectedFile.path.split('/').pop() || 'android-file.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <TopHeader 
        title="Android Native Project" 
        subtitle="Original Kotlin & Compose Codebase"
        onBack={() => onNavigate({ type: 'home' })}
      />

      <div className="max-w-md mx-auto w-full px-4 pt-4 pb-20 flex-1 flex flex-col space-y-3">
        {/* Info banner */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <FolderOpen className="w-4 h-4 text-[#C1440E]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#201A18]">
              Project Structure
            </h3>
          </div>
          <p className="text-xs text-[#5A524D] leading-relaxed">
            Here are the source files for the native Android build (Kotlin 1.9+, Compose BOM 2024.04.01, Room 2.6.1). You can inspect or copy any file below.
          </p>
        </div>

        {/* File Selector Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {ANDROID_FILES.map((file) => {
            const fileName = file.path.split('/').pop();
            const isSelected = selectedFile.path === file.path;
            return (
              <button
                key={file.path}
                onClick={() => setSelectedFile(file)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex-shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#C1440E] text-white shadow-sm'
                    : 'bg-white text-[#5A524D] border border-[#E8E2D9] hover:border-[#C1440E]/50'
                }`}
              >
                {fileName}
              </button>
            );
          })}
        </div>

        {/* Code Viewer Card */}
        <div className="bg-[#1E1E1E] text-gray-200 rounded-2xl overflow-hidden shadow-md flex-1 flex flex-col border border-gray-800">
          <div className="bg-[#2D2D2D] px-4 py-2.5 flex items-center justify-between border-b border-gray-700">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <FileCode className="w-4 h-4 text-[#D9822B] flex-shrink-0" />
              <span className="text-xs font-mono text-gray-300 truncate">
                {selectedFile.path}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                title="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleDownloadFile}
                className="p-1.5 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 overflow-x-auto max-h-[500px] font-mono text-xs leading-relaxed text-gray-200 scrollbar-thin">
            <pre className="whitespace-pre">{selectedFile.code}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};
