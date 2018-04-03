const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require('path');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  name: "app",
  context: path.resolve('client'),
  devtool: 'source-map',
  entry: {
    vendor: ['react', 'react-dom', 'react-redux', 'lodash', 'react-router-dom', 'redux-thunk', 'jquery', 'redux', 'rxjs', 'hammerjs', 'moment', 'react-bootstrap', 'react-dates', 'react-select', 'redux-observable'],
    app: path.resolve(__dirname, 'client/app')
  },
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process': {
        'env' : {
          'NODE_ENV': JSON.stringify('development')
        }
      }
    }),
    //new BundleAnalyzerPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: "app.css"
    })
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'client'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['es2015', {modules: false}],
                'react',
              ],
            }
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
      common: path.resolve(__dirname, 'client/common')
    }
  }
};
