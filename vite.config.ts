/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    { ...eslint(), apply: 'build' }, // fail on production build
    {
      ...eslint({ failOnError: false, failOnWarning: false }), // don't fail on dev server
      apply: 'serve',
      enforce: 'post',
    },
    StylelintPlugin({ fix: true, quiet: false }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'test-utils': fileURLToPath(
        new URL('./src/helpers/test-utils.tsx', import.meta.url)
      ),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    setupFiles: ['./vitest.setup.ts'],
  },
  build: {
    sourcemap: true,
  },
});
