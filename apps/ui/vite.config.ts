/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  server: {
    port: 4200,
    host: 'localhost',

    proxy: {
      '/api/': {
        target: 'http://localhost:3939', // http://127.0.0.1:3939
        secure: false,
        changeOrigin: true,

        // example of rewriting URL path to match a hypothetical deployment environment
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), tsconfigPaths()],

  // uncomment if using workers
  // worker: {
  //  plugins: [ tsconfigPaths() ],
  // },

  // uncomment if tailwind doesn't work out-of-the-box (also import tailwindcss)
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss()],
  //   },
  // },
})
