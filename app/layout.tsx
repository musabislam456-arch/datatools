import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_URL || 'https://datatools.toolbay.site'),
  title: {
    default: 'DataTools — Fast, Secure Developer Data Format Utilities',
    template: '%s | DataTools',
  },
  description:
    '100% client-side developer data tools. Format, validate, and convert JSON, CSV, and XML with zero latency and complete data privacy. Your data never leaves your browser.',
  keywords: [
    'json formatter',
    'json validator',
    'json to csv',
    'csv to json',
    'merge json',
    'xml to json',
    'developer tools',
    'data converters',
  ],
  authors: [{ name: 'DataTools Engineering Team' }],
  creator: 'DataTools',
  openGraph: {
    title: 'DataTools — Developer-Focused Data Format Utility Suite',
    description:
      'Format, validate, convert, and merge JSON, CSV, and XML instantly in your browser. Zero server uploads, 100% private.',
    type: 'website',
    url: 'https://datatools.toolbay.site',
    siteName: 'DataTools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataTools — Developer Data Utilities',
    description:
      'Fast, offline-ready JSON, CSV, and XML converters with code-editor UI and syntax highlighting.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: '8dLMBNTBkGFQ3zq4GYwdQbjC1ciAalZ87g56dZR1mks',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        suppressHydrationWarning
        className="bg-[#090d16] text-[#e2e8f0] font-sans antialiased min-h-screen flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200"
      >
        {children}
        {/* CHATBOT_SCRIPT_START */}
        {/* Paste client's chatbot <script> embed code here */}
        {/* CHATBOT_SCRIPT_END */}
      </body>
    </html>
  );
}
