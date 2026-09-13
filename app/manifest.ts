import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DataTools',
    short_name: 'DataTools',
    description:
      'Fast, Secure Developer Data Format Utilities - JSON, CSV and XML formatter, validator and converter.',
    start_url: '/',
    display: 'standalone',
    background_color: '#090d16',
    theme_color: '#10b981',
    icons: [
      { src: '/icon', sizes: '192x192', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
