import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, ServerOff, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Zero Telemetry & Local Execution Guarantee',
  description:
    'DataTools Privacy Policy: We do not collect, transmit, store, or analyze your input data. 100% of formatting and conversions execute locally in your web browser.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Zero-Storage Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Privacy Policy &amp; Data Handling Manifesto
          </h1>
          <p className="mt-3 text-sm font-mono text-slate-400">
            Last Updated: March 2026 &bull; DataTools Engineering Security Directive
          </p>
        </div>

        {/* Highlight Callout */}
        <div className="p-6 rounded-2xl bg-[#0d1426] border border-emerald-500/30 mb-10 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Lock className="w-4 h-4" />
            <span>The Core Privacy Promise: Compute Stays on Your Machine</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            DataTools does not operate any backend server or cloud function to parse, format, convert, or validate your JSON, CSV, or XML documents. Every single byte you enter or drop into our utilities is processed strictly within the local memory of your web browser using client-side JavaScript.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Information We Do NOT Collect</h2>
            <p>
              When using any converter or formatter on DataTools:
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Payload Logging:</strong> We do not log, capture, inspect, or store raw input payloads, output files, schema structures, or variable names.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Secrets Harvesting:</strong> Even if your JSON contains API tokens, passwords, database URLs, or private keys, it cannot be intercepted by us because it never leaves your machine.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Advertising Trackers:</strong> We do not sell user behavioral data to ad brokers or third-party data aggregators.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Technical Verification (How to Audit Us)</h2>
            <p>
              You don&apos;t have to take our word for it. We encourage every security-conscious developer to audit our network activity:
            </p>
            <div className="p-4 rounded-xl bg-[#070b14] border border-slate-800 font-mono text-xs text-slate-400">
              <ol className="list-decimal pl-4 space-y-1">
                <li>Open your browser Developer Tools (F12 or Cmd+Option+I).</li>
                <li>Navigate to the <strong>Network</strong> tab.</li>
                <li>Paste any JSON payload or upload a CSV file and click Format or Convert.</li>
                <li>Notice that <strong>zero outbound HTTP requests</strong> (XHR/Fetch) are dispatched.</li>
                <li>Disconnect your Wi-Fi or turn on Airplane mode: all tools remain fully functional.</li>
              </ol>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. Local Browser Storage</h2>
            <p>
              DataTools may use standard browser APIs such as <code className="text-emerald-400 font-mono">localStorage</code> solely to remember your UI preferences (such as selected indentation spaces or auto-detect delimiter toggles). This information never leaves your local browser profile and can be cleared at any time through browser settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Contact Information &amp; Data Protection Officer</h2>
            <p>
              If you have technical questions or enterprise compliance inquiries (SOC2, ISO 27001, HIPAA) regarding our client-side sandboxing, please reach out via our{' '}
              <Link href="/contact" className="text-emerald-400 hover:underline">
                Contact &amp; Feedback channel
              </Link>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
