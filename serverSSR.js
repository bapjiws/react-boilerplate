import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import AppSSR from './src/components/AppSSR';
import html from './util/html';

const app = express();

// app.use(express.static('public')); // client bundle

app.get('*', (req, res) => {
  res.send(
    html({
      title: 'AN AWESOME TITLE!',
      body: renderToString(<AppSSR />)
    })
  );
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
