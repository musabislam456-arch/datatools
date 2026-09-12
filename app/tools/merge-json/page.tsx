import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { MergeJsonView } from '@/components/tools/MergeJsonView';

export const metadata: Metadata = {
  title: 'Merge Multiple JSON Files — Recursive Deep Merge & Combine',
  description:
    'Combine and merge multiple JSON files online. Recursive deep merge, shallow merge, array concatenation, collision resolution, and prototype pollution defense.',
  keywords: [
    'merge json',
    'combine json files',
    'deep merge json',
    'json file combiner',
    'merge config files',
  ],
};

export default function MergeJsonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolHeader currentToolId="merge-json" />

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Merge Multiple JSON Files
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Combine multiple JSON files or environment configurations with custom collision rules and deep recursive object merging.
          </p>
        </div>

        <MergeJsonView />

        {/* Technical Guide Callout */}
        <section className="mt-14 border-t border-slate-800 pt-10 text-slate-300">
          <h2 className="text-lg font-bold text-white mb-4">
            Merge Architecture &amp; Security Considerations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Prototype Pollution Hardening
              </h3>
              <p>
                Every merge iteration rigorously scrubs forbidden prototype keys (<code className="text-amber-300 font-mono">__proto__</code>, <code className="text-amber-300 font-mono">constructor</code>, <code className="text-amber-300 font-mono">prototype</code>), protecting your environment from malicious payload injections.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Layered Configuration Merging
              </h3>
              <p>
                Mimics the behavior of production configuration loaders (like Docker Compose, Helm, or Kubernetes configmaps). Later files override matching primitives while recursively preserving nested sibling properties.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Collision Resolution Control
              </h3>
              <p>
                Choose whether conflicts overwrite previous keys, preserve original values (skip), or append both values together into a combined array.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
