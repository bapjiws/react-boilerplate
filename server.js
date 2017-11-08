/* eslint-disable global-require, no-console */
const express = require('express');
const path = require('path');

const app = express();

const inProductionMode = process.env.NODE_ENV === 'production';

if (!inProductionMode) {
  const webpackConfig = require('./webpack.config');
  const compiler = require('webpack')(webpackConfig);

  // Webpack Dev Middleware: https://github.com/webpack/webpack-dev-middleware
  const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
      color: true
    }
  });

  // Webpack Hot Middleware: https://github.com/glenjamin/webpack-hot-middleware
  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);

  app.use(webpackDevMiddleware);
  app.use(webpackHotMiddleware);
} else {
  // TODO: our CSS bundle is not gzipped; check compression's options
  const compression = require('compression');
  app.use(compression());
  app.use(express.static(path.join(__dirname, 'build')));
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  if (inProductionMode) {
    console.log(`♫ In production mode. Listening on port ${port} ♫`);
  } else {
    console.log(`♫ In development mode. Listening on port ${port} ♫`);
  }
});
