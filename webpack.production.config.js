const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const proxy = require('http-proxy-middleware');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const config = require('./src/config');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/app.html',
  filename: 'app.html',
  inject: 'body'
});

let pathsToClean = [
  'dist'
];

let cleanOptions = {
  root: __dirname,
  verbose: true
};

const extractSass = new ExtractTextPlugin({
  filename: "app.css",
  disable: false
});

module.exports = {
  name: "app",
  devtool: 'source-map',
  entry: {
    vendor: ['react-dates', 'react', 'react-dom', 'react-redux', 'lodash', 'react-router-dom', 'redux-thunk', 'jquery', 'redux', 'rxjs',
      'hammerjs', 'moment', 'react-bootstrap', 'react-select', 'redux-observable'],
    app: './src/index.js'
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process': {
        'env' : {
          'NODE_ENV': JSON.stringify('production'),
          'API': JSON.stringify('http://internal-frontend-cf-823211961.us-east-1.elb.amazonaws.com/vrgapi/index.cfm/')
        }
      }
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 2,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      sourceMap: true
    }),
    HtmlWebpackPluginConfig,
    extractSass,
    new CopyWebpackPlugin([
      {from: './src/theme-assets', to: './'}
    ])
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader"
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(?:png|jpg|svg|gif)$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'src/common')
    }
  }
};
