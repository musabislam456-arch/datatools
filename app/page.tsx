'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  FileSpreadsheet,
  Binary,
  Layers,
  FileCode2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Terminal,
  Lock,
  Cpu,
  Sparkles,
  CheckCircle2,
  BookOpen,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JsonFormatterView } from '@/components/tools/JsonFormatterView';
import { JsonToCsvView } from '@/components/tools/JsonToCsvView';
import { CsvToJsonView } from '@/components/tools/CsvToJsonView';
import { MergeJsonView } from '@/components/tools/MergeJsonView';
import { XmlToJsonView } from '@/components/tools/XmlToJsonView';
import { TOOLS_CONFIG } from '@/lib/tools-data';
import { BLOG_POSTS } from '@/lib/blog-data';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<string>('json-formatter');

  const getToolIcon = (id: string, className = 'w-4 h-4') => {
    switch (id) {
      case 'json-formatter':
        return <Code2 className={`${className} text-emerald-400`} />;
      case 'json-to-csv':
        return <FileSpreadsheet className={`${className} text-sky-400`} />;
      case 'csv-to-json':
        return <Binary className={`${className} text-purple-400`} />;
      case 'merge-json':
        return <Layers className={`${className} text-amber-400`} />;
      case 'xml-to-json':
        return <FileCode2 className={`${className} text-rose-400`} />;
      default:
        return <Code2 className={`${className} text-emerald-400`} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-10 border-b border-slate-800/80">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(16,185,129,0.12),transparent_70%)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs text-slate-300 font-mono mb-6 shadow-inner">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-semibold">CLIENT-SIDE DATA ENGINE</span>
                <span className="text-slate-600">&bull;</span>
                <span>Zero Latency &bull; 100% In-Browser</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Developer Data Tools, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
                  Engineered for Zero Data Leaks.
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
                Format JSON, convert to CSV, parse XML, and merge multiple configuration files with monospace code-editor precision. Every transformation executes locally in your browser memory.
              </p>

              {/* Quick Jump Badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {TOOLS_CONFIG.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                      activeTab === t.id
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {getToolIcon(t.id, 'w-3.5 h-3.5')}
                    <span>{t.shortName}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Interactive Studio Sandbox */}
        <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Interactive Studio Sandbox
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-500/30">
                Active: {TOOLS_CONFIG.find((t) => t.id === activeTab)?.name}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Link
                href={`/tools/${activeTab}`}
                className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 font-mono hover:underline"
              >
                <span>Open dedicated page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Active Workspace View */}
          <div className="rounded-2xl border border-slate-800/90 bg-[#070b14] p-2 sm:p-4 shadow-2xl">
            {activeTab === 'json-formatter' && <JsonFormatterView />}
            {activeTab === 'json-to-csv' && <JsonToCsvView />}
            {activeTab === 'csv-to-json' && <CsvToJsonView />}
            {activeTab === 'merge-json' && <MergeJsonView />}
            {activeTab === 'xml-to-json' && <XmlToJsonView />}
          </div>
        </section>

        {/* Architecture & Zero-Data-Leak Value Prop */}
        <section className="py-16 border-t border-slate-800/80 bg-[#070b14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Why Developers Choose DataTools
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Purpose-built to replace ad-supported online formatters that log your private database dumps, secrets, and customer logs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Zero Network Exfiltration
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Unlike traditional utility sites that send POST requests to a backend API to parse your strings, DataTools handles 100% of the computation in your local V8 JavaScript runtime.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Sub-Millisecond Execution
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  No roundtrip latency, no DNS lookup, and no rate limits. Paste a 10MB JSON file and format it instantly with multi-line quote awareness and syntax highlighting.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#0c1222] border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  Prototype Pollution Defense
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Our deep merge algorithm actively sanitizes <code className="text-amber-300 font-mono">__proto__</code>, <code className="text-amber-300 font-mono">constructor</code>, and <code className="text-amber-300 font-mono">prototype</code> properties, keeping dev teams safe from malicious config injections.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Developer Guides Teaser Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Format Architecture Insights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Developer Guides &amp; Whitepapers
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 group"
            >
              <span>View all guides</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <div
                key={post.slug}
                className="p-6 rounded-2xl border border-slate-800 bg-[#0d1426] flex flex-col justify-between hover:border-slate-700 transition-all group shadow-lg"
              >
                <div>
                  <div className="text-[11px] font-mono text-slate-500 mb-2">
                    {post.date} &bull; {post.readTime}
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    By {post.author.name}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1"
                  >
                    Read article &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
