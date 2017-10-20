/* global document */

// React & Redux in TypeScript - Static Typing Guide:
// https://github.com/piotrwitek/react-redux-typescript-guide
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // Automatically disabled in production.

import App from './components/App';

const render = (Component: any): void => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}

// An alternative setup taken from https://github.com/Glavin001/react-hot-ts:

// This piece might be separated in a declarations.d.ts file:
// interface RequireImport {
//     default: any;
// }
//
// const rootEl = document.getElementById("root");
// ReactDOM.render(
//     <AppContainer>
//         <App />
//     </AppContainer>,
//     rootEl
// );
//
// // Hot Module Replacement API
// if (module.hot) {
//     module.hot.accept("./components/App", () => {
//         const NextApp = require<RequireImport>("./components/App").default;
//         ReactDOM.render(
//             <AppContainer>
//                 <NextApp />
//             </AppContainer>
//             ,
//             rootEl
//         );
//     });
// }
