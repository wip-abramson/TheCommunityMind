const path = require('path')
// import 'react-notifications/lib/notifications.css';
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "/app/index.html",
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: [
    './app/index.js',
    'webpack-dev-server/client?http://0.0.0.0:80',
    'webpack/hot/only-dev-server',
  ],
  output: {
    path: __dirname + "dist",
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?/, loader: 'babel-loader', exclude: path.resolve(__dirname) + 'node_modules'},
      {test: /\.(png|jpg)$/, loader: "url-loader?mimetype=image/jpg"},
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }


      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },

  plugins: [HtmlWebpackPluginConfig, new ExtractTextPlugin("styles.css")]
}
