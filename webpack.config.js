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
  new ExtractTextPlugin('main.css')
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
        bundle: './src/index.tsx',
        vendor: ['react', 'react-dom']
      }
    : [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/index.tsx'
      ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: inProductionMode ? '[name].[chunkhash].js' : 'bundle.js'
  },

  module: {
    rules: [
      // https://github.com/s-panferov/awesome-typescript-loader
      {
        test: /\.tsx?$/,
        include: [path.join(__dirname, '/src')],
        use: [
          'react-hot-loader/webpack',
          'babel-loader',
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true
            }
          }
        ]
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
            name: '[path][name].[hash].[ext]'
          }
        }
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]'
          }
        }
      },

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
