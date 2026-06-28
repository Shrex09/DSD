import React from "react";
import { Link } from "react-router-dom";
import { ShieldAlert, Terminal, CornerDownLeft } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { ROUTES } from "@/constants";

/**
 * 404 Not Found page.
 * Rendered automatically for all unmatched routes.
 */
const NotFound = (): React.JSX.Element => {
  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center bg-primary px-6 py-16 overflow-hidden">
      <SEO
        title="Access Restricted (404)"
        description="The page you are looking for does not exist or has been relocated."
      />

      {/* Radar scanning background decoration */}
      <div
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        <div className="relative w-[500px] h-[500px] rounded-full border border-accent flex items-center justify-center">
          <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-accent" />
          <div className="absolute w-[300px] h-[300px] rounded-full border border-accent" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-accent" />
          <div className="absolute w-[100px] h-[100px] rounded-full border border-accent" />
          <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 origin-top-left bg-gradient-to-tr from-accent/20 to-transparent -translate-x-full -translate-y-full rounded-tl-full animate-radar" />
        </div>
      </div>

      {/* Core Warning Content */}
      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center gap-6">
        {/* Animated warning shield */}
        <div className="relative flex items-center justify-center w-24 h-24 bg-white/5 border border-white/10 rounded-full shadow-lg">
          <ShieldAlert className="w-12 h-12 text-accent animate-pulse-slow" aria-hidden="true" />
          <div
            className="absolute inset-0 rounded-full border border-accent/30 animate-ping"
            aria-hidden="true"
          />
        </div>

        {/* Warning Logs Console */}
        <div className="w-full bg-primary-dark/80 rounded border border-white/10 p-4 font-mono text-left text-xs text-slate-400 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
            <Terminal className="w-4 h-4 text-accent" aria-hidden="true" />
            <span className="text-white font-bold uppercase tracking-wider">Security Console</span>
          </div>
          <p className="text-red-400 font-semibold">[WARNING] ACCESS_VIOLATION</p>
          <p className="mt-1">STATUS: 404_PAGE_NOT_FOUND</p>
          <p className="mt-1">TARGET: {window.location.pathname}</p>
          <p className="mt-1 text-slate-500">IP: REDACTED // PORT: 443</p>
          <p className="mt-2 text-accent animate-pulse">&gt; SCANNING PERIMETER FOR THREATS...</p>
        </div>

        {/* Informative text */}
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
            Secure Perimeter
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            The resource you are attempting to access is restricted, relocated, or does not exist.
            Please check the URL or report this log to the network administrator.
          </p>
        </div>

        {/* Button back */}
        <Link
          to={ROUTES.HOME}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent hover:bg-accent-hover text-primary font-bold uppercase tracking-wider text-xs rounded transition-all duration-300 shadow-gold hover:-translate-y-0.5"
        >
          <CornerDownLeft className="w-4 h-4" aria-hidden="true" />
          <span>Return to Command Center</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
