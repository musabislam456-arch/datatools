import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#10b981',
        }}
      >
        <div style={{ color: '#052e21', fontSize: 78, fontWeight: 800, fontFamily: 'monospace' }}>
          {'{ }'}
        </div>
      </div>
    ),
    { ...size }
  );
}
