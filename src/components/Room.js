// room.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchRoom, fetchUserData } from '../redux/actions';

const Room = ({
  room, fetchRoomAction, user, fetchUserDataAction,
}) => {
  const [isLoading, setIsLoading] = useState(true);

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
      const response = await fetch(`https://localhost:4000/api/rooms/${roomId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete room: ${response.statusText}`);
      }

      await fetchRoomAction();
    } catch (error) {
      throw new Error('Error deleting room:', error);
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
            <button type="button" onClick={() => handleDelete(singleRoom.id)}>
              Delete Room
            </button>
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
