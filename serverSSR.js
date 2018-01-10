import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import AppSSR from './src/components/AppSSR';
import template from './util/template';

const app = express();

// app.use(express.static('public')); // client bundle

const sheet = new ServerStyleSheet();
const html = renderToString(sheet.collectStyles(<AppSSR />));
const css = sheet.getStyleTags(); // or sheet.getStyleElement()

app.get('*', (req, res) => {
  res.send(
    template({
      title: 'AN AWESOME TITLE!',
      html,
      css
    })
  );
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
