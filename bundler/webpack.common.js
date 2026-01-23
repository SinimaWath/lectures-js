const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const styleLoader = isProd
  ? { loader: MiniCssExtractPlugin.loader, options: { esModule: false } }
  : { loader: 'style-loader', options: { esModule: false } };

module.exports = {
  // The main entry point for the app bundle.
  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    // Content hashes enable long-term caching in production.
    filename: 'assets/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',

    // Webpack 5 native output cleanup replaces clean-webpack-plugin.
    clean: true,

    // Default path for emitted assets (images, fonts, etc.).
    assetModuleFilename: 'assets/media/[name].[contenthash:8][ext][query]'
  },

  module: {
    rules: [
      {
        // Transpile modern JS with Babel.
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Cache results for faster rebuilds in development.
            cacheDirectory: true
          }
        }
      },
      {
        // CSS Modules: file name ends with .module.css to opt-in.
        test: /\.module\.css$/,
        // Order of loaders from Right to Left
        use: [
          styleLoader,
          // Load css to javascript
          {
            loader: 'css-loader',
            options: {
              esModule: false,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]'
              }
            }
          }
        ]
      },
      {
        // Global CSS (non-module styles).
        test: /\.css$/,
        exclude: /\.module\.css$/,
        // Order of loaders from Right to Left
        use: [styleLoader, 'css-loader']
      },
      {
        // Inline SVGs when the filename ends with .inline.svg.
        test: /\.inline\.svg$/i,
        type: 'asset/inline'
      },
      {
        // Image assets: inline small files, emit files for larger ones.
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: /\.inline\.svg$/i,
        type: 'asset',
        parser: {
          // Base64 if < 4 KB
          dataUrlCondition: {
            maxSize: 4 * 1024
          }
        }
      },
      {
        // Fonts and other binary assets.
        test: /\.(woff2?|eot|ttf|otf)$/i,
        // Always create new file
        type: 'asset/resource'
      },
      {
        // Import text files as strings (useful for templates, SVG snippets, etc.).
        test: /\.txt$/i,
        // Raw loader, as a string
        type: 'asset/source'
      }
    ]
  },

  plugins: [
    // Generates index.html and injects bundle tags automatically.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body',
      scriptLoading: 'defer',
      // Favicon is optional; uncomment if you add one to public/.
      // favicon: path.resolve(__dirname, 'public/favicon.svg')
    }),

    // Copies static files that should not be bundled (robots.txt, etc.).
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: 'public',
          noErrorOnMissing: true
        }
      ]
    }),

    // Replaces eslint-loader with the modern ESLint plugin.
    // new ESLintWebpackPlugin({
    //   extensions: ['js'],
    //   emitWarning: true
    // }),

    // Example of build-time constants available in source code.
    new webpack.DefinePlugin({
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      __API_BASE__: JSON.stringify(process.env.API_BASE || '/api')
    }),
    ...(isProd
      ? [
          new MiniCssExtractPlugin({
            filename: 'assets/css/[name].[contenthash:8].css'
          })
        ]
      : [])
  ],

  resolve: {
    extensions: ['.js'],
    alias: {
      // Example alias to keep imports clean in larger apps.
      '@': path.resolve(__dirname, 'src')
    }
  }
};
