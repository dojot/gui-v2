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
    publicPath: 'http://localhost:8088/',
  },
  devServer: {
    port: 8088,
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
      name: 'reports',
      filename: 'remoteEntry.js',
      exposes: {
        './Reports': './src/bootstrap',
      },
      shared: {
        ...dependencies,
        react: {
          eager: false,
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          eager: false,
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        '@material-ui/styles': {
          eager: false,
          singleton: true,
          requiredVersion: dependencies['@material-ui/styles'],
        },
        '@material-ui/core': {
          singleton: false,
          requiredVersion: dependencies['@material-ui/core'],
        },
        '@material-ui/icons': {
          singleton: false,
          requiredVersion: dependencies['@material-ui/icons'],
        },
        '@material-ui/lab': {
          eager: false,
          singleton: true,
          requiredVersion: dependencies['@material-ui/lab'],
        },
        '@material-ui/pickers': {
          eager: false,
          singleton: true,
          requiredVersion: dependencies['@material-ui/pickers'],
        },
        'prop-types': {
          singleton: false,
          requiredVersion: dependencies['prop-types'],
        },
        'react-transition-group': {
          eager: false,
          singleton: true,
          requiredVersion: dependencies['react-transition-group'],
        },
        clsx: {
          eager: false,
          singleton: true,
          requiredVersion: dependencies.clsx,
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
