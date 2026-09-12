import { ToolMetadata } from './types';

export const TOOLS_CONFIG: ToolMetadata[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortName: 'JSON Formatter',
    description:
      'Pretty-print, minify, sort keys, unescape strings, and pinpoint syntax errors with exact line and column locations.',
    badge: 'Core Tool',
    path: '/tools/json-formatter',
    inputFormat: 'JSON',
    outputFormat: 'JSON',
    features: [
      '2/4 Spaces, Tabs, or Minify',
      'Alphabetical Key Sorting',
      'Escape Sequence Unescaping',
      'Exact Error Line Highlighting',
      'Byte Size & Depth Metrics',
    ],
  },
  {
    id: 'json-to-csv',
    name: 'JSON to CSV Converter',
    shortName: 'JSON to CSV',
    description:
      'Transform complex JSON arrays and nested object hierarchies into clean, RFC 4180 compliant CSV tables with custom delimiters.',
    badge: 'Converter',
    path: '/tools/json-to-csv',
    inputFormat: 'JSON',
    outputFormat: 'CSV',
    features: [
      'Nested Object Flattening (dot notation)',
      'Custom Delimiters (Comma, Semicolon, Tab, Pipe)',
      'RFC 4180 Quote Escaping',
      'Interactive Table Preview',
      'One-click .csv Export',
    ],
  },
  {
    id: 'csv-to-json',
    name: 'CSV to JSON Converter',
    shortName: 'CSV to JSON',
    description:
      'Parse standard CSV documents and TSV tables into clean, typed JSON objects with automatic delimiter detection and type inference.',
    badge: 'Converter',
    path: '/tools/csv-to-json',
    inputFormat: 'CSV',
    outputFormat: 'JSON',
    features: [
      'Auto-Detect Delimiters (Comma, Tab, Pipe, Semicolon)',
      'Smart Number & Boolean Parsing',
      'Multiline Quoted Field Support',
      'Custom Header Configuration',
      'One-click .json Export',
    ],
  },
  {
    id: 'merge-json',
    name: 'Merge Multiple JSON Files',
    shortName: 'Merge JSON',
    description:
      'Combine multiple configuration files, environment overrides, or split datasets with recursive deep merge and prototype pollution protection.',
    badge: 'Multi-File',
    path: '/tools/merge-json',
    inputFormat: 'Multiple JSON',
    outputFormat: 'JSON',
    features: [
      'Recursive Deep Object Merge',
      'Prototype Pollution Defense',
      'Custom Collision Handling (Overwrite, Skip, Keep Both)',
      'Multi-File Drag & Drop',
      'Order Adjustment & File Summary',
    ],
  },
  {
    id: 'xml-to-json',
    name: 'XML to JSON Converter',
    shortName: 'XML to JSON',
    description:
      'Convert RSS feeds, SOAP envelopes, SVG, and legacy enterprise XML payloads into modern structured JSON with attribute and CDATA support.',
    badge: 'Converter',
    path: '/tools/xml-to-json',
    inputFormat: 'XML',
    outputFormat: 'JSON',
    features: [
      'Custom Attribute Prefixing (@_)',
      'Automatic Repeating Tag Array Grouping',
      'CDATA & Text Node Extraction',
      'Type Casting for Numbers & Booleans',
      'Browser-Native DOMParser Isolation',
    ],
  },
];
