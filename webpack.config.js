const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "/app/index.html",
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + "dist",
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?/, loader: 'babel-loader', exclude: 'node_modules'},
      {test: /\.(png|jpg)$/, loader: "url-loader?mimetype=image/jpg"}

    ]
  },

  plugins: [HtmlWebpackPluginConfig]
}
