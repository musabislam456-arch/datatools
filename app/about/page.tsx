import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Code2,
  ShieldCheck,
  Cpu,
  Lock,
  Terminal,
  ArrowRight,
  Sparkles,
  ServerOff,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'About DataTools — Our Mission & Client-Side Architecture',
  description:
    'Learn why we built DataTools: zero-telemetry, developer-focused data format converters running 100% in your browser without backend data exfiltration.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Architecture &amp; Mission</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built by Engineers, for Engineers Who Value Privacy.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            Every day, thousands of developers paste proprietary JSON payloads, API authentication keys, customer CSV rosters, and configuration secrets into generic online formatters. Most don&apos;t realize those strings are sent across the open internet into third-party servers.
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-10 text-slate-300">
          <section className="p-8 rounded-2xl border border-slate-800 bg-[#0d1426]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ServerOff className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">
                The Zero-Server Architecture
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              DataTools was conceived with a strict rule: <strong className="text-white">compute belongs on the client</strong>. Modern web browsers have access to fast V8 engines, Web Workers, and WebAssembly. There is zero architectural justification for transmitting a developer&apos;s data to an external server just to format an indentation or parse a CSV table.
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800 flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Zero telemetry or tracking cookies</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800 flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Works 100% offline once loaded</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800 flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>No backend payload storage or caching</span>
              </div>
              <div className="p-3 rounded-lg bg-[#070b14] border border-slate-800 flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Sub-millisecond execution speeds</span>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Our Engineering Standards</h2>
            <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
              <p>
                We believe utility websites should look and feel like production IDE tools. That means dark-navy-first aesthetics, high-contrast typography, exact line and column syntax error callouts, and clean, unbloated controls.
              </p>
              <p>
                Whether you are debugging a broken JSON webhook payload, transforming customer CSV data for your PostgreSQL database, merging multiple Helm configs, or unraveling legacy XML SOAP responses, DataTools gives you the speed, clarity, and safety you require.
              </p>
            </div>
          </section>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Ready to transform data securely?
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Experience the difference of zero-latency, zero-leak utilities.
              </p>
            </div>
            <Link
              href="/tools"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
