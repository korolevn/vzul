const path    = require("path");
const mode    = process.env.NODE_ENV || "development";
const isDev   = (mode === "development");
const target = isDev ? "web" : "browserslist";
const devtool = isDev ? "source-map" : undefined;

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postCss = require("postcss-preset-env");

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 8080,
    hot: true,
    open: true,
  },
  entry: path.resolve(__dirname, "./src/demo", "vzul.js"),
  output: {
    path: path.resolve(__dirname, "./public"),
    clean: true,
    filename: "index.[hash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/demo", "index.html"),
      inject: "body",
      filename: 'index.html'
    }),
    // new MiniCssExtractPlugin({
    //   filename: "./style.[hash].css",
    // })
  ],
  module: {
    rules: [
      {
        test:   /\.html$/,
        loader: "html-loader",
      },
      // {
      //   test:   /\.(c|sc)ss$/,
      //   use: [
      //     isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      //     "css-loader",
      //
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {
      //           plugins: [
      //             postCss,
      //           ],
      //         },
      //       },
      //     },
      //
      //     "sass-loader"
      //   ],
      // },
    ],
  },
}
