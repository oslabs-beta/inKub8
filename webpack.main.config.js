const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     'meta': {
  //       'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': "script-src 'self' 'unsafe-inline'; object-src 'self'" },
  //     }
  //   }),
  // ]
};
