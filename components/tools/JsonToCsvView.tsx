'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, FileSpreadsheet, Layers, ArrowRight } from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { TablePreview } from '@/components/TablePreview';
import { jsonToCsv } from '@/lib/converters';
import { JsonToCsvOptions } from '@/lib/types';
import { SAMPLES } from '@/lib/data-samples';

export function JsonToCsvView() {
  const [input, setInput] = useState<string>(SAMPLES.jsonToCsv.users);
  const [options, setOptions] = useState<JsonToCsvOptions>({
    delimiter: ',',
    flattenObjects: true,
    wrapQuotes: false,
    includeHeaders: true,
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
    const res = jsonToCsv(input, options);
    return {
      output: res.error ? '' : res.output,
      previewHeaders: res.error ? [] : res.headers,
      previewRows: res.error ? [] : res.previewRows,
      rowCount: res.error ? 0 : res.rowCount,
      error: res.error,
    };
  }, [input, options]);

  return (
    <div className="space-y-4">
      {/* Configuration Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1426] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span>Delimiter:</span>
          </div>

          <div className="flex items-center bg-[#070b14] p-1 rounded-lg border border-slate-700/80 text-xs">
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, delimiter: ',' }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.delimiter === ','
                  ? 'bg-sky-500 text-slate-950 font-semibold'
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
                  ? 'bg-sky-500 text-slate-950 font-semibold'
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
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tab (\t)
            </button>
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, delimiter: '|' }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.delimiter === '|'
                  ? 'bg-sky-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Pipe ( | )
            </button>
          </div>

          {/* Flatten nested objects toggle */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.flattenObjects}
              onChange={(e) =>
                setOptions((o) => ({ ...o, flattenObjects: e.target.checked }))
              }
              className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Flatten Nested Objects (dot notation)</span>
          </label>

          {/* Wrap quotes */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.wrapQuotes}
              onChange={(e) =>
                setOptions((o) => ({ ...o, wrapQuotes: e.target.checked }))
              }
              className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Force Quotes</span>
          </label>

          {/* Header Row */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.includeHeaders}
              onChange={(e) =>
                setOptions((o) => ({ ...o, includeHeaders: e.target.checked }))
              }
              className="rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Include Header Row</span>
          </label>
        </div>

        {/* Sample Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Samples:</span>
          <button
            type="button"
            onClick={() => setInput(SAMPLES.jsonToCsv.users)}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            User Records (Nested)
          </button>
          <button
            type="button"
            onClick={() => setInput(SAMPLES.jsonToCsv.products)}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Products
          </button>
        </div>
      </div>

      {/* Split Editors: JSON -> CSV */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CodeEditor
          id="json-to-csv-input"
          title="Source JSON Array"
          language="json"
          value={input}
          onChange={setInput}
          placeholder="Paste JSON array or object here..."
          error={error}
          onLoadSample={() => setInput(SAMPLES.jsonToCsv.users)}
          sampleLabel="Load Sample"
          fileExtension="json"
          fileName="source-data"
        />

        <CodeEditor
          id="json-to-csv-output"
          title="Generated CSV Output"
          language="csv"
          value={output}
          readOnly={true}
          placeholder="CSV output will generate automatically..."
          fileExtension="csv"
          fileName="exported-data"
        />
      </div>

      {/* Tabular Preview */}
      {previewHeaders.length > 0 && (
        <TablePreview
          headers={previewHeaders}
          rows={previewRows}
          totalRows={rowCount}
          title="Live CSV Table Preview"
        />
      )}
    </div>
  );
}
