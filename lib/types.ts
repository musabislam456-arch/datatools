export type ToolId =
  | 'json-formatter'
  | 'json-to-csv'
  | 'csv-to-json'
  | 'merge-json'
  | 'xml-to-json';

export interface ToolMetadata {
  id: ToolId;
  name: string;
  shortName: string;
  description: string;
  badge: string;
  path: string;
  inputFormat: string;
  outputFormat: string;
  features: string[];
}

export interface JsonFormatterOptions {
  indent: 2 | 4 | 'tab' | 'compact';
  sortKeys: boolean;
  unescapeStrings: boolean;
}

export interface JsonToCsvOptions {
  delimiter: ',' | ';' | '\t' | '|';
  flattenObjects: boolean;
  wrapQuotes: boolean;
  includeHeaders: boolean;
}

export interface CsvToJsonOptions {
  delimiter: ',' | ';' | '\t' | '|' | 'auto';
  hasHeaders: boolean;
  parseTypes: boolean; // parse numbers and booleans
  skipEmptyLines: boolean;
}

export type MergeStrategy = 'deep' | 'shallow' | 'concat-arrays';
export type CollisionResolution = 'overwrite' | 'skip' | 'preserve-both';

export interface MergeJsonFile {
  id: string;
  name: string;
  content: string;
  parsed?: any;
  error?: string;
  size: number;
}

export interface XmlToJsonOptions {
  attributePrefix: string;
  textNodeKey: string;
  trimValues: boolean;
  parseNumbersAndBooleans: boolean;
  arrayMode: boolean; // force arrays on repeated tags
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  tags: string[];
  content: string;
}

export interface ConversionError {
  message: string;
  line?: number;
  column?: number;
  snippet?: string;
}
