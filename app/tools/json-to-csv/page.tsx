import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { JsonToCsvView } from '@/components/tools/JsonToCsvView';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter — Flatten & Export Tabular Data',
  description:
    'Convert JSON arrays and nested object hierarchies into clean RFC 4180 CSV files. Custom delimiters (comma, tab, semicolon, pipe), table preview, and instant export.',
  keywords: [
    'json to csv',
    'convert json to csv',
    'json to excel',
    'flatten json to csv',
    'csv exporter',
  ],
};

export default function JsonToCsvPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolHeader currentToolId="json-to-csv" />

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            JSON to CSV Converter
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Convert structured JSON arrays or nested object lists into clean, RFC 4180 compliant CSV tables with interactive grid previews.
          </p>
        </div>

        <JsonToCsvView />

        {/* Technical Guide Callout */}
        <section className="mt-14 border-t border-slate-800 pt-10 text-slate-300">
          <h2 className="text-lg font-bold text-white mb-4">
            How JSON to CSV Flattening Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Dot Notation Key Flattening
              </h3>
              <p>
                Nested properties like <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded font-mono">&quot;user&quot;: &#123; &quot;city&quot;: &quot;SF&quot; &#125;</code> are recursively normalized into flat spreadsheet headers like <code className="text-sky-300 bg-slate-900 px-1 py-0.5 rounded font-mono">user.city</code> for seamless Excel and pandas analysis.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                RFC 4180 Escaping Compliance
              </h3>
              <p>
                Cells containing commas, double quotes, or embedded line breaks are automatically wrapped in double quotes with quote-doubling escape sequences, preventing corrupted row shifts in downstream parsers.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Flexible Delimiters
              </h3>
              <p>
                Easily switch between standard commas, European semicolons (<code className="text-sky-300 font-mono">;</code>), tab-separated values (TSV), and custom pipe characters (<code className="text-sky-300 font-mono">|</code>).
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
