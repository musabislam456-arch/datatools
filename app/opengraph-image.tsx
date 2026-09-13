import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DataTools — Developer-Focused Data Format Utility Suite';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#090d16',
          backgroundImage:
            'linear-gradient(rgba(16,185,129,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.12) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 36 }}>
          <div
            style={{
              width: 100,
              height: 100,
              borderRadius: 22,
              background: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 56,
              fontWeight: 700,
              color: '#052e21',
              boxShadow: '0 8px 24px rgba(16,185,129,0.45)',
            }}
          >
            {'{ }'}
          </div>
          <div style={{ fontSize: 62, fontWeight: 800, color: '#f1f5f9', letterSpacing: -1 }}>
            DataTools
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#6ee7b7', maxWidth: 940, textAlign: 'center' }}>
          Fast, Secure Developer Data Format Utilities
        </div>
        <div style={{ marginTop: 44, display: 'flex', gap: 16 }}>
          {['JSON', 'CSV', 'XML', '100% Private'].map((t) => (
            <div
              key={t}
              style={{
                padding: '10px 24px',
                borderRadius: 8,
                background: 'rgba(16,185,129,0.08)',
                color: '#a7f3d0',
                fontSize: 20,
                border: '1px solid rgba(16,185,129,0.3)',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
