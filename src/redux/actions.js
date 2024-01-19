// actions.js
export const setUser = (userData) => ({ type: 'SET_USER', payload: userData });

export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/users/6'); // Rails API for a User

    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.statusText}`);
    }

    const user = await response.json();
    const isAdmin = user.admin || false;

    dispatch(setUser({ admin: isAdmin }));
  } catch (error) {
    throw new Error('Error fetching user data:', error);
  }
};

export const setRoom = (room) => ({
  type: 'SET_ROOM',
  payload: room,
});

export const fetchRoom = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/rooms'); // Rails API for Rooms

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    dispatch(setRoom(data));
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};
