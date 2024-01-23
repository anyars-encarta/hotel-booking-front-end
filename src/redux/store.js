/* eslint-disable no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
// import { logger } from 'redux-logger';
import { roomReducer, categoryReducer } from './rooms/reducers';
import authReducer from './userAuth/authSlice';
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
