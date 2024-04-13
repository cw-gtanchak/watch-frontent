import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePluginFonts as fonts } from 'vite-plugin-fonts';
import commonjs from 'vite-plugin-commonjs';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-unused-modules
export default defineConfig({
  cacheDir: '../../node_modules/.vite',
  envDir: '../../env',
  plugins: [
    react(),
    tsconfigPaths(),
    commonjs(),
    fonts({
      custom: {
        families: [
          {
            name: 'Maax',
            local: 'Maax',
            src: './src/assets/fonts/*.ttf',
          },
          {
            name: 'Neue Montreal',
            local: 'Neue Montreal',
            src: './src/assets/fonts/neue-montreal/*.ttf',
          },
        ],
      },
    }),
    // visualizer({
    //   template: 'treemap', // or sunburst
    //   open: true,
    //   gzipSize: true,
    //   brotliSize: true,
    //   filename: 'analyze.html', // will be saved in project's root
    // }),
  ],
  // resolve: {
  //   alias: {
  //     '@analog-labs/timegraph-wasm': '../packages/timegraph-wasm/web/lib',
  //   },
  // },
  /* If proxy is needed
  server: {
    proxy: {
      "/api": "localhost:8080"
    }
  },
  */
  build: {
    target: 'esnext',
    sourcemap: true,
    commonjsOptions: {
      include: [/packages\/watch-common/, /node_modules/],
    },
    rollupOptions: {
      output: {
        dir: './dist',
        manualChunks(id) {
          if (
            /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/.test(id)
          ) {
            return 'react';
          }

          if (/[\\/]node_modules[\\/](@polkadot)[\\/]/.test(id)) {
            return 'polkadot';
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ['@watch/common'],
    exclude: ['@codemirror/state', './src/gql/gql.ts'],
  },
});
