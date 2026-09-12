'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  ArrowRightLeft,
  Minimize2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileCode,
  Sliders,
} from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { formatJson } from '@/lib/converters';
import { JsonFormatterOptions } from '@/lib/types';
import { SAMPLES } from '@/lib/data-samples';

export function JsonFormatterView() {
  const [input, setInput] = useState<string>(SAMPLES.jsonFormatter.valid);
  const [options, setOptions] = useState<JsonFormatterOptions>({
    indent: 2,
    sortKeys: false,
    unescapeStrings: false,
  });

  const { output, stats, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: '', stats: undefined, error: undefined };
    }
    const res = formatJson(input, options);
    return {
      output: res.error ? '' : res.output,
      stats: res.error ? undefined : res.stats,
      error: res.error,
    };
  }, [input, options]);

  const handleMinifyQuick = () => {
    setOptions((prev) => ({ ...prev, indent: 'compact' }));
  };

  const handleFormatStandard = () => {
    setOptions((prev) => ({ ...prev, indent: 2 }));
  };

  const inputSize = new Blob([input]).size;
  const outputSize = new Blob([output]).size;
  const diffPercent =
    inputSize > 0
      ? Math.round(((outputSize - inputSize) / inputSize) * 100)
      : 0;

  return (
    <div className="space-y-4">
      {/* Controls & Options Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1426] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-emerald-400" />
            <span>Indentation:</span>
          </div>

          <div className="flex items-center bg-[#070b14] p-1 rounded-lg border border-slate-700/80 text-xs">
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, indent: 2 }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.indent === 2
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2 Spaces
            </button>
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, indent: 4 }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.indent === 4
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              4 Spaces
            </button>
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, indent: 'tab' }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.indent === 'tab'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Tabs
            </button>
            <button
              type="button"
              onClick={() => setOptions((o) => ({ ...o, indent: 'compact' }))}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                options.indent === 'compact'
                  ? 'bg-emerald-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Minify
            </button>
          </div>

          {/* Key sorting toggle */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.sortKeys}
              onChange={(e) =>
                setOptions((o) => ({ ...o, sortKeys: e.target.checked }))
              }
              className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1">
              <ArrowRightLeft className="w-3 h-3 text-slate-400" />
              Sort Keys A-Z
            </span>
          </label>

          {/* Unescape strings toggle */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.unescapeStrings}
              onChange={(e) =>
                setOptions((o) => ({ ...o, unescapeStrings: e.target.checked }))
              }
              className="rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Unescape Quotes</span>
          </label>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Samples:</span>
          <button
            type="button"
            onClick={() => setInput(SAMPLES.jsonFormatter.valid)}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Valid API
          </button>
          <button
            type="button"
            onClick={() => {
              setInput(SAMPLES.jsonFormatter.minified);
              handleMinifyQuick();
            }}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Minified
          </button>
          <button
            type="button"
            onClick={() => setInput(SAMPLES.jsonFormatter.broken)}
            className="px-2.5 py-1 text-xs rounded bg-rose-950/40 border border-rose-800/60 hover:bg-rose-900/40 text-rose-300 transition-colors"
            title="Test line-level error detection"
          >
            Broken Syntax
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 rounded-lg border border-slate-800 bg-[#0a0f1d] flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400">
              Validator Status
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {error ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span className="text-sm font-semibold text-rose-400">
                    Syntax Error
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400">
                    Valid JSON
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-[#0a0f1d]">
          <div className="text-[11px] font-mono uppercase text-slate-400">
            Object Structure
          </div>
          <div className="text-sm font-semibold text-slate-200 mt-0.5">
            {stats ? (
              <span>
                {stats.keysCount} keys &bull; depth {stats.depth}
              </span>
            ) : (
              <span className="text-slate-500">—</span>
            )}
          </div>
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-[#0a0f1d]">
          <div className="text-[11px] font-mono uppercase text-slate-400">
            Byte Size Delta
          </div>
          <div className="text-sm font-semibold text-slate-200 mt-0.5 flex items-center gap-1.5">
            <span>{outputSize} bytes</span>
            {diffPercent !== 0 && (
              <span
                className={`text-xs font-mono px-1.5 py-0.2 rounded ${
                  diffPercent < 0
                    ? 'bg-emerald-950 text-emerald-400'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {diffPercent > 0 ? `+${diffPercent}%` : `${diffPercent}%`}
              </span>
            )}
          </div>
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-[#0a0f1d]">
          <div className="text-[11px] font-mono uppercase text-slate-400">
            Format Density
          </div>
          <div className="text-sm font-semibold text-slate-200 mt-0.5">
            {stats ? (
              <span>{stats.lines} lines formatted</span>
            ) : (
              <span className="text-slate-500">—</span>
            )}
          </div>
        </div>
      </div>

      {/* Split Editors: Input vs Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Input Editor */}
        <CodeEditor
          id="json-input"
          title="Raw JSON Input"
          language="json"
          value={input}
          onChange={setInput}
          placeholder="Paste or type raw JSON here..."
          error={error}
          onLoadSample={() => setInput(SAMPLES.jsonFormatter.valid)}
          sampleLabel="Load Sample"
          fileExtension="json"
          fileName="input-raw"
        />

        {/* Right: Formatted Output */}
        <CodeEditor
          id="json-output"
          title="Formatted Output"
          language="json"
          value={output}
          readOnly={true}
          placeholder={
            error
              ? 'Fix syntax error on the left to see formatted output.'
              : 'Formatted JSON will appear here...'
          }
          fileExtension="json"
          fileName="formatted-output"
        />
      </div>
    </div>
  );
}
