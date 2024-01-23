/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
// import { logger } from 'redux-logger';
import { rootReducer } from './rooms/reducers';

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
