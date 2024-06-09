/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// uncomment if tailwind doesn't "get it"
// import tailwindcss from 'tailwindcss'

export default defineConfig({
  // cacheDir: '../../node_modules/.vite/react-ui', // nx legacy

  server: {
    port: 4200,
    host: 'localhost',

    proxy: {
      '/api/': {
        target: 'http://localhost:3939', // http://127.0.0.1:3939
        secure: false,
        changeOrigin: true,
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

  // uncomment if tailwind doesn't work out-of-the-box
  // css: {
  //   postcss: {
  //     plugins: [tailwindcss()],
  //   },
  // },
})
