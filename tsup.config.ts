import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/cli.ts'],
    format: ['esm'],
    dts: false,
    outDir: 'dist',
    clean: true,
    minify: true,
    outExtension: () => ({ js: '.js' }),
    banner: {
      js: '#!/usr/bin/env node',
    },
  },
  {
    entry: ['src/setup.ts'],
    format: ['cjs'],
    dts: false,
    outDir: 'dist',
    minify: true,
    outExtension: () => ({ js: '.cjs' }),
  },
]);
