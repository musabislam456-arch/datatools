import {
  JsonFormatterOptions,
  JsonToCsvOptions,
  CsvToJsonOptions,
  MergeStrategy,
  CollisionResolution,
  XmlToJsonOptions,
  ConversionError,
} from './types';

// ==========================================
// 1. JSON FORMATTER & VALIDATOR
// ==========================================

export interface JsonStats {
  bytes: number;
  lines: number;
  keysCount: number;
  depth: number;
  isArray: boolean;
  itemCount: number;
}

function calculateJsonStats(val: any): { keysCount: number; depth: number } {
  let keys = 0;
  let maxDepth = 0;

  function traverse(node: any, currentDepth: number) {
    if (currentDepth > maxDepth) maxDepth = currentDepth;

    if (node !== null && typeof node === 'object') {
      if (Array.isArray(node)) {
        for (const item of node) {
          traverse(item, currentDepth + 1);
        }
      } else {
        const objKeys = Object.keys(node);
        keys += objKeys.length;
        for (const k of objKeys) {
          traverse(node[k], currentDepth + 1);
        }
      }
    }
  }

  traverse(val, 1);
  return { keysCount: keys, depth: maxDepth };
}

function sortJsonKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortJsonKeys);
  } else if (obj !== null && typeof obj === 'object') {
    const sortedKeys = Object.keys(obj).sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: 'base' })
    );
    const result: Record<string, any> = {};
    for (const key of sortedKeys) {
      result[key] = sortJsonKeys(obj[key]);
    }
    return result;
  }
  return obj;
}

export function parseJsonWithDetailedError(input: string): {
  data?: any;
  error?: ConversionError;
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      error: {
        message: 'Input is empty. Please enter or paste valid JSON text.',
      },
    };
  }

  try {
    const data = JSON.parse(trimmed);
    return { data };
  } catch (err: any) {
    const message = err.message || 'JSON Syntax Error';
    let line: number | undefined;
    let column: number | undefined;
    let snippet: string | undefined;

    // V8 / Chrome formats: "at position 123" or "at line 2 column 5"
    const posMatch = message.match(/at position (\d+)/i);
    const lineColMatch = message.match(/line (\d+) column (\d+)/i);

    if (lineColMatch) {
      line = parseInt(lineColMatch[1], 10);
      column = parseInt(lineColMatch[2], 10);
    } else if (posMatch) {
      const position = parseInt(posMatch[1], 10);
      const before = input.slice(0, position);
      const lines = before.split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }

    if (line) {
      const allLines = input.split('\n');
      const targetLine = allLines[line - 1] || '';
      snippet = `Line ${line}: ${targetLine.trim()}`;
    }

    return {
      error: {
        message: `JSON Syntax Error: ${message}`,
        line,
        column,
        snippet,
      },
    };
  }
}

export function formatJson(
  input: string,
  options: JsonFormatterOptions
): {
  output: string;
  stats?: JsonStats;
  error?: ConversionError;
} {
  let text = input;

  if (options.unescapeStrings) {
    // Unescape common escaped JSON payloads e.g. "{\"status\":\"ok\"}"
    try {
      if (text.startsWith('"') && text.endsWith('"')) {
        text = JSON.parse(text);
      } else {
        text = text.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      }
    } catch {
      // Continue with original text if unescape attempt failed
    }
  }

  const { data, error } = parseJsonWithDetailedError(text);
  if (error) {
    return { output: '', error };
  }

  let processed = data;
  if (options.sortKeys) {
    processed = sortJsonKeys(data);
  }

  let indentSpace: string | number = 2;
  if (options.indent === 4) indentSpace = 4;
  else if (options.indent === 'tab') indentSpace = '\t';
  else if (options.indent === 'compact') indentSpace = 0;

  const output =
    options.indent === 'compact'
      ? JSON.stringify(processed)
      : JSON.stringify(processed, null, indentSpace);

  const { keysCount, depth } = calculateJsonStats(processed);
  const stats: JsonStats = {
    bytes: new Blob([output]).size,
    lines: output.split('\n').length,
    keysCount,
    depth,
    isArray: Array.isArray(processed),
    itemCount: Array.isArray(processed)
      ? processed.length
      : Object.keys(processed || {}).length,
  };

  return { output, stats };
}

// ==========================================
// 2. JSON TO CSV CONVERTER
// ==========================================

function flattenObject(
  obj: any,
  prefix = '',
  res: Record<string, any> = {}
): Record<string, any> {
  for (const key of Object.keys(obj)) {
    const propName = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];

    if (
      val !== null &&
      typeof val === 'object' &&
      !Array.isArray(val) &&
      !(val instanceof Date)
    ) {
      flattenObject(val, propName, res);
    } else if (Array.isArray(val)) {
      // Stringify array or join primitives
      res[propName] = JSON.stringify(val);
    } else {
      res[propName] = val;
    }
  }
  return res;
}

