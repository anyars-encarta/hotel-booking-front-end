// store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import roomReducer from './reducers';
import categoryReducer from './categories/categorySlice';

const rootReducer = combineReducers({
  room: roomReducer,
  category: categoryReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
