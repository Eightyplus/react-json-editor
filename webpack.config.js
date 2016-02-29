const path = require('path');
const webpack = require('webpack');
const merge = require('merge');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

if(TARGET === 'build') {
  module.exports = {
    entry: './src/index',
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, 'src'),
            path.resolve(__dirname, 'src/components'),
            path.resolve(__dirname, 'src/tools')
          ],
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0', 'react']
          },
          plugins: ['transform-react-jsx', 'react-transform']
        }
      ]
    },
    externals: [{
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      }
    }],
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'react-json-edit'
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      })
    ]
  };
}

if(TARGET === 'buildtest') {
  module.exports = {
    entry: {
      app: path.join(__dirname, 'app')
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'index.js'
    },
    module: {
      loaders: [
        {
          build: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            cacheDirectory: true,
            presets: ['es2015', 'stage-0', 'react']
          },
          plugins: ['transform-react-jsx', 'react-transform']
        }
      ]
    },
    devtool: 'eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'build'),

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new NpmInstallPlugin({
        save: true // --save
      })
    ]
  };
}
