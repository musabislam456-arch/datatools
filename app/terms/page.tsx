import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — DataTools',
  description:
    'Terms of Service governing the use of the DataTools developer suite and client-side data formatting utilities.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Legal Framework</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm font-mono text-slate-400">
            Effective Date: March 2026 &bull; DataTools
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and utilizing DataTools (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service. If you disagree with any portion of these terms, your sole remedy is to discontinue use of the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">2. Scope of Service &amp; Client-Side Computation</h2>
            <p>
              DataTools provides client-side developer utilities designed to format, validate, convert, and merge data formats including JSON, CSV, and XML. You acknowledge that all computations are executed within your client web browser runtime. As a result, performance, throughput, and memory availability are determined by your client device specifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">3. User Responsibility &amp; Data Sovereignty</h2>
            <p>
              You maintain 100% ownership and responsibility for any data parsed or formatted using DataTools. Because the Service does not transmit or back up your data to any remote server, you are solely responsible for maintaining your own source backups. DataTools is not liable for data corruption resulting from local browser crashes or improperly structured input data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">4. Permitted Use</h2>
            <p>
              You may use DataTools freely for commercial, educational, personal, and enterprise software engineering workflows. You agree not to attempt to interfere with the integrity or performance of the site, inject malicious scripts into public repositories, or circumvent browser sandboxing mechanisms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">5. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. DATATOOLS DOES NOT WARRANT THAT CONVERSION ALGORITHMS WILL BE 100% DEFECT-FREE ACROSS EVERY EDGE-CASE DATASET. USERS ARE ADVISED TO VERIFY CRITICAL PRODUCTION TRANSFORMS BEFORE DEPLOYMENT.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white">6. Inquiries</h2>
            <p>
              For legal inquiries or enterprise licensing terms, please reach out via our{' '}
              <Link href="/contact" className="text-emerald-400 hover:underline">
                Contact Page
              </Link>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
