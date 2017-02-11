const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: './build.jsx',
  output: {
    path: './build',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: 'node_modules',
        loader: 'babel-loader',
        query: {
          presets: ['es2015', "stage-0", 'react']
        }
      }
    ]
  },
  devtool: 'source-maps',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};
