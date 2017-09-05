const path = require('path');
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react']
                }
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src'),
                loader: ['style-loader', 'css-loader', 'autoprefixer-loader?browsers=last 2 version']
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}
