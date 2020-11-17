const path = require('path');

module.exports = {
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                "@babel/plugin-proposal-class-properties",
                {
                  "loose": true
                }
              ]
            ]
          }
        }
      }
    ]
  },
  entry: {
    immanuel: './src/immanuel.js',
    demo: './src/demo.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  }
};