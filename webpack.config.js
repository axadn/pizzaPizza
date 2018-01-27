const path = require('path');
const webpack = require('webpack');
     
module.exports = {
    entry: './frontend/pizza_pizza.js',
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '*'],
        alias: {
            Components: path.resolve(__dirname, 'frontend/components/'),
            Actions: path.resolve(__dirname, 'frontend/actions/'),
            Reducers: path.resolve(__dirname, 'frontend/reducers/'),
            Utils: path.resolve(__dirname, 'frontend/utils/')
        }
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};