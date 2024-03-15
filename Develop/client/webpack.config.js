const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "index.html",
        chunks: ["main"],
      }),
      // new HtmlWebpackPlugin({
      //   template: './install.html',
      //   filename: 'install.html',
      //   chunks: ['install']
      // }),
      new WebpackPwaManifest({
        name: "Your Text Editor",
        short_name: "TextEditor",
        description: "A Progressive Web Application text editor",
        background_color: "#ffffff",
        theme_color: "#3367D6",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes for better compatibility
          },
        ],
        fingerprints: false,
      }),
      new InjectManifest({
        swSrc: "./service-worker.js",
        swDest: "service-worker.js",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
          },
      ],
    },
  };
};
     
  
