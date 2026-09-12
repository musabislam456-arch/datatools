import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { CsvToJsonView } from '@/components/tools/CsvToJsonView';

export const metadata: Metadata = {
  title: 'CSV to JSON Converter — Parse CSV to Structured JSON Objects',
  description:
    'Convert CSV and TSV spreadsheets into structured JSON arrays. Automatic delimiter detection, smart number and boolean type casting, and table preview.',
  keywords: [
    'csv to json',
    'convert csv to json',
    'tsv to json',
    'csv parser',
    'csv to json online',
  ],
};

export default function CsvToJsonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolHeader currentToolId="csv-to-json" />

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            CSV to JSON Converter
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Convert tabular CSV documents, TSV exports, or raw spreadsheet rows into clean, typed JSON data structures.
          </p>
        </div>

        <CsvToJsonView />

        {/* Technical Guide Callout */}
        <section className="mt-14 border-t border-slate-800 pt-10 text-slate-300">
          <h2 className="text-lg font-bold text-white mb-4">
            Under the Hood: Reliable CSV Parsing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Automatic Delimiter Detection
              </h3>
              <p>
                Our parser analyzes frequency distributions of candidate characters across the header lines, reliably detecting whether the file uses commas, semicolons, tabs, or pipe symbols.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Intelligent Type Coercion
              </h3>
              <p>
                Strings like <code className="text-purple-300 font-mono">&quot;42.5&quot;</code> and <code className="text-purple-300 font-mono">&quot;true&quot;</code> are cast into native JSON numbers and booleans, while strings with leading zeros (e.g. zip codes <code className="text-purple-300 font-mono">&quot;07030&quot;</code>) are preserved safely.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Multiline Quoted Cells
              </h3>
              <p>
                Supports standard RFC 4180 multiline cells containing embedded newlines and quotes without accidentally splitting records across broken rows.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
