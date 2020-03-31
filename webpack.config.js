module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',

  entry: {
    main: "./src/content_scripts/main.js",
    background: "./src/background/background.js"
  },

  output: {
    publicPath: "/public",
    filename: "[name].js",
    path: __dirname + "/dist"
  },

  module: {
    rules: [
      {
        test: /\.json$/,
        loader: "file-loader",
        type: "javascript/auto",
        options: {
          name: () => "[name].[ext]"
        }
      }
    ]
  }
};
