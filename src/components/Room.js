// room.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRoom, fetchUserData } from '../redux/actions';

const Room = ({
  room, fetchRoomAction, user, fetchUserDataAction,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [updatedRoomDetails, setUpdatedRoomDetails] = useState({
    name: '',
    room_type: '',
    description: '',
    image: '',
  });

  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([fetchUserDataAction(), fetchRoomAction()]);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // throw new Error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchRoomAction, fetchUserDataAction]);

  const handleDelete = async (roomId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/rooms/${roomId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete room: ${response.statusText}`);
      }

      await fetchRoomAction();
    } catch (error) {
      throw new Error('Error deleting room:', error);
    }
  };

  const handleUpdate = (roomId) => {
    setIsUpdateFormOpen((prevState) => ({
      ...prevState,
      [roomId]: true,
    }));

    const selectedRoom = room.find((r) => r.id === roomId);
    setUpdatedRoomDetails(selectedRoom);
  };

  const handleFormSubmit = async (roomId) => {
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

      // Close the form and fetch updated room list
      setIsUpdateFormOpen((prevState) => ({
        ...prevState,
        [roomId]: false,
      }));
      await fetchRoomAction();
    } catch (error) {
      throw new Error('Error updating room:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="greeting-content">
      <h1>Available Rooms</h1>
      {room.map((singleRoom) => (
        <div key={singleRoom.id}>
          <p>
            Name:
            {singleRoom.name}
          </p>
          <p>
            Room Type:
            {singleRoom.room_type}
          </p>
          <p>
            Room Details:
            {singleRoom.description}
          </p>
          {user.isAdmin && (
            <>
              <button type="button" onClick={() => handleDelete(singleRoom.id)}>
                Delete Room
              </button>

              <button type="button" onClick={() => handleUpdate(singleRoom.id)}>
                Update Room
              </button>
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
              onChange={(e) => setUpdatedRoomDetails({ ...updatedRoomDetails, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="room type"
              value={updatedRoomDetails.room_type}
              onChange={(e) => setUpdatedRoomDetails({ ...updatedRoomDetails, room_type: e.target.value })}
            />

            <input
              type="text"
              placeholder="description"
              value={updatedRoomDetails.description}
              onChange={(e) => setUpdatedRoomDetails({ ...updatedRoomDetails, description: e.target.value })}
            />

            <input
              type="text"
              placeholder="image"
              value={updatedRoomDetails.image}
              onChange={(e) => setUpdatedRoomDetails({ ...updatedRoomDetails, image: e.target.value })}
            />

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
  room: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    room_type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  fetchRoomAction: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
  fetchUserDataAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  room: state.room,
  user: state.user,
});

export default connect(mapStateToProps, {
  fetchRoomAction: fetchRoom,
  fetchUserDataAction: fetchUserData,
})(Room);
