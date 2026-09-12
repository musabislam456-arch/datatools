export const SAMPLES = {
  jsonFormatter: {
    valid: `{
  "api": "DataTools v2.4",
  "environment": "production",
  "server": {
    "host": "edge-cluster-04.internal",
    "region": "us-east-1",
    "uptime_seconds": 864200,
    "healthy": true
  },
  "rate_limits": {
    "tier": "enterprise",
    "requests_per_minute": 50000,
    "burst_allowance": 1.25
  },
  "routes": [
    { "path": "/v1/transform", "method": "POST", "latency_p99_ms": 14.2 },
    { "path": "/v1/validate", "method": "POST", "latency_p99_ms": 8.1 },
    { "path": "/v1/health", "method": "GET", "latency_p99_ms": 1.9 }
  ],
  "security": {
    "tls_version": "1.3",
    "strict_transport": true,
    "cors_allowed_origins": ["https://app.datatools.dev", "https://datatools.dev"]
  }
}`,
    minified: `{"service":"auth-gateway","status":"active","metrics":{"active_sessions":1420,"jwt_validations_sec":89.4},"flags":{"enable_mfa":true,"passkey_beta":false},"cluster":["node-a1","node-a2"]}`,
    unformattedWithEscapes: `{\n  \\"status\\": \\"success\\",\n  \\"data\\": { \\"user\\": \\"alex_dev\\", \\"roles\\": [\\"admin\\", \\"billing\\"] }\n}`,
    broken: `{
  "projectId": "alpha-99",
  "tags": ["web", "api", "database",]
  "active": true
}`,
  },

  jsonToCsv: {
    users: `[
  {
    "id": 101,
    "name": "Sarah Connor",
    "email": "sarah@cyberdyne.org",
    "department": "Security Ops",
    "role": "Lead Architect",
    "active": true,
    "salary": 165000,
    "address": {
      "city": "Los Angeles",
      "state": "CA",
      "zip": "90001"
    }
  },
  {
    "id": 102,
    "name": "John Reese",
    "email": "john.reese@fbi-covert.gov",
    "department": "Field Intelligence",
    "role": "Specialist",
    "active": true,
    "salary": 142000,
    "address": {
      "city": "New York",
      "state": "NY",
      "zip": "10007"
    }
  },
  {
    "id": 103,
    "name": "Harold Finch",
    "email": "h.finch@ift.net",
    "department": "Software Engineering",
    "role": "Founder",
    "active": false,
    "salary": 220000,
    "address": {
      "city": "New York",
      "state": "NY",
      "zip": "10014"
    }
  },
  {
    "id": 104,
    "name": "Root Grove",
    "email": "root@analog-interface.io",
    "department": "Security Ops",
    "role": "Adversarial Tester",
    "active": true,
    "salary": 185000,
    "address": {
      "city": "Chicago",
      "state": "IL",
      "zip": "60601"
    }
  }
]`,
    products: `[
  { "sku": "DTS-01", "name": "USB-C Hardware Key", "price": 49.99, "stock": 120, "category": "Hardware" },
  { "sku": "DTS-02", "name": "DevSecOps Handbook", "price": 29.50, "stock": 450, "category": "Books" },
  { "sku": "DTS-03", "name": "Mechanical Switch Tester", "price": 18.00, "stock": 85, "category": "Accessories" }
]`,
  },

  csvToJson: {
    simple: `id,sku,product_name,category,unit_price,in_stock,is_featured
1,PROD-981,"Ergonomic Split Keyboard, Dark Navy",Peripherals,189.95,42,true
2,PROD-982,"4K 144Hz Monitor 27\\"",Displays,429.00,18,true
3,PROD-983,"USB-C 100W Braided Cable",Cables,19.50,250,false
4,PROD-984,"Aluminum Laptop Stand (Vented)",Furniture,54.00,80,false
5,PROD-985,"Precision Screwdriver Set, 64-bit",Tools,32.75,115,true`,
    financial: `transaction_id,timestamp,account_from,account_to,amount_usd,fee,status
tx_880191,2026-03-01T10:14:00Z,acc_user_4491,acc_merchant_12,1250.00,3.75,COMPLETED
tx_880192,2026-03-01T10:18:22Z,acc_user_1182,acc_user_9901,84.50,0.00,COMPLETED
tx_880193,2026-03-01T10:22:45Z,acc_user_7210,acc_merchant_55,4200.10,12.60,PENDING_REVIEW
tx_880194,2026-03-01T10:30:10Z,acc_user_3309,acc_merchant_02,15.99,0.48,COMPLETED`,
  },

  mergeJson: [
    {
      id: 'file-1',
      name: 'base-config.json',
      content: `{
  "app": {
    "name": "DataTools Enterprise",
    "version": "1.0.0",
    "debug": false
  },
  "database": {
    "host": "db.production.internal",
    "port": 5432,
    "poolSize": 20
  },
  "features": {
    "offlineMode": true,
    "auditLogging": true,
    "experimentalCli": false
  }
}`,
      size: 268,
    },
    {
      id: 'file-2',
      name: 'staging-overrides.json',
      content: `{
  "app": {
    "version": "1.1.0-rc3",
    "debug": true
  },
  "database": {
    "host": "staging-db.internal",
    "poolSize": 5
  },
  "features": {
    "experimentalCli": true,
    "darkTheme": true
  },
  "monitoring": {
    "prometheus": true,
    "intervalSec": 15
  }
}`,
      size: 284,
    },
    {
      id: 'file-3',
      name: 'local-secrets.json',
      content: `{
  "database": {
    "ssl": true,
    "timeoutMs": 3000
  },
  "auth": {
    "jwtExpiry": "1h",
    "issuer": "https://auth.datatools.dev"
  }
}`,
      size: 146,
    },
  ],

  xmlToJson: {
    rss: `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>DataTools Engineering Dispatch</title>
    <link>https://datatools.dev/blog</link>
    <description>In-depth architectural guides on data formats, serialization, and browser performance.</description>
    <language>en-us</language>
    <pubDate>Mon, 09 Mar 2026 12:00:00 GMT</pubDate>
    <item>
      <title>Mastering JSON vs CSV: When to Stream, When to Nest</title>
      <link>https://datatools.dev/blog/json-vs-csv-streaming-vs-nesting</link>
      <guid isPermaLink="true">dts-art-01</guid>
      <category>Architecture</category>
      <pubDate>Sun, 08 Mar 2026 09:00:00 GMT</pubDate>
      <author>alex.chen@datatools.dev</author>
      <description><![CDATA[Comparing memory footprints and parsing speeds when processing millions of records across tabular and hierarchical formats.]]></description>
    </item>
    <item>
      <title>Safely Parsing &amp; Transforming XML in Modern JavaScript</title>
      <link>https://datatools.dev/blog/safely-parsing-xml-modern-javascript</link>
      <guid isPermaLink="true">dts-art-02</guid>
      <category>Security</category>
      <pubDate>Thu, 05 Mar 2026 14:30:00 GMT</pubDate>
      <author>elena.rostova@datatools.dev</author>
      <description><![CDATA[Defending client-side applications against Billion Laughs XML entity attacks and namespace parsing anomalies.]]></description>
    </item>
  </channel>
</rss>`,
    catalog: `<?xml version="1.0" encoding="UTF-8"?>
<catalog department="Cloud Infrastructure" lastUpdated="2026-03-10">
  <service id="srv-001" tier="production">
    <name>Postgres Primary Cluster</name>
    <region>us-east-1</region>
    <specs vcpu="16" ramGb="64" nvmeGb="1000" />
    <cost monthlyUsd="620.00" onDemand="true" />
    <tags>
      <tag>database</tag>
      <tag>high-availability</tag>
      <tag>mission-critical</tag>
    </tags>
  </service>
  <service id="srv-002" tier="staging">
    <name>Redis In-Memory Cache</name>
    <region>us-east-1</region>
    <specs vcpu="4" ramGb="16" nvmeGb="50" />
    <cost monthlyUsd="85.00" onDemand="false" />
    <tags>
      <tag>caching</tag>
      <tag>ephemeral</tag>
    </tags>
  </service>
</catalog>`,
  },
};
