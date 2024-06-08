# @workspace/common

```json
  "scripts": {
    "build": "tsup src/index.ts --config tsup.config.ts",
    "build:cli": "tsup src/index.ts --format cjs,esm --dts",
    "lint": "eslint src --ext .ts",
    "check": "tsc --noEmit",
    "test": "vitest"
  },
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist",
    "README.md",
    "CHANGELOG.md",
    "package.json",
    "LICENSE"
  ],

```
