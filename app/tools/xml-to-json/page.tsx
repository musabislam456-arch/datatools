import React from 'react';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolHeader } from '@/components/tools/ToolHeader';
import { XmlToJsonView } from '@/components/tools/XmlToJsonView';

export const metadata: Metadata = {
  title: 'XML to JSON Converter — Transform XML Payloads to JSON',
  description:
    'Convert XML markup, RSS feeds, SOAP requests, and SVG trees into clean JSON. Customizable attribute prefixes, CDATA handling, and smart type casting. 100% private in-browser.',
  keywords: [
    'xml to json',
    'convert xml to json',
    'rss to json',
    'soap to json',
    'xml parser online',
  ],
};

export default function XmlToJsonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ToolHeader currentToolId="xml-to-json" />

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            XML to JSON Converter
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Parse complex XML documents, RSS news feeds, SOAP messages, and SVG vector code into modern, clean JSON objects.
          </p>
        </div>

        <XmlToJsonView />

        {/* Technical Guide Callout */}
        <section className="mt-14 border-t border-slate-800 pt-10 text-slate-300">
          <h2 className="text-lg font-bold text-white mb-4">
            Understanding Modern XML Transformation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-400 leading-relaxed">
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Attribute vs. Element Disambiguation
              </h3>
              <p>
                In XML, an element can have attributes (<code className="text-rose-300 font-mono">&lt;user id=&quot;1&quot;&gt;</code>) and child tags (<code className="text-rose-300 font-mono">&lt;id&gt;1&lt;/id&gt;</code>). Our converter applies an attribute prefix like <code className="text-rose-300 font-mono">@_</code> to ensure keys never collide.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Automatic Repeating Array Detection
              </h3>
              <p>
                When sibling elements share identical tag names (e.g., multiple <code className="text-rose-300 font-mono">&lt;item&gt;</code> tags in an RSS channel), they are automatically grouped into a clean JavaScript array.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800">
              <h3 className="font-semibold text-slate-200 text-sm mb-1.5">
                Safe In-Browser DOMParser
              </h3>
              <p>
                Uses the browser&apos;s sandboxed DOMParser API, isolating parsing from network entities and mitigating Billion Laughs XML entity expansion threats.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
