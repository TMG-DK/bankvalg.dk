# bankvalg.dk

Sammenlign erhvervskonti i Norden — sammenligningstabel for danske og nordiske erhvervsbanker.

Live: https://bankvalg.dk

## Stack

- Pure static HTML + React (Babel standalone, no build step)
- Bank pricing data in `bank-data.js`
- Live pricing patched from Supabase via `bank-data-supabase.js`
- Hosted on GitHub Pages

## Local development

```bash
npx http-server -p 8765 -c-1
```

Then open http://localhost:8765.
