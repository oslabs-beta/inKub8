const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: ['./src/main.js'],
  //target: 'electron-renderer',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  /*resolve: {
    fallback: {
      'fs': require.resolve('fs'),
      //'path': require('path')
    }
  }*/
  /*externals: {
    'fs': require('fs'),
    'path': require('path')
  }*/
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     'meta': {
  //       'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': "script-src 'self' 'unsafe-inline'; object-src 'self'" },
  //     }
  //   }),
  // ]
}
/*
{
  entry: './src/preload.js',
  target: 'electron-preload',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'preload.bundled.js'
  }
},*/
