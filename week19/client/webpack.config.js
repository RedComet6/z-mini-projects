const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { InjectManifest } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");

module.exports = () => {
    return {
        mode: "development",
        entry: {
            main: "./src/js/index.js",
            install: "./src/js/install.js",
            cards: "./src/js/cards.js",
        },

        // TODO: Add the correct output
        output: {
            filename: "[name].bundle.js",
            path: path.resolve(__dirname, "dist"),
        },

        // TODO: Add the correct plugins
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html",
                title: "TODOs List",
            }),
            new InjectManifest({
                swSrc: "./src-sw.js",
                swDest: "src-sw.js",
            }),
            new WebpackPwaManifest({
                name: "contacts",
                description: "it is a contact directory",
                background_color: "orange",
                theme_color: "green",
                inject: true,
                fingerprints: false,
                start_url: "/",
                publicPath: "/",
                icons: [
                    {
                        src: path.resolve("assets/images/logo.png"),
                        sizes: [96, 128, 192, 256, 384, 512],
                        destination: path.join("assets", "icons"),
                    },
                ],
            }),
        ],

        // TODO: Add the correct modules
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        },
    };
};
