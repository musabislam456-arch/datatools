'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, Binary, Sparkles } from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { TablePreview } from '@/components/TablePreview';
import { csvToJson } from '@/lib/converters';
import { CsvToJsonOptions } from '@/lib/types';
import { SAMPLES } from '@/lib/data-samples';

export function CsvToJsonView() {
  const [input, setInput] = useState<string>(SAMPLES.csvToJson.simple);
  const [options, setOptions] = useState<CsvToJsonOptions>({
    delimiter: 'auto',
    hasHeaders: true,
    parseTypes: true,
    skipEmptyLines: true,
  });

  const { output, previewHeaders, previewRows, rowCount, error } = useMemo(() => {
    if (!input.trim()) {
      return {
        output: '',
        previewHeaders: [],
        previewRows: [],
        rowCount: 0,
        error: undefined,
      };
    }

    const res = csvToJson(input, options);
    if (res.error) {
      return {
        output: '',
        previewHeaders: [],
        previewRows: [],
        rowCount: 0,
        error: res.error,
      };
    }

    const mapped = res.previewRows.map((item) =>
      res.headers.map((h) => item[h])
    );

    return {
      output: res.output,
      previewHeaders: res.headers,
      previewRows: mapped,
      rowCount: res.rowCount,
      error: undefined,
    };
  }, [input, options]);

  return (
    <div className="space-y-4">
      {/* Configuration Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1426] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Delimiter:</span>
          </div>

          <div className="flex items-center bg-[#070b14] p-1 rounded-lg border border-slate-700/80 text-xs">
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, delimiter: 'auto' }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.delimiter === 'auto'
                  ? 'bg-purple-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Auto-Detect
            </button>
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, delimiter: ',' }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.delimiter === ','
                  ? 'bg-purple-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Comma ( , )
            </button>
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, delimiter: ';' }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.delimiter === ';'
                  ? 'bg-purple-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Semicolon ( ; )
            </button>
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, delimiter: '\t' }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.delimiter === '\t'
                  ? 'bg-purple-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tab (\t)
            </button>
          </div>

          {/* First row is header */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.hasHeaders}
              onChange={(e) =>
                setOptions((o) => ({ ...o, hasHeaders: e.target.checked }))
              }
              className="rounded bg-slate-900 border-slate-700 text-purple-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>First Row Contains Column Names</span>
          </label>

          {/* Parse numbers and booleans */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.parseTypes}
              onChange={(e) =>
                setOptions((o) => ({ ...o, parseTypes: e.target.checked }))
              }
              className="rounded bg-slate-900 border-slate-700 text-purple-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Smart Type Casting (Numbers &amp; Booleans)</span>
          </label>
        </div>

        {/* Sample Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Samples:</span>
          <button
            type="button"
            onClick={() => setInput(SAMPLES.csvToJson.simple)}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Product Catalog
          </button>
          <button
            type="button"
            onClick={() => setInput(SAMPLES.csvToJson.financial)}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Financial Ledger
          </button>
        </div>
      </div>

      {/* Split Editors: CSV -> JSON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CodeEditor
          id="csv-to-json-input"
          title="Raw CSV Text"
          language="csv"
          value={input}
          onChange={setInput}
          placeholder="Paste CSV text here..."
          error={error}
          onLoadSample={() => setInput(SAMPLES.csvToJson.simple)}
          sampleLabel="Load Sample"
          fileExtension="csv"
          fileName="source-table"
        />

        <CodeEditor
          id="csv-to-json-output"
          title="Structured JSON Output"
          language="json"
          value={output}
          readOnly={true}
          placeholder="Parsed JSON array will generate here..."
          fileExtension="json"
          fileName="parsed-data"
        />
      </div>

      {/* Tabular Preview */}
      {previewHeaders.length > 0 && (
        <TablePreview
          headers={previewHeaders}
          rows={previewRows}
          totalRows={rowCount}
          title="Parsed CSV Grid Structure"
        />
      )}
    </div>
  );
}
