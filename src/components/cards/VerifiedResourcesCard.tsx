import React from 'react';
import { 
  ShieldCheck, 
  Globe, 
  Info,
  PhoneCall,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { VerifiedResource } from '../../types';

interface VerifiedResourcesCardProps {
  resources: VerifiedResource[];
}

export const VerifiedResourcesCard: React.FC<VerifiedResourcesCardProps> = ({ resources }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-brand-teal-500/20 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-teal-500/10 text-brand-teal-400 border border-brand-teal-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Genuinely Verified Official Resources
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-teal-500/15 text-brand-teal-300 border border-brand-teal-500/30">
                Official Registries
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Direct access to authenticated government portals and verified public hotlines
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4" />
          <span>Zero Fabricated Contacts</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {resources.map((resource, index) => {
          const isPhone = resource.contactType === 'phone';
          const telHref = isPhone ? `tel:${resource.contact.replace(/[^\d+]/g, '')}` : undefined;

          return (
            <div
              key={index}
              className="p-4 rounded-xl bg-brand-navy-900/80 border border-slate-800 hover:border-brand-teal-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-navy-950 text-slate-400 border border-slate-800 line-clamp-1">
                    {resource.agency}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-brand-teal-400 font-medium shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-brand-teal-300 transition-colors mb-1.5">
                  {resource.name}
                </h4>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed line-clamp-3">
                  {resource.note}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="text-xs font-mono font-bold text-brand-teal-300 truncate">
                  {resource.contact}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {resource.url && (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-brand-navy-950 hover:bg-brand-navy-800 text-slate-300 hover:text-white border border-slate-700 transition-colors font-medium"
                      title={`Visit ${resource.name} portal`}
                    >
                      <Globe className="w-3 h-3 text-brand-teal-400" />
                      <span>Portal</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                    </a>
                  )}

                  {isPhone && telHref && (
                    <a
                      href={telHref}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-brand-teal-500/20 hover:bg-brand-teal-500/30 text-brand-teal-300 border border-brand-teal-500/30 font-semibold transition-colors"
                      title="Direct phone link"
                    >
                      <PhoneCall className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 rounded-lg bg-brand-navy-950/70 border border-slate-800 flex items-center gap-2 text-xs text-slate-400">
        <Info className="w-4 h-4 text-brand-teal-400 shrink-0" />
        <span>
          LifeBridge AI structures and contextualizes official information. We do not dispatch personnel or access internal CAD dispatch feeds without your explicit calling.
        </span>
      </div>
    </div>
  );
};
