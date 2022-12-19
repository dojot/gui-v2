const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const { dependencies } = require('../package.json');
const commonConfig = require('./webpack.common');

const devConfig = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html',
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        sharedComponents: 'sharedComponents@http://localhost:8081/remoteEntry.js',
        home: 'home@http://localhost:8082/remoteEntry.js',
        dashboard: 'dashboard@http://localhost:8083/remoteEntry.js',
        devices: 'devices@http://localhost:8084/remoteEntry.js',
        templates: 'templates@http://localhost:8085/remoteEntry.js',
        security: 'security@http://localhost:8086/remoteEntry.js',
        flows: 'flows@http://localhost:8087/remoteEntry.js',
        reports: 'reports@http://localhost:8088/remoteEntry.js',
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
          eager: true,
          singleton: true,
          requiredVersion: dependencies['react-transition-group'],
        },
      },
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
