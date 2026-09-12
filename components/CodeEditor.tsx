'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Copy,
  Check,
  Download,
  Upload,
  Trash2,
  Maximize2,
  Minimize2,
  FileCode,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markup';

interface CodeEditorProps {
  id?: string;
  value: string;
  onChange?: (val: string) => void;
  language: 'json' | 'csv' | 'xml' | 'text';
  readOnly?: boolean;
  title?: string;
  placeholder?: string;
  onLoadSample?: () => void;
  sampleLabel?: string;
  error?: {
    message: string;
    line?: number;
    column?: number;
    snippet?: string;
  };
  fileExtension?: string;
  fileName?: string;
  heightClass?: string;
}

export function CodeEditor({
  id = 'code-editor',
  value,
  onChange,
  language,
  readOnly = false,
  title,
  placeholder = 'Paste or type code here...',
  onLoadSample,
  sampleLabel = 'Load Sample',
  error,
  fileExtension = 'txt',
  fileName = 'data-output',
  heightClass = 'min-h-[420px] max-h-[640px]',
}: CodeEditorProps) {
  const [copied, setCopied] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSyntaxView, setShowSyntaxView] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSyntaxActive = readOnly || showSyntaxView;

  // Highlight syntax using Prism safely
  const getHighlightedHtml = (code: string, lang: string) => {
    if (!code) return '';
    try {
      let grammar = Prism.languages[lang];
      if (lang === 'xml') {
        grammar = Prism.languages.markup || Prism.languages.html;
      } else if (lang === 'json') {
        grammar = Prism.languages.json;
      }
      if (!grammar) {
        // Fallback simple escaping
        return code
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }
      return Prism.highlight(code, grammar, lang);
    } catch {
      return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }
  };

  const handleCopy = async () => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      if (textareaRef.current) {
        textareaRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleDownload = () => {
    if (!value) return;
    const blob = new Blob([value], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onChange) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content !== undefined) {
        onChange(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (readOnly || !onChange) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content !== undefined) {
          onChange(content);
        }
      };
      reader.readAsText(file);
    }
  };

  // Metrics
  const lineCount = value ? value.split('\n').length : 0;
  const charCount = value.length;
  const byteSize = new Blob([value]).size;
  const formattedSize =
    byteSize < 1024
      ? `${byteSize} B`
      : byteSize < 1024 * 1024
      ? `${(byteSize / 1024).toFixed(1)} KB`
      : `${(byteSize / (1024 * 1024)).toFixed(2)} MB`;

  const lineNumbers = Array.from(
    { length: Math.max(lineCount, 1) },
    (_, i) => i + 1
  );

  return (
    <div
      id={id}
      className={`flex flex-col rounded-xl border border-slate-800 bg-[#0a0f1d] shadow-lg transition-all ${
        isFullscreen
          ? 'fixed inset-4 z-50 shadow-2xl bg-[#090d16] border-slate-700'
          : 'relative'
      }`}
      onDragOver={(e) => {
        if (!readOnly) {
          e.preventDefault();
          setIsDragOver(true);
        }
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 border-b border-slate-800/90 bg-[#0d1426] rounded-t-xl text-xs">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5 mr-1">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700/80" />
          </div>

          <span className="font-mono font-medium text-slate-300 flex items-center gap-1.5">
            <FileCode className="w-3.5 h-3.5 text-emerald-400" />
            {title || (readOnly ? 'Output View' : 'Input Editor')}
          </span>

          <span className="font-mono text-[10px] uppercase px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-400 border border-slate-700/60">
            {language}
          </span>
        </div>

        {/* Toolbar actions */}
        <div className="flex items-center gap-1.5 text-slate-300">
          {!readOnly && onLoadSample && (
            <button
              type="button"
              onClick={onLoadSample}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700/70"
              title="Load example dataset"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>{sampleLabel}</span>
            </button>
          )}

          {!readOnly && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".json,.csv,.tsv,.xml,.txt"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-slate-800 text-slate-300 text-xs transition-colors"
                title="Upload file from disk"
              >
                <Upload className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Upload</span>
              </button>
            </>
          )}

          {!readOnly && onChange && value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1 rounded-md hover:bg-rose-950/40 hover:text-rose-400 text-slate-400 transition-colors"
              title="Clear editor"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Syntax / Raw Toggle for editable inputs */}
          {!readOnly && value && (
            <button
              type="button"
              onClick={() => setShowSyntaxView(!showSyntaxView)}
              className={`px-2 py-1 rounded-md text-xs font-mono transition-colors ${
                showSyntaxView
                  ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/30'
                  : 'hover:bg-slate-800 text-slate-400'
              }`}
              title="Toggle syntax highlighting preview"
            >
              {showSyntaxView ? 'Edit' : 'Highlight'}
            </button>
          )}

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            disabled={!value}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'hover:bg-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed'
            }`}
            title="Copy to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-slate-400" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownload}
            disabled={!value}
            className="flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-800 text-slate-300 text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title={`Download as .${fileExtension}`}
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1 rounded-md hover:bg-slate-800 text-slate-400 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Drag overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-20 bg-emerald-950/80 border-2 border-dashed border-emerald-500 rounded-xl flex flex-col items-center justify-center pointer-events-none">
          <Upload className="w-10 h-10 text-emerald-400 animate-bounce mb-2" />
          <p className="text-emerald-300 font-medium text-sm">
            Drop file here to load into editor
          </p>
        </div>
      )}

      {/* Editor Body */}
      <div
        className={`relative flex flex-1 overflow-hidden font-mono text-xs sm:text-[13px] leading-relaxed ${
          isFullscreen ? 'h-[calc(100vh-130px)]' : heightClass
        }`}
      >
        {/* Line Numbers Gutter */}
        <div
          className="w-12 shrink-0 py-3 pr-2.5 pl-2 text-right text-slate-600 bg-[#070b14] border-r border-slate-800/80 select-none overflow-hidden font-mono"
          aria-hidden="true"
        >
          {lineNumbers.map((num) => (
            <div
              key={num}
              className={`${
                error?.line === num
                  ? 'text-rose-400 font-bold bg-rose-950/40 -mr-2.5 pr-2.5'
                  : ''
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Code Content Area */}
        <div className="relative flex-1 overflow-auto p-3 bg-[#0a0f1d]">
          {isSyntaxActive ? (
            <pre className="m-0 p-0 font-mono text-slate-200 whitespace-pre overflow-x-auto selection:bg-emerald-500/30">
              <code
                dangerouslySetInnerHTML={{
                  __html: getHighlightedHtml(value, language) || placeholder,
                }}
              />
            </pre>
          ) : (
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
              placeholder={placeholder}
              spellCheck={false}
              className="w-full h-full min-h-[360px] bg-transparent text-slate-100 resize-none outline-none font-mono selection:bg-emerald-500/30 placeholder:text-slate-600"
            />
          )}
        </div>
      </div>

      {/* Error Callout (if syntax error exists) */}
      {error && (
        <div className="px-4 py-2.5 bg-rose-950/40 border-t border-rose-500/40 text-rose-300 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-rose-200">{error.message}</div>
            {error.snippet && (
              <div className="mt-1 font-mono text-[11px] bg-rose-950/60 p-1.5 rounded border border-rose-800/50 text-rose-200">
                {error.snippet}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Editor Footer / Status Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 border-t border-slate-800 bg-[#070b14] rounded-b-xl text-[11px] font-mono text-slate-500">
        <div className="flex items-center gap-4">
          <span>{lineCount} lines</span>
          <span>{charCount} chars</span>
          <span>{formattedSize}</span>
        </div>
        <div className="flex items-center gap-2">
          {error ? (
            <span className="text-rose-400 font-medium">Syntax Error</span>
          ) : (
            <span className="text-emerald-400 font-medium">Ready</span>
          )}
          <span>&bull;</span>
          <span className="uppercase text-slate-400">{fileExtension}</span>
        </div>
      </div>
    </div>
  );
}
