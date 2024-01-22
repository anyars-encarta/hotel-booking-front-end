import { configureStore } from '@reduxjs/toolkit';
<<<<<<< HEAD
// import { logger } from 'redux-logger';
import authReducer from './userAuth/authSlice';
=======
import { combineReducers } from 'redux';
import roomReducer from './reducers';
import categoryReducer from './categories/categorySlice';

const rootReducer = combineReducers({
  room: roomReducer,
  category: categoryReducer,
});
>>>>>>> dev

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
