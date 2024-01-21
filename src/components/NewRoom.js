// NewRoom.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { saveFormData } from '../redux/actions';

const NewRoom = ({ categories }) => {
  const dispatch = useDispatch();
  const [newRoomDetails, setNewRoomDetails] = useState({
    name: '',
    category_id: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Access the existing rooms data from the Redux state
  const rooms = useSelector((state) => state.room.room);

  const handleSaveRoom = async () => {
    if (!newRoomDetails.name || !newRoomDetails.category_id) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    // Check if the room and category combination already exists
    const roomExists = rooms.some(
      (room) => (
        room.name.toLowerCase() === newRoomDetails.name.toLowerCase()
        && room.category_id.toString() === newRoomDetails.category_id.toString()
      ),
    );

    if (roomExists) {
      const selectedCategory = categories.find(
        (category) => category.id === parseInt(newRoomDetails.category_id, 10),
      );

      const categoryName = selectedCategory ? selectedCategory.name : '';

      setErrorMessage(`There is already a room named "${newRoomDetails.name}" in the "${categoryName}" category.`);
      return;
    }

    try {
      dispatch(saveFormData(newRoomDetails));
      setNewRoomDetails({
        name: '',
        category_id: '',
      });

      setSuccessMessage('New Room created successfully');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error saving room. Please try again.');
    }
  };

  // Check if categories is undefined before rendering the component
  if (!categories || categories.length === 0) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="new-form">
      <h1>Add a New Room</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}
      {/* Add error message display */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Render form inputs for each field (name, room_type, description, etc.) */}
      <input
        type="text"
        placeholder="Name"
        value={newRoomDetails.name}
        onChange={(e) => setNewRoomDetails({
          ...newRoomDetails, name: e.target.value,
        })}
      />

      {/* Add a dropdown to select a category */}
      <select
        value={newRoomDetails.category_id}
        onChange={(e) => setNewRoomDetails({
          ...newRoomDetails, category_id: e.target.value,
        })}
      >

        <option value="">Select a Category</option>
        {/* Map over categories if available */}
        {categories
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
      </select>

      <button type="button" onClick={handleSaveRoom}>
        Add Room
      </button>
    </div>
  );
};

NewRoom.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  // handleFormSubmit: PropTypes.func.isRequired,
};

export default NewRoom;
