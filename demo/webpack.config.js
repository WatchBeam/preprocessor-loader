const path = require('path');

module.exports = {
  resolve: {
    modules: [path.join(__dirname, '..', 'node_modules')],
  },
  entry: './demo/main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: ['@mcph/preprocessor-loader?PLATFORM=xbox', 'html']
      },
    ]
  }
};
