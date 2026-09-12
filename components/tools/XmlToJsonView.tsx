'use client';

import React, { useState, useMemo } from 'react';
import { Sliders, FileCode2, Sparkles, CheckCircle2 } from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { xmlToJson } from '@/lib/converters';
import { XmlToJsonOptions } from '@/lib/types';
import { SAMPLES } from '@/lib/data-samples';

export function XmlToJsonView() {
  const [input, setInput] = useState<string>(SAMPLES.xmlToJson.rss);
  const [options, setOptions] = useState<XmlToJsonOptions>({
    attributePrefix: '@_',
    textNodeKey: '#text',
    trimValues: true,
    parseNumbersAndBooleans: true,
    arrayMode: false,
  });

  const { output, stats, error } = useMemo(() => {
    if (!input.trim()) {
      return {
        output: '',
        stats: { nodeCount: 0, rootTag: '' },
        error: undefined,
      };
    }

    const res = xmlToJson(input, options);
    if (res.error) {
      return {
        output: '',
        stats: { nodeCount: 0, rootTag: '' },
        error: res.error,
      };
    }

    return {
      output: res.output,
      stats: { nodeCount: res.nodeCount, rootTag: res.rootTag },
      error: undefined,
    };
  }, [input, options]);

  return (
    <div className="space-y-4">
      {/* Configuration Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1426] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-rose-400" />
            <span>XML Parsing Options:</span>
          </div>

          {/* Attribute Prefix */}
          <div className="flex items-center gap-1.5 bg-[#070b14] px-2.5 py-1 rounded-lg border border-slate-700/80 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">
              Attr Prefix:
            </span>
            <input
              type="text"
              value={options.attributePrefix}
              onChange={(e) =>
                setOptions((o) => ({ ...o, attributePrefix: e.target.value }))
              }
              className="w-12 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-400 text-center"
            />
          </div>

          {/* Text Node Key */}
          <div className="flex items-center gap-1.5 bg-[#070b14] px-2.5 py-1 rounded-lg border border-slate-700/80 text-xs">
            <span className="text-slate-400 font-mono text-[11px]">
              Text Node Key:
            </span>
            <input
              type="text"
              value={options.textNodeKey}
              onChange={(e) =>
                setOptions((o) => ({ ...o, textNodeKey: e.target.value }))
              }
              className="w-16 bg-slate-900 border border-slate-700 rounded px-1.5 py-0.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-rose-400 text-center"
            />
          </div>

          {/* Parse numbers & booleans */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.parseNumbersAndBooleans}
              onChange={(e) =>
                setOptions((o) => ({
                  ...o,
                  parseNumbersAndBooleans: e.target.checked,
                }))
              }
              className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Type Cast Numbers &amp; Booleans</span>
          </label>

          {/* Trim whitespace values */}
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none bg-[#070b14] px-3 py-1.5 rounded-lg border border-slate-700/80 hover:border-slate-600 transition-colors">
            <input
              type="checkbox"
              checked={options.trimValues}
              onChange={(e) =>
                setOptions((o) => ({ ...o, trimValues: e.target.checked }))
              }
              className="rounded bg-slate-900 border-slate-700 text-rose-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Trim Text Nodes</span>
          </label>
        </div>

        {/* Sample Presets */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 hidden sm:inline">Samples:</span>
          <button
            type="button"
            onClick={() => setInput(SAMPLES.xmlToJson.rss)}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            RSS Feed
          </button>
          <button
            type="button"
            onClick={() => setInput(SAMPLES.xmlToJson.catalog)}
            className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Catalog Attributes
          </button>
        </div>
      </div>

      {/* Split Editors: XML -> JSON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CodeEditor
          id="xml-input"
          title="Raw XML Payload"
          language="xml"
          value={input}
          onChange={setInput}
          placeholder="Paste XML or RSS markup here..."
          error={error}
          onLoadSample={() => setInput(SAMPLES.xmlToJson.rss)}
          sampleLabel="Load Sample"
          fileExtension="xml"
          fileName="source-document"
        />

        <CodeEditor
          id="xml-json-output"
          title="Generated JSON Tree"
          language="json"
          value={output}
          readOnly={true}
          placeholder="JSON output will generate here..."
          fileExtension="json"
          fileName="xml-converted"
        />
      </div>
    </div>
  );
}
