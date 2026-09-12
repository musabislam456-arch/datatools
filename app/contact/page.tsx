'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  MessageSquare,
  CheckCircle2,
  Bug,
  Sparkles,
  HelpCircle,
  FileQuestion,
  Terminal,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<'feedback' | 'bug' | 'feature' | 'security'>('feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Realistic client-side submission simulation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCategory('feedback');
    setSubject('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16]">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Engineering Feedback</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get in Touch with DataTools
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
              Found a bug in our RFC 4180 CSV parser? Have a new format conversion suggestion (e.g. YAML, TOML, Parquet)? Our team reads every submission.
            </p>
          </div>

          {/* Form / Submitted Success State */}
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#0d1426] shadow-2xl">
            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto animate-in zoom-in-75 duration-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Message Dispatched Successfully
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-slate-200 font-medium">{name}</span>. Your ticket has been logged directly into our developer backlog. If a response is required, we will reach out to <span className="text-slate-200 font-medium">{email}</span>.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                {/* Category selector */}
                <div>
                  <label className="block font-mono text-xs uppercase text-slate-400 mb-2">
                    Topic / Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'feedback', label: 'General Feedback', icon: MessageSquare },
                      { id: 'bug', label: 'Report a Bug', icon: Bug },
                      { id: 'feature', label: 'Feature Request', icon: Sparkles },
                      { id: 'security', label: 'Security Report', icon: HelpCircle },
                    ].map((item) => {
                      const Icon = item.icon;
                      const isSelected = category === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCategory(item.id as any)}
                          className={`p-2.5 rounded-lg border text-left flex flex-col justify-between transition-all ${
                            isSelected
                              ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300'
                              : 'bg-[#070b14] border-slate-800 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                          }`}
                        >
                          <Icon className="w-4 h-4 mb-2" />
                          <span className="font-medium text-xs">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs uppercase text-slate-400 mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Linus Torvalds"
                      className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-sans"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs uppercase text-slate-400 mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="developer@company.org"
                      className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-xs uppercase text-slate-400 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., CSV multiline RFC 4180 parsing with semicolons"
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs uppercase text-slate-400 mb-1.5"
                  >
                    Details / Payload Snippet (Do not share secrets)
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe the issue, step-by-step reproduction, or proposal..."
                    className="w-full px-3 py-2 rounded-lg bg-[#070b14] border border-slate-700 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 font-mono text-xs resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500 font-mono flex items-center justify-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>Encrypted in transit &bull; Zero spam policy</span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
