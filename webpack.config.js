var webpack = require("webpack");

var config = {
  context: __dirname,
  entry: "./lib",
  output: {
    path: __dirname + "/dist",
    filename: "x-view.js",
    library: "x"
  },
  resolve: {
    alias: {
      "x-view$": __dirname + "/index.js"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

module.exports = config;
