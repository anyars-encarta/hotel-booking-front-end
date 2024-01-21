// actions.js
export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});

export const fetchUserData = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/users/2'); // Rails API for a User

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

export const setCategory = (category) => ({
  type: 'SET_CATEGORY',
  payload: category,
});

export const fetchCategories = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/categories');
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    const categoriesData = await response.json();
    return categoriesData;
  } catch (error) {
    throw new Error('Error fetching categories:', error);
  }
};

export const saveFormData = (formData) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:4000/api/rooms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ room: formData }),
    });

    if (!response.ok) {
      throw new Error('Failed to save form data:', response.statusText);
    }

    const savedData = await response.json();
    dispatch(setRoom(savedData));
  } catch (error) {
    throw new Error('Error saving form data', error);
  }
};
