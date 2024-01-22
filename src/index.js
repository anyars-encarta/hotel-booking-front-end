import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import { BrowserRouter } from 'react-router-dom';
=======
>>>>>>> dev
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<<<<<<< HEAD
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
=======
  <React.StrictMode>
    <Provider store={store}>
      <div className="container-fluid">
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
>>>>>>> dev
);