function escapeCsvCell(
  value: any,
  delimiter: string,
  wrapQuotes: boolean
): string {
  if (value === null || value === undefined) return '';
  const str = String(value);

  const needsQuotes =
    wrapQuotes ||
    str.includes(delimiter) ||
    str.includes('"') ||
    str.includes('\n') ||
    str.includes('\r');

  if (needsQuotes) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function jsonToCsv(
  input: string,
  options: JsonToCsvOptions
): {
  output: string;
  rowCount: number;
  columnCount: number;
  headers: string[];
  previewRows: string[][];
  error?: ConversionError;
} {
  const { data, error } = parseJsonWithDetailedError(input);
  if (error) {
    return {
      output: '',
      rowCount: 0,
      columnCount: 0,
      headers: [],
      previewRows: [],
      error,
    };
  }

  let items: any[] = [];
  if (Array.isArray(data)) {
    items = data;
  } else if (typeof data === 'object' && data !== null) {
    // If user provided an object containing an array (e.g. { data: [...] } or { users: [...] })
    const arrayKey = Object.keys(data).find((k) => Array.isArray(data[k]));
    if (arrayKey) {
      items = data[arrayKey];
    } else {
      items = [data];
    }
  } else {
    return {
      output: '',
      rowCount: 0,
      columnCount: 0,
      headers: [],
      previewRows: [],
      error: {
        message:
          'JSON must be an array of objects or a single object to convert to CSV.',
      },
    };
  }

  if (items.length === 0) {
    return {
      output: '',
      rowCount: 0,
      columnCount: 0,
      headers: [],
      previewRows: [],
      error: { message: 'The provided JSON array contains 0 items.' },
    };
  }

  // Flatten if requested
  const processedItems = items.map((item) => {
    if (item !== null && typeof item === 'object') {
      return options.flattenObjects ? flattenObject(item) : item;
    }
    return { value: item };
  });

  // Extract unique headers across all rows
  const headersSet = new Set<string>();
  for (const item of processedItems) {
    if (item && typeof item === 'object') {
      Object.keys(item).forEach((k) => headersSet.add(k));
    }
  }
  const headers = Array.from(headersSet);

  const lines: string[] = [];
  if (options.includeHeaders) {
    lines.push(
      headers
        .map((h) => escapeCsvCell(h, options.delimiter, options.wrapQuotes))
        .join(options.delimiter)
    );
  }

  const previewRows: string[][] = [];

  for (let i = 0; i < processedItems.length; i++) {
    const rowObj = processedItems[i];
    const rowValues = headers.map((h) => {
      const val = rowObj?.[h];
      return val !== undefined && val !== null ? String(val) : '';
    });

    if (previewRows.length < 15) {
      previewRows.push(rowValues);
    }

    const csvRow = rowValues
      .map((val) => escapeCsvCell(val, options.delimiter, options.wrapQuotes))
      .join(options.delimiter);
    lines.push(csvRow);
  }

  return {
    output: lines.join('\n'),
    rowCount: processedItems.length,
    columnCount: headers.length,
    headers,
    previewRows,
  };
}

// ==========================================
// 3. CSV TO JSON CONVERTER
// ==========================================

export function parseCsvLine(line: string, delimiter: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Escaped double quote
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function detectDelimiter(text: string): string {
  const sample = text.slice(0, 5000);
  const firstLine = sample.split('\n')[0] || '';
  const counts: Record<string, number> = {
    ',': (firstLine.match(/,/g) || []).length,
    ';': (firstLine.match(/;/g) || []).length,
    '\t': (firstLine.match(/\t/g) || []).length,
    '|': (firstLine.match(/\|/g) || []).length,
  };

  let maxCount = -1;
  let best = ',';
  for (const [delim, count] of Object.entries(counts)) {
    if (count > maxCount) {
      maxCount = count;
      best = delim;
    }
  }
  return best;
}

function parseValueType(str: string): any {
  const trimmed = str.trim();
  if (trimmed === '') return '';
  if (trimmed.toLowerCase() === 'true') return true;
  if (trimmed.toLowerCase() === 'false') return false;
  if (trimmed.toLowerCase() === 'null') return null;

  // Number test (avoid hex, leading zero phone numbers, large integers losing precision)
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    if (trimmed.length > 1 && trimmed.startsWith('0') && !trimmed.startsWith('0.')) {
      return trimmed; // keep postal codes or leading zeros as strings
    }
    const num = Number(trimmed);
    if (!isNaN(num)) return num;
  }

  return str;
}

export function csvToJson(
  input: string,
  options: CsvToJsonOptions
): {
  output: string;
  rowCount: number;
  columnCount: number;
  headers: string[];
  previewRows: any[];
  error?: ConversionError;
} {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      output: '[]',
      rowCount: 0,
      columnCount: 0,
      headers: [],
      previewRows: [],
      error: { message: 'Input CSV text is empty.' },
    };
  }

  const delimiter =
    options.delimiter === 'auto'
      ? detectDelimiter(trimmed)
      : options.delimiter;

  // Robust line splitting handling CRLF, LF, and multiline quoted rows
  const rawLines = trimmed.split(/\r?\n/);
  const rows: string[][] = [];

  let accumulatedLine = '';
  let inQuotes = false;

  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i];
    if (accumulatedLine) {
      accumulatedLine += '\n' + line;
    } else {
      accumulatedLine = line;
    }

    // Count non-escaped quotes to check if row continues
    let quoteCount = 0;
    for (let c = 0; c < accumulatedLine.length; c++) {
      if (accumulatedLine[c] === '"') quoteCount++;
    }

    if (quoteCount % 2 === 0) {
      if (!options.skipEmptyLines || accumulatedLine.trim() !== '') {
        rows.push(parseCsvLine(accumulatedLine, delimiter));
      }
      accumulatedLine = '';
    }
  }

  if (accumulatedLine) {
    rows.push(parseCsvLine(accumulatedLine, delimiter));
  }

  if (rows.length === 0) {
    return {
      output: '[]',
      rowCount: 0,
      columnCount: 0,
      headers: [],
      previewRows: [],
      error: { message: 'No CSV rows found to parse.' },
    };
  }

  let headers: string[] = [];
  let dataRows: string[][] = [];

  if (options.hasHeaders) {
    headers = rows[0].map((h, idx) => h.trim() || `column_${idx + 1}`);
    dataRows = rows.slice(1);
  } else {
    const maxCols = Math.max(...rows.map((r) => r.length));
    headers = Array.from({ length: maxCols }, (_, i) => `column_${i + 1}`);
    dataRows = rows;
  }

  const result: Record<string, any>[] = [];

  for (const row of dataRows) {
    const item: Record<string, any> = {};
    headers.forEach((header, colIdx) => {
      const rawCell = row[colIdx] !== undefined ? row[colIdx] : '';
      item[header] = options.parseTypes ? parseValueType(rawCell) : rawCell;
    });
    result.push(item);
  }

  const output = JSON.stringify(result, null, 2);

  return {
    output,
    rowCount: result.length,
    columnCount: headers.length,
    headers,
    previewRows: result.slice(0, 15),
  };
}

