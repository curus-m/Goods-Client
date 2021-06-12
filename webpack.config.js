const path = require('path');

module.exports = {
 mode: 'development',
 entry: {
   index: './src/main.js',
   another: './src/another.js',
 },
  output: {
   filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};