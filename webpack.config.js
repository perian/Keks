const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/card.js",
    "./js/data.js",
    "./js/drag.js",
    "./js/form.js",
    "./js/main.js",
    "./js/map.js",
    "./js/pin.js",
    "./js/utils.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false,
};