// ==========================================
// 4. MERGE MULTIPLE JSON FILES
// ==========================================

function safeDeepMerge(
  target: any,
  source: any,
  collision: CollisionResolution
): any {
  if (source === null || typeof source !== 'object') {
    return collision === 'skip' && target !== undefined ? target : source;
  }

  if (Array.isArray(source)) {
    if (Array.isArray(target)) {
      return [...target, ...source];
    }
    return source;
  }

  const output = { ...target };
  const keys = Object.keys(source);

  for (const key of keys) {
    // Defense against Prototype Pollution
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue;
    }

    const targetVal = output[key];
    const sourceVal = source[key];

    if (
      targetVal !== undefined &&
      typeof targetVal === 'object' &&
      targetVal !== null &&
      sourceVal !== undefined &&
      typeof sourceVal === 'object' &&
      sourceVal !== null &&
      !Array.isArray(targetVal) &&
      !Array.isArray(sourceVal)
    ) {
      output[key] = safeDeepMerge(targetVal, sourceVal, collision);
    } else if (targetVal !== undefined) {
      if (collision === 'skip') {
        // keep targetVal
      } else if (collision === 'preserve-both') {
        output[key] = Array.isArray(targetVal)
          ? [...targetVal, sourceVal]
          : [targetVal, sourceVal];
      } else {
        // overwrite default
        output[key] = sourceVal;
      }
    } else {
      output[key] = sourceVal;
    }
  }

  return output;
}

