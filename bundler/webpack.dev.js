const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',

  // Fast source maps for easier debugging.
  devtool: 'eval-cheap-module-source-map',

  devServer: {
    // Serve static files in /public during development.
    static: {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/public'
    },

    // Enables client-side routing for SPAs.
    historyApiFallback: true,

    // Hot Module Replacement keeps state on style/script updates.
    hot: true,

    open: true,
    port: 3000,

    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    },

    watchFiles: ['src/**/*', 'public/**/*']
  },

  stats: 'minimal'
});
