import { defineConfig } from 'tsup'
// import { } // consider importing from a base in workspace root...

export default defineConfig({
  target: 'es2022',
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  minify: process.env.NODE_ENV !== 'development',
  external: [],
  esbuildOptions(options) {
    // ensure esbuild used internally by tsup is configured for tree-shaking
    options.treeShaking = true
  },
})
