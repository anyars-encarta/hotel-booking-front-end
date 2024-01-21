// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { roomReducer, categoryReducer, userReducer } from './reducers';

const rootReducer = combineReducers({
  rooms: roomReducer,
  categories: categoryReducer,
  user: userReducer,
  // Add more reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
