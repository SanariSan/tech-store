import { ChakraProvider /* ChakraBaseProvider */ } from '@chakra-ui/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { App } from './app';
import { GlobalHistoryCatcherContainer } from './containers/history-catcher';
// import { ThemeControllerContainer } from './containers/theme-controller';
import { Fonts, THEME } from './chakra-setup';
import './index.scss';
import { Store } from './store';

const history = createBrowserHistory();
const rootElement = document.querySelector('#root') as Element;
const root = createRoot(rootElement);

console.log(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ChakraProvider theme={THEME} resetCSS={true}>
        <Fonts />
        {/* <ThemeControllerContainer /> */}
        <Router history={history}>
          <GlobalHistoryCatcherContainer />
          <App />
        </Router>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
);

export {};
