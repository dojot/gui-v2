const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const commonConfig = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const path = require('path');
const dependencies = require("../package.json").dependencies;

const devConfig = {
    mode: 'development',
    entry: path.resolve('./src/index'),
    output: {
        publicPath: 'http://localhost:8085/',
    },
    devServer: {
        port: 8085,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    resolve: {
        alias: {
            APIs: path.resolve("./src/adapters/api"),
            Assets: path.resolve("./src/assets"),
            Hooks: path.resolve("./src/hooks"),
            Selectors: path.resolve("./src/redux/selectors"),
            Services: path.resolve("./src/adapters/services"),
        },
        extensions: [".js", ".jsx"],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new ModuleFederationPlugin({
            name: 'templates',
            filename: 'remoteEntry.js',
            exposes: {
                './Templates': './src/bootstrap'
            },
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
                "@material-ui/styles": {
                    singleton: true,
                    requiredVersion: dependencies["@material-ui/styles"],
                },
            },
            remotes: {
                sharedComponents: 'sharedComponents@http://localhost:8081/remoteEntry.js',
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
};


module.exports = merge(commonConfig, devConfig)
