const path = require("path")
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./public/index.html",
 filename: "./index.html",
 publicPath: "./"
});
module.exports = {
devServer: {
  historyApiFallback: true
},
resolve: {
  fallback: {
    "path": require.resolve("path-browserify"),
    "os": require.resolve("os-browserify/browser")
  }
} ,
mode: "development",
  module: {
    rules: [{
   test: /\.js$/,
   exclude: /node_modules/,
   use: {
     loader: "babel-loader"
   }
 },
  {
   test: /\.css$/,
   use: ["style-loader", "css-loader"]
  },
  {
    test: /\.(png|jpg|svg|gif|pdf|PNG)$/,
    use: "file-loader"
  }
]},
 plugins: [htmlPlugin]
};