export function mergeMultipleJson(
  files: { name: string; content: string }[],
  strategy: MergeStrategy,
  collision: CollisionResolution
): {
  output: string;
  keysCount: number;
  fileCount: number;
  error?: ConversionError;
} {
  if (files.length === 0) {
    return {
      output: '{}',
      keysCount: 0,
      fileCount: 0,
      error: { message: 'No files provided to merge.' },
    };
  }

  const parsedObjects: { name: string; data: any }[] = [];

  for (const f of files) {
    try {
      const data = JSON.parse(f.content.trim() || '{}');
      parsedObjects.push({ name: f.name, data });
    } catch (err: any) {
      return {
        output: '',
        keysCount: 0,
        fileCount: 0,
        error: {
          message: `Failed to parse file "${f.name}": ${err.message}`,
        },
      };
    }
  }

  let finalResult: any;

  if (strategy === 'concat-arrays') {
    finalResult = parsedObjects.flatMap((p) =>
      Array.isArray(p.data) ? p.data : [p.data]
    );
  } else if (strategy === 'shallow') {
    finalResult = {};
    for (const p of parsedObjects) {
      if (typeof p.data === 'object' && p.data !== null) {
        Object.assign(finalResult, p.data);
      }
    }
  } else {
    // Deep Merge
    finalResult = {};
    for (const p of parsedObjects) {
      if (typeof p.data === 'object' && p.data !== null && !Array.isArray(p.data)) {
        finalResult = safeDeepMerge(finalResult, p.data, collision);
      } else if (Array.isArray(p.data)) {
        finalResult[p.name.replace(/\.[^/.]+$/, '')] = p.data;
      } else {
        finalResult[p.name] = p.data;
      }
    }
  }

  const output = JSON.stringify(finalResult, null, 2);
  const { keysCount } = calculateJsonStats(finalResult);

  return {
    output,
    keysCount,
    fileCount: files.length,
  };
}

// ==========================================
// 5. XML TO JSON CONVERTER
// ==========================================

export function xmlToJson(
  xmlString: string,
  options: XmlToJsonOptions
): {
  output: string;
  nodeCount: number;
  rootTag: string;
  error?: ConversionError;
} {
  const trimmed = xmlString.trim();
  if (!trimmed) {
    return {
      output: '{}',
      nodeCount: 0,
      rootTag: '',
      error: { message: 'XML input is empty.' },
    };
  }

  if (typeof window === 'undefined') {
    return { output: '{}', nodeCount: 0, rootTag: '' };
  }

  let xmlDoc: Document;
  try {
    const parser = new DOMParser();
    xmlDoc = parser.parseFromString(trimmed, 'application/xml');
  } catch (err: any) {
    return {
      output: '',
      nodeCount: 0,
      rootTag: '',
      error: { message: `XML Parser initialization error: ${err.message}` },
    };
  }

  // Check for DOMParser error document
  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    const rawError = parserError.textContent || 'Malformed XML document';
    const firstLine = rawError.split('\n')[0].replace(/^error on line /i, '');
    return {
      output: '',
      nodeCount: 0,
      rootTag: '',
      error: {
        message: `XML Syntax Error: ${firstLine}`,
        snippet: rawError.slice(0, 180),
      },
    };
  }

  let nodeCount = 0;

  function domNodeToJson(node: Node): any {
    nodeCount++;

    // Element node
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const obj: Record<string, any> = {};

      // 1. Process attributes
      if (element.hasAttributes()) {
        for (let i = 0; i < element.attributes.length; i++) {
          const attr = element.attributes[i];
          const attrKey = `${options.attributePrefix}${attr.name}`;
          obj[attrKey] = options.parseNumbersAndBooleans
            ? parseValueType(attr.value)
            : attr.value;
        }
      }

      // 2. Process child nodes
      const children = Array.from(element.childNodes);
      const textNodes = children.filter(
        (c) => c.nodeType === Node.TEXT_NODE || c.nodeType === Node.CDATA_SECTION_NODE
      );
      const elementNodes = children.filter((c) => c.nodeType === Node.ELEMENT_NODE);

      // Simple text-only element (e.g. <title>Hello World</title>)
      if (elementNodes.length === 0 && textNodes.length > 0) {
        let textContent = textNodes.map((t) => t.nodeValue || '').join('');
        if (options.trimValues) textContent = textContent.trim();

        if (element.hasAttributes()) {
          obj[options.textNodeKey] = options.parseNumbersAndBooleans
            ? parseValueType(textContent)
            : textContent;
          return obj;
        } else {
          return options.parseNumbersAndBooleans
            ? parseValueType(textContent)
            : textContent;
        }
      }

      // Element with child elements
      for (const child of elementNodes) {
        const childElem = child as Element;
        const tagName = childElem.localName || childElem.nodeName;
        const childVal = domNodeToJson(childElem);

        if (obj[tagName] !== undefined) {
          if (!Array.isArray(obj[tagName])) {
            obj[tagName] = [obj[tagName]];
          }
          obj[tagName].push(childVal);
        } else {
          obj[tagName] = options.arrayMode ? [childVal] : childVal;
        }
      }

      return obj;
    }

    return null;
  }

  const rootElement = xmlDoc.documentElement;
  if (!rootElement) {
    return {
      output: '{}',
      nodeCount: 0,
      rootTag: '',
      error: { message: 'No root XML element found.' },
    };
  }

  const rootTag = rootElement.localName || rootElement.nodeName;
  const jsonTree = {
    [rootTag]: domNodeToJson(rootElement),
  };

  const output = JSON.stringify(jsonTree, null, 2);

  return {
    output,
    nodeCount,
    rootTag,
  };
}
