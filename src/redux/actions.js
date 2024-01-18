export const setRoom = (room) => ({
  type: 'SET_ROOM',
  payload: room,
});

export const fetchRoom = () => async (dispatch) => {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/rooms'); // Rails API URL

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();

    dispatch(setRoom(data));
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
};
