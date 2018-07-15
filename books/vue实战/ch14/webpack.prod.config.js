const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.js');

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    output: {
        publicPath: '/dist/',
        filename: '[name].[hash].js'
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[hash].css",
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            VERSION: JSON.stringify('1.0')
        }),
        new HtmlwebpackPlugin({
            filename: '../index_prod.html',
            template: './index.ejs',
            inject: false
        })
    ]
});