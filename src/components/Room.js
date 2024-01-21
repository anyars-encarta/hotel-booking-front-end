// room.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRoom, fetchUserData, setRoom } from '../redux/actions';

const Room = ({
  rooms, fetchRoomAction, user, fetchUserDataAction,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [updatedRoomDetails, setUpdatedRoomDetails] = useState({
    id: '',
    name: '',
    category_id: '',
  });

  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState({});
  const [categories, setCategories] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('http://localhost:4000/api/categories');

        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.statusText}`);
        }

        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        await Promise.all([fetchUserDataAction(), fetchRoomAction()]);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // throw new Error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchRoomAction, fetchUserDataAction]);

  const getCategoryById = (categoryId) => categories.find(
    (category) => category.id === categoryId,
  );

  const handleDelete = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete room: ${response.statusText}`);
      }

      await fetchRoomAction();
      setSuccessMessage('Room deleted successfully');
    } catch (error) {
      throw new Error('Error deleting room:', error);
    }
  };

  const handleFormOpen = (roomId) => {
    setIsUpdateFormOpen((prevState) => ({
      ...prevState,
      [roomId]: true,
    }));
    const room = rooms.find((singleRoom) => singleRoom.id === roomId);
    setUpdatedRoomDetails(room);
  };

  const handleFormClose = (roomId) => {
    setIsUpdateFormOpen((prevState) => ({
      ...prevState,
      [roomId]: false,
    }));
    setUpdatedRoomDetails({
      id: '',
      name: '',
      category_id: '',
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/rooms/${updatedRoomDetails.id}`, {
        method: 'PATCH', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRoomDetails),
      });

      if (!response.ok) {
        throw new Error(`Failed to update room: ${response.statusText}`);
      }

      handleFormClose(updatedRoomDetails.id);
      await fetchRoomAction();
      setSuccessMessage('Room updated successfully');
    } catch (error) {
      throw new Error('Error updating room:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="room-content">
      <h1>Available Rooms</h1>

      {successMessage && <div className="success-message">{successMessage}</div>}

      {rooms
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((singleRoom) => (
          <div key={singleRoom.id}>
            <p>
              Name:
              {' '}
              {singleRoom.name}
            </p>
            <p>
              Room Type:
              {' '}
              {getCategoryById(singleRoom.category_id)?.name || ''}
            </p>
            <p>
              Room Details:
              {' '}
              {getCategoryById(singleRoom.category_id)?.description || ''}
            </p>
            <p>
              Price:
              {' '}
              {/* {getCategoryById(singleRoom.category_id)?.price || ''} */}
              {getCategoryById(singleRoom.category_id)?.price ? `$${getCategoryById(singleRoom.category_id)?.price.toFixed(2)}` : ''}
            </p>
            {user.isAdmin && (
            <>
              <button type="button" onClick={() => handleDelete(singleRoom.id)}>
                Delete Room
              </button>
              {isUpdateFormOpen[singleRoom.id] ? (
                <button type="button" onClick={() => handleFormClose(singleRoom.id)}>
                  Cancel
                </button>
              ) : (
                <button type="button" onClick={() => handleFormOpen(singleRoom.id)}>
                  Update Room
                </button>
              )}
            </>
            )}

            {/* Update Form */}
            {isUpdateFormOpen[singleRoom.id] && (
            <div className="update-form">
              {/* Render form inputs for each field (name, room_type, description, etc.) */}
              <input
                type="text"
                placeholder="Name"
                value={updatedRoomDetails.name}
                onChange={(e) => setUpdatedRoomDetails({
                  ...updatedRoomDetails, name: e.target.value,
                })}
              />

              {/* Add a dropdown to select a category */}
              <select
                value={updatedRoomDetails.category_id}
                onChange={(e) => setUpdatedRoomDetails({
                  ...updatedRoomDetails, category_id: e.target.value,
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

              <button type="button" onClick={() => handleFormSubmit(singleRoom.id)}>
                Save Changes
              </button>
            </div>
            )}
          </div>
        ))}
    </div>
  );
};

Room.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
  })).isRequired,
  fetchRoomAction: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
  fetchUserDataAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  rooms: state.rooms,
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchRoomAction: fetchRoom,
  fetchUserDataAction: fetchUserData,
  setRoomAction: setRoom,
})(Room);
