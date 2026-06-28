import React from "react";
import { Shield, Clock } from "lucide-react";
import SEO from "@/modules/public/components/common/SEO";

/**
 * Maintenance mode page.
 * Displayed when the site is temporarily taken offline for updates.
 */
const Maintenance = (): React.JSX.Element => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-primary px-6 py-16 overflow-hidden">
      <SEO
        title="Under Maintenance"
        description="The site is currently undergoing scheduled maintenance. We will be back shortly."
      />

      {/* Animated radar circles background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-0">
        <div className="relative w-[600px] h-[600px] rounded-full border border-accent">
          <div className="absolute inset-8 rounded-full border border-dashed border-accent" />
          <div className="absolute inset-16 rounded-full border border-accent" />
          <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 origin-top-left bg-gradient-to-tr from-accent/20 to-transparent -translate-x-full -translate-y-full rounded-tl-full animate-radar" />
        </div>
      </div>

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center gap-8">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3">
          <Shield className="w-10 h-10 text-accent fill-accent/10" />
          <span className="font-extrabold uppercase tracking-widest text-2xl text-white">
            DSD<span className="text-accent">.</span>
          </span>
        </div>

        {/* Clock icon */}
        <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center">
          <Clock className="w-12 h-12 text-accent animate-pulse-slow" />
        </div>

        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider mb-3">
            Scheduled Maintenance
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
            Our operations team is performing scheduled system upgrades to improve security and
            performance. We will be back online shortly.
          </p>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
          <div className="w-2 h-2 bg-accent rounded-full animate-ping" />
          <span className="text-xs font-bold uppercase tracking-widest text-accent">
            System Upgrade In Progress
          </span>
        </div>

        <p className="text-xs text-slate-500 font-mono">
          For urgent security matters: call our 24/7 operations line directly.
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
