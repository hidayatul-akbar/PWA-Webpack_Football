const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ServiceWorkerWebpackPlugin = require("serviceworker-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    dp: "./src/js/script/dp.js",
    dt: "./src/js/script/dt.js",
    dm: "./src/js/script/dm.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /(?<!\.style).css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.style\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ServiceWorkerWebpackPlugin({
      entry: path.join(__dirname, "./src/service-worker.js"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/nav.html",
      filename: "nav.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/home/home.html",
      filename: "home.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/home/matches.html",
      filename: "matches.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/home/standing.html",
      filename: "standing.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/home/favorite.html",
      filename: "favorite.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/detailPlayer.html",
      inject: true,
      chunks: ["dp"],
      filename: "detailPlayer.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/detailTeam.html",
      inject: true,
      chunks: ["dt"],
      filename: "detailTeam.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/detailMatch.html",
      inject: true,
      chunks: ["dm"],
      filename: "detailMatch.html",
    }),
    new WebpackPwaManifest({
      name: "SporTech PWA Submission 2",
      short_name: "SporTech",
      theme_color: "#222831",
      background_color: "#eeeeee",
      display: "standalone",
      fingerprints: false,
      inject: true,
      ios: true,
      icons: [
        {
          src: path.resolve("src/images/icons/icon-512.png"),
          size: "512x512",
        },
        {
          src: path.resolve("src/images/icons/icon-384.png"),
          size: "384x384",
        },
        {
          src: path.resolve("src/images/icons/icon-256.png"),
          size: "256x256",
        },
        {
          src: path.resolve("src/images/icons/icon-192.png"),
          size: "192x192",
          destination: path,
          ios: true,
        },
        {
          src: path.resolve("src/images/icons/icon-144.png"),
          size: "144x144",
        },
        {
          src: path.resolve("src/images/icons/icon-128.png"),
          size: "128x128",
        },
        {
          src: path.resolve("src/images/icons/icon-96.png"),
          size: "96x96",
        },
        {
          src: path.resolve("src/images/icons/icon-72.png"),
          size: "72x72",
        },
      ],
      gcm_sender_id: "99771231439",
    }),
  ],
};
