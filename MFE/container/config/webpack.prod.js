const path = require('path');

const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { dependencies } = require('../package.json');
const commonConfig = require('./webpack.common');

const domain = process.env.PRODUCTION_DOMAIN || '/mfe';

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/v2/',
    path: path.join(__dirname, '../dist'),
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        sharedComponents: `sharedComponents@${domain}/common/remoteEntry.js`,
        home: `home@${domain}/home/remoteEntry.js`,
        dashboard: `dashboard@${domain}/dashboard/remoteEntry.js`,
        devices: `devices@${domain}/devices/remoteEntry.js`,
        templates: `templates@${domain}/templates/remoteEntry.js`,
        security: `security@${domain}/security/remoteEntry.js`,
        reports: `reports@${domain}/reports/remoteEntry.js`,
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
          singleton: true,
          requiredVersion: dependencies['@material-ui/core'],
        },
        '@material-ui/icons': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/icons'],
        },
        '@material-ui/lab': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/lab'],
        },
        '@material-ui/pickers': {
          singleton: true,
          requiredVersion: dependencies['@material-ui/pickers'],
        },
        'react-transition-group': {
          eager: false,
          singleton: true,
          requiredVersion: dependencies['react-transition-group'],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
