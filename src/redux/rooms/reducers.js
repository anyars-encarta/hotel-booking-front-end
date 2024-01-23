// reducers.js
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
      return action.payload;

    default:
      return state;
  }
};

export const roomCategoryReducer = (state = initialState.categories, action) => {
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
