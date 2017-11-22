const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

// this must be equal to your Webpack configuration "context" parameter
const projectBasePath = __dirname; // require('path').resolve(__dirname, '..')

/* eslint-disable global-require */
// this global variable will be used later in express middleware
global.webpackIsomorphicTools = new WebpackIsomorphicTools(
  require('./webpack-isomorphic-tools-configuration')
)
  // initializes a server-side instance of webpack-isomorphic-tools
  // (the first parameter is the base path for your project
  //  and is equal to the "context" parameter of you Webpack configuration)
  // (if you prefer Promises over callbacks
  //  you can omit the callback parameter
  //  and then it will return a Promise instead)
  .server(projectBasePath, () => {
    // webpack-isomorphic-tools is all set now.
    // here goes all your web application code:
    // (it must reside in a separate *.js file
    //  in order for the whole thing to work)
    require('./server');
  });
