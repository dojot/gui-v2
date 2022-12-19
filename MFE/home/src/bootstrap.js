import React from 'react';

import { createBrowserHistory } from 'history';
import ReactDOM from 'react-dom';

import App from './App';

const mount = el => {
  const history = createBrowserHistory({ basename: '/v2/#/' });
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#home-root');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
