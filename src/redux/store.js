/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
// import { logger } from 'redux-logger';

import { combineReducers } from 'redux';
import { roomReducer, roomCategoryReducer, userReducer } from './rooms/reducers';
import authReducer from './userAuth/authSlice';
import categoryReducer from './categories/categorySlice';

const rootReducer = combineReducers({
  rooms: roomReducer,
  categories: {
    roomCategoryReducer,
    categoryReducer,
  },
  user: userReducer,
  auth: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
