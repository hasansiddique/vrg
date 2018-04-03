const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
const proxy = require('http-proxy-middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./src/config');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './src/app.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  name: "app",
  devtool: 'source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  devServer: {
    compress: false,
    overlay: true,
    port: 8080,
    historyApiFallback: true,
    hot: false,
    before(app){
      app.use('/mock/*', proxy({
        target: config.mock,
        pathRewrite: {'^/mock/': ''}
      }));
      app.use('/api/*', proxy({
        changeOrigin: true,
        target: config.api,
        pathRewrite: {'^/api/': ''}
      }));
      app.use('/travel-star/*', proxy({
        changeOrigin: true,
        target: config.blog,
        secure: false,
        pathRewrite: {'^/travel-star/': ''}
      }));
      app.use('/aws/*', proxy({
        target: config.aws,
        pathRewrite: {'^/aws/': ''},
        changeOrigin: true
      }));
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process': {
        'env' : {
          'NODE_ENV': JSON.stringify('development'),
          'API': JSON.stringify('http://internal-frontend-cf-823211961.us-east-1.elb.amazonaws.com/vrgapi/index.cfm/')
        }
      }
    }),
    HtmlWebpackPluginConfig,
    new CopyWebpackPlugin([
      { from: './src/theme-assets', to: './' }
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
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
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
