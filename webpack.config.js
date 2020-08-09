const path = require('path');

const downloaderConfig = {
  entry: ['./src/downloader.ts'],
  devtool: 'inline-source-map',
  //target: "node",
  target: "web",
  output: {
    filename: 'downloader.js',
    path: path.resolve(__dirname, 'docs'),
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
      //minimize: true
  },
};


const indexConfig = {
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
      //minimize: true
  },
};

const parserConfig = {
  entry: ['./src/parser/ko/index.ts'],
  devtool: 'inline-source-map',
  target: "web",
  output: {
    filename: 'filterparser.js',
    path: path.resolve(__dirname, 'docs'),
    library: "filterparser"
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


const repositoryConfig = {
  entry: ['./src/repository.ts'],
  devtool: 'inline-source-map',
  target: "web",
  output: {
    filename: 'commentrepository.js',
    path: path.resolve(__dirname, 'docs'),
    library: "commentrepository"
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


module.exports = [parserConfig, repositoryConfig];