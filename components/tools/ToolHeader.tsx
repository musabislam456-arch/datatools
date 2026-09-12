'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Code2,
  FileSpreadsheet,
  Binary,
  Layers,
  FileCode2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { TOOLS_CONFIG } from '@/lib/tools-data';

interface ToolHeaderProps {
  currentToolId: string;
}

export function ToolHeader({ currentToolId }: ToolHeaderProps) {
  const pathname = usePathname();

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
        return <Code2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  const currentTool = TOOLS_CONFIG.find((t) => t.id === currentToolId);

  return (
    <div className="mb-6 space-y-4">
      {/* Top Breadcrumb & Zero Upload Guarantee */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400 font-mono">
          <Link href="/" className="hover:text-slate-200 transition-colors">
            DataTools
          </Link>
          <span>/</span>
          <Link href="/tools" className="hover:text-slate-200 transition-colors">
            Utilities
          </Link>
          <span>/</span>
          <span className="text-emerald-400 font-semibold">
            {currentTool?.name || currentToolId}
          </span>
        </div>

        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>In-Browser V8 Execution</span>
          <span className="text-slate-600">&bull;</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono">
            <Zap className="w-3 h-3" />
            Zero Latency
          </span>
        </div>
      </div>

      {/* Quick Navigation Tabs for the 5 Core Tools */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800/80">
        {TOOLS_CONFIG.map((tool) => {
          const isActive = pathname === tool.path || currentToolId === tool.id;
          return (
            <Link
              key={tool.id}
              href={tool.path}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-t-lg text-xs font-medium whitespace-nowrap transition-all border-t-2 ${
                isActive
                  ? 'bg-[#0f1526] text-white border-emerald-400 shadow-sm'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              {getToolIcon(tool.id)}
              <span>{tool.shortName}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
