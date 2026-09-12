import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2,
  FileSpreadsheet,
  Binary,
  Layers,
  FileCode2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TOOLS_CONFIG } from '@/lib/tools-data';

export const metadata: Metadata = {
  title: 'All Developer Tools — Data Format Utilities',
  description:
    'Explore our suite of 100% client-side data format utilities: JSON Formatter & Validator, JSON to CSV, CSV to JSON, Merge JSON, and XML to JSON converters.',
};

export default function ToolsOverviewPage() {
  const getToolIcon = (id: string) => {
    switch (id) {
      case 'json-formatter':
        return <Code2 className="w-6 h-6 text-emerald-400" />;
      case 'json-to-csv':
        return <FileSpreadsheet className="w-6 h-6 text-sky-400" />;
      case 'csv-to-json':
        return <Binary className="w-6 h-6 text-purple-400" />;
      case 'merge-json':
        return <Layers className="w-6 h-6 text-amber-400" />;
      case 'xml-to-json':
        return <FileCode2 className="w-6 h-6 text-rose-400" />;
      default:
        return <Code2 className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero Server Latency &bull; 100% In-Memory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Developer Data Utility Suite
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-400 max-w-3xl leading-relaxed">
            Five mission-critical tools crafted for backend engineers, frontend developers, and data practitioners. Every transformation executes locally inside your browser sandbox with syntax highlighting, exact line error reporting, and one-click exports.
          </p>
        </div>

        {/* Tools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS_CONFIG.map((tool) => (
            <div
              key={tool.id}
              className="rounded-xl border border-slate-800 bg-[#0d1426] p-6 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {getToolIcon(tool.id)}
                  </div>
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {tool.badge}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {tool.name}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {tool.description}
                </p>

                {/* Key Features */}
                <div className="mt-5 space-y-1.5 border-t border-slate-800/80 pt-4">
                  {tool.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-slate-300 font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60">
                <Link
                  href={tool.path}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-slate-200 text-xs font-semibold transition-all group-hover:shadow-md"
                >
                  <span>Launch Tool</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Security & Reliability Callout */}
        <div className="mt-16 p-8 rounded-2xl border border-slate-800 bg-gradient-to-br from-[#0c1222] to-[#080c16] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Enterprise Compliance Safe</span>
            </div>
            <h3 className="text-xl font-bold text-white">
              Why Engineers Trust DataTools for Sensitive Payloads
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Unlike generic online converters that POST customer data, API keys, or financial logs to backend analytics queues, DataTools operates completely client-side in your local browser sandbox. Unplug your internet connection: every tool continues working without interruption.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                GDPR &amp; HIPAA Safe
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Zero Analytics Snooping
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Works Completely Offline
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
