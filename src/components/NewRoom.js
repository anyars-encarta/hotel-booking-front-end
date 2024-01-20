import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewRoom = ({ categories, handleFormSubmit }) => {
  const [newRoomDetails, setNewRoomDetails] = useState({
    name: '',
    category_id: '',
  });

  const handleSaveChanges = async () => {
    await handleFormSubmit(newRoomDetails);

    setNewRoomDetails({
      name: '',
      category_id: '',
    });
  };

  // Check if categories is undefined before rendering the component
  if (!categories || categories.length === 0) {
    return <div>Loading categories...</div>;
  }

  return (
    <div className="new-form">
      <h1>Add a New Room</h1>

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

      <button type="button" onClick={handleSaveChanges}>
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
  handleFormSubmit: PropTypes.func.isRequired,
};

export default NewRoom;
