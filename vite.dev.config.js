// vite.dev.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        widgets: 'src/js/widgets/index.js',
        main: 'src/js/main.js'  // New JS entry point
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es'
      }
    },
    outDir: '_build/js',
    emptyOutDir: true,
    minify: false, // Fast builds for dev
    sourcemap: true // Debug info
  }
});