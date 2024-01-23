/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
// import { logger } from 'redux-logger';

import { combineReducers } from 'redux';
import authReducer from './userAuth/authSlice';
import roomReducer from './reducers';
import categoryReducer from './categories/categorySlice';
import roomsReducer from './rooms/roomSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    rooms: roomsReducer,
    room: roomReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
