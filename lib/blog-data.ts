import { BlogPost } from './types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'json-vs-csv-streaming-vs-nesting',
    title: 'Mastering JSON vs CSV: When to Stream, When to Nest',
    summary:
      'A deep dive into serialization tradeoffs, flat tabular vs hierarchical data structures, memory overhead, and when streaming 100MB+ datasets beats JSON in modern data pipelines.',
    date: 'March 8, 2026',
    readTime: '8 min read',
    author: {
      name: 'Alex Chen',
      role: 'Principal Distributed Systems Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    tags: ['Architecture', 'JSON', 'CSV', 'Performance', 'Streaming'],
    content: `
## The Fundamental Conflict: Hierarchy vs. Columnar Density

In modern backend architecture and data engineering, choosing between **JSON (JavaScript Object Notation)** and **CSV (Comma-Separated Values)** is rarely just a stylistic preference. It directly dictates memory allocation during ingest, serialization CPU cycles, network egress costs, and the complexity of your stream consumers.

JSON is fundamentally a **hierarchical tree representation**. It excels at polymorphic data structures where entities possess varying shapes, optional nested relations, arrays of sub-records, and typed primitives.

Conversely, CSV is an **append-only columnar slice**. It assumes strict tabular symmetry: every record adheres to the same schema, and every row maps directly to memory offsets.

### Tradeoff Comparison

| Metric / Dimension | JSON (Pretty / Minified) | CSV (RFC 4180) | Winner for Tabular |
| :--- | :--- | :--- | :--- |
| **Payload Overhead** | High (Field keys repeated per row) | Extremely Low (Headers declared once) | **CSV (up to 70% smaller)** |
| **Type Fidelity** | Native (Numbers, Booleans, Null, Strings) | None (All tokens are string literals) | **JSON** |
| **Streaming Memory Footprint** | $O(N)$ for \`JSON.parse\`, $O(1)$ for JSONL | $O(1)$ constant chunk-by-chunk | **CSV** |
| **Schema Evolution** | Seamless (New optional keys add cleanly) | Rigid (Column reordering breaks index parsers) | **JSON** |

---

## The Repetition Tax of Standard JSON

Consider an analytics payload emitting 100,000 server access records:

\`\`\`json
[
  {
    "timestamp": 1773052800,
    "client_ip": "198.51.100.44",
    "http_method": "POST",
    "status_code": 200,
    "latency_ms": 14.8
  },
  ...
]
\`\`\`

In standard JSON, the string \`"timestamp"\`, \`"client_ip"\`, \`"http_method"\`, \`"status_code"\`, and \`"latency_ms"\` are repeated **100,000 times**. That is over **6.2 megabytes of raw duplicate key characters** sent across your VPC or egress pipe.

In CSV:

\`\`\`csv
timestamp,client_ip,http_method,status_code,latency_ms
1773052800,198.51.100.44,POST,200,14.8
\`\`\`

The keys are defined exactly once on Line 1. The payload shrinks from ~8.5 MB down to ~2.6 MB without even enabling Gzip or Brotli compression.

---

## When You Must Use JSON

1. **Polymorphic Event Streams**: An event queue handling \`USER_SIGNUP\`, \`BILLING_CHARGE\`, and \`ALERT_FIRED\` where each event type has completely different attributes.
2. **Deeply Nested Entity Graphs**: User profiles containing nested addresses, multiple credit cards, permission role matrices, and audit logs. Flattening these into CSV produces artificial dot-notation prefixes (\`user.roles[0].name\`) that bloat quickly.
3. **Public REST / GraphQL APIs**: Client developers expect JSON. Typing guarantees (like distinguishing \`null\` from \`""\` and \`42\` from \`"42"\`) prevent subtle coercion bugs in client runtime environments.

---

## When You Should Migrate to CSV or Parquet

1. **Warehouse Bulk Loading**: Snowflake, BigQuery, and AWS Redshift ingest CSV and Parquet at orders of magnitude higher throughput than multi-line JSON.
2. **Tabular Exports for Analysts**: Financial spreadsheets, monthly transaction audits, and ledger reconciliations natively target Excel, Google Sheets, or pandas DataFrames.
3. **High-Volume Telemetry Streaming**: When logging billions of homogeneous metrics or clickstream pulses, streaming CSV directly to object storage minimizes latency and garbage collection pauses.

---

## Summary Architecture Rule

> **The Golden Rule**: Use JSON for your boundaries (APIs, mobile clients, polymorphic message queues) and convert to tabular CSV/columnar formats at your storage and analytical boundaries.
`,
  },
  {
    slug: 'safely-parsing-xml-modern-javascript',
    title: 'Safely Parsing & Transforming XML in Modern JavaScript & Web APIs',
    summary:
      'Understanding DOMParser, preventing XXE & Billion Laughs entity expansion, handling tricky namespaces and CDATA tags, and converting legacy enterprise XML to clean JSON payloads.',
    date: 'March 5, 2026',
    readTime: '10 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Lead Security Engineer',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    tags: ['Security', 'XML', 'DOMParser', 'JavaScript', 'Enterprise'],
    content: `
## The Enduring Reality of Enterprise XML

Despite two decades of JSON dominance, XML remains mission-critical across enterprise infrastructures: SOAP web services, legacy financial rails (ISO 20022), RSS/Atom media syndication, OpenStreetMap, SVG vector graphics, and SAML authentication flows.

When building client-side tools or Node.js microservices that ingest XML, developers frequently stumble into catastrophic traps: **memory exhaustion vulnerabilities**, **silent parsing drops**, and **namespace mangling**.

---

## Security Vulnerability: The Billion Laughs Attack (XXE)

XML allows document authors to declare custom Document Type Definitions (DTDs) with internal entities. In naive parsers, recursive entity expansion allows an attacker to blow up a 1-kilobyte XML file into 3 gigabytes of memory:

\`\`\`xml
<?xml version="1.0"?>
<!DOCTYPE lolz [
  <!ENTITY lol "lol">
  <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
]>
<lolz>&lol4;</lolz>
\`\`\`

### Safe Parsing In The Browser

Modern browsers protect \`DOMParser\` against external entity retrieval (XXE) by default when using:

\`\`\`typescript
const parser = new DOMParser();
const xmlDoc = parser.parseFromString(rawXml, 'application/xml');

// Checking for XML Syntax Errors
const parseError = xmlDoc.querySelector('parsererror');
if (parseError) {
  throw new Error('Malformed XML: ' + parseError.textContent);
}
\`\`\`

Unlike server-side parsers (such as old Python \`xml.etree\` or Java \`DocumentBuilderFactory\` which require explicit disabling of external DTDs), browser-native \`DOMParser\` runs in an isolated sandboxed context without filesystem access.

---

## Handling Tricky XML Constructs

### 1. Repeating Elements vs. Singletons
In JSON, an array is explicit: \`"items": []\`. In XML, an array is simply repeated child nodes:

\`\`\`xml
<catalog>
  <product id="101"><name>Keyboard</name></product>
  <product id="102"><name>Mouse</name></product>
</catalog>
\`\`\`

If your converter only checks for single children, a catalog with one item might serialize as an \`Object\`, while a catalog with two items serializes as an \`Array\`. Your conversion logic must intelligently detect duplicate keys or offer an option to force array wrapping for specified paths.

### 2. Attributes vs. Child Nodes
XML allows data in both attributes (\`<user id="42" active="true">\`) and text nodes (\`<name>John</name>\`). To avoid collision between an attribute called \`name\` and a child tag named \`<name>\`, adopt standard prefix conventions like \`@_id\` or \`@id\`.

### 3. CDATA Sections
CDATA blocks (\`<![CDATA[ <html>unescaped content</html> ]]>\`) prevent the XML parser from interpreting inner angle brackets. Ensure your node traversal extracts both \`Node.TEXT_NODE\` and \`Node.CDATA_SECTION_NODE\` into a unified string.

---

## Practical Node Traversal Pattern

Here is how our client-side DataTools engine parses XML nodes safely without recursion overflow:

\`\`\`typescript
function extractNodeValue(element: Element, attrPrefix = '@_') {
  const result: Record<string, any> = {};

  // 1. Process attributes safely
  for (let i = 0; i < element.attributes.length; i++) {
    const attr = element.attributes[i];
    result[\`\${attrPrefix}\${attr.name}\`] = attr.value;
  }

  // 2. Aggregate child tags
  for (const child of Array.from(element.children)) {
    const key = child.tagName;
    const value = extractNodeValue(child, attrPrefix);

    if (result[key]) {
      if (!Array.isArray(result[key])) result[key] = [result[key]];
      result[key].push(value);
    } else {
      result[key] = value;
    }
  }

  return result;
}
\`\`\`
`,
  },
  {
    slug: 'deep-merging-json-prototype-pollution-protection',
    title: 'Deep Merging JSON Objects: Strategies, Pitfalls, and Prototype Pollution Protection',
    summary:
      'A practical guide to recursive object merging, resolving key collisions, array union vs overwrite semantics, and defending against the critical prototype pollution security attack vector.',
    date: 'February 27, 2026',
    readTime: '9 min read',
    author: {
      name: 'Marcus Vance',
      role: 'Staff Infrastructure Architect',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    tags: ['JavaScript', 'Security', 'JSON', 'Architecture', 'DevOps'],
    content: `
## The Configuration Aggregation Problem

In modern cloud-native architectures, configurations rarely exist as a single monolithic JSON file. Instead, applications assemble their active state through multiple layered sources:

1. \`defaults.json\` (Vendor defaults)
2. \`production.json\` (Environment cluster variables)
3. \`secrets.json\` (Mounted runtime secrets)
4. \`client-overrides.json\` (Tenant-specific customizations)

When you merge these distinct files, subtle differences in merge semantics can cause catastrophic outages or critical security vulnerabilities.

---

## The Threat: Prototype Pollution via Unsafe Deep Merge

Prototype Pollution is one of the most pervasive vulnerabilities in dynamic JavaScript runtimes. When a recursive merge function blindly copies keys without filtering object meta-properties, an attacker can overwrite \`Object.prototype\`.

Consider this malicious JSON payload:

\`\`\`json
{
  "__proto__": {
    "isAdmin": true,
    "role": "super-admin"
  }
}
\`\`\`

If your deep merge function recursively descends into \`target[key]\`:

\`\`\`typescript
// VULNERABLE CODE - DO NOT USE!
function unsafeDeepMerge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) target[key] = {};
      unsafeDeepMerge(target[key], source[key]); // target['__proto__'] modifies Object.prototype!
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
\`\`\`

When this runs, **every plain object in the entire application** now evaluates \`{}.isAdmin === true\`. Authentication gates fail open across the entire server.

### The Bulletproof Defense

Always explicitly filter dangerous keys at the loop boundary:

\`\`\`typescript
const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

export function safeDeepMerge(target: any, source: any) {
  const output = { ...target };

  for (const key of Object.keys(source)) {
    if (FORBIDDEN_KEYS.has(key)) {
      // Drop dangerous prototype keys immediately
      continue;
    }

    const targetVal = output[key];
    const sourceVal = source[key];

    if (
      isPlainObject(targetVal) &&
      isPlainObject(sourceVal)
    ) {
      output[key] = safeDeepMerge(targetVal, sourceVal);
    } else {
      output[key] = sourceVal;
    }
  }

  return output;
}
\`\`\`

---

## Array Collision Strategies: Replace vs. Concat vs. Union

Unlike plain objects where key conflicts have intuitive overwrite rules, arrays present an architectural choice:

### Strategy A: Replace (Default in Kubernetes & Helm)
If \`base.json\` has \`"tags": ["web", "frontend"]\` and \`override.json\` has \`"tags": ["prod"]\`, the resulting array is \`["prod"]\`. This allows explicit overrides, but makes additive extensions difficult.

### Strategy B: Concatenate
The arrays are merged directly: \`["web", "frontend", "prod"]\`. If duplicate values exist, both remain.

### Strategy C: Set Union (Deduplicated)
The elements are combined into a mathematical set: \`Array.from(new Set([...base, ...override]))\`. This works cleanly for scalar items, but requires deep equality checks for arrays containing nested objects.

---

## The DataTools Approach

The DataTools JSON Merge utility implements:
- **100% Client-Side In-Memory Execution**: No configuration files are uploaded to any server.
- **Strict Prototype Sanitization**: Automatic stripping of \`__proto__\` and \`constructor\` attacks.
- **Flexible Collision Modes**: Choose between Deep Merge, Shallow Object Merge, or Array Concatenation on the fly.
`,
  },
];
