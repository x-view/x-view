var webpack = require("webpack");

var config = {
  context: __dirname,
  entry: ["./index.js", "./tags.js"],
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
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};

module.exports = config;
