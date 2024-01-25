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

export const getCurrentUser = async () => {
  try {
    const response = await fetch('http://localhost:4000/current_user');
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getReservations;
