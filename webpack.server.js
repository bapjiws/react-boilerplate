const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

  entry: path.join(__dirname, 'serverSSR.js'),

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'js/bundle.js'
  },

  module: {
    rules: [
      // TODO: add loaders for images and fonts
      {
        test: /\.jsx?$/,
        include: [
          path.join(__dirname, '/src'),
          path.join(__dirname) // TODO: maybe simply use exclude
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              // TODO: probably restore .babelrc if we have 2 Webpack configs.
              presets: ['react', ['es2015', { modules: false }], 'stage-0']
            }
          }
        ]
      }
    ]
  }
};
