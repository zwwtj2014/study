const webpack = require("webpack");
const MyPlugin = require('./plugins/MyPlugin');

module.exports = {
    mode: "development",
    devtool: "sourcemap",
    entry: "./src/index.js",
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        }
    },
    plugins: [
        new MyPlugin({
            name: 'clam'
        }),
        new webpack.BannerPlugin({
            banner: "add version",
            entryOnly: true
        })
    ]
};