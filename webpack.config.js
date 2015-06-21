var webpack = require("webpack");

module.exports = {
  context: __dirname,
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "x-view.js",
    library: "x"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
