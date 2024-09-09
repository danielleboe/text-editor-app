const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = () => {
  return {
    mode: "development",
    optimization: {
      usedExports: true, // Enable tree shaking
    },
    devtool: "inline-source-map", // Ensure source maps are enabled
    entry: {
      main: "./client/src/js/index.js",
      install: "./client/src/js/install.js",
    },
    output: {
      filename: "[name].[contenthash].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./client/index.html",
        filename: "index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new InjectManifest({
        swSrc: path.resolve(__dirname, "./client/src-sw.js"), // Ensure this path is correct
        swDest: "service-worker.js",
      }),
      new WebpackPwaManifest({
        name: "Text Editor",
        short_name: "TextEditor",
        description: "A simple text editor PWA!",
        background_color: "#ffffff",
        theme_color: "#ffffff",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve(__dirname, "./client/src/images/logo.png"), // Ensure this path is correct
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("icons"),
          },
        ],
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'client/manifest.json', to: '' }, // Copy manifest.json to the root of dist
          { from: 'client/offline.html', to: '' }, // Copy offline.html to the root of dist
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
      modules: ['node_modules'],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 9000,
      hot: true, // Ensure hot module replacement is enabled
      watchFiles: {
        paths: ['client/src/**/*'],
        options: {
          usePolling: true, // Sometimes helps with file watching issues
        },
      }, // Ensure proper watchings
    },
  };
};
