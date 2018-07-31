const webpack = require("webpack");

module.exports = {
    mode: "development",
    devtool: "sourcemap",
    entry: "./src/index.js",
    plugins: [
        new webpack.BannerPlugin({
            banner: "add version",
            entryOnly: true
        })
    ]
};
