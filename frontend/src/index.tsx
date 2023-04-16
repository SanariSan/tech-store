import { createBrowserHistory } from 'history';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import {
  ChakraProvider,
  extendTheme,
  // ChakraBaseProvider,
  // extendBaseTheme
} from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { App } from './app';
import { GlobalHistoryCatcherContainer } from './containers/history-catcher';
// import { ThemeControllerContainer } from './containers/theme-controller';
import './index.scss';
import { Store } from './store';

const history = createBrowserHistory();
const rootElement = document.querySelector('#root') as Element;
const root = createRoot(rootElement);

const colors = {
  yellow: {
    // hover
    300: '#ffd666',
    // light button, accent, notif, selected sub-category, price
    // dark button, accent, notif, selected sub-category, price
    400: '#ffc831',
    // unused for now
    500: '#ffbb00',
  },
  blue: {
    // light menu bg default
    25: '#f9fafb',
    // light catalogue bg default
    300: '#dfe3e8',
    // light bg hower
    // dark font secondary / unselected
    400: '#c4cdd5',
    // light icons default
    // light font secondary-alt
    // dark icon hower
    500: '#919eab',
    // light icons hower
    // light font secondary / unselected
    // dark icon default
    600: '#637381',
    // light menu item selected
    // light font selected / default
    // dark menu bg hower
    800: '#212b36',
  },
  white: {
    // light menu selected
    300: '#eff2f5',
    // light search bar untouched
    // light category item untouched
    400: '#f3f5f7',
    // dark menu item selected
    // dark font selected / default
    900: '#ffffff',
  },
  black: {
    // dark menu item selected
    400: '#201e2c',
    // dark menu bg default
    600: '#191922',
  },
};

const { Button } = chakraTheme.components;
const theme = extendTheme({
  colors,
  components: {
    Button,
  },
});

// console.log(`REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);

root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ChakraProvider theme={theme} resetCSS={true}>
        {/* <ChakraBaseProvider theme={theme}> */}
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
