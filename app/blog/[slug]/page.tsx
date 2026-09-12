import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookOpen,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BLOG_POSTS } from '@/lib/blog-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return { title: 'Article Not Found | DataTools' };
  }

  return {
    title: `${post.title} — Developer Guides`,
    description: post.summary,
    openGraph: {
      title: `${post.title} | DataTools Developer Guides`,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Simple Markdown Parser for article content
  const renderMarkdown = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBlockLanguage = '';
    let codeBlockLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Close code block
          elements.push(
            <pre
              key={`code-${i}`}
              className="my-6 p-4 rounded-xl bg-[#070b14] border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto selection:bg-emerald-500/30"
            >
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          );
          codeBlockLines = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeBlockLanguage = line.slice(3).trim();
        }
        continue;
      }

      if (inCodeBlock) {
        codeBlockLines.push(line);
        continue;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2
            key={i}
            className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 tracking-tight border-b border-slate-800 pb-2"
          >
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={i}
            className="text-lg sm:text-xl font-semibold text-emerald-400 mt-6 mb-3"
          >
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        elements.push(
          <blockquote
            key={i}
            className="my-6 pl-4 border-l-4 border-emerald-500 bg-[#0d1426] p-4 rounded-r-xl text-slate-300 italic text-sm"
          >
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={i} className="ml-5 list-disc text-slate-300 text-sm my-1 leading-relaxed">
            {line.slice(2)}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <li key={i} className="ml-5 list-decimal text-slate-300 text-sm my-1 leading-relaxed">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={i} className="my-8 border-slate-800" />);
      } else if (line.trim() !== '') {
        elements.push(
          <p key={i} className="my-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            {line}
          </p>
        );
      }
    }

    return elements;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all developer guides</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
            {post.summary}
          </p>

          {/* Author & Timestamp Bar */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-sm font-bold flex items-center justify-center">
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {post.author.name}
                </div>
                <div className="text-xs text-slate-400">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <article className="prose prose-invert max-w-none">
          {renderMarkdown(post.content)}
        </article>

        {/* Footer Actions & Related Tools */}
        <div className="mt-14 pt-8 border-t border-slate-800">
          <div className="p-6 rounded-2xl bg-[#0d1426] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                Test these patterns in your browser
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                DataTools utilities are 100% client-side, sandbox-safe, and free forever.
              </p>
            </div>
            <Link
              href="/tools"
              className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>Explore DataTools Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
