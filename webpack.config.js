const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/error.js",
    "./js/data.js",
    "./js/debounce.js",
    "./js/render.js",
    "./js/move.js",
    "./js/card.js",
    "./js/filter.js",
    "./js/pin.js",
    "./js/pins.js",
    "./js/map.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};

