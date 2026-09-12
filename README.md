# DataTools

**Live site:** [datatools.toolbay.site](https://datatools.toolbay.site)

Fast, secure, 100% client-side developer data format utilities. Format, validate, and convert JSON, CSV, and XML — your data never leaves your browser.

## Features

- JSON formatter / validator
- JSON ⇄ CSV converter
- JSON merge tool
- XML ⇄ JSON converter
- Code-editor UI with syntax highlighting
- Blog for SEO and developer education

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/*, blog, about, contact, privacy, terms)
lib/            Tool config and blog data
```

## License

All rights reserved.
