// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import roomReducer from './reducers';

const rootReducer = combineReducers({
  room: roomReducer,
  // Add more reducers here
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
