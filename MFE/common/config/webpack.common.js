const { EnvironmentPlugin } = require('webpack')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    }
                }
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            hash: "sha512",
                            digest: "hex",
                            name: `assets/[name].[ext]`
                        }
                    },
                    {
                        loader: "image-webpack-loader",
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true
                                },
                                gifsicle: {
                                    interlaced: true
                                },
                                optipng: {
                                    optimizationLevel: 7
                                },
                                pngquant: {
                                    quality: "65-90",
                                    speed: 4
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new EnvironmentPlugin({GUI_VERSION: 'local'})
    ]
}
