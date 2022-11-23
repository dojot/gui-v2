const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const dependencies = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  entry: path.resolve('./src/index'),
  output: {
    publicPath: 'http://localhost:8084/',
  },
  devServer: {
    port: 8084,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Assets: path.resolve('./src/assets'),
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'devices',
      filename: 'remoteEntry.js',
      exposes: {
        './Devices': './src/bootstrap',
      },
      shared: {
        ...dependencies,
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        '@material-ui/styles': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/styles'],
        },
        '@material-ui/core': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/core'],
        },
        '@material-ui/icons': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/icons'],
        },
        '@material-ui/lab': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/lab'],
        },
        '@material-ui/pickers': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['@material-ui/pickers'],
        },
        'prop-types': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['prop-types'],
        },
        'react-transition-group': {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-transition-group'],
        },
        clsx: {
          eager: true,
          singleton: true,
          requiredVersion: dependencies['clsx'],
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
