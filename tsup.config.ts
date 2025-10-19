import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    outDir: 'dist',
    clean: true,
    outExtension({ format }) {
      if (format === 'cjs') return { js: '.cjs.js' };
      if (format === 'esm') return { js: '.js' };
      return { js: '.js' };
    },
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
]);
