import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import 'normalize.css/normalize.css';
import customMuiTheme from './themes/theme.js';
import NavBar from './components/NavBar';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/NavBar.css';
import './styles/LayoutStyles.css';
import './styles/Header.css';
import './styles/Footer.css';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <MuiThemeProvider theme={customMuiTheme}>
      <NavBar />
      <Header />
      <AppRouter />
      <Footer />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));



// *******Code for implementing a loading page in the future************
// let hasRendered = false;
// const renderApp = () => {
//   if (!hasRendered) {
//     ReactDOM.render(jsx, document.getElementById('app'));
//     hasRendered = true;
//   }
// };

// ReactDOM.render(<LoadingPage />, document.getElementById('app'));


