const initialState = {
  room: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOM':
      return {
        ...state,
        room: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
