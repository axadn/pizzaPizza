const path = require('path');
const webpack = require('webpack');
     
module.exports = {
    entry: './frontend/app.js',
    output: {
        path: path.resolve(__dirname, 'public/javascripts'),
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
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