// reducers.js
import { combineReducers } from 'redux';
import authReducer from '../userAuth/authSlice';

const initialState = {
  rooms: [],
  user: {
    isAdmin: false,
  },
  categories: [],
};

export const roomReducer = (state = initialState.rooms, action) => {
  switch (action.type) {
    case 'SET_ROOM':
      return [...action.payload];

    default:
      return state;
  }
};

export const categoryReducer = (state = initialState.categories, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return [...state, action.payload];

    default:
      return state;
  }
};

export const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload,
        isAdmin: action.payload.admin || false,
      };

    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  rooms: roomReducer,
});
