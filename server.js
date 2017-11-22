// TODO: consult with https://github.com/catamphetamine/webpack-isomorphic-tools for general setup
// TODO: consult with https://github.com/erikras/react-redux-universal-hot-example for an example

/* eslint-disable global-require, no-console */
import React from 'react';
import { renderToString } from 'react-dom/server';

// html page markup
import Html from './html';

const express = require('express');
const path = require('path');

const app = express();

const inProductionMode = process.env.NODE_ENV === 'production';

/* eslint-disable no-undef */
// will be used in express_application.use(...)
function pageRenderingMiddleware(request, response) {
  // clear require() cache if in development mode
  // (makes asset hot reloading work)
  if (process.env.NODE_ENV !== 'production') {
    webpackIsomorphicTools.refresh();
  }

  // for react-router example of determining current page by URL take a look at this:
  // https://github.com/catamphetamine/webapp/blob/master/code/server/webpage%20rendering.js
  const pageComponent = request.path('src/components/App.js'); // [determine your page component here using request.path]

  // for a Redux Flux store implementation you can see the same example:
  // https://github.com/catamphetamine/webapp/blob/master/code/server/webpage%20rendering.js
  // const fluxStore = [initialize and populate your flux store depending on the page being shown]

  // render the page to string and send it to the browser as text/html
  response.send(
    `<!doctype html>\n${renderToString(
      <Html
        assets={webpackIsomorphicTools.assets()}
        component={pageComponent}
      />
    )}`
  );
}

app.use(pageRenderingMiddleware);

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
  // TODO: move this part outside of the clause, it should be enabled at all times
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
