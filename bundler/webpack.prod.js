const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');

module.exports = (env = {}) => {
  const isAnalyze = Boolean(env.analyze);

  const productionConfig = {
    mode: 'production',

    // High-quality source maps for debugging production issues.
    devtool: 'source-map',

    output: {
      publicPath: '/bundler/dist/'
    },

    optimization: {
      // Webpack includes Terser by default, but we show it explicitly for teaching.
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            format: {
              comments: false
            }
          },
          extractComments: false
        })
      ],

      // Split vendor and shared chunks for better caching.
      splitChunks: {
        chunks: 'all'
      },

      // Keep runtime code in a separate chunk for long-term caching.
      runtimeChunk: 'single'
    },

    performance: {
      hints: 'warning'
    }
  };

  const analyzeConfig = isAnalyze
    ? {
        plugins: [new BundleAnalyzerPlugin()]
      }
    : {};

  return merge(common, productionConfig, analyzeConfig);
};
