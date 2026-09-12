'use client';

import React, { useState, useMemo, useRef } from 'react';
import {
  Layers,
  Upload,
  Plus,
  Trash2,
  FileCode,
  ShieldCheck,
  AlertCircle,
  Sliders,
  Sparkles,
  CheckCircle,
} from 'lucide-react';
import { CodeEditor } from '@/components/CodeEditor';
import { mergeMultipleJson } from '@/lib/converters';
import { MergeStrategy, CollisionResolution } from '@/lib/types';
import { SAMPLES } from '@/lib/data-samples';

interface ManagedFile {
  id: string;
  name: string;
  content: string;
  size: number;
}

export function MergeJsonView() {
  const [files, setFiles] = useState<ManagedFile[]>(SAMPLES.mergeJson);
  const [activeFileId, setActiveFileId] = useState<string>(files[0]?.id || '');
  const [strategy, setStrategy] = useState<MergeStrategy>('deep');
  const [collision, setCollision] = useState<CollisionResolution>('overwrite');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { output, error, mergedStats } = useMemo(() => {
    if (files.length === 0) {
      return {
        output: '{}',
        error: undefined,
        mergedStats: { keys: 0, files: 0 },
      };
    }

    const res = mergeMultipleJson(files, strategy, collision);
    if (res.error) {
      return {
        output: '',
        error: res.error,
        mergedStats: { keys: 0, files: 0 },
      };
    }

    return {
      output: res.output,
      error: undefined,
      mergedStats: { keys: res.keysCount, files: res.fileCount },
    };
  }, [files, strategy, collision]);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];

  const handleUpdateActiveContent = (newContent: string) => {
    if (!activeFile) return;
    setFiles((prev) =>
      prev.map((f) =>
        f.id === activeFile.id
          ? { ...f, content: newContent, size: new Blob([newContent]).size }
          : f
      )
    );
  };

  const handleAddNewFile = () => {
    const newId = `file-${Date.now()}`;
    const newName = `custom-config-${files.length + 1}.json`;
    const defaultContent = `{\n  "module_${files.length + 1}": {\n    "enabled": true\n  }\n}`;
    const newFile: ManagedFile = {
      id: newId,
      name: newName,
      content: defaultContent,
      size: new Blob([defaultContent]).size,
    };
    setFiles((prev) => [...prev, newFile]);
    setActiveFileId(newId);
  };

  const handleRemoveFile = (idToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (files.length <= 1) return;
    const remaining = files.filter((f) => f.id !== idToRemove);
    setFiles(remaining);
    if (activeFileId === idToRemove) {
      setActiveFileId(remaining[0]?.id || '');
    }
  };

  const handleMultiFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    const newManagedFiles: ManagedFile[] = [];
    const promises: Promise<void>[] = [];

    Array.from(uploadedFiles).forEach((file, index) => {
      const p = new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = (event.target?.result as string) || '{}';
          newManagedFiles.push({
            id: `upload-${Date.now()}-${index}`,
            name: file.name,
            content,
            size: file.size,
          });
          resolve();
        };
        reader.readAsText(file);
      });
      promises.push(p);
    });

    Promise.all(promises).then(() => {
      setFiles((prev) => [...prev, ...newManagedFiles]);
      if (newManagedFiles[0]) {
        setActiveFileId(newManagedFiles[0].id);
      }
    });

    e.target.value = '';
  };

  return (
    <div className="space-y-4">
      {/* Configuration Bar */}
      <div className="p-4 rounded-xl border border-slate-800 bg-[#0d1426] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Merge Strategy:</span>
          </div>

          <div className="flex items-center bg-[#070b14] p-1 rounded-lg border border-slate-700/80 text-xs">
            <button
              type="button"
              onClick={() => setStrategy('deep')}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                strategy === 'deep'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Recursive Deep Merge
            </button>
            <button
              type="button"
              onClick={() => setStrategy('shallow')}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                strategy === 'shallow'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Shallow Merge
            </button>
            <button
              type="button"
              onClick={() => setStrategy('concat-arrays')}
              className={`px-2.5 py-1 rounded-md font-mono transition-colors ${
                strategy === 'concat-arrays'
                  ? 'bg-amber-500 text-slate-950 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Concat Arrays
            </button>
          </div>

          {/* Key Collisions */}
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="text-slate-400">On Key Collision:</span>
            <select
              value={collision}
              onChange={(e) => setCollision(e.target.value as CollisionResolution)}
              className="px-2.5 py-1 rounded-md bg-[#070b14] border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-amber-400"
            >
              <option value="overwrite">Overwrite (Later Files Win)</option>
              <option value="skip">Skip (First File Wins)</option>
              <option value="preserve-both">Preserve Both (Create Array)</option>
            </select>
          </div>
        </div>

        {/* Prototype Defense Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Prototype Pollution Shield Active</span>
        </div>
      </div>

      {/* Files List Tabs & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl border border-slate-800 bg-[#0a0f1d]">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
          {files.map((f, idx) => {
            const isActive = f.id === activeFile?.id;
            return (
              <div
                key={f.id}
                onClick={() => setActiveFileId(f.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono cursor-pointer transition-all border select-none ${
                  isActive
                    ? 'bg-slate-800 text-amber-300 border-amber-500/50 shadow-sm'
                    : 'bg-[#070b14] text-slate-400 border-slate-800 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <span className="text-slate-500 text-[10px]">#{idx + 1}</span>
                <span className="truncate max-w-[140px]">{f.name}</span>
                {files.length > 1 && (
                  <button
                    type="button"
                    onClick={(e) => handleRemoveFile(f.id, e)}
                    className="p-0.5 rounded hover:text-rose-400 transition-colors"
                    title="Remove file"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".json"
            onChange={handleMultiFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Upload JSON Files</span>
          </button>

          <button
            type="button"
            onClick={handleAddNewFile}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add File</span>
          </button>
        </div>
      </div>

      {/* Split View: Selected File Input on Left vs Merged Result on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CodeEditor
          id="merge-json-file-editor"
          title={`Editing: ${activeFile?.name || 'File'}`}
          language="json"
          value={activeFile?.content || ''}
          onChange={handleUpdateActiveContent}
          placeholder="Paste or write JSON for this file..."
          fileExtension="json"
          fileName={activeFile?.name?.replace(/\.[^/.]+$/, '') || 'source-file'}
        />

        <CodeEditor
          id="merge-json-output-editor"
          title="Consolidated Merged JSON"
          language="json"
          value={output}
          readOnly={true}
          placeholder="Merged output will appear here..."
          error={error}
          fileExtension="json"
          fileName="consolidated-merged"
        />
      </div>
    </div>
  );
}
