// webpack.config.js
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: './test/index.js',
    output: {
        path: __dirname,
        filename: 'test-bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.vue$/, loader: 'vue-loader' },
            { test: /\.js$/,loader: 'babel-loader',exclude: /node_modules/}
        ]
    },
    resolve: {
        alias: {
            vuex: path.join(__dirname, '../asset/js/vuex.js'),
            '@': path.join(__dirname, '../src')
        }
    }
}
