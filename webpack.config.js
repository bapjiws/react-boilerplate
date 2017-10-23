/* eslint-disable global-require */
const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const inProductionMode = NODE_ENV === 'production';

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: !inProductionMode
});

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/index.html')
  }),
  extractSass
];

if (inProductionMode) {
  plugins.push(
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  );
} else {
  const dotEnvVars = require('dotenv').config().parsed;
  const envVars = Object.keys(dotEnvVars).reduce(
    (acc, key) => {
      acc['process.env'][key] = JSON.stringify(dotEnvVars[key]);
      return acc;
    },
    {
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }
  );

  plugins.push(
    new webpack.DefinePlugin(envVars),
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = {
  entry: inProductionMode
    ? {
        bundle: './src/index.js',
        vendor: ['react', 'react-dom']
      }
    : [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index.js'
      ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: inProductionMode ? '[name].[chunkhash].js' : 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.join(__dirname, '/src')],
        // React Hot Loader should be automatically disabled in production.
        use: ['react-hot-loader/webpack', 'babel-loader']
      },

      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            // Interprets @import and url() like import/require() and will resolve them
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            },
            {
              // Deals with autoprefixing, linting and other fancy stuff
              loader: 'postcss-loader',
              options: {
                  plugins: loader => [ // eslint-disable-line no-unused-vars, prettier/prettier
                  require('autoprefixer')()
                ]
              }
            },
            // Loads a SASS/SCSS file and compiles it to CSS
            'sass-loader'
          ],
          // Adds CSS to the DOM by injecting a <style> tag; used in development (when CSS is not extracted)
          fallback: 'style-loader'
        })
      },

      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/font/[name].[ext]'
          }
        }
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/img/[name].[ext]'
          }
        }
      },

      // TODO: consider removing this piece
      // https://github.com/webpack-contrib/source-map-loader
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // TODO: remove '.ts' and '.tsx'
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },

  plugins,

  devtool: inProductionMode ? undefined : 'source-map'
};
