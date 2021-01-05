const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    watch: false,
    target: "web",
    devtool: "source-map",
    mode: "production",
    entry: path.resolve(__dirname, "src", "client", "main.ts"),
    output: {
        path: path.resolve(__dirname, "dist", "client"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.ts$/i,
                loader: "ts-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                use: ["file-loader"],
            },
            {
                test: /\.(glsl|vs|fs)$/,
                loader: "ts-shader-loader",
            },
        ],
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src", "client", "index.html"),
        }),
    ],
};
