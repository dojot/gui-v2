import path from 'path';

import SaveAssetsJson from 'assets-webpack-plugin';
import config from 'config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';

import webpackConfig, { JS_SOURCE } from './webpack.config.common';

// ----------------------------------------------------------
//  CONSTANT DECLARATION
// ----------------------------------------------------------
const PUBLIC_PATH = config.get('publicPath');
const APP_ENTRY_POINT = `${JS_SOURCE}/main`;

// webpack 4 mode
// https://webpack.js.org/concepts/mode/
webpackConfig.mode = 'production';

const webpackProdOutput = {
  publicPath: PUBLIC_PATH,
  filename: `${config.get('assetPath')}/[name]-[fullhash].js`,
  chunkFilename: `${config.get('assetPath')}/[id].[fullhash].js`,
};

const html = config.get('html');

// Please configure this section if you plan
// to deploy the generated html to production.
// I don't mind you name your page as Retro
// if you want to ...
const htmlPlugins = html.map(
  page =>
    new HtmlWebpackPlugin({
      title: page.title,
      template: `src/assets/template/${page.template}`,
      inject: 'body',
      filename: page.filename,
      favicon: './favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
      },
    }),
);

// ----------------------------------------------------------
//  Extending Webpack Configuration
// ----------------------------------------------------------

// Merges webpackProdOutput and webpackConfig.output
webpackConfig.output = Object.assign(webpackConfig.output, webpackProdOutput);

webpackConfig.module.rules = webpackConfig.module.rules.concat({
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]',
        },
        sourceMap: true,
        importLoaders: 1,
      },
    },
  ],
});

// webpackConfig.devtool = 'source-map';

webpackConfig.entry = {
  app: ['@babel/polyfill', path.resolve(__dirname, APP_ENTRY_POINT)],
};

if (config.get('optimization.analyzeMode') === true) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  webpackConfig.plugins = webpackConfig.plugins.concat(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: 'localhost',
      analyzerPort: config.get('optimization.analyze.port'),
      openAnalyzer: true,
    }),
  );
}

webpackConfig.plugins.push(
  new webpack.DefinePlugin({
    __CONFIG__: JSON.stringify(config.get('app')),
    GUI_VERSION: JSON.stringify(process.env.GUI_VERSION),
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  // how you want your code to be optimized
  // all configurable
  new webpack.IgnorePlugin({ resourceRegExp: /un~$/ }),

  new SaveAssetsJson({
    path: path.join(__dirname, 'docroot'),
    filename: 'assets.json',
    prettyPrint: true,
    metadata: {
      version: process.env.PACKAGE_VERSION,
    },
  }),
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: `${config.get('assetPath')}/[name]-[fullhash].css`,
    chunkFilename: `${config.get('assetPath')}/[id]-[fullhash].css`,
  }),
);

webpackConfig.plugins = webpackConfig.plugins.concat(htmlPlugins);

export default webpackConfig;
