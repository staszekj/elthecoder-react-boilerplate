import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import EmailComponent from 'elComponents/emailComponent';

const htmlEl = document.getElementById('EmailComponent');
const render = (store) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}
                key="provider">
        <EmailComponent />
      </Provider>
    </AppContainer>,
    htmlEl
  );
};

const renderEmailContainer = (store) => {
  render(store);
  if (module.hot) {
    module.hot.accept('elComponents/emailComponent', () => {
      render(store);
    });
  }
};

export default renderEmailContainer;


