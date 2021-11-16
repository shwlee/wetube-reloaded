const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

//console.log(path.resolve(__dirname, "assets/js"));
console.log(path.resolve(__dirname, "assets", "js"));

const BASE_JS = "./src/client/js/";

module.exports = {
    entry: {
        main: BASE_JS + "main.js",
        videoPlayer: BASE_JS + "videoPlayer.js",
        recorder: BASE_JS + "recorder.js",
        comments: BASE_JS + "comments.js"
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "assets"),
        clean: true
    },
    watch: true,
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css"
    })],
    mode: "development",
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ]
    }
}