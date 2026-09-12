import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Clock, Calendar, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BLOG_POSTS } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Developer Guides & Architectural Whitepapers — DataTools',
  description:
    'Deep architectural guides on data formats, serialization benchmarks, XML security, recursive JSON deep merge strategies, and browser memory optimization.',
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Blog Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Engineering Dispatches</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Developer Guides &amp; Format Architecture
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-400 leading-relaxed">
            Written by infrastructure and systems engineers. Deep dives into serialization throughput, memory bounds, prototype pollution defense, and safe browser-native transformations.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-slate-800 bg-[#0d1426] overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl"
            >
              <div className="p-6">
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-slate-500 mb-4">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                {/* Summary */}
                <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author & Read More Footer */}
              <div className="px-6 py-4 bg-[#090e1c] border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] font-bold flex items-center justify-center">
                    {post.author.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-200">
                      {post.author.name}
                    </div>
                    <div className="text-[10px] text-slate-500 line-clamp-1">
                      {post.author.role}
                    </div>
                  </div>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 group/link"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter / RSS Feed Mock for Devs */}
        <div className="mt-16 p-8 rounded-2xl border border-slate-800 bg-[#0c1222] flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-white">
              Stay ahead on format benchmarks &amp; web standards
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              No marketing noise. Only high-signal technical breakdowns of data streaming, compression algorithms, and client-side web APIs.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              href="/tools"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs whitespace-nowrap transition-colors"
            >
              Try Online Converters
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
