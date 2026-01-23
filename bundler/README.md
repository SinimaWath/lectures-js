# Bundler lecture example (Webpack + Babel + ESLint)

This folder is a self-contained, modern example of a frontend bundler setup.
It intentionally shows the most common bundler features used in real projects:
- JS/ESM bundling, tree shaking, and code splitting
- CSS (global styles + CSS Modules)
- Asset Modules (images, inline SVG, raw text)
- HTML template generation
- Dev server with HMR
- Linting during builds
- Production optimizations and bundle analysis

Notes about outdated tools in the lecture topic:
- clean-webpack-plugin is replaced by Webpack's built-in output.clean
- eslint-loader is replaced by eslint-webpack-plugin
- file-loader/url-loader are replaced by Webpack 5 Asset Modules
- babel-eslint is replaced by @babel/eslint-parser
- @babel/plugin-proposal-class-properties is now @babel/plugin-transform-class-properties
- @babel/plugin-syntax-dynamic-import is not required (dynamic import is supported by Webpack + Babel)

Quick start:
1) Install dependencies: `npm install`
2) Run dev server: `npm run dev`
3) Build for production: `npm run build`
4) Build + analyze bundle: `npm run build:analyze`
5) Run linter only: `npm run lint`

Project layout:
- `src/` contains the app source and demo assets
- `public/` contains static files copied as-is to `dist/public/`
- `webpack.common.js`, `webpack.dev.js`, `webpack.prod.js` show split configs

Requires Node.js 20+ (see package.json engines).
