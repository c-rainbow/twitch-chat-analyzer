const path = require('path');

module.exports = {
  entry: ['./src/index.ts'],
  //devtool: 'inline-source-map',
  output: {
    filename: 'combined.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  optimization: {
      minimize: false
  }
};