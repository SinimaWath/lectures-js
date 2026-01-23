const babelParser = require('@babel/eslint-parser');

module.exports = [
  {
    // Apply this config to all JS source files.
    files: ['**/*.js'],
    ignores: ['dist/**'],

    languageOptions: {
      parser: babelParser,
      parserOptions: {
        // Do not require a separate .babelrc for linting.
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-env']
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
      },

      // Explicitly list browser globals and build-time constants.
      globals: {
        window: 'readonly',
        document: 'readonly',
        module: 'readonly',
        __BUILD_TIME__: 'readonly',
        __API_BASE__: 'readonly'
      }
    },

    rules: {
      // Example rule set for a lecture; adjust for real projects.
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': 'off'
    }
  }
];
