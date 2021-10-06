const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/backend.js",
    "./js/data.js",
    "./js/pin.js",
    "./js/form.js",
    "./js/map.js",
    "./js/card.js",
    "./js/drag.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false,
};
