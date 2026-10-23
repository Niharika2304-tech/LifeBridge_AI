import React from 'react';
import { AlertTriangle, PhoneCall } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <aside aria-label="Emergency Services Disclaimer" className="w-full bg-brand-navy-950 border-b border-brand-teal-500/20 py-2.5 px-4 no-print">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-300 text-center sm:text-left">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-white font-semibold">Immediate Emergency Protocol:</strong> If someone is in imminent physical danger or there is active fire, electrocution, or severe trauma, dial <strong className="text-brand-teal-300">112</strong> (India National Emergency) or <strong className="text-brand-teal-300">911</strong> (US/Intl) immediately. LifeBridge AI is an assistive structuring engine, not a live dispatch system.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:112"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 font-bold text-[11px] transition-colors"
            title="Dial 112 (National Emergency Support System)"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Emergency 112</span>
          </a>
          <a
            href="https://112.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline text-[11px] text-slate-400 hover:text-brand-teal-300 underline underline-offset-2"
          >
            112.gov.in
          </a>
        </div>
      </div>
    </aside>
  );
};
