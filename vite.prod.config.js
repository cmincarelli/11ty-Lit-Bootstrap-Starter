// vite.prod.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      treeshake: {
        preset: 'recommended'
      },
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
    minify: 'terser', // Better minification than esbuild
    sourcemap: false
  },
  optimizeDeps: {
    exclude: ['lit'] // Don't pre-bundle in production
  }
});