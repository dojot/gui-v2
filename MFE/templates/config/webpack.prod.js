const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const dependencies = require('../package.json').dependencies;

const domain = process.env.PRODUCTION_DOMAIN || '/mfe';

const prodConfig = {
  mode: 'production',
  entry: path.resolve('./src/index'),
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/mfe/templates',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      APIs: path.resolve('./src/adapters/api'),
      Assets: path.resolve('./src/assets'),
      Hooks: path.resolve('./src/hooks'),
      Selectors: path.resolve('./src/redux/selectors'),
      Services: path.resolve('./src/adapters/services'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new ModuleFederationPlugin({
      name: 'templates',
      filename: 'remoteEntry.js',
      exposes: {
        './Templates': './src/bootstrap',
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
      },
      remotes: {
        sharedComponents: `sharedComponents@${domain}/common/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
