import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Terminal, CornerDownLeft, RefreshCw } from "lucide-react";
import SEO from "@/modules/public/components/common/SEO";
import { ROUTES } from "@/constants";

/**
 * 500 Internal Server Error page.
 * Rendered by ErrorBoundary on an uncaught React error, or navigated to directly.
 */
const ServerError = (): React.JSX.Element => {
  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center bg-primary px-6 py-16 overflow-hidden">
      <SEO
        title="Server Error (500)"
        description="An internal server error occurred. Our team has been notified."
      />

      {/* Radar scanning background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-0">
        <div className="relative w-[500px] h-[500px] rounded-full border border-red-500 flex items-center justify-center">
          <div className="absolute w-[350px] h-[350px] rounded-full border border-dashed border-red-500" />
          <div className="absolute w-[200px] h-[200px] rounded-full border border-red-500" />
          <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 origin-top-left bg-gradient-to-tr from-red-500/20 to-transparent -translate-x-full -translate-y-full rounded-tl-full animate-radar" />
        </div>
      </div>

      <div className="relative z-10 max-w-lg w-full text-center flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center w-24 h-24 bg-white/5 border border-white/10 rounded-full shadow-lg">
          <AlertTriangle className="w-12 h-12 text-red-400 animate-pulse-slow" />
          <div className="absolute inset-0 rounded-full border border-red-400/30 animate-ping" />
        </div>

        <div className="w-full bg-primary-dark/80 rounded border border-white/10 p-4 font-mono text-left text-xs text-slate-400 shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
            <Terminal className="w-4 h-4 text-red-400" />
            <span className="text-white font-bold uppercase tracking-wider">Error Console</span>
          </div>
          <p className="text-red-400 font-semibold">[CRITICAL] INTERNAL_SERVER_ERROR</p>
          <p className="mt-1">STATUS: 500_SYSTEM_FAILURE</p>
          <p className="mt-1 text-slate-500">INCIDENT: LOGGED // TEAM: NOTIFIED</p>
          <p className="mt-2 text-red-400 animate-pulse">&gt; INITIATING SYSTEM DIAGNOSTICS...</p>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
            System Failure
          </h2>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            An internal server error occurred. Our engineering team has been automatically notified.
            Please try again in a few moments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-xs rounded transition-all duration-300 border border-white/10"
            aria-label="Reload page"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reload Page</span>
          </button>
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-primary font-bold uppercase tracking-wider text-xs rounded transition-all duration-300 shadow-gold hover:-translate-y-0.5"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
