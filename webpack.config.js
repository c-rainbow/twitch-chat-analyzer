const path = require('path');

module.exports = {
  entry: ['./src/index.ts'],
  //entry: ['./src/repository.ts'],
  devtool: 'inline-source-map',
  //target: "node",
  target: "web",
  output: {
    filename: 'combined.js',
    path: path.resolve(__dirname, 'dist'),
    //library: "repository"
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
  },
};