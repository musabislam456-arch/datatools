'use client';

import React, { useState, useMemo } from 'react';
import { Table, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface TablePreviewProps {
  headers: string[];
  rows: (string | number | boolean | null)[][];
  totalRows: number;
  title?: string;
}

export function TablePreview({
  headers,
  rows,
  totalRows,
  title = 'Data Grid Preview',
}: TablePreviewProps) {
  const [filterQuery, setFilterQuery] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filteredRows = useMemo(() => {
    if (!filterQuery.trim()) return rows;
    const q = filterQuery.toLowerCase();
    return rows.filter((row) =>
      row.some((cell) => cell !== null && cell !== undefined && String(cell).toLowerCase().includes(q))
    );
  }, [rows, filterQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPageRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  if (headers.length === 0 || rows.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0a0f1d] overflow-hidden shadow-lg mt-6">
      {/* Table Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#0d1426] border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            {title}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
            {totalRows} records ({headers.length} columns)
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => {
                setFilterQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Filter preview rows..."
              className="pl-8 pr-3 py-1 text-xs rounded-md bg-slate-900 border border-slate-700 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>

      {/* Table Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300 font-mono">
          <thead className="bg-[#070b14] text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-3 w-12 text-slate-600 text-center select-none border-r border-slate-800/60">
                #
              </th>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="py-2.5 px-3 font-semibold text-slate-300 border-r border-slate-800/40 last:border-r-0 whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {currentPageRows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-2 px-3 text-center text-slate-600 select-none border-r border-slate-800/60">
                  {(page - 1) * pageSize + rowIdx + 1}
                </td>
                {headers.map((_, colIdx) => {
                  const cell = row[colIdx];
                  const displayVal =
                    cell === null || cell === undefined ? '' : String(cell);
                  return (
                    <td
                      key={colIdx}
                      className="py-2 px-3 text-slate-200 border-r border-slate-800/40 last:border-r-0 max-w-[240px] truncate"
                      title={displayVal}
                    >
                      {displayVal}
                    </td>
                  );
                })}
              </tr>
            ))}
            {currentPageRows.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="py-8 text-center text-slate-500"
                >
                  No rows matching &quot;{filterQuery}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer Pagination */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#070b14] border-t border-slate-800 text-xs text-slate-500 font-mono">
        <div>
          Showing {(page - 1) * pageSize + 1} -{' '}
          {Math.min(page * pageSize, filteredRows.length)} of {filteredRows.length} preview rows
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-1 rounded hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
