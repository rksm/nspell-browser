/*global require,__dirname,module*/
const webpack = require('webpack'),
      path = require('path');

module.exports = {
  entry: {
    "nspell.browser": "./src/nspell.browser.js",
    "nspell.browser.min": "./src/nspell.browser.js"
  },

  module: {
    rules: [{test: /\.(aff|dic)$/, use: 'buffer-loader'}]
  },

  output: {
    path: path.resolve("./build"),
    filename: '[name].js',
    libraryTarget: "umd",
    library: "nspell"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
