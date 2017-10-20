/* eslint-disable global-require */
const webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const inProductionMode = NODE_ENV === 'production';

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/index.html')
  }),
  new ExtractTextPlugin('index.css')
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
        // No Hot Module Replacement with ExtractTextPlugin: https://github.com/webpack-contrib/extract-text-webpack-plugin
        use: inProductionMode
          ? ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: loader => [ // eslint-disable-line no-unused-vars, prettier/prettier
                      require('autoprefixer')()
                    ]
                  }
                },
                'sass-loader'
              ]
            })
          : ['css-hot-loader'].concat(
              ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  'css-loader',
                  {
                    loader: 'postcss-loader',
                    options: {
                      plugins: loader => [ // eslint-disable-line no-unused-vars, prettier/prettier
                        require('autoprefixer')()
                      ]
                    }
                  },
                  'sass-loader'
                ]
              })
            )
      },

      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
          }
        }
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]'
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
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },

  plugins,

  devtool: inProductionMode ? undefined : 'source-map'
};
