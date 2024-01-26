const API_URL = process.env.REACT_APP_API_URL;

const getReservations = async () => {
  try {
    const response = await fetch(`${API_URL}/reservations`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const CreateReservation = async (data) => {
  try {
    const response = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await fetch(`${API_URL}/reservations/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch('http://localhost:4000/current_user');
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCategory = async (id) => {
  try {
    const response = await fetch(`${API_URL}/categories/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getReservations;
