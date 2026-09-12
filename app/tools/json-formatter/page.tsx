import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { JsonFormatterView } from '@/components/tools/JsonFormatterView';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator — Clean, Pretty-Print & Validate JSON',
  description:
    'Free online JSON Formatter and Validator. Prettify, minify, sort keys, unescape strings, and fix syntax errors with exact line and column indicators. 100% private, client-side execution.',
  keywords: [
    'json formatter',
    'json validator',
    'prettify json',
    'minify json',
    'format json online',
    'json error locator',
  ],
};

export default function JsonFormatterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolHeader currentToolId="json-formatter" />

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            JSON Formatter &amp; Validator
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Format, pretty-print, validate, and minify JSON data with instant error callouts and syntax highlighting.
          </p>
        </div>

        <JsonFormatterView />

        {/* Documentation / Explanatory Section for SEO & Developer Context */}
        <section className="mt-14 border-t border-slate-800 pt-10 text-slate-300">
          <h2 className="text-lg font-bold text-white mb-4">
            About the DataTools JSON Engine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Exact Syntax Error Pinpointing
              </h3>
              <p>
                Unlike generic validators that only report &ldquo;Unexpected token&rdquo;, DataTools calculates the precise row and column position inside your payload, highlighting the offending line directly in the code editor gutter.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Alphabetical Key Sorting
              </h3>
              <p>
                Standardize configuration files and diffs across git commits by sorting nested object keys alphabetically. Ideal for reproducible infrastructure-as-code manifests.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Zero Server Uploads
              </h3>
              <p>
                Your API tokens, database credentials, and production logs remain strictly inside your browser&apos;s memory sandbox. Zero bytes ever touch a network socket.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
