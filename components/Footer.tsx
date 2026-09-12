import React from 'react';
import Link from 'next/link';
import { Code2, ShieldCheck, Terminal, Cpu, Lock } from 'lucide-react';
import { TOOLS_CONFIG } from '@/lib/tools-data';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#060910] text-slate-400 text-sm">
      {/* Upper Security & Architecture Banner */}
      <div className="border-b border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-emerald-400 font-semibold">ZERO-TELEMETRY GUARANTEE</span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">
              Input payloads are never transmitted to any external server or telemetry pipeline.
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" />
              Client Memory Only
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3 text-sky-400" />
              Wasm / V8 Native
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Branding & Manifesto */}
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
            <span>
              Data<span className="text-emerald-400">Tools</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            High-performance, developer-first data transformation suite. Built for engineers, data analysts, and DevOps teams demanding instant local parsing without data leaks.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>Node.js &bull; Next.js &bull; Tailwind CSS</span>
          </div>
        </div>

        {/* Col 2: Core Tools */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Core Utilities
          </h3>
          <ul className="space-y-2 text-xs">
            {TOOLS_CONFIG.map((tool) => (
              <li key={tool.id}>
                <Link
                  href={tool.path}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <span className="text-slate-600 font-mono">›</span>
                  <span>{tool.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Developer Guides */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Developer Guides
          </h3>
          <ul className="space-y-2.5 text-xs">
            <li>
              <Link
                href="/blog/json-vs-csv-streaming-vs-nesting"
                className="hover:text-emerald-400 transition-colors line-clamp-1"
              >
                JSON vs CSV: When to Stream, When to Nest
              </Link>
            </li>
            <li>
              <Link
                href="/blog/safely-parsing-xml-modern-javascript"
                className="hover:text-emerald-400 transition-colors line-clamp-1"
              >
                Safely Parsing XML in Modern JavaScript
              </Link>
            </li>
            <li>
              <Link
                href="/blog/deep-merging-json-prototype-pollution-protection"
                className="hover:text-emerald-400 transition-colors line-clamp-1"
              >
                Deep Merging JSON & Prototype Defense
              </Link>
            </li>
            <li className="pt-1">
              <Link
                href="/blog"
                className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
              >
                Browse all guides &rarr;
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform & Legal */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-200 mb-3">
            Platform &amp; Legal
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/about" className="hover:text-emerald-400 transition-colors">
                About DataTools
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                Contact &amp; Issue Report
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                Privacy Policy (Zero Storage)
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                Terms of Service
              </Link>
            </li>
            <li className="pt-2">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400">
                DataTools runs client-side in your browser. No data is stored, logged, or proxied through our servers.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} DataTools Inc. All rights reserved. Designed for professional software engineers.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <span>&bull;</span>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
