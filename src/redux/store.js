/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
// import { logger } from 'redux-logger';
import { combineReducers } from 'redux';
import { roomReducer, roomCategoryReducer, userReducer } from './rooms/reducers';
import authReducer from './userAuth/authSlice';
import categoryReducer from './categories/categorySlice';
import roomsReducer from './rooms/roomSlice';

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
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    rooms: roomsReducer,
    room: roomReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
