// store.js

/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
// import { logger } from 'redux-logger';
import authReducer from './userAuth/authSlice';
import roomsReducer from './rooms/roomSlice';
import categoryReducer from './categories/categorySlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    rooms: roomsReducer,
    category: categoryReducer,
  },
});

export default store;
