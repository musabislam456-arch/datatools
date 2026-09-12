'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Binary,
  Code2,
  FileCode2,
  FileSpreadsheet,
  Layers,
  FileText,
  BookOpen,
  ShieldCheck,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from 'lucide-react';
import { TOOLS_CONFIG } from '@/lib/tools-data';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const getToolIcon = (id: string) => {
    switch (id) {
      case 'json-formatter':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
      case 'json-to-csv':
        return <FileSpreadsheet className="w-4 h-4 text-sky-400" />;
      case 'csv-to-json':
        return <Binary className="w-4 h-4 text-purple-400" />;
      case 'merge-json':
        return <Layers className="w-4 h-4 text-amber-400" />;
      case 'xml-to-json':
        return <FileCode2 className="w-4 h-4 text-rose-400" />;
      default:
        return <FileText className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-slate-100 font-semibold tracking-tight text-lg"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 group-hover:bg-emerald-500/20 transition-colors shadow-sm shadow-emerald-500/10">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-xl">
                Data<span className="text-emerald-400">Tools</span>
              </span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                v2.4
              </span>
            </div>
          </Link>

          {/* Privacy Guarantee Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Client-Side • Zero Data Upload</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors ${
                pathname.startsWith('/tools') ? 'text-emerald-400 bg-slate-800/40' : ''
              }`}
            >
              <span>Developer Tools</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  toolsDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-slate-400'
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-1 w-80 rounded-xl bg-[#0f1422] border border-slate-700/80 shadow-2xl shadow-black/80 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                  Core Data Utilities
                </div>
                {TOOLS_CONFIG.map((tool) => (
                  <Link
                    key={tool.id}
                    href={tool.path}
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-start gap-3 px-3 py-2.5 hover:bg-slate-800/60 transition-colors group"
                  >
                    <div className="mt-0.5 p-1.5 rounded bg-slate-800/80 border border-slate-700/50 group-hover:border-emerald-500/40 transition-colors">
                      {getToolIcon(tool.id)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                        {tool.name}
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {tool.description}
                      </p>
                    </div>
                  </Link>
                ))}
                <div className="mt-1 pt-2 border-t border-slate-800 px-3">
                  <Link
                    href="/tools"
                    onClick={() => setToolsDropdownOpen(false)}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 py-1"
                  >
                    View all tools overview →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/blog"
            className={`flex items-center gap-1.5 px-3 py-2 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors ${
              pathname.startsWith('/blog') ? 'text-emerald-400 bg-slate-800/40' : ''
            }`}
          >
            <BookOpen className="w-4 h-4 text-slate-400" />
            <span>Guides & Blog</span>
          </Link>

          <Link
            href="/about"
            className={`px-3 py-2 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors ${
              pathname === '/about' ? 'text-emerald-400 bg-slate-800/40' : ''
            }`}
          >
            About
          </Link>

          <Link
            href="/contact"
            className={`px-3 py-2 rounded-md hover:text-white hover:bg-slate-800/60 transition-colors ${
              pathname === '/contact' ? 'text-emerald-400 bg-slate-800/40' : ''
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* CTA Launch */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/tools/json-formatter"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-sm transition-all shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Studio</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/tools/json-formatter"
            className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 text-xs font-semibold"
          >
            Studio
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#090d16] px-4 pt-2 pb-6 space-y-3">
          <div className="px-2 py-1.5 text-xs font-mono uppercase text-slate-400">
            Developer Utilities
          </div>
          <div className="space-y-1">
            {TOOLS_CONFIG.map((tool) => (
              <Link
                key={tool.id}
                href={tool.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
              >
                {getToolIcon(tool.id)}
                <span>{tool.name}</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-1">
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>Developer Guides & Blog</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
            >
              About DataTools
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
            >
              Contact Support
            </Link>
          </div>

          <div className="pt-2">
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All transformations run 100% locally in your browser memory.</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
