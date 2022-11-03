const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { dependencies } = require('../package.json');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  entry: path.resolve('./src/index'),
  output: {
    publicPath: 'http://localhost:8087/',
  },
  devServer: {
    port: 8087,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'flows',
      filename: 'remoteEntry.js',
      exposes: {
        './Flows': './src/bootstrap',
      },
      shared: {
        ...dependencies,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
      },
      remotes: {
        sharedComponents: 'sharedComponents@http://localhost:8081/remoteEntry.js',
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
