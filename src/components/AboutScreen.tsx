import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  Heart,
  Code2
} from 'lucide-react';
import { ScreenRoute } from '../types';
import { TopHeader } from './TopHeader';

interface AboutScreenProps {
  onNavigate: (route: ScreenRoute) => void;
  onPreviewSplash?: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({
  onNavigate,
  onPreviewSplash
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = "central.division@sat.salvationarmy.org";

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FAF8F5] min-h-screen">
      <TopHeader 
        title="About & Listing" 
        subtitle="App Information & Assets"
        onBack={() => onNavigate({ type: 'home' })}
      />

      <div className="max-w-md mx-auto w-full px-4 pt-6 pb-20 flex-1 space-y-4">
        {/* App Info Card with CometotheTable_512.png */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-6 text-center shadow-sm">
          <div className="flex justify-center mb-4">
            <img
              id="about-badge-logo"
              src="/CometotheTable_512.png"
              alt="Come to the Table Logo"
              className="w-36 h-36 object-contain rounded-full shadow-lg border border-[#E8E2D9] hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>

          <h2 className="text-xl font-extrabold text-[#201A18]">
            Come to the Table
          </h2>
          <p className="text-xs font-bold text-[#C1440E] uppercase tracking-wider mt-0.5">
            Leader Facilitation Guide
          </p>
          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D9] text-[11px] font-semibold text-[#5A524D]">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>SAT Central Division</span>
          </div>

          {onPreviewSplash && (
            <div className="mt-4 pt-3 border-t border-[#E8E2D9]/60">
              <button
                id="replay-splash-button"
                onClick={onPreviewSplash}
                className="text-xs text-[#C1440E] hover:text-[#a93b0c] font-bold py-1.5 px-3 rounded-lg hover:bg-[#C1440E]/5 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Replay Startup Splash Screen</span>
              </button>
            </div>
          )}
        </div>

        {/* Play Store Listing Icon Section */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#201A18]">
              Google Play Store Listing Icon
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E8E2D9]/70 text-[#5A524D]">
              512 × 512 px
            </span>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9]">
            <img
              src="/CometotheTable_512.png"
              alt="Play Store Listing Icon 512x512"
              className="w-14 h-14 object-contain rounded-xl shadow-xs border border-[#E8E2D9]"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#201A18] truncate">
                CometotheTable_512.png
              </p>
              <p className="text-[11px] text-[#5A524D] leading-tight mt-0.5">
                Complies with official Google Play Console specifications (512x512 32-bit PNG).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <a
              id="download-play-store-icon"
              href="/CometotheTable_512.png"
              download="CometotheTable_512.png"
              className="flex-1 py-2 px-3 text-center rounded-xl bg-[#201A18] hover:bg-[#342D2B] text-white text-xs font-bold shadow-xs transition-colors"
            >
              Download Icon (512x512)
            </a>
            <a
              href="/CometotheTable_512.png"
              target="_blank"
              rel="noreferrer"
              className="py-2 px-3 rounded-xl border border-[#E8E2D9] hover:bg-[#FAF8F5] text-xs font-semibold text-[#5A524D] transition-colors"
            >
              View Full Size
            </a>
          </div>
        </div>

        {/* Purpose Statement */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-2.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#201A18]">
            Our Purpose & Vision
          </h3>
          <p className="text-xs text-[#5A524D] leading-relaxed">
            A free, offline-first facilitation companion created for Table Group leaders within <strong>The Salvation Army Central Division (Southern Africa Territory)</strong>.
          </p>
          <p className="text-xs text-[#5A524D] leading-relaxed">
            Rooted in Jesus' ministry around tables, this tool empowers everyday leaders to facilitate transformative discipleship groups using the simple, replicable <strong>T·A·B·L·E</strong> rhythm.
          </p>
        </div>

        {/* Privacy Notice */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8266]">
            <ShieldCheck className="w-4 h-4 text-[#5B8266]" />
            <span>Local & Private</span>
          </div>
          <p className="text-xs text-[#5A524D] leading-relaxed">
            This guide operates completely offline. All session reflections and leader notes are saved directly in your browser's private local storage. No accounts, ads, or remote tracking servers are used.
          </p>
        </div>

        {/* Contact & Feedback */}
        <div className="bg-white border border-[#E8E2D9] rounded-2xl p-5 shadow-sm space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#201A18]">
            Feedback & Inquiries
          </h3>
          <p className="text-xs text-[#5A524D] leading-relaxed">
            Have questions about Table Groups, leadership coaching, or curriculum topics? Contact the Central Division team:
          </p>
          <div className="flex items-center justify-between p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D9]">
            <div className="flex items-center gap-2 min-w-0 pr-2">
              <Mail className="w-4 h-4 text-[#C1440E] flex-shrink-0" />
              <span className="text-xs font-medium text-[#201A18] truncate">
                {email}
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="p-1.5 rounded-md hover:bg-white text-[#5A524D] hover:text-[#201A18] flex-shrink-0"
              title="Copy email address"
            >
              {copiedEmail ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Android Project Source Code Link */}
        <div className="bg-[#FAF8F5] border border-dashed border-[#C1440E]/40 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code2 className="w-5 h-5 text-[#C1440E]" />
            <div>
              <p className="text-xs font-bold text-[#201A18]">
                Android Kotlin Source Project
              </p>
              <p className="text-[11px] text-[#5A524D]">
                Inspect native Gradle and Jetpack Compose files
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigate({ type: 'android_code' })}
            className="px-3 py-1.5 bg-[#C1440E] hover:bg-[#a93b0c] text-white text-xs font-bold rounded-lg shadow-sm"
          >
            View Code
          </button>
        </div>

        {/* Closing Note */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-[#5A524D] italic flex items-center justify-center gap-1">
            Heart to God • Hand to Man <Heart className="w-3 h-3 text-[#C1440E] fill-[#C1440E]" />
          </p>
        </div>
      </div>
    </div>
  );
};
