const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  /*
  externals: {
    'fs': require('fs')
  },
  resolve: {
    fallback: {
      'path': require.resolve('path-browserify'),
      'fs': require.resolve('fs')
    }
  },
  node: {
    __dirname: false
  }*/
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     'meta': {
  //       'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': "script-src 'self' 'unsafe-inline'; object-src 'self'" },
  //     }
  //   }),
  // ]
};
