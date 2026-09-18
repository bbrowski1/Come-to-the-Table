import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TopHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  action?: React.ReactNode;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  title,
  subtitle,
  onBack,
  action
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] px-3.5 py-2.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5 min-w-0">
        {onBack && (
          <button
            id="header-back-button"
            onClick={onBack}
            className="p-1.5 -ml-1 rounded-full text-[#5A524D] hover:text-[#201A18] hover:bg-[#E8E2D9]/50 active:scale-95 transition-all flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        
        {/* The Salvation Army Red Shield Small Logo on Top Left */}
        <img
          id="header-redshield-logo"
          src="/RedshieldSM.png"
          alt="The Salvation Army"
          className="w-6 h-7 object-contain flex-shrink-0 drop-shadow-sm"
          referrerPolicy="no-referrer"
        />

        <div className="min-w-0 pr-1">
          <h1 className="text-base font-bold text-[#201A18] leading-tight tracking-tight truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] font-medium text-[#5A524D] tracking-wide truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="flex-shrink-0 ml-2">{action}</div>}
    </header>
  );
};
