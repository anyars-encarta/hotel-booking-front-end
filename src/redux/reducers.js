// reducers.js
const initialState = {
  room: [],
  user: {
    isAdmin: false,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOM':
      return {
        ...state,
        room: action.payload,
      };

    case 'SET_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
          isAdmin: action.payload.admin || false,
        },
      };

    default:
      return state;
  }
};

export default rootReducer;
