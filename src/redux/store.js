// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import roomReducer from './reducers';
import categoryReducer from './categories/categorySlice';
import roomsReducer from './rooms/roomSlice';

const rootReducer = combineReducers({
  room: roomReducer,
  category: categoryReducer,
  rooms: roomsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
