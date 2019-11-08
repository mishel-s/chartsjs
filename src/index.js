import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';
import rootSaga from './redux/sagas';
import { SnackbarProvider } from 'notistack';

import './index.css';
import App from './App.index';
// import * as serviceWorker from './serviceWorker';

const store = configureStore();
store.runSaga(rootSaga);

const root = document.getElementById('root');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={2500}
      >
        <App />
      </SnackbarProvider>
    </Provider>,
    root ? root : document.createElement('div')
  );
};

if (module.hot) {
  module.hot.accept(App, () => {
    render();
  });
}
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
