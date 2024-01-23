/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
// import { logger } from 'redux-logger';
import authReducer from './userAuth/authSlice';
import { categoryReducer, roomReducer } from './rooms/reducers';

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    rooms: roomReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
