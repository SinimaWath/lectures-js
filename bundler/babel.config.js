module.exports = {
  // Keep source files readable while targeting a wide range of browsers.
  presets: [
    [
      '@babel/preset-env',
      {
        // Browserslist from package.json is used automatically.

        // Automatically inject only the polyfills you actually use.
        useBuiltIns: 'usage',
        corejs: 3
      }
    ]
  ],
  plugins: [
    // Modern replacement for the old proposal-class-properties plugin.
    ['@babel/plugin-transform-class-properties', { loose: false }]
  ]
};
