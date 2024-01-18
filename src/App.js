import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Room from './components/Room';

const App = () => (
  <Provider store={store}>
    <Room />
  </Provider>
);

export default App;